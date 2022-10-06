type CardProps = {
    children: React.ReactNode;
};

function Card({ children }: CardProps) {
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col justify-center bg-white shadow-md rounded-lg p-8 w-full">
                {children}
            </div>
        </div>
    );
}

export default Card;