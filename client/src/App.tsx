import './App.css';
import Router from './routes';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuth } from 'hooks';
import { getStorageUpdate, listenForStorageUpdates } from 'utils/storageHelpers';

function App() {
  const { validateToken } = useAuth();

  // Synchronize and validate session
  useEffect(() => {
    const onUpdateCompleted = () => {
      validateToken();
    };
    const removeListener = listenForStorageUpdates(onUpdateCompleted);
    getStorageUpdate();
    return () => {
      removeListener();
    };
  }, [validateToken]);

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
