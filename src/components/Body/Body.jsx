import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Carusel from '../Carusel/Carusel';
import Video2 from '../video/video2.mp4'
import Video1 from '../video/video1.webm'
import { makeStyles } from '@material-ui/styles';
import TourCard from '../Tours/TourCard';
import ToursList from '../Tours/ToursList';
import Footer from './Footer';
import { Grid } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({

    fullScreen: {
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        // padding: '50px, 15px'
    },

    fullScreenVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        marginTop: '-220px',
    },
    fullScreenContent: {
        padding: '50px, 15px',
        backgroundColor: 'rgba(52, 52, 52, 0.4)',

        width: '1450px',
        height: '603px',


        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flex: "1, 1, auto",
        justifyContent: 'center',
        alignItems: 'center ',
        flexDirection: 'column',
        textTransform: 'uppercase',
        marginTop: "-55px",
        marginLeft: '-270px'
        
    },
    
    BodyfullScreenTitle: {
        fontSize: '50px',
        letterSpacing: '17px',
        fontWeight: 700,
        margin: '0px, 0px, 20px, 0px',
        color: 'white'
    },
    fullScreenText: {
        fontSize: '20px',
        marginTop:'19px',
        letterSpacing: '10px',
        color: 'white',
        
    },
    content: {
        backgroundColor: 'brown',
        margin: 0
    },



    aboutContent: {
        display: 'flex',
        // alignItems: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',

        // position: 'relative',
        // display: 'flex',
        // justifyContent: 'space-between'
    },
    rightContent: {
        // marginTop: '-180px',
        // marginLeft: '180px',
        // marginRight: '-100px'

    },
    textAbout: {
        color: 'white',
        fontSize: '20px',
        fontWeight: 700
    },
    titleAbout: {
        color: 'white',
        fontSize: '23px',
        marginBottom: '25px',
        width: '400px',
        paddingBottom: '30px',
        fontWeight: 700
    },
    leftContent: {
        // marginTop: '-110px',
        width: '70vw',
        // marginRight: '100px',
        color: 'white',
        fontSize: '20px',
        textAlign: 'center',
        paddingBottom: '30px',
        lineHeight: 1.5,
        marginTop: '50px'

    },
    topContent: {
        marginTop: "20px",
        borderRadius:100,
        display: 'flex',
        width: '80px',
        height: '80px',
        backgroundSize: 'cover',
        backgroundImage: "url(https://cdn21.img.ria.ru/images/156391/10/1563911070_414:0:2462:2048_1920x0_80_0_0_17fb70b937e976b5eb98813b1c7175f7.jpg)",
        // justifyContent: 'center',
        // left: 0,
        // right: 0,
        // position: 'absolute',
    }
}))




export default function Body() {
    const classes = useStyles()

    return (
        <>
        <Grid>
            <Container maxWidth='md' >
                <div className={classes.fullScreen}>
                    <div className={classes.fullScreenContent}>
                        <div className={classes.BodyfullScreenTitle}>ADVENTURE</div>
                        <div className={classes.fullScreenText}>A little step may be the beginning of a great journey</div>
                    </div>
                </div>

                <video className={classes.fullScreenVideo} autoPlay loop muted
                    style={{
                        width: '110vw',
                        backgroundSize: "cover",
                        height: 800,
                        marginLeft: '-90px'
                    }}
                >
                    <source src={Video2} type="video/mp4" />
                    <source src={Video1} type="video/webm" />
                </video>

                <div className={classes.aboutContent}>
                    <div className={classes.topContent}></div>
                    <div className={classes.leftContent}>
                        Welcome to Kyrgyzstan, a country of majestic mountain landscapes and picturesque valleys, <br /> crystal clear lakes and powerful mountain rivers, snow-white glaciers and emerald green meadows, <br /> which is located in the very heart of Central Asia. This is a unique place where nature has been preserved in its original form, and people have lived through the era of their culture and identity. <br /> Kyrgyzstan is a paradise for travelers who want to discover new horizons, <br /> get acquainted with the natural world and with the unusual culture of the country. Since ancient times, the Kyrgyz people have been known for their warmth and hospitality.<br /> <br />  We invite you to visit Kyrgyzstan,and it will not leave you indifferent ! </div>
                    <div className={classes.rightContent}>
                        <Carusel maxWidth="md" className={classes.content} />
                    </div>
                </div>

                <Container maxWidth="md" style={{
                    paddingTop: '30px'
                }}>
                    <h2 style={{
                        color: 'white',
                        textAlign:"center"
                    }}>
                        Our Tours
                    </h2>
                    <div className={classes.contentOfBody}>
                        <ToursList />


                    </div>
                </Container>

            </Container >

        </Grid>

            <Footer />

    </>


    );
}
