type CardProps = {
    children: React.ReactNode;
};

function Card({ children }: CardProps) {
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <section className="flex flex-col justify-center bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 md:p-8 w-full">
                {children}
            </section>
        </div>
    );
}

export default Card;
