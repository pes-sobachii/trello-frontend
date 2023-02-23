import {useMutation, useQueryClient} from "react-query";
import {BoardService} from '../services/lists.service'

export const useEmptyList = () => {

    const queryClient = useQueryClient();
    const {emptyList} = BoardService

    const {isLoading, data, mutateAsync} = useMutation(
        'empty list',
        async (id) => {
            await emptyList(id)
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["lists"]);
                await queryClient.refetchQueries("lists");
            },
        }
    );

    return {isLoading, data, mutateAsync}
}