import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { db } from "../../firebase"
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SearchReport() {
    const classes = useStyles();

    const [email, setEmail] = useState("")
    const [reportId, setReportId] = useState("")
    const [clicked, setClicked] = useState(false)
    const [foundReport, setFoundReport] = useState([])
    const [report, setReport] = useState()

    const [additional, setAdditional] = useState("")
    const [other, setOther] = useState("")
    const [serious, setSerious] = useState("")
    const [age, setAge] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [fever, setFever] = useState("")
    const [gender, setGender] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [risk, setRisk] = useState("")

    useEffect(() => {

        foundReport.map((e) => {
            if (reportId === e.id) {
                setAdditional(e.report.Additional_Risk)
                setOther(e.report.Other_Symptom)
                setSerious(e.report.Serious_Symptom)
                setAge(e.report.age)
                setUserEmail(e.report.email)
                setFever(e.report.fever)
                setGender(e.report.gender)
                setName(e.report.name)
                setPhone(e.report.phone)
                setRisk(e.report.risk_factor)
            }
        })

    }, [foundReport])

    const searchReport = (e) => {
        e.preventDefault()

        db
            .collection("symptomReports")
            .doc(email)
            .collection("reports")
            .onSnapshot((snapshot) => (
                setFoundReport(snapshot.docs.map((doc) => ({ id: doc.id, report: doc.data() })))
            ))

        // foundReport.map((e) => {
        //     if (reportId === e.id) {
        //         setAdditional(e.report.Additional_Risk)
        //         setOther(e.report.Other_Symptom)
        //         setSerious(e.report.Serious_Symptom)
        //         setAge(e.report.age)
        //         setUserEmail(e.report.email)
        //         setFever(e.report.fever)
        //         setGender(e.report.gender)
        //         setName(e.report.name)
        //         setPhone(e.report.phone)
        //         setRisk(e.report.risk_factor)
        //     }
        // })

        setClicked(true)
    }

    foundReport.map((e) => console.log(e.id))
    console.log(additional)
    console.log(other)
    console.log(serious)
    console.log(age)

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="report"
                        label="Report ID"
                        type="text"
                        value={reportId}
                        onChange={(e) => setReportId(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        value={clicked}
                        onClick={searchReport}
                    >
                        Search
                    </Button>
                </form>
            </div>

        </Container>
    );
}