import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type HttpProviderProps = {
    children: React.ReactNode;
};

export const HttpProvider = ({ children }: HttpProviderProps) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 2,
            },
            mutations: {
                retry: 1,
            }
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}