import './App.css';
import Router from './routes';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuth } from 'hooks';
import { getStorageUpdate, listenForStorageUpdates } from 'utils/storageHelpers';

let firstLoad = true;

function App() {
  const { isAuthenticated, validateSession, refreshSession } = useAuth();

  // Refresh session on first load
  useEffect(() => {
    if (firstLoad) {
      refreshSession();
      firstLoad = false;
    }
  }, [isAuthenticated, refreshSession]);

  // Synchronize and validate session
  useEffect(() => {
    const onUpdateCompleted = () => {
      validateSession();
    };
    const removeListener = listenForStorageUpdates(onUpdateCompleted);
    getStorageUpdate();
    return () => {
      removeListener();
    };
  }, [validateSession]);

  return (
    <>
      <Router />
      <Toaster position="top-center" toastOptions={{
        className: "font-sans text-sm",
        style: {
          background: '#363636',
          color: '#fff',
        },
        duration: 3000,
      }} />
    </>
  );
}

export default App;
