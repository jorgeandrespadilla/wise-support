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
    /**
     * Title attribute (used for accessibility and tooltips)
     */
    title: string;
    icon: React.ReactNode;
}

const buttonType = {
    normal: "bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-blue-100 dark:hover:bg-opacity-10 dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary focus:ring-opacity-50",
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
    title,
    icon,
}: IconButtonProps) {

    return (
        as === "link"
            ? <Link
                to={navigateTo}
                title={title}
                className={`flex justify-center items-center ${buttonType[type]} ${buttonSize[size]}`}>
                {icon}
            </Link>
            : <button
                type="button"
                title={title}
                className={`flex justify-center items-center ${buttonType[type]} ${buttonSize[size]}`}
                onClick={onClick}>
                {icon}
            </button>
    );
}

export default IconButton;