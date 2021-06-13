import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { db } from '../../firebase'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Appointment from '../Appointment/Appointment';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
        textAlign: "center"

    },
    expertName: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    name: {
        fontWeight: 700,
        fontSize: "18px",
        textAlign: "center"
    },
    appointmentButton: {
        marginTop: "10px",
        alignItems: "center"
    }
}));

function AllExperts() {

    const [experts, setExperts] = useState([])
    const classes = useStyles();

    const history = useHistory()

    useEffect(() => {
        db
            .collection("experts")
            .onSnapshot((snapshot) => {
                setExperts(snapshot.docs.map((doc) => ({ id: doc.id, report: doc.data() })))
            })
    }, [])

    experts.map((expert) => console.log(expert.report.first_name))

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Our Experts
                </Typography>

                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    You can see the list of our experts and book an appointment accordingly.
                </Typography>

                <Button fullWidth variant="outlined" color="primary" className={classes.appointmentButton} onClick={() => history.push("/appointments")}>
                    Your booked appointments
                </Button>

            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {experts.map((expert) => (
                        <Grid item key={expert.id} xs={12} sm={12} md={4}>
                            <Card>
                                <h2 className={classes.cardHeader}>Email - {expert.report.email}</h2>

                                <CardContent>
                                    <div className={classes.expertName}>
                                        <Typography className={classes.name}>
                                            Expert Name - {expert.report.first_name} {expert.report.last_name}
                                        </Typography>
                                    </div>

                                    <ul>

                                        <Typography component="li" variant="subtitle1" align="center" key={expert.id}>
                                            <strong>Speciality</strong> {expert.report.speciality}
                                        </Typography>

                                    </ul>

                                    <ul>

                                        <Typography component="li" variant="subtitle1" align="center" key={expert.id}>
                                            <strong>Other Speciality</strong> {expert.report.other_speciality}
                                        </Typography>

                                    </ul>
                                </CardContent>

                                <CardActions>
                                    <Appointment id={expert.id} name={expert.report.first_name + " " + expert.report.last_name} email={expert.report.email} />
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default AllExperts
