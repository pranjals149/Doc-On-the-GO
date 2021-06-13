import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUserEmail, selectUserName, selectUserPhoto } from '../../features/user/userSlice';
import { selectGender, selectAge, selectFever, selectSeriousSymptom, selectOtherSymptom, selectRisk, selectAdditionalRisk } from '../../features/symptom/symptomSlice';
import styled from 'styled-components';
import { db } from "../../firebase"
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import firebase from "firebase"

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
    }
}));

export default function UserReport() {

    const classes = useStyles();

    const history = useHistory()

    const username = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto)
    const userEmail = useSelector(selectUserEmail)

    const gender = useSelector(selectGender)
    const age = useSelector(selectAge)
    const fever = useSelector(selectFever)
    const seriousSymptom = useSelector(selectSeriousSymptom)
    const otherSymptom = useSelector(selectOtherSymptom)
    const risk = useSelector(selectRisk)
    const additionalRisk = useSelector(selectAdditionalRisk)

    const [phone, setPhone] = useState("")

    const saveReport = (e) => {
        e.preventDefault()

        if (phone.length !== 10) {
            toast.error("Please enter a valid phone number")
            return;
        }

        db
            .collection("symptomReports")
            .doc(userEmail)
            .collection("reports")
            .add({
                email: userEmail,
                name: username,
                phone: phone,
                gender: gender,
                age: age,
                fever: fever,
                Serious_Symptom: seriousSymptom,
                Other_Symptom: otherSymptom,
                risk_factor: risk,
                Additional_Risk: additionalRisk,
                time: firebase.firestore.FieldValue.serverTimestamp(),
            })

        db
            .collection("expertReports")
            .add({
                email: userEmail,
                photo: userPhoto,
                name: username,
                phone: phone,
                gender: gender,
                age: age,
                fever: fever,
                Serious_Symptom: seriousSymptom,
                Other_Symptom: otherSymptom,
                risk_factor: risk,
                Additional_Risk: additionalRisk,
                time: firebase.firestore.FieldValue.serverTimestamp(),
            })

        history.push("/home")

        toast.success("Your report is saved with us. One of our experts will contact you shortly")
    }

    return (
        <React.Fragment>

            <CssBaseline />

            <h4 className={classes.prevent}>You are required to follow the government guidelines for preventing the spread of this virus. Some preventive measures you must follow are -
                <br />
                <li>Preventive measures include physical or social distancing, quarantining, ventilation of indoor spaces, covering coughs and sneezes, hand washing, and keeping unwashed hands away from the face.</li>
                <li>The use of face masks or coverings has been recommended in public settings to minimise the risk of transmissions.</li>
            </h4>

            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center" style={{ paddingBottom: "20px" }}>
                        Your Report
                    </Typography>

                    <React.Fragment>

                        <ImageContainer>
                            <img src={userPhoto} alt="" />
                        </ImageContainer>

                        <RowContainer>

                            <NameContainer>
                                <h4>Name - {username}</h4>
                            </NameContainer>

                            <EmailContainer>
                                <p><strong>Email</strong> - {userEmail}</p>
                            </EmailContainer>

                        </RowContainer>

                        <InfoContainer>
                            <p><strong>Gender</strong> - {gender}</p>
                        </InfoContainer>
                        <InfoContainer>
                            <p><strong>Age</strong> - {age}</p>
                        </InfoContainer>
                        <InfoContainer>
                            <p><strong>fever</strong> - {fever}</p>
                        </InfoContainer>
                        <InfoContainer>
                            <p><strong>Symptoms</strong> - {seriousSymptom}</p>
                        </InfoContainer>
                        <InfoContainer>
                            <p><strong>Other Symptom</strong> - {otherSymptom}</p>
                        </InfoContainer>
                        <InfoContainer>
                            <p><strong>Risk</strong> - {risk}</p>
                        </InfoContainer>
                        <InfoContainer>
                            <p><strong>Additional Risks</strong> - {additionalRisk}</p>
                        </InfoContainer>

                    </React.Fragment>
                </Paper>

                <TextField
                    required
                    id="phone"
                    name="phone"
                    label="Enter your Contact number"
                    fullWidth
                    autoComplete="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <ButtonContainer>
                    <Button variant="contained" color="primary" className={classes.final__button} onClick={saveReport}>
                        Save report and Consult to an expert
                    </Button>
                </ButtonContainer>

            </main>
        </React.Fragment>
    );
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

const ButtonContainer = styled.div`
    text-align: center;
`

const NameContainer = styled.div``