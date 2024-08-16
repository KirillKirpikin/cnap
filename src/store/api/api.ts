import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOffline } from "../../types/offline.types";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
    tagTypes:['Offline', 'OfflineServ' ,'Online', 'Contacts', 'News', 'Service', 'Question', 'Chat'],
    endpoints:(builder)=>({
        getAllOffline: builder.query<IOffline[], null>({
            query: () => 'offline',
            providesTags:(result) => 
            result
            ?   [
                ...result.map(offline=> ({type: 'Offline' as const, id: offline._id})),
                {type: 'Offline', id: 'LIST-OFFLINE'},
                {type: 'Offline', id: 'PARTIAL-OFFLINE'},
            ]
        :   [
                {type: 'Offline', id: 'LIST-OFFLINE'},
                {type: 'Offline', id: 'PARTIAL-OFFLINE'},
            ],
        }),
        getOneOffline: builder.query<IOffline, string>({
            query: (id)=> {
                return `/offline/${id}`
            },
            providesTags:(_result, _error, id) => [{type: 'Offline', id}]
        }),
        createOffline: builder.mutation({
            query: offline=>({
                body: offline,
                url: '/offline',
                method: 'POST',
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags:[{type: 'Offline', id: 'LIST-OFFLINE'}]
        }),
        updateOffline: builder.mutation({
            query:({id, formData}) => ({
                url: `/offline/${id}`,
                method: 'PUT',
                body: formData,
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags: (_result, _error, arg) => [{type: 'Offline', id: arg._id}]
        }),
        deleteOffline: builder.mutation({
            query:(id)=>({
                url: `/offline/${id}`,
                method: 'DELETE',
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags:[{type: 'Offline', id: 'PARTIAL-OFFLINE'}]
        })
    })
});

export type Api = typeof api;

export const { 
    useGetAllOfflineQuery,
    useGetOneOfflineQuery,
    useCreateOfflineMutation,
    useDeleteOfflineMutation,
    useUpdateOfflineMutation  
} = api;

