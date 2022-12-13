type StatsItemProps = {
    label: string;
    value: string;
    measurement?: string;
};

function StatsItem({
    label,
    value,
    measurement,
}: StatsItemProps) {
    return (
        <div className="flex flex-col items-center w-full px-8 py-4 border border-gray-300 rounded-2xl">
            <span className="text-blue-400 font-medium text-center">{label}</span>
            <div className="flex items-baseline gap-1">
                <span className="text-gray-600 text-4xl font-bold">{value}</span>
                {measurement && <span className="text-gray-400 text-2xl font-bold">{measurement}</span>}
            </div>
        </div>
    );
}

export default StatsItem;