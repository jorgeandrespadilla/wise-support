export type CellProps = {
    colSpan?: number;
    align?: 'start' | 'center' | 'end';
    disabled?: boolean;
    children: React.ReactNode;
};
