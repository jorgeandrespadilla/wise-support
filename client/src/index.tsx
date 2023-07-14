import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'context/AuthProvider';
import { HttpProvider } from 'context/HttpProvider';
import { ThemeProvider } from 'context/ThemeProvider';
import App from './App';
import 'shared/extensions'; // Load extension methods
import './index.css';
import { Auth0ProviderWithNavigate } from 'context/Auth0ProviderWithNavigate';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <HttpProvider>
                <Auth0ProviderWithNavigate>
                    <AuthProvider>
                        <ThemeProvider defaultTheme="system">
                            <App />
                        </ThemeProvider>
                    </AuthProvider>
                </Auth0ProviderWithNavigate>
            </HttpProvider>
        </BrowserRouter>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
