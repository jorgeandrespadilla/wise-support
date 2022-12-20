import { NavLink } from 'react-router-dom';
import { useTheme } from 'hooks';
import { logo } from 'assets';

type HomeLinkProps = {
    appTitle: string;
    onClick?: () => void;
};

function HomeLink({ appTitle, onClick = () => {} }: HomeLinkProps) {
    const { isDarkTheme } = useTheme();

    return (
        <NavLink to="/" onClick={onClick}>
            <img
                src={isDarkTheme ? logo.dark : logo.light}
                alt={appTitle}
                title={appTitle}
                className="h-10"
            />
        </NavLink>
    );
}

export default HomeLink;
