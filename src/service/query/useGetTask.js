import { useQuery } from "@tanstack/react-query"
import { request } from "../../config/request"

export default function useGetTask(page = 1, limit = 2) {
    return useQuery({
        queryKey: ["all_task", page],
        queryFn: async () => {
            const res = await request
                .get(`/todos?`, {
                    params: {
                        _limit: limit,
                        _page: page,
                    }
                })


            let totalCount = await res.headers.get("X-Total-count")
            if (Number(totalCount) % limit !== 0) {
                totalCount = parseInt(totalCount / limit) + 1
            } else {
                totalCount = parseInt(totalCount / limit)
            }



            return { taskData: res.data, totalCount }

        }
    })
}
