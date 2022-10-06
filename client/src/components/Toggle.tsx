import { Switch } from '@headlessui/react';

type ToggleProps = {
    label: string;
    checked: boolean;
    onChange?: (value: boolean) => void;
};

function Toggle({
    label,
    checked,
    onChange = () => {},
}: ToggleProps) {
  return (
    <div className='flex align-baseline'>
      <Switch
        checked={checked}
        onChange={onChange}
        className={`${checked ? 'bg-primary' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full border border-gray-400`}
      >
        <span
          className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      {
        label && (
          <label className="text-sm mt-0.5 ml-2 font-medium text-gray-700">
            {label}
          </label>
        )
      }
    </div>
  );
}

export default Toggle;