import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { RadioGroupOption, Theme } from 'types/ui';

type ThemeOptionProps = {
    option: RadioGroupOption<Theme>;
    checked: boolean;
};

function ThemeOption({ option, checked }: ThemeOptionProps) {
    return (
        <div
            className={`flex flex-col items-center md:items-start ${
                checked ? 'text-primary' : ''
            }`}
        >
            <div
                className={`relative rounded-lg overflow-hidden border-2 ${
                    checked ? 'border-blue-500' : 'border-transparent'
                }`}
            >
                {checked && (
                    <CheckCircleIcon className="absolute w-6 h-6 text-blue-500" />
                )}
                <img
                    src={option.image}
                    alt={option.label}
                    className="w-full h-full object-cover"
                />
            </div>
            <span className="pt-2">{option.label}</span>
        </div>
    );
}

export default ThemeOption;
