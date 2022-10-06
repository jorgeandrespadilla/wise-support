type IconButtonProps = {
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
    icon: React.ReactNode;
}

const buttonSize = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
}

function IconButton({
    size = "md",
    onClick = () => { },
    icon,
}: IconButtonProps) {
    return (
        <button
            className={`flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded-full ${buttonSize[size]}`}
            onClick={onClick}
        >
            {icon}
        </button>
    );
}

export default IconButton;