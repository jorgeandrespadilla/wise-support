import { useQuery } from '@tanstack/react-query';
import Button from 'components/Button';
import {
    Cell,
    HeaderCell,
    TableContainer,
    TableEmpty,
    TableLoader,
} from 'components/Table';
import { handleAPIError } from 'utils/validation';
import { pluralize } from 'utils/dataHelpers';
import StatsItem from 'components/StatsItem';
import { getUsersPerformance } from 'services/statistics';
import { GetPerformanceStatsRequest } from 'types';
import { useForm } from 'react-hook-form';
import { normalizeTimezone, today } from 'utils/dateHelpers';
import { DatePicker } from 'components/Form';
import toast from 'utils/toast';
import Divider from 'components/Divider';
import { useMediaQuery } from 'hooks';
import { breakpoints } from 'shared/constants/themes';
import StatsContainer from 'components/StatsContainer';

type FormData = {
    startDate: string;
    endDate: string;
};

const initialData = {
    newTickets: 0,
    overallAttentionTime: 0,
    averagePerformanceScore: 0,
    users: [],
};

function PerformanceStats() {
    const isDesktop = useMediaQuery(breakpoints.up('md'));

    const { control, reset, handleSubmit, ...form } = useForm<FormData>({
        defaultValues: {
            startDate: today('iso'),
            endDate: today('iso'),
        },
    });

    const usersPerformance = useQuery(
        ['usersPerformance'],
        async () => {
            const query = form.getValues();

            const request: GetPerformanceStatsRequest = {
                startDate: normalizeTimezone(query.startDate),
                endDate: normalizeTimezone(query.endDate),
            };
            const data = await getUsersPerformance(request);
            if (data.users.isEmpty()) {
                toast.error('No se encontraron resultados');
            }
            return data;
        },
        {
            onError: e => {
                handleAPIError(e, { form });
            },
            enabled: false,
            initialData: initialData,
            cacheTime: 0,
        },
    );

    const stats = usersPerformance.data ?? initialData;

    return (
        <>
            <form onSubmit={handleSubmit(() => usersPerformance.refetch())}>
                <div className="flex flex-col md:flex-row justify-between md:items-end pb-4 gap-4">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-2">
                        <DatePicker
                            dateFormat="iso"
                            width="half"
                            name="startDate"
                            label="Fecha de inicio"
                            control={control}
                        />
                        <DatePicker
                            dateFormat="iso"
                            width="half"
                            name="endDate"
                            label="Fecha de fin"
                            control={control}
                        />
                    </div>
                    <Button as="submit">Buscar</Button>
                </div>
            </form>
            {!isDesktop && <Divider vertical="md" showRule />}
            <StatsContainer>
                <StatsItem
                    label="Nuevos tickets"
                    value={stats.newTickets.toString()}
                />
                <StatsItem
                    label="Tiempo de atenci??n"
                    value={stats.overallAttentionTime.toString()}
                    measurement={pluralize(
                        stats.overallAttentionTime,
                        'hora',
                        'horas',
                    )}
                />
                <StatsItem
                    label="Puntuaci??n promedio"
                    value={stats.averagePerformanceScore.toString()}
                />
            </StatsContainer>
            <TableContainer>
                <thead>
                    <tr className="border-0 border-b-2 text-left">
                        <HeaderCell>Usuario</HeaderCell>
                        <HeaderCell>Tickets atendidos</HeaderCell>
                        <HeaderCell>Tiempo de atenci??n</HeaderCell>
                        <HeaderCell>Puntuaci??n</HeaderCell>
                    </tr>
                </thead>
                <tbody>
                    {usersPerformance.isFetching ? (
                        <TableLoader />
                    ) : !stats.users.isEmpty() ? (
                        stats.users.map((userStats, index) => {
                            return (
                                <tr
                                    key={userStats.user.id}
                                    className={`table-row ${
                                        !stats.users.isLast(index)
                                            ? 'border-b'
                                            : ''
                                    }`}
                                >
                                    <Cell>{userStats.user.fullName}</Cell>
                                    <Cell>{userStats.resolvedTickets}</Cell>
                                    <Cell>{userStats.attentionTime}</Cell>
                                    <Cell>{userStats.performanceScore}</Cell>
                                </tr>
                            );
                        })
                    ) : (
                        <TableEmpty />
                    )}
                </tbody>
            </TableContainer>
        </>
    );
}

export default PerformanceStats;
