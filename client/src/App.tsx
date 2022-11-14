import './App.css';
import Router from './routes';
import { Toaster } from 'react-hot-toast';

function App() {
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
