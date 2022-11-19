type TableContainerProps = {
    children: React.ReactNode;
}

function TableContainer({ children }: TableContainerProps) {
    return (
        <div className="overflow-x-auto rounded-md border border-gray-200">
            <table className="w-full table-auto border-collapse border-spacing-0 p-0 m-0" cellPadding={0} cellSpacing={0}>
                {children}
            </table>
        </div>
    );
}

export default TableContainer;
