import { useMutation } from "@tanstack/react-query";
import { refresh } from "services/authentication";
import { RefreshRequest, RefreshResponse } from "types";

interface RefreshSessionProps {
    onSuccess: (data: RefreshResponse) => void;
    onError: () => void;
}

export const useSessionRefresh = ({
    onSuccess,
    onError,
}: RefreshSessionProps) => {
    const { mutate: handleRefresh } = useMutation(
        async (refreshToken: string) => {
            const request: RefreshRequest = {
                refreshToken: refreshToken,
            };
            return await refresh(request);
        },
        {
            onSuccess: (data) => {
                onSuccess(data);
            },
            onError: (e) => {
                console.error(e);
                onError();
            },
        },
    );

    return {
        handleRefresh,
    };
}