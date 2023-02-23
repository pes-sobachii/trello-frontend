import {useMutation, useQueryClient} from "react-query";
import {BoardService} from '../services/lists.service'

export const useListDelete = () => {

    const queryClient = useQueryClient();
    const {deleteList} = BoardService

    const {isLoading, data, mutateAsync} = useMutation(
        ["delete list"],
        async (id) => await deleteList(id),
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["lists"]);
                await queryClient.refetchQueries("lists");
            },
            onError: (err) => {
                alert(err)
            }
        }
    );

    return {isLoading, data, mutateAsync}
}