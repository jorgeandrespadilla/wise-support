type NavToggleProps = {
    children: React.ReactNode;
    onClick: () => void;
};

function NavToggle({ children, onClick = () => {} }: NavToggleProps) {
    return (
        <button
            className="flex flex-row items-center space-x-2 cursor-pointer text-gray-600 hover:text-gray-800 dark:text-slate-300 dark:hover:text-slate-100"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default NavToggle;
