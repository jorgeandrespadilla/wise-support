import { NavLink } from "react-router-dom";
import { useTheme } from "hooks";
import logoLight from 'assets/logo-light.svg';
import logoDark from 'assets/logo-dark.svg';

type HomeLinkProps = {
    appTitle: string;
    onClick?: () => void;
};

function HomeLink({
    appTitle,
    onClick = () => { },
}: HomeLinkProps) {
    const { isDarkTheme } = useTheme();

    return (
        <NavLink to="/" onClick={onClick}>
            {
                isDarkTheme
                    ? <img src={logoDark} alt={appTitle} title={appTitle} className="h-10" />
                    : <img src={logoLight} alt={appTitle} title={appTitle} className="h-10" />
            }
        </NavLink>
    );
}

export default HomeLink;