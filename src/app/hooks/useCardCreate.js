import {useMutation, useQueryClient} from "react-query";
import {BoardService} from '../services/lists.service'

const useCardCreate = () => {

    const queryClient = useQueryClient();
    const {setCard} = BoardService

    const {isLoading, data, mutateAsync} = useMutation(
        ["create card"],
        async ({list, title}) => await setCard(list, title),
        {
            onSuccess:
                async () => {
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

export default useCardCreate