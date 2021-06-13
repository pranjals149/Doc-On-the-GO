import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { selectUserEmail } from '../../features/user/userSlice';
import { useState } from 'react';
import ReactTimeago from 'react-timeago';

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
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    date: {
        color: "gray",
        fontSize: "14px"
    }
}));

export default function Appointments() {

    const classes = useStyles();

    const userEmail = useSelector(selectUserEmail)

    const [appointments, setAppointments] = useState([])

    useEffect(() => {

        db
            .collection("UserBookedSlots")
            .doc(userEmail)
            .collection("User_slots")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setAppointments(snapshot.docs.map((doc) => ({ id: doc.id, appointment: doc.data() })))
            })

    }, [])

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Your Booked Appointments
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {appointments.map((appointment) => (
                            <Grid item key={appointment.id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography>
                                            <strong>Expert Name</strong> {appointment.appointment.expert_name}
                                        </Typography>
                                        <Typography>
                                            <strong>Expert email</strong> {appointment.appointment.expert_email}
                                        </Typography>
                                        <Typography>
                                            <strong>Booked slot</strong> {appointment.appointment.booked_slot}
                                        </Typography>

                                        <Typography>
                                            <strong>Report ID</strong> {appointment.appointment.reportID}
                                        </Typography>

                                        <Typography className={classes.date}>
                                            <strong>Booked</strong> <ReactTimeago date={new Date(appointment.appointment.timestamp?.toDate()).toUTCString()} />
                                        </Typography>

                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>

        </React.Fragment>
    );
}