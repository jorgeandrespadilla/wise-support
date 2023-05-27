import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { DropdownMenuConfig } from 'types';

type DropdownMenuProps = {
    /** The element that will be used as the toggle for the menu */
    toggle: React.ReactNode;
    /** Where the menu will be aligned to the toggle */
    menuAlign?: 'left' | 'right';
    /** The configuration for the menu */
    config: DropdownMenuConfig;
};

function DropdownMenu({
    toggle,
    menuAlign = 'right',
    config,
}: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    const handleKeyEvents = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // Clicks on the document
        document.addEventListener('mousedown', handleClickOutside);
        // Handles keyboard events
        document.addEventListener('keydown', handleKeyEvents);
        return () => {
            // Remove event listeners
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyEvents);
        };
    });

    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="relative">
            <button onClick={toggleMenu} className="rounded-full">
                {toggle}
            </button>
            <Transition
                show={isOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <ul
                    className={`absolute ${menuAlign}-0 bg-white dark:bg-slate-800 shadow-md rounded py-1 mt-2 border w-48 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300`}
                >
                    {config.map((section, index) => (
                        <React.Fragment key={section.key}>
                            {index > 0 && (
                                <li className="border-t dark:border-gray-700 border-gray-200 my-1"></li>
                            )}
                            {section.options.map(option => (
                                <li key={option.key} className="px-1">
                                    <div onClick={() => setIsOpen(false)}>
                                        {option.navigateTo ? (
                                            <Link
                                                to={option.navigateTo}
                                                className="flex gap-2 items-center text-left rounded px-4 py-2 w-full hover:bg-blue-100 dark:bg-opacity-10 transition-all duration-300 cursor-pointer"
                                            >
                                                {option.icon && (
                                                    <span>{option.icon}</span>
                                                )}
                                                {option.label}
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={option.action}
                                                className="flex gap-2 items-center text-left rounded px-4 py-2 w-full hover:bg-blue-100 dark:bg-opacity-10 transition-all duration-300 cursor-pointer"
                                            >
                                                {option.icon && (
                                                    <span>{option.icon}</span>
                                                )}
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
        </div>
    );
}

export default DropdownMenu;
