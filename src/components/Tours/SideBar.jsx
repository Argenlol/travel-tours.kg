import React, { useContext, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Grid, Paper, makeStyles, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Slider from '@material-ui/core/Slider';
import { TourContext } from '../Contexts/TourContext';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        marginRight: '20px',
        marginBottom: '20px',
        minWidth: '170px',  //TODO0 NEW (from 19.05.2021)
        maxWidth: '350px',  //TODO0 NEW (from 19.05.2021)

        margin: 'auto'
    }
}))

const SideBar = () => {
    const history = useHistory()
    const classes = useStyles()
    const { getTours } = useContext(TourContext)
    const [type, setType] = useState(getType())
    const [price, setPrice] = useState(getPrice())

    function getPrice() {
        const search = new URLSearchParams(history.location.search)
        return search.get('price_lte')
    }

    function getType() {
        const search = new URLSearchParams(history.location.search)
        return search.get('type')
    }

    const handleChangePrice = (event, value) => {
        const search = new URLSearchParams(history.location.search)
        search.set('price_lte', value)
        history.push(`${history.location.pathname}?${search.toString()}`)
        getTours(history)
        setPrice(value)
    }

    const handleChangeType = (event) => {
        if (event.target.value === 'all') {
            history.push(`${history.location.pathname.replace('type')}`)
            getTours(history)
            setType(event.target.value)
            return
        }
        const search = new URLSearchParams(history.location.search)
        search.set('type', event.target.value)
        history.push(`${history.location.pathname}?${search.toString()}`)
        getTours(history)
        setType(event.target.value)
    }
    const handleDrop = () => {
        history.push(`${history.location.pathname.replace('type')}`)
        // history.push(`${history.location.pathname.replace('price_lte')}`)
        getTours(history)
        setType(getType())
        setPrice(getPrice())
    }
    return (

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '50px'

        }}>

            <Grid item md={3} >
                <Paper elevation={2} className={classes.paper}
                >
                    <FormControl component="fieldset"
                    >
                        <FormLabel component="legend">Difficulty level</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={type} onChange={handleChangeType}>
                            <FormControlLabel value="Easy Level" control={<Radio />} label="Easy Level" />
                            <FormControlLabel value="Middle Level" control={<Radio />} label="Middle Level" />
                            <FormControlLabel value="Hard Level" control={<Radio />} label="Hard Level" />
                        </RadioGroup>
                    </FormControl>

                    <Grid >

                        <Button variant="contained" color="secondary" onClick={handleDrop}>Reset</Button>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
};

export default SideBar;