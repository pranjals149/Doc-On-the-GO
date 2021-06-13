import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectUserEmail } from '../../features/user/userSlice'
import { db } from '../../firebase'

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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

function Prescriptions() {

    const classes = useStyles();
    const [prescriptions, setPrescriptions] = useState([])

    const userEmail = useSelector(selectUserEmail)


    useEffect(() => {
        db
            .collection("prescriptions")
            .doc(userEmail)
            .collection("prescription")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setPrescriptions(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
            })
    }, [])

    console.log(prescriptions)

    return (
        <div>
            <React.Fragment>

                <CssBaseline />

                <h1 className={classes.report__heading}>Your Prescriptions</h1>

                {prescriptions.length > 0 ? prescriptions.map((prescription) => (
                    <main className={classes.layout}>

                        <Paper className={classes.paper}>

                            <strong>Prescription given</strong> {" "}

                            {prescription.data.date}

                            <p><strong>Prescription ID</strong> {prescription.id}</p>

                            <Typography component="h1" variant="h4" align="center" style={{ paddingBottom: "20px", marginTop: "20px", textDecoration: "underline" }}>
                                Your Prescription
                            </Typography>

                            <React.Fragment>
                                <RowContainer>

                                    <NameContainer>
                                        <h4>Name - {prescription.data.patient_name}</h4>
                                    </NameContainer>

                                    <EmailContainer>
                                        <p><strong>Email</strong> - {prescription.data.patient_email}</p>
                                    </EmailContainer>

                                </RowContainer>

                                <InfoContainer>
                                    <p>{prescription.data.prescription}</p>
                                </InfoContainer>

                                <InfoContainer>
                                    <p><strong>Given by</strong> Dr. {prescription.data.expertName}</p>

                                    <Avatar src="/images/U.png" />
                                </InfoContainer>

                            </React.Fragment>
                        </Paper>

                    </main>
                )) :
                    <ElseContainer>
                        <h1>No Prescriptions received yet !!</h1>
                    </ElseContainer>
                }

            </React.Fragment>
        </div>
    )
}

const RowContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const EmailContainer = styled.div``

const InfoContainer = styled.div`
    padding-top: 15px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
`

const NameContainer = styled.div``

const ElseContainer = styled.div`
    text-align: center;
`

export default Prescriptions
