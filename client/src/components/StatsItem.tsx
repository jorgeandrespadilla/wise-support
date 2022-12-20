import { useMediaQuery } from 'hooks';
import { breakpoints } from 'shared/constants/themes';

const itemWidth = {
    full: 'w-full',
    half: 'w-1/2',
    third: 'w-1/3',
};

type StatsItemProps = {
    label: string;
    value: string;
    measurement?: string;
    width?: 'full' | 'half' | 'third';
};

function StatsItem({
    label,
    value,
    measurement,
    width = 'full',
}: StatsItemProps) {
    const isDesktop = useMediaQuery(breakpoints.up('md'));

    return (
        <div
            className={`flex flex-col items-center px-8 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl ${
                isDesktop ? itemWidth[width] : 'w-full'
            }`}
        >
            <span className="text-blue-400 font-medium text-center font-poppins">
                {label}
            </span>
            <div className="flex items-baseline gap-1">
                <span className="text-gray-500 dark:text-gray-300 text-4xl font-bold">
                    {value}
                </span>
                {measurement && (
                    <span className="text-gray-400 dark:text-gray-400 text-2xl font-bold font-poppins">
                        {measurement}
                    </span>
                )}
            </div>
        </div>
    );
}

export default StatsItem;
