import { useQuery } from "@tanstack/react-query";
import { getCategories } from "services/categories";
import { sortAsc } from "utils/dataHelpers";
import { handleAPIError } from "utils/validation";

export const useCategoriesData = () => {
    const { data, isLoading, error, refetch } = useQuery(['roles'],
        async () => {
            const categories = await getCategories();
            return sortAsc(categories, (category) => category.name);
        },
        {
            onError: (e) => {
                handleAPIError(e);
            },
        }
    );

    return {
        data,
        isLoading,
        error,
        refetch,
    };
}