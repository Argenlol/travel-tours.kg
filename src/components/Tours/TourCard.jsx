import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { useContext } from 'react';
import { TourContext } from '../Contexts/TourContext';
import { Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { authContext } from '../Contexts/AuthContextProvider';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
        marginTop: 20,
        width: '400px',
        height: '600px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        width: '400px',


    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function TourCard({ item }) {
    const classes = useStyles();
    const { email } = useContext(authContext)

    const admin = 'shabdanov@gmail.com'

    const { getTours, deleteTour, addTourInCart, checkTourInCart } = useContext(TourContext)
    const [isAdmin, setIsAdmin] = useState(false)

    let history = useHistory()

    useEffect(() => {
        let user = localStorage.getItem('user')
        if (user) {
            if (user === admin) {
                setIsAdmin(true)
            }
        }
    }, [])


    return (
        <Card className={classes.root}>
            <Link to={`/detail/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <CardHeader
                    title={item.title}
                    subheader={item.type}
                />
                <CardMedia
                    className={classes.media}
                    image={item.image}

                    title="Beautiful"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {item.description.substring(0, 250)}
                    </Typography>
                </CardContent>
            </Link>

            <Typography variant="body2" color="textSecondary">
                {item.price}
            </Typography>
            <CardContent>
                <IconButton
                    aria-label='share'
                    onClick={() => addTourInCart(item)}>
                    <ShoppingCartIcon />
                </IconButton>
                {
                    isAdmin ? (<>

                        <Link to={`/edit/${item.id}`}>
                            <IconButton>
                                <Button>Change</Button>
                            </IconButton>
                        </Link>
                        <IconButton onClick={() => deleteTour(item.id, history)}>
                            <DeleteIcon />
                        </IconButton>
                    </>

                    ) : (null)
                }

            </CardContent>



        </Card >
    );
}
