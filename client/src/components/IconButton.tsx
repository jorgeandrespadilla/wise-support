import { Link } from "react-router-dom";

type IconButtonProps = {
    as?: "button" | "link";
    type?: "normal" | "minimal";
    size?: "sm" | "md" | "lg";
    /**
     * Only used when as="button"
     */
    onClick?: () => void;
    /**
     * Only used when as="link"
     */
    navigateTo?: string;
    icon: React.ReactNode;
}

const buttonType = {
    normal: "bg-gray-100 hover:bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary focus:ring-opacity-50",
    minimal: "bg-transparent hover:opacity-80 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
}

const buttonSize = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
}

function IconButton({
    as = "button",
    type = "normal",
    size = "md",
    onClick = () => { },
    navigateTo,
    icon,
}: IconButtonProps) {

    return (
        as === "link"
            ? <Link
                to={navigateTo}
                className={`flex justify-center items-center ${buttonType[type]} ${buttonSize[size]}`}>
                {icon}
            </Link>
            : <button
                type="button"
                className={`flex justify-center items-center ${buttonType[type]} ${buttonSize[size]}`}
                onClick={onClick}>
                {icon}
            </button>
    );
}

export default IconButton;