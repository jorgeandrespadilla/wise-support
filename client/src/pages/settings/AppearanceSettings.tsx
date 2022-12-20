import { RadioGroup } from '@headlessui/react';
import { themeImage } from 'assets';
import { useTheme } from 'hooks';
import { RadioGroupOption, Theme } from 'types';
import ThemeOption from './components/ThemeOption';

type RadioOptionParams = {
    checked: boolean;
};

const themeOptions: RadioGroupOption<Theme>[] = [
    {
        value: 'system',
        label: 'Predeterminado',
        image: themeImage.system,
    },
    {
        value: 'light',
        label: 'Claro',
        image: themeImage.light,
    },
    {
        value: 'dark',
        label: 'Oscuro',
        image: themeImage.dark,
    },
];

function AppearanceSettings() {
    const { theme, setTheme } = useTheme();

    return (
        <>
            <h2 className="font-poppins text-lg text-gray-800 dark:text-white pb-4">
                Tema
            </h2>
            <RadioGroup
                value={theme}
                onChange={setTheme}
                className="w-full flex flex-col gap-6 md:flex-row md:justify-evenly"
            >
                {themeOptions.map(option => (
                    <RadioGroup.Option key={option.value} value={option.value}>
                        {({ checked }: RadioOptionParams) => (
                            <ThemeOption option={option} checked={checked} />
                        )}
                    </RadioGroup.Option>
                ))}
            </RadioGroup>
        </>
    );
}

export default AppearanceSettings;
