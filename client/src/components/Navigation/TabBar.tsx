import Authorize from 'components/Authorize';
import Divider from 'components/Divider';
import { LinksConfig } from 'types';
import Tab from './Tab';

type TabBarProps = {
    tabs: LinksConfig;
};

function TabBar({ tabs }: TabBarProps) {
    return (
        <div className="my-6 mb-8 overflow-x-auto w-full">
            <div className="flex flex-row justify-start w-full">
                {tabs.map(tab => (
                    <Authorize roles={tab.roles} key={tab.key}>
                        <Tab to={tab.to} label={tab.label} />
                    </Authorize>
                ))}
            </div>
            <Divider showRule />
        </div>
    );
}

export default TabBar;
