import TableLoader from './TableLoader';

type TableBodyProps = {
    /** Table rows */
    children?: React.ReactNode;
    /** Whether the table is loading */
    loading?: boolean;
};

function TableBody({ children, loading = false }: TableBodyProps) {
    return <tbody>{loading ? <TableLoader /> : children}</tbody>;
}

export default TableBody;
