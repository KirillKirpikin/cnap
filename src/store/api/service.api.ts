import { IService } from "../../types/service.types";
import { api } from "./api";

export const serviceApi = api.injectEndpoints({
    endpoints:(builder)=>({
        getAllService: builder.query<IService[], string>({
            query: (id) => `service/online/${id}`,
            providesTags:(result) => 
            result
            ?   [
                ...result.map(service=> ({type: 'Service' as const, id: service._id})),
                {type: 'Service', id: 'LIST-SERVICE'},
                {type: 'Service', id: 'PARTIAL-SERVICE'},
            ]
        :   [
                {type: 'Service', id: 'LIST-SERVICE'},
                {type: 'Service', id: 'PARTIAL-SERVICE'},
            ],
        }),
        getOneService: builder.query({
            query: (id) => `/service/${id}`,
            providesTags:(_result, _error, id) => [{type: 'Service', id}]
        }),
        createService: builder.mutation({
            query: online=>({
                body: online,
                url: '/service',
                method: 'POST',
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags:[{type: 'Service', id: 'LIST-SERVICE'}]
        }),
        updateService: builder.mutation({
            query:({id, formData}) => ({
                url: `/service/${id}`,
                method: 'PUT',
                body: formData,
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags: (_result, _error, arg) => [{type: 'Service', id: arg._id}]
        }),
        deleteService: builder.mutation({
            query:(id)=>({
                url: `/service/${id}`,
                method: 'DELETE',
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags:[{type: 'Service', id: 'PARTIAL-SERVICE'}]
        })
    })
})

export const {
    useCreateServiceMutation,
    useGetAllServiceQuery,
    useGetOneServiceQuery,
    useDeleteServiceMutation,
    useUpdateServiceMutation,
} = serviceApi;