import {useMutation, useQueryClient} from "react-query";
import {BoardService} from '../services/lists.service'

export const useCardUpdate = () => {

    const queryClient = useQueryClient();
    const {updateCard} = BoardService

    const {isLoading, data, mutateAsync} = useMutation(
        ["update card"],
        async ({id, destinationId, sourceId}) => await updateCard(id, destinationId, sourceId),
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
