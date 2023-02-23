import {useMutation, useQueryClient} from "react-query";
import {BoardService} from '../services/lists.service'

const useCreateList = () => {

    const queryClient = useQueryClient();
    const {addList} = BoardService

    const {isLoading, data, mutateAsync} = useMutation(
        'new list',
        async (title) => {
            await addList(title)
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

export default useCreateList