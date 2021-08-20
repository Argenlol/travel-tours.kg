import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        label: 'Kol-Tor',
        imgPath:
            'https://triptokyrgyzstan.com/sites/default/files/media/image/kol-tor_lake_c_ahmet_dogan.jpg',
    },
    {
        label: 'Sary-Chelek',
        imgPath:
            'https://sputnik.kg/images/104502/71/1045027149.jpg',
    },
    {
        label: 'Barskoon Waterfall',
        imgPath:
            'https://too.kg/en/wp-content/uploads/Barskoon-2-1024x639.jpg',
    },
    {
        label: 'Ala-Archa Park',
        imgPath:
            'https://sputnik.kg/images/102749/82/1027498253.jpg',
    },
    {
        label: 'Kel-Suu',
        imgPath:
            'https://sputnik.kg/images/07e4/08/1c/1049451212.jpg',
    },
    {
        label: 'Racek Hut',
        imgPath:
            'https://1.bp.blogspot.com/-eP25uNsknXo/Vw92CX9jPwI/AAAAAAAAAD8/QAv6aQ7ZpIIdEM71KXKmerr6qpvIaEgZQCLcB/s1600/SAM_3739.JPG',
    },
    {
        label: 'Komsomolets Peak',
        imgPath:
            'https://sputnik.kg/images/104306/28/1043062899.jpg',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 1120,
        flexGrow: 1,
        width: '100vw'
    },
    header: {
        marginTop: 35,
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        color: 'white',
        textAlign: 'center'
    },
    img: {
        height: 600,
        display: 'block',
        // maxWidth: '100vw',
        overflow: 'hidden',
        width: '100vw',
    },
}));

function Carusel() {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <div
            className={classes.root}
            style={{
                marginTop: "-20px",


            }}
        >
            <Paper style={{
                background: 'transparent',
                backgroundColor: 'rgba(52, 52, 52, 0.3)',


            }} square elevation={0} className={classes.header}>
                <Typography>{tutorialSteps[activeStep].label}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
                controls={false}
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {tutorialSteps.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <img className={classes.img} src={step.imgPath} alt={step.label} />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            {/* <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}

            /> */}
        </div >
    );
}

export default Carusel;
