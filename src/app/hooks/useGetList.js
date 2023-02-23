import {useQuery} from "react-query";
import {BoardService} from '../services/lists.service'

export const useGetList = (setListsState) => {

    const {getLists} = BoardService

    const {isLoading} = useQuery(
        ["lists"],
        getLists,
        {
            onSuccess: ({data}) => {
                setListsState(data)
            },
            onError: (err) => {
                alert(err.message)
            },
            staleTime: 3000
        }
    );



    return {isLoading}
}

