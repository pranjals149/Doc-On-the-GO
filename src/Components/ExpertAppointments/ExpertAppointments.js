import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectExpertEmail } from '../../features/expert/expertSlice'
import { db } from '../../firebase'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReactTimeago from 'react-timeago'
import Prescription from './Prescription'

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: "2px solid",
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    date: {
        color: "gray",
        fontSize: "14px"
    }
}));


function ExpertAppointments() {

    const [slots, setSlots] = useState([])
    const expertEmail = useSelector(selectExpertEmail)

    const classes = useStyles();

    useEffect(() => {

        db
            .collection("Slots_for_experts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setSlots(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
            })

    }, [])

    console.log(slots)

    return (

        <div>
            {slots.map((slot) => (
                slot.data.expert_email === expertEmail ?
                    <>
                        <React.Fragment>
                            <CssBaseline />
                            <main>
                                <div className={classes.heroContent}>
                                    <Container maxWidth="sm">

                                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                            Scheduled Appointments
                                        </Typography>

                                    </Container>
                                </div>
                                <Container className={classes.cardGrid} maxWidth="md">
                                    {/* End hero unit */}
                                    <Grid container spacing={4}>
                                        {slots.map((slot) => (
                                            <Grid item key={slot} xs={12} sm={6} md={4}>
                                                <Card className={classes.card}>
                                                    <CardContent className={classes.cardContent}>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {slot.data.name}
                                                        </Typography>

                                                        <Typography>
                                                            {slot.data.user}
                                                        </Typography>

                                                        <Typography>
                                                            <strong>Booked Slot</strong> {slot.data.booked_slot}
                                                        </Typography>

                                                        <Typography>
                                                            <strong>Booked Report ID</strong> {slot.data.reportID}
                                                        </Typography>

                                                        <Typography className={classes.date}>
                                                            <ReactTimeago date={new Date(slot.data.timestamp?.toDate()).toUTCString()} />
                                                        </Typography>
                                                    </CardContent>

                                                    <Prescription
                                                        id={slot.id}
                                                        email={slot.data.user}
                                                        name={slot.data.name}
                                                    />

                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>

                                </Container>
                            </main>

                        </React.Fragment>
                    </>
                    :
                    <>
                    </>
            ))}
        </div>

    )
}

export default ExpertAppointments
