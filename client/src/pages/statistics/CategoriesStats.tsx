import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Button from 'components/Button';
import {
    Cell,
    HeaderCell,
    TableBody,
    TableContainer,
    TableEmpty,
} from 'components/Table';
import { DatePicker } from 'components/Form';
import StatsItem from 'components/StatsItem';
import StatsContainer from 'components/StatsContainer';
import Divider from 'components/Divider';
import { normalizeTimezone, today } from 'utils/dateHelpers';
import { handleAPIError } from 'utils/validation';
import toast from 'utils/toast';
import { getCategoriesStats } from 'services/statistics';
import { breakpoints } from 'shared/constants/themes';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { GetCategoriesStatsRequest, GetCategoriesStatsResponse } from 'types';

type FormData = {
    startDate: string;
    endDate: string;
};

const initialData: GetCategoriesStatsResponse = {
    categories: [],
    totalCategories: 0,
};

function CategoriesStats() {
    const isDesktop = useMediaQuery(breakpoints.up('md'));

    const { control, reset, handleSubmit, ...form } = useForm<FormData>({
        defaultValues: {
            startDate: today('iso'),
            endDate: today('iso'),
        },
    });

    const categoriesStats = useQuery(
        ['categoriesStats'],
        async () => {
            const query = form.getValues();

            const request: GetCategoriesStatsRequest = {
                startDate: normalizeTimezone(query.startDate),
                endDate: normalizeTimezone(query.endDate),
            };
            const data = await getCategoriesStats(request);
            if (data.categories.isEmpty()) {
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

    const stats = categoriesStats.data ?? initialData;

    return (
        <>
            <form onSubmit={handleSubmit(() => categoriesStats.refetch())}>
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
                    width="third"
                    label="Total de categorías"
                    value={stats.totalCategories.toString()}
                />
            </StatsContainer>
            <TableContainer>
                <thead>
                    <tr className="border-0 border-b-2 text-left">
                        <HeaderCell>Nombre</HeaderCell>
                        <HeaderCell>Descripción</HeaderCell>
                        <HeaderCell>Tickets</HeaderCell>
                    </tr>
                </thead>
                <TableBody loading={categoriesStats.isFetching}>
                    {!stats.categories.isEmpty() ? (
                        stats.categories.map((categoryStats, index) => {
                            return (
                                <tr
                                    key={categoryStats.category.id}
                                    className={`table-row ${
                                        !stats.categories.isLast(index)
                                            ? 'border-b'
                                            : ''
                                    }`}
                                >
                                    <Cell>{categoryStats.category.name}</Cell>
                                    <Cell
                                        disabled={
                                            !categoryStats.category.description
                                        }
                                    >
                                        {categoryStats.category.description ??
                                            'No disponible'}
                                    </Cell>
                                    <Cell>{categoryStats.totalTickets}</Cell>
                                </tr>
                            );
                        })
                    ) : (
                        <TableEmpty />
                    )}
                </TableBody>
            </TableContainer>
        </>
    );
}

export default CategoriesStats;
