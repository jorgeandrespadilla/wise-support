import { Transition } from '@headlessui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenuOption } from 'types';

type DropdownMenuProps = {
    /** The element that will be used as the toggle for the menu */
    toggle: React.ReactNode;
    /** Where the menu will be aligned to the toggle */
    menuAlign?: 'left' | 'right';
    /** Each array is a group of options (separated by a divider) */
    optionGroups: DropdownMenuOption[][];
};

function DropdownMenu({
    toggle,
    menuAlign = 'right',
    optionGroups,
}: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }

    const handleKeyEvents = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
        }
        if (event.key === 'Enter' && ref.current && ref.current.contains(document.activeElement)) {
            setIsOpen(!isOpen);
        }
    }

    useEffect(() => {
        // Clicks on the document
        document.addEventListener("mousedown", handleClickOutside);
        // Handles keyboard events
        document.addEventListener("keydown", handleKeyEvents);
        return () => {
            // Remove event listeners
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyEvents);
        };
    });

    const ref = useRef<HTMLButtonElement>(null);

    return (
        <button ref={ref} className="relative">
            <div onClick={() => setIsOpen(!isOpen)}>{toggle}</div>
            <Transition
                show={isOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <ul className={`absolute ${menuAlign}-0 bg-white shadow-md rounded py-1 mt-2 border w-48 border-gray-200 text-gray-600`} >
                    {optionGroups.map((options, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <li className="border-t border-gray-200 my-1"></li>}
                            {options.map((option, index) => (
                                <li key={index} className='px-1'>
                                    <div onClick={() => setIsOpen(false)}>
                                        {option.navigateTo ? (
                                            <Link to={option.navigateTo} className="flex gap-2 items-center text-left rounded px-4 py-2 w-full hover:bg-blue-100 transition-all duration-300 cursor-pointer">
                                                {option.icon && <span>{option.icon}</span>}
                                                {option.label}
                                            </Link>
                                        ) : (
                                            <button onClick={option.action} className="flex gap-2 items-center text-left rounded px-4 py-2 w-full hover:bg-blue-100 transition-all duration-300 cursor-pointer">
                                                {option.icon && <span>{option.icon}</span>}
                                                {option.label}
                                            </button>
                                        )}
                                        
                                    </div>
                                </li>
                            ))}
                        </React.Fragment>
                    ))}
                </ul>
            </Transition>
        </button>
    );
};

export default DropdownMenu;
