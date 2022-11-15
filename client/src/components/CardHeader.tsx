type CardHeaderProps = {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
    /**
     * Navigation links to be displayed in the header.
     */
    children?: React.ReactNode;
}

function CardHeader({
    title,
    subtitle
}: CardHeaderProps) {
    return (
        <header className="w-full">
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-col justify-center items-start w-full">
                    <h1 className={`font-bold font-poppins text-2xl text-gray-800 ${subtitle ? 'pb-1' : ''}`}>{title}</h1>
                    {subtitle && <h2 className="font-poppins text-gray-500">{subtitle}</h2>}
                </div>
            </div>
        </header>
    );
}

export default CardHeader;