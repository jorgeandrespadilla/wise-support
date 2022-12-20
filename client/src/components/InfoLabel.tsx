type InfoLabelProps = {
    label: string;
    value: string;
};

function InfoLabel({ label, value }: InfoLabelProps) {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {label}
            </label>
            <label className="font-medium text-gray-900 dark:text-white">
                {value}
            </label>
        </div>
    );
}

export default InfoLabel;
