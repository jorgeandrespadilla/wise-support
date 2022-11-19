import Divider from "components/Divider";
import { LinkConfig } from "types";
import Tab from "./Tab";

type TabBarProps = {
    tabs: LinkConfig[];
}

function TabBar({ tabs }: TabBarProps) {
    return (
        <div className="my-6 mb-8 w-full">
            <div className="flex flex-row justify-start w-full">
                {tabs.map((tab, index) => (
                    <Tab to={tab.to} label={tab.label} key={index} />
                ))}
            </div>
            <Divider showRule />
        </div>
    );
}

export default TabBar;
