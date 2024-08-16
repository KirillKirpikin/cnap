import { IContacts } from "../../types/contacts.types";
import { api } from "./api";

export const contactsApi = api.injectEndpoints({
    endpoints:(builder)=>({
        getAllContacts: builder.query<IContacts[], null>({
            query: () => 'contacts',
            providesTags:(result) => 
            result
            ?   [
                ...result.map(online=> ({type: 'Contacts' as const, id: online._id})),
                {type: 'Contacts', id: 'LIST-CONTACTS'},
                {type: 'Contacts', id: 'PARTIAL-CONTACTS'},
            ]
        :   [
                {type: 'Contacts', id: 'LIST-CONTACTS'},
                {type: 'Contacts', id: 'PARTIAL-CONTACTS'},
            ],
        }),
        getOneContacts: builder.query({
            query: (id) =>{ 
                return `/contacts/${id}`
            },
            providesTags:(_result, _error, id) => [{type: 'Contacts', id}]
        }),
        createContacts: builder.mutation({
            query: online=>({
                body: online,
                url: '/contacts',
                method: 'POST',
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags:[{type: 'Contacts', id: 'LIST-CONTACTS'}]
        }),
        updateContacts: builder.mutation({
            query:({id, formData}) => ({
                url: `/contacts/${id}`,
                method: 'PUT',
                body: formData,
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags: (_result, _error, arg) => [{type: 'Contacts', id: arg._id}]
        }),
        deleteContacts: builder.mutation({
            query:(id)=>({
                url: `/contacts/${id}`,
                method: 'DELETE',
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags:[{type: 'Contacts', id: 'PARTIAL-CONTACTS'}]
        })
    })
})

export const {
    useGetAllContactsQuery,
    useGetOneContactsQuery,
    useCreateContactsMutation,
    useDeleteContactsMutation,
    useUpdateContactsMutation
} = contactsApi;