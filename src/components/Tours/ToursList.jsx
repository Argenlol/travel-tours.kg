import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TourContext } from '../Contexts/TourContext';
import TourCard from './TourCard';

import { Pagination } from '@material-ui/lab';
import { getPage } from '../helpers/function';
import CommentList from '../comments/CommentsLists';
import Comments from '../comments/Commentss';
import AuthContextProvider, { authContext } from '../Contexts/AuthContextProvider';


const useStyles = makeStyles((theme) => ({
    pag: {
        color: 'white',
    }
}))
const ToursList = () => {
    const classes = useStyles()
    const history = useHistory()
    const { email } = useContext(authContext)
    const { tours, getTours, paginatedPages } = useContext(TourContext)
    const [page, setPage] = useState(getPage())
    console.log(tours);
    useEffect(() => {
        getTours(history)
    }, [])

    function getPage(e, page) {
        const search = new URLSearchParams(history.location.search)
        if (!search.get('_page')) {
            return
        }
        return search.get('_page')
    }

    const handlePage = (e, pageVal) => {
        const search = new URLSearchParams(window.location.search)
        search.set('_page', pageVal)
        history.push(`${history.location.pathname}?${search.toString()}`)
        getTours(history)
        setPage(pageVal)
    }

    return (
        <>
            <Grid container spacing={3} justify="space-evenly" style={{ marginTop: '90px' }}>
                {
                    tours ? (
                        tours.map((item, index) => (
                            <TourCard item={item} key={index} />
                        ))
                    ) : (<h1>Please wait...</h1>)
                }
            </Grid>

            <div
                style={{
                    paddingTop: '30px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex'

                }}
            >

                <Pagination className={classes.pag}
                    variant="outlined"
                    count={paginatedPages}
                    color='secondary'
                    onChange={handlePage}
                    page={+page}
                />
            </div>
            
            <CommentList />
            <Comments name={email} />
                
        </>
    );
};

export default ToursList;