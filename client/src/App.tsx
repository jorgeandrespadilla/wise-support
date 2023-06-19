import './App.css';
import Router from './routes';
import { Toaster } from 'react-hot-toast';
import { useTheme } from 'hooks';
import LoginButton from 'components/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from 'components/LogoutButton';

function App() {
    // const { isAuthenticated, refreshSession } = useAuth();
    const { isDarkTheme } = useTheme();

    const { user, isAuthenticated, isLoading } = useAuth0();

    // Refresh session on first load
    // useEffect(() => {
    //     if (firstLoad) {
    //         refreshSession();
    //         firstLoad = false;
    //     }
    // }, [isAuthenticated, refreshSession]);

    return (
        <>
            {isLoading && <h1>Loading...</h1>}
            {true && <LogoutButton></LogoutButton>}
            {true && <LoginButton></LoginButton>}
            {isAuthenticated && !isLoading && <pre>{JSON.stringify(user)}</pre>}
            <Router />
            <Toaster
                position="top-center"
                toastOptions={{
                    className: 'font-sans text-sm',
                    style: {
                        background: isDarkTheme ? '#232323' : '#363636',
                        color: '#fff',
                    },
                    duration: 3000,
                }}
            />
        </>
    );
}

export default App;
