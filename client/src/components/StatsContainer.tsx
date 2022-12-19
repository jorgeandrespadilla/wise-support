type StatsContainerProps = {
    children: React.ReactNode;
};

function StatsContainer({ children }: StatsContainerProps) {
    return (
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 my-4">
            {children}
        </div>
    );
}

export default StatsContainer;
