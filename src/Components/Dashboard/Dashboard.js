import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../../firebase';
import ReactTimeago from 'react-timeago';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '10px solid darkslategray',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: "5px solid darkslategray"
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
        borderRadius: "50%",
        width: "60%",
        margin: "0 auto",
    },
    cardContent: {
        flexGrow: 1,

    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    name__email: {
        display: "flex",
        paddingTop: "15px"
    },
    info: {
        fontSize: "15px",
        padding: "5px",
    },
    username: {
        textAlign: "center",
        fontSize: "18px"
    },
    report_id: {
        padding: "10px"
    }
}));

export default function Dashboard() {

    const classes = useStyles();

    const [reports, setReports] = useState([])

    const history = useHistory()

    useEffect(() => {
        db
            .collection("expertReports")
            .orderBy("time", "asc")
            .onSnapshot((snapshot) => {
                setReports(snapshot.docs.map((doc) => ({ id: doc.id, report: doc.data() })))
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
                            Expert Section
                        </Typography>

                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            You must follow the <strong>Code of Conduct</strong> while having a conversation with someone in need. Any violation of such rules may cause a strict action against you.
                        </Typography>

                        <Button fullWidth variant="contained" color="primary" onClick={() => history.push("/expertAppointments")}>
                            Your Scheduled appointments
                        </Button>

                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {reports.map((expert) => (
                            <Grid item key={expert} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>

                                    <p className={classes.report_id}><strong>Report ID</strong> {expert.id}</p>

                                    <p className={classes.report_id}><strong>Time</strong> {" "}
                                        <ReactTimeago date={new Date(expert.report.time?.toDate()).toUTCString()} />
                                    </p>

                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={expert.report.photo}
                                        title={expert.report.email}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h4" className={classes.info}>
                                            <strong>Patient Name</strong> {expert.report.name}
                                        </Typography>

                                        <Typography className={classes.info}>
                                            <strong>Patient Email</strong> {expert.report.email}
                                        </Typography>

                                        <Typography className={classes.info}>
                                            <strong>Patient Contact</strong> {expert.report.phone}
                                        </Typography>

                                        <Typography className={classes.info}>
                                            <strong>Patient Age</strong> {expert.report.age}
                                        </Typography>

                                        <Typography className={classes.info}>
                                            <strong>Gender</strong> {expert.report.gender}
                                        </Typography>

                                        <Typography className={classes.info}>
                                            <strong>Fever</strong> {expert.report.fever}
                                        </Typography>

                                        <Typography className={classes.info}>
                                            <strong>Symptoms</strong> {expert.report.Serious_Symptom}
                                        </Typography>

                                        <Typography className={classes.info}>
                                            <strong>Other Symptoms</strong> {expert.report.Other_Symptom}
                                        </Typography>

                                        <Typography className={classes.info}>
                                            <strong>Risk</strong> {expert.report.risk_factors}
                                        </Typography>

                                        <Typography className={classes.info}>
                                            <strong>Additional Risks</strong> {expert.report.Additional_Risk}
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