import { useState } from 'react';
import toast from 'react-hot-toast';

type Status = 'loading' | 'success' | 'error' | 'idle';

interface UseLoadingOptions {
    /**
     * The message to display when the status is loading.
     * If not provided, the default message will be used.
     */
    loading?: string;
    /**
     * The message to display when the status is success.
     * If not provided, the success message will not be displayed.
     */
    success?: string;
    /**
     * The message to display when the status is error.
     * If not provided, the error message will not be displayed.
     */
    error?: string;
}

// https://theodorusclarence.com/blog/react-loading-state-pattern
export const useLoadingToast = (toastId: string, {
    loading = "Cargando...",
    success,
    error,
}: UseLoadingOptions) => {
    const [status, setStatus] = useState<Status>('idle');

    const startLoading = () => {
        setStatus('loading');
        toast.loading(loading, {
            duration: 0,
            id: toastId
        });
    }

    const markAsSuccess = () => {
        console.log('markAsSuccess');
        setStatus('success');
        if (success) {
            toast.success(success, { id: toastId });
        }
        else {
            toast.dismiss(toastId);
        }
    }

    const markAsError = () => {
        setStatus('error');
        if (error) {
            toast.error(error, { id: toastId });
        }
        else {
            toast.dismiss(toastId);
        }
    }

    return {
        toastId,
        status,
        loading: startLoading,
        success: markAsSuccess,
        error: markAsError,
    };
}