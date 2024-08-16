import { IOfflineServ } from "../../types/offline-serv.types";
import { api } from "./api";

export const offlineServApi = api.injectEndpoints({
    endpoints:(builder)=>({
        getAllOfflineServ: builder.query<IOfflineServ[], {id: string, searchTerm?:string}>({
            query: (params) => ({
                url: `offline-serv/offline/${params.id}`,
                params: {searchTerm: params.searchTerm}
            }),
            providesTags:(result) => 
            result
            ?   [
                ...result.map(offline=> ({type: 'OfflineServ' as const, id: offline._id})),
                {type: 'OfflineServ', id: 'LIST-OFFLINESERV'},
                {type: 'OfflineServ', id: 'PARTIAL-OFFLINESERV'},
            ]
        :   [
                {type: 'OfflineServ', id: 'LIST-OFFLINESERV'},
                {type: 'OfflineServ', id: 'PARTIAL-OFFLINESERV'},
            ],
        }),
        getOneOfflineServ: builder.query({
            query: (id) => `/offline-serv/${id}`,
            providesTags:(_result, _error, id) => [{type: 'OfflineServ', id}]
        }),
        createOfflineServ: builder.mutation({
            query: offline=>({
                body: offline,
                url: '/offline-serv',
                method: 'POST',
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags:[{type: 'OfflineServ', id: 'LIST-OFFLINESERV'}]
        }),
        updateOfflineServ: builder.mutation({
            query:({id, formData}) => ({
                url: `/offline-serv/${id}`,
                method: 'PUT',
                body: formData,
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags: (_result, _error, arg) => [{type: 'OfflineServ', id: arg._id}]
        }),
        deleteOfflineServ: builder.mutation({
            query:(id)=>({
                url: `/offline-serv/${id}`,
                method: 'DELETE',
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags:[{type: 'OfflineServ', id: 'PARTIAL-OFFLINESERV'}]
        })
    })
})

export const {
    useCreateOfflineServMutation,
    useGetOneOfflineServQuery,
    useGetAllOfflineServQuery,
    useUpdateOfflineServMutation,
    useDeleteOfflineServMutation
} = offlineServApi;