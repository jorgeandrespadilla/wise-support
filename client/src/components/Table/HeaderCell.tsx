import { CellProps } from './types';

function HeaderCell({ disabled = false, children }: CellProps) {
    return (
        <th
            className={`font-bold font-poppins ${
                disabled
                    ? 'text-gray-500 dark:text-gray-400'
                    : 'text-gray-800 dark:text-white'
            } p-4 border-0`}
        >
            {children}
        </th>
    );
}

export default HeaderCell;
