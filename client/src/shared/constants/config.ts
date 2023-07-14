export const server = {
    url: process.env.REACT_APP_API_URL || 'http://localhost:4000',
};

export const auth0 = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
};
