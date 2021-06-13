import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserEmail, selectUserPhoto } from '../../features/user/userSlice'
import { db } from '../../firebase'
import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReactTimeago from 'react-timeago'
import { Avatar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        fontSize: "16px",
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
        border: "10px solid darkslategray",
    },

    prevent: {
        margin: "20px",
        color: "red",
        letterSpacing: "1.03px",
        fontStyle: "italic"
    },

    final__button: {
        marginBottom: "20px",
        marginTop: "10px"
    },

    report__heading: {
        textAlign: "center",
        fontSize: "36px",
        textDecoration: "underline",
    },
}));

function FetchReports() {

    const classes = useStyles();

    const userEmail = useSelector(selectUserEmail)
    const userPhoto = useSelector(selectUserPhoto)

    const [reports, setReports] = useState([])

    useEffect(() => {

        db
            .collection("symptomReports")
            .doc(userEmail)
            .collection("reports")
            .orderBy('time', 'desc')
            .onSnapshot((snapshot) => {
                setReports(snapshot.docs.map((doc) => ({ id: doc.id, report: doc.data() })))
            })
    }, [])

    return (
        <React.Fragment>

            <CssBaseline />

            <h1 className={classes.report__heading}>Your saved Reports</h1>

            {reports.length > 0 ? reports.map((report) => (
                <main className={classes.layout}>

                    <Paper className={classes.paper}>

                        <strong>Report Generated</strong> {" "}

                        <ReactTimeago
                            date={new Date(report.report.time?.toDate()).toUTCString()}
                        />

                        <p><strong>Report ID</strong> {report.id}</p>

                        <Typography component="h1" variant="h4" align="center" style={{ paddingBottom: "20px" }}>
                            Your Report
                    </Typography>

                        <React.Fragment>
                            <ImageContainer>
                                <img src={userPhoto} alt="" />
                            </ImageContainer>

                            <RowContainer>

                                <NameContainer>
                                    <h4>Name - {report.report.name}</h4>
                                </NameContainer>

                                <EmailContainer>
                                    <p><strong>Email</strong> - {report.report.email}</p>
                                </EmailContainer>

                            </RowContainer>

                            <InfoContainer>
                                <p><strong>Gender</strong> - {report.report.gender}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <p><strong>Age</strong> - {report.report.age}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <p><strong>fever</strong> - {report.report.fever}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <p><strong>Symptoms</strong> - {report.report.Serious_Symptom}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <p><strong>Other Symptom</strong> - {report.report.Other_Symptom}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <p><strong>Risk</strong> - {report.report.risk_factor}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <p><strong>Additional Risks</strong> - {report.report.Additional_Risk}</p>
                            </InfoContainer>
                        </React.Fragment>
                    </Paper>

                </main>
            )) :
                <ElseContainer>
                    <h1>No Reports Generated yet !!</h1>
                </ElseContainer>
            }

        </React.Fragment>
    )
}

const ImageContainer = styled.div`
    text-align: center;
    padding-bottom: 20px;

    img {
        border-radius: 50%;
    }
`

const RowContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const EmailContainer = styled.div``

const InfoContainer = styled.div`
    padding-top: 15px;
    margin: 15px;
`

const NameContainer = styled.div``

const ElseContainer = styled.div`
    text-align: center;
`

export default FetchReports
