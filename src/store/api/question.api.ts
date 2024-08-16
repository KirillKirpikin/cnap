import { IQuestion } from "../../types/question.types";
import { api } from "./api";

export const questionApi = api.injectEndpoints({
    endpoints:(builder)=>({
        getAllQuestion: builder.query<IQuestion[], null>({
            query: () => 'question',
            providesTags:(result) => 
            result
            ?   [
                ...result.map(question=> ({type: 'Question' as const, id: question._id})),
                {type: 'Question', id: 'LIST-QUESTION'},
                {type: 'Question', id: 'PARTIAL-QUESTION'},
            ]
        :   [
                {type: 'Question', id: 'LIST-QUESTION'},
                {type: 'Question', id: 'PARTIAL-QUESTION'},
            ],
        }),
        getOneQuestion: builder.query({
            query: (id) => `/question/${id}`,
            providesTags:(_result, _error, id) => [{type: 'Question', id}]
        }),
        createQuestion: builder.mutation({
            query: online=>({
                body: online,
                url: '/question',
                method: 'POST',
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags:[{type: 'Question', id: 'LIST-QUESTION'}]
        }),
        updateQuestion: builder.mutation({
            query:({id, formData}) => ({
                url: `/question/${id}`,
                method: 'PUT',
                body: formData,
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags: (_result, _error, arg) => [{type: 'Question', id: arg._id}]
        }),
        deleteQuestion: builder.mutation({
            query:(id)=>({
                url: `/question/${id}`,
                method: 'DELETE',
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
            invalidatesTags:[{type: 'Question', id: 'PARTIAL-QUESTION'}]
        })
    })
})

export const {
    useCreateQuestionMutation,
    useDeleteQuestionMutation,
    useGetAllQuestionQuery,
    useGetOneQuestionQuery,
    useUpdateQuestionMutation
} = questionApi;