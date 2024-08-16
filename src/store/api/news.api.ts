import { INews } from "../../types/news.types";
import { api } from "./api";

export const newsApi = api.injectEndpoints({
    endpoints:(builder)=>({
        getAllNews: builder.query<INews[], null>({
            query: () => 'news',
            providesTags:(result) => 
            result
            ?   [
                ...result.map(news=> ({type: 'News' as const, id: news._id})),
                {type: 'News', id: 'LIST-NEWS'},
                {type: 'News', id: 'PARTIAL-NEWS'},
            ]
        :   [
                {type: 'News', id: 'LIST-NEWS'},
                {type: 'News', id: 'PARTIAL-NEWS'},
            ],
        }),
        getOneNews: builder.query<INews, string>({
            query: (id) => {
                return `/news/${id}`
            },
            providesTags:(_result, _error, id) => [{type: 'News', id}]
        }),
        createNews: builder.mutation({
            query: online=>({
                body: online,
                url: '/news',
                method: 'POST',
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags:[{type: 'News', id: 'LIST-NEWS'}]
        }),
        updateNews: builder.mutation({
            query:({id, formData}) => ({
                url: `/news/${id}`,
                method: 'PUT',
                body: formData,
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags: (_result, _error, arg) => [{type: 'News', id: arg._id}]
        }),
        deleteNews: builder.mutation({
            query:(id)=>({
                url: `/news/${id}`,
                method: 'DELETE',
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags:[{type: 'News', id: 'PARTIAL-NEWS'}]
        })
    })
})

export const {
    useCreateNewsMutation,
    useDeleteNewsMutation,
    useGetAllNewsQuery,
    useGetOneNewsQuery,
    useUpdateNewsMutation
} = newsApi;