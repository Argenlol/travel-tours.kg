import { IconButton, TextField, Paper, Typography, Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { TourContext } from '../Contexts/TourContext';


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        margin: '40px auto',
        maxWidth: 1000,
        height: 'auto'
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '40ch',
        }
    }
}))

const Edit = () => {
    let { id } = useParams()
    let history = useHistory()
    let classes = useStyles()

    const { edit, editTour, saveEditTour } = useContext(TourContext)
    const [values, setValues] = useState(null)

    useEffect(() => {
        editTour(id)
    }, [id])

    useEffect(() => {
        setValues(edit)
    }, [edit])

    console.log(edit, "edit")

    const handleEditInp = (e) => {
        let obj = {
            ...values,
            [e.target.name]: e.target.value
        }
        setValues(obj)
    }

    const handleSave = () => {
        history.push('/list')
        saveEditTour(values)
    }
    console.log(values, "values")
    return (
        <Paper elevation={3} className={classes.paper}>
            <Typography variant='h2' style={{ textAlign: 'center' }}>Change Tour</Typography>
            {
                values ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'black' }}>
                        <div>
                            <img style={{ width: '500px' }} src={values.image} alt="editedImage" />
                        </div>
                        <div style={{
                            width: '450px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField name='title' onChange={handleEditInp} value={values.title} variant="outlined"></TextField>
                                <TextField name='image' onChange={handleEditInp} value={values.image} variant="outlined"></TextField>
                                <TextField name='type' onChange={handleEditInp} value={values.type} variant="outlined"></TextField>
                                <TextField name='price' onChange={handleEditInp} value={values.price} variant="outlined"></TextField>
                                <TextField name='description' onChange={handleEditInp}
                                    value={values.description}
                                ></TextField>

                            </form>
                            <IconButton onClick={handleSave}>
                                <Button variant="contained">Save</Button>
                            </IconButton>
                          

                        </div>
                    </div>


                ) : (<h1>Loading...</h1>)
            }
        </Paper >
    );
};

export default Edit;
