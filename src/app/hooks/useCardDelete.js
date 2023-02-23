import {useMutation, useQueryClient} from "react-query";
import {BoardService} from '../services/lists.service'

export const useCardDelete = () => {

    const queryClient = useQueryClient();
    const {deleteCard} = BoardService

    const {isLoading, data, mutateAsync} = useMutation(
        ["delete card"],
        async (id) => await deleteCard(id),
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