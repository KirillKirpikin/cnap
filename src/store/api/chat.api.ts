import { IChat } from '../../types/chat.types';
import {api} from './api';

export const chatApi = api.injectEndpoints({
    endpoints:(builder)=>({
        getAllChat: builder.query<IChat[], null>({
            query: () => ({
                url:'chat',
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            
            providesTags:(result) =>
            result
            ?   [
                ...result.map(chat=> ({type: 'Chat' as const, id: chat._id})),
                {type: 'Chat', id: 'LIST-CHAT'},
                {type: 'Chat', id: 'PARTIAL-CHAT'},
            ]
        :   [
                {type: 'Chat', id: 'LIST-CHAT'},
                {type: 'Chat', id: 'PARTIAL-CHAT'},
            ],
        }),
        deleteRoom: builder.mutation({
            query:(id)=>({
                url:`/chat/${id}`,
                method: 'DELETE',
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags:[{type: 'Chat', id: 'PARTIAL-CHAT'}]
        })
    })
})

export const {
    useGetAllChatQuery,
    useDeleteRoomMutation
} = chatApi;