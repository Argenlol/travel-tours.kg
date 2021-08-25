import { Button, IconButton, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { commentContext } from './CommentContexts';

const useStyles = makeStyles((theme) => ({
    comment: {
        width: 200,
        marginBottom: 10,
        justifyContent: 'center',
       
    },
    users: {
        color: 'red',
    }
}))

const Comments = (props) => {
    const [currentUser, setCurrentUser] = useState()
    const { addComments } = useContext(commentContext);

    useEffect(() => {
        const getUser = () => {
            const user = localStorage.getItem('email')
            if (user) setCurrentUser(user)
        }
        getUser()

    }, [])
    // let history = useHistory()
    const [value, setValue] = useState({
        name: '',
        desc: ''
    })
    const classes = useStyles()

    const handleInp = (e) => {
        let obj = {
            ...value,
            name: currentUser || 'guest',
            [e.target.name]: e.target.value
        }
        setValue(obj)
    }

    const handleSave = () => {
        if (!value.name) {
            value.name = ""
        }
        // console.log(value);
        addComments(value)
    }

    return (
        <div className={classes.comment} >
            <TextField name="desc" onChange={handleInp} value={value.desc} variant='outlined' style={{ backgroundColor: 'gray'}} />
            <IconButton aria-label="share" onClick={handleSave}>
                <Button variant="contained" color="#2c6335" className='btnAdd' style={{ backgroundColor: 'gray',color:'white' }} >Add Comments</Button>
            </IconButton>
        </div>
    );
};

export default Comments;