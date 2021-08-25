import React from 'react';
import { useReducer } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { API } from '../helpers/constants';

export const commentContext = React.createContext()

const INIT_POSITION = {
    comment: [],
}

const reducer = (state = INIT_POSITION, action) => {
    switch (action.type) {
        case "GET_COMMENT":
            return {
                ...state,
                comment: action.payload,
            }
        default: return state
    }
}

const CommentsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_POSITION)
    const history = useHistory()

    const addComments = async (newComment) => {
        try {
            let res = await axios.post(`${API}/comments`, newComment)
            getComments()
            return res
        } catch (error) {
            console.log(error.response);
            return error
        }
    }

    const getComments = async () => {
        let { data } = await axios(`${API}/comments`)
        dispatch({
            type: "GET_COMMENT",
            payload: data
        })
    }
    const deleteComments = async (id, history) => {
        await axios.delete(`${API}/comments/${id}`)
        getComments(history)
    }

    return (
        <commentContext.Provider value={{
            comment: state.comment,
            addComments,
            getComments,
            deleteComments,
        }}>
            {children}

        </commentContext.Provider>
    );
};

export default CommentsProvider;