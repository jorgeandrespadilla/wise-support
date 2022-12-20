type SpacingSize = "sm" | "md" | "lg" | "xl" | "none";

type DividerProps = {
    horizontal?: SpacingSize;
    vertical?: SpacingSize;
    showRule?: boolean;
}

const horizontalSpacing = {
    sm: "mx-2",
    md: "mx-4",
    lg: "mx-6",
    xl: "mx-8",
    none: "mx-0",
}

const verticalSpacing = {
    sm: "my-2 mb-4",
    md: "my-4 mb-6",
    lg: "my-6 mb-8",
    xl: "my-8 mb-10",
    none: "my-0 mb-0",
}

function Divider({
    horizontal = "none",
    vertical = "none",
    showRule = false
}: DividerProps) {
    return (
        showRule
            ? <hr className={`border-gray-200 dark:border-gray-700 ${horizontalSpacing[horizontal]} ${verticalSpacing[vertical]}`} />
            : <div className={`w-full ${horizontalSpacing[horizontal]} ${verticalSpacing[vertical]}`} />
    );
}

export default Divider;