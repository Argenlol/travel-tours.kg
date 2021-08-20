import { IconButton, Typography, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TourContext } from '../Contexts/TourContext';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        margin: '40px auto',
        maxWidth: 1000,
        height: 'auto',
        marginTop: '100px'
    }
}))

const TourDetail = () => {
    const { id } = useParams()
    const { detail, getDetail } = useContext(TourContext)
    const classes = useStyles()

    useEffect(() => {
        getDetail(id)
    }, [id])
    return (
        <Paper elevation={3} className={classes.paper}>
            <Typography variant='h2' style={{ textAlign: 'center' }}>TOUR</Typography>
            {
                detail ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <img style={{ width: '500px' }} src={detail.image} alt="" />
                        </div>
                        <div style={{
                            width: '450px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <Typography variant='h3' gutterBottom>{detail.title}</Typography>
                            <Typography variant='subtitle1' gutterBottom>{detail.type}</Typography>
                            <Typography variant='body1' gutterBottom>{detail.description}</Typography>
                            <Typography variant='h4' gutterBottom>{detail.price} som </Typography>


                        </div>
                    </div>

                ) : (<h1>Loading...</h1>)
            }
            <Link to='/list'>
                <IconButton>
                    Back
                </IconButton>

            </Link>
        </Paper>
    );
};

export default TourDetail;