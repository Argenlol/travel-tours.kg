import { Button } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { commentContext } from './CommentContexts';

const CommentList = ({ item, history }) => {

    const { comment, getComments, deleteComments } = useContext(commentContext)
    // const {id} = useParams()
    useEffect(() => {
        getComments()
    }, [])
    console.log(comment)

    return (
        <div>
            {
                comment.length > 0 ? (
                    comment.map((item, index) => {
                        return (
                            <div key={index} style={{ justifyContent: 'center', }}>
                                <p style={{ color: 'whitesmoke' }}>{item.name}</p>
                                <p style={{ color: 'whitesmoke' }}>{item.desc}</p>
                                <Button variant="contained" onClick={() => deleteComments(item.id, history)} color="#2c6335" style={{ backgroundColor: 'red', }}>Удалить</Button>
                            </div>
                        )
                    })
                ) : (
                    <h1>Loading...</h1>
                )
            }
        </div>
    );
};

export default CommentList;