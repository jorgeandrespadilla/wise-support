import { round } from 'lodash';
import { db } from '@/database/client';
import {
    CategoriesStatsRequestSchema,
    PerformanceStatsRequestSchema,
} from '@/schemas/statistics';
import {
    CategoriesStatsResponse,
    PerformanceStatsResponse,
    SelectFields,
    StatsCategoryDetail,
    StatsCategoryResponse,
    StatsTicket,
    StatsTicketWithCategory,
    StatsUser,
    TicketPerformance,
    UserPerformance,
    UserPerformanceResponse,
} from '@/types';
import { catchErrors } from '@/utils/catchErrors';
import { validateAndParse } from '@/utils/validation';
import { addDaysToDate } from '@/utils/dateHelpers';
import { role } from '@/constants/roles';
import { ticketPriority, ticketStatus } from '@/constants/tickets';

type TimeDifferenceType = 'DELAYED' | 'ON_TIME' | 'EARLY';

//#region Data helpers

const scoreByTicketPriority = {
    [ticketPriority.LOW]: 1,
    [ticketPriority.MEDIUM]: 2,
    [ticketPriority.HIGH]: 3,
};

const getTimeDifferenceType = (timeDifference: number): TimeDifferenceType => {
    if (timeDifference < 0) {
        return 'EARLY';
    } else if (timeDifference > 0) {
        return 'DELAYED';
    } else {
        return 'ON_TIME';
    }
};

//#endregion

//#region Data selection

const userFieldsToSelect: SelectFields<StatsUser> = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
};

const ticketFieldsToSelect: SelectFields<StatsTicket> = {
    id: true,
    priority: true,
    timeEstimated: true,
    assignee: {
        select: userFieldsToSelect,
    },
};

const categoryFieldsToSelect: SelectFields<StatsCategoryDetail> = {
    id: true,
    code: true,
    name: true,
    description: true,
};

const ticketWithCategoryFieldsToSelect: SelectFields<StatsTicketWithCategory> =
    {
        category: {
            select: categoryFieldsToSelect,
        },
    };

//#endregion

//#region Users performance

export const getUsersPerformance = catchErrors(async (req, res) => {
    const requestData = validateAndParse(
        PerformanceStatsRequestSchema,
        req.query,
    );

    const isSupervisor = req.currentUser.role.code === role.SUPERVISOR;

    const tickets = await db.ticket.findMany({
        select: ticketFieldsToSelect,
        where: {
            status: ticketStatus.CLOSED,
            createdAt: {
                gte: requestData.startDate,
            },
            endedAt: {
                lte: addDaysToDate(requestData.endDate, 1),
            },
            // If current user is supervisor, only show tickets assigned to his subordinates.
            supervisorId: isSupervisor ? req.currentUser.id : undefined,
        },
    });

    // Calculate performance score for each ticket and group them by user.
    const newTickets = tickets.length;
    let overallAttentionTime = 0;
    let accumulatedPerformanceScore = 0;
    const usersPerformanceByUserId: Record<number, UserPerformance> = {};

    for (const ticket of tickets) {
        const { performanceScore, attentionTime } = await getTicketPerformance(
            ticket,
        );
        overallAttentionTime += attentionTime;
        accumulatedPerformanceScore += performanceScore;

        const user = ticket.assignee;
        if (!usersPerformanceByUserId[user.id]) {
            usersPerformanceByUserId[user.id] = {
                user,
                resolvedTickets: 0,
                performanceScore: 0,
                attentionTime: 0,
            };
        }

        usersPerformanceByUserId[user.id].resolvedTickets += 1;
        usersPerformanceByUserId[user.id].performanceScore += performanceScore;
        usersPerformanceByUserId[user.id].attentionTime += attentionTime;
    }

    const usersPerformance = Object.values(usersPerformanceByUserId).map(
        (record): UserPerformanceResponse => {
            const averagePerformanceScore =
                record.resolvedTickets > 0
                    ? record.performanceScore / record.resolvedTickets
                    : 0;
            return {
                user: {
                    ...record.user,
                    fullName: `${record.user.firstName} ${record.user.lastName}`,
                },
                performanceScore: round(averagePerformanceScore, 2),
                resolvedTickets: record.resolvedTickets,
                attentionTime: record.attentionTime,
            };
        },
    );

    const averagePerformanceScore =
        newTickets > 0 ? accumulatedPerformanceScore / newTickets : 0;

    const response: PerformanceStatsResponse = {
        newTickets: newTickets,
        overallAttentionTime: overallAttentionTime,
        averagePerformanceScore: round(averagePerformanceScore, 2),
        users: [...usersPerformance].sort(
            (a, b) => b.performanceScore - a.performanceScore,
        ),
    };

    res.send(response);
});

/**
 * Calculates the performance score for the given ticket.
 * @param ticket Ticket to calculate performance score
 * @returns Performance score for the given ticket
 */
async function getTicketPerformance(
    ticket: StatsTicket,
): Promise<TicketPerformance> {
    const ticketPriorityScore = scoreByTicketPriority[ticket.priority];
    const estimatedTime = ticket.timeEstimated;
    const attentionTime = await getTotalAttentionTimeByTicketId(ticket.id);

    // Time difference between ticket's estimated time and actual attention time
    const timeDifference = getTimeDifferenceType(estimatedTime - attentionTime);

    let score = ticketPriorityScore;
    if (timeDifference === 'EARLY') {
        score += (estimatedTime - attentionTime) / estimatedTime;
    } else if (timeDifference === 'DELAYED') {
        score -= (attentionTime - estimatedTime) / estimatedTime;
    }
    return {
        performanceScore: score,
        attentionTime,
    };
}

/**
 * Calculates the total attention time for the given ticket.
 * @param ticketId Ticket ID to calculate total attention time
 * @returns Total attention time for the given ticket
 */
async function getTotalAttentionTimeByTicketId(ticketId: number) {
    const associatedTasks = await db.task.findMany({
        where: {
            ticketId,
        },
        select: {
            id: true,
            timeSpent: true,
        },
    });
    return associatedTasks.reduce((acc, task) => acc + task.timeSpent, 0);
}

//#endregion

//#region Categories

export const getCategoriesStats = catchErrors(async (req, res) => {
    const requestData = validateAndParse(
        CategoriesStatsRequestSchema,
        req.query,
    );

    const tickets = await db.ticket.findMany({
        select: ticketWithCategoryFieldsToSelect,
        where: {
            status: ticketStatus.CLOSED,
            endedAt: {
                gte: requestData.startDate,
                lte: addDaysToDate(requestData.endDate, 1),
            },
        },
    });

    const categories: Record<number, StatsCategoryResponse> = {};
    for (const ticket of tickets) {
        const associatedCategory = ticket.category;
        if (!categories[associatedCategory.id]) {
            categories[associatedCategory.id] = {
                category: associatedCategory,
                totalTickets: 0,
            };
        }
        categories[associatedCategory.id].totalTickets += 1;
    }

    const response: CategoriesStatsResponse = {
        categories: Object.values(categories),
        totalCategories: Object.keys(categories).length,
    };

    res.send(response);
});

//#endregion
