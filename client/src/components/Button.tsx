type ButtonProps = {
    type?: "primary" | "secondary" | "text" | "danger";
    size?: "sm" | "md" | "lg";
    rounded?: "none" | "md" | "lg" | "full";
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
};

export const buttonType = {
    primary: "bg-primary hover:bg-opacity-80 text-white border-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-opacity-50 disabled:opacity-50 disabled:hover:bg-opacity-100",
    secondary: "bg-white hover:bg-gray-200 text-primary border border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-opacity-50 disabled:opacity-50 disabled:hover:bg-white",
    text: "bg-transparent hover:bg-gray-100 text-primary underline border-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-opacity-50 disabled:opacity-50 disabled:hover:bg-transparent",
    danger: "bg-danger hover:bg-opacity-80 text-white border-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:ring-opacity-50 disabled:opacity-50 disabled:hover:bg-opacity-100",
};

export const buttonSize = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2 text-base',    
    lg: 'px-8 py-3 text-md',
};

export const borderRadius = {
    none: 'rounded-none',
    md: 'rounded-md',
    lg: 'rounded-xl',
    full: 'rounded-full'
};

function Button({
    type = "primary",
    size = "md",
    rounded = "md",
    disabled = false,
    children,
    onClick = () => { }
}: ButtonProps) {
    return (
        <button disabled={disabled} onClick={onClick} className={`${buttonType[type]} ${buttonSize[size]} text-center font-bold rounded ${borderRadius[rounded]}`}>
            {children}
        </button>
    )
}

export default Button;