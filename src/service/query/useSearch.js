import { request } from "../../config/request"
import { useQuery } from "@tanstack/react-query"


export const useSearch = (search) => {

    return useQuery({
        queryKey: ['search-data', search],
        queryFn: () => {
            if (search) {
                return request.get('/todos', {
                    params: {
                        title_like: search,

                    },
                }).then((res) => res.data)
            }
            return []
        }
    })
}
