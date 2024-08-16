import { IOnline } from "../../types/online.types";
import { api } from "./api";

export const onlineApi = api.injectEndpoints({
    endpoints:(builder)=>({
        getAllOnline: builder.query<IOnline[], null>({
            query: () => 'online',
            providesTags:(result) => 
            result
            ?   [
                ...result.map(online=> ({type: 'Online' as const, id: online._id})),
                {type: 'Online', id: 'LIST-ONLINE'},
                {type: 'Online', id: 'PARTIAL-ONLINE'},
            ]
        :   [
                {type: 'Online', id: 'LIST-ONLINE'},
                {type: 'Online', id: 'PARTIAL-ONLINE'},
            ],
        }),
        getOneOnline: builder.query({
            query: (id) => `/online/${id}`,
            providesTags:(_result, _error, id) => [{type: 'Online', id}]
        }),
        createOnline: builder.mutation({
            query: online=>({
                body: online,
                url: '/online',
                method: 'POST',
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags:[{type: 'Online', id: 'LIST-ONLINE'}]
        }),
        updateOnline: builder.mutation({
            query:({id, formData}) => ({
                url: `/online/${id}`,
                method: 'PUT',
                body: formData,
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags: (_result, _error, arg) => [{type: 'Online', id: arg._id}]
        }),
        deleteOnline: builder.mutation({
            query:(id)=>({
                url: `/online/${id}`,
                method: 'DELETE',
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags:[{type: 'Online', id: 'PARTIAL-ONLINE'}]
        })
    })
})

export const {
    useGetAllOnlineQuery,
    useGetOneOnlineQuery,
    useCreateOnlineMutation,
    useDeleteOnlineMutation,
    useUpdateOnlineMutation
} = onlineApi;