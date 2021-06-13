import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setUserSymptomDetails } from '../../features/symptom/symptomSlice';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    symptomsHeading: {
        fontSize: "18px",
        color: "darkcyan"
    },

    symptoms: {
        color: "dimgray",
    },

    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

export default function SymptomForm() {

    const classes = useStyles();

    const dispatch = useDispatch()
    const history = useHistory();

    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [fever, setFever] = useState("")
    const [seriousSymptom, setSeriousSymptom] = useState("")
    const [otherSymptom, setOtherSymptom] = useState("")
    const [risk, setRisk] = useState("")
    const [additionalRisk, setAdditionalRisk] = useState("")

    const handleNext = (e) => {
        e.preventDefault()

        if (!gender.length) {
            toast.error("You must provide your gender")
            return;
        }

        if (!age.length) {
            toast.error("You must provide your age")
            return;
        }

        if (!fever.length) {
            toast.error("You must provide the answer - whether you have fever or not")
            return;
        }

        if (!seriousSymptom.length) {
            toast.error("You must provide your symptoms")
            return;
        }

        dispatch(
            setUserSymptomDetails({
                gender: gender,
                age: age,
                fever: fever,
                seriousSymptom: seriousSymptom,
                otherSymptom: otherSymptom,
                risk: risk,
                additionalRisk: additionalRisk,
            })
        )

        history.push('/userReport')
    }

    return (
        <React.Fragment>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="gender"
                        name="gender"
                        label="Gender"
                        fullWidth
                        autoComplete="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="age"
                        name="age"
                        label="Your Age"
                        fullWidth
                        autoComplete="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="fever"
                        name="fever"
                        label="Do you have a fever ? Yes or No"
                        fullWidth
                        autoComplete="fever"
                        value={fever}
                        onChange={(e) => setFever(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <h4 className={classes.symptomsHeading}>List of Symptoms</h4>
                    <p className={classes.symptoms}>Shortness of breath</p>
                    <p className={classes.symptoms}>Unconsciousness</p>
                    <p className={classes.symptoms}>Symptoms quickly worsening</p>
                    <p className={classes.symptoms}>Rapid breathing</p>
                    <p className={classes.symptoms}>Coughing up blood</p>
                    <p className={classes.symptoms}>Not responding normally</p>
                    <TextField
                        id="symptoms"
                        name="symptoms"
                        label="List out the serious symptoms experiened from the above given list?"
                        fullWidth
                        required
                        value={seriousSymptom}
                        onChange={(e) => setSeriousSymptom(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <h4 className={classes.symptomsHeading}>Other Symptoms</h4>
                    <p className={classes.symptoms}>Cough</p>
                    <p className={classes.symptoms}>Fatigue</p>
                    <p className={classes.symptoms}>Muscle Pain</p>
                    <p className={classes.symptoms}>Headache</p>
                    <p className={classes.symptoms}>Diarrhea</p>
                    <p className={classes.symptoms}>Sore throat</p>
                    <p className={classes.symptoms}>Impaired taste or smell</p>
                    <TextField
                        id="other"
                        name="other"
                        label="Have you experienced any of the following other symptoms given above ?"
                        fullWidth
                        value={otherSymptom}
                        onChange={(e) => setOtherSymptom(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <h4 className={classes.symptomsHeading}>Risk Factors</h4>

                    <p className={classes.symptoms}>1. In the past 14 days have you traveled to or resided in a country with many local cases of COVID-19?</p>
                    <p className={classes.symptoms}>2. I have provided direct care to such a person, without the use of a protective mask and gloves</p>
                    <p className={classes.symptoms}>3. I had direct physical contact with such a person</p>
                    <p className={classes.symptoms}>4. I had face-to-face contact with such a person within 1 meter (3 feet) for longer than 15 minutes</p>

                    <TextField
                        id="other"
                        name="other"
                        label="Do any of the following given above apply to you?"
                        fullWidth
                        value={risk}
                        onChange={(e) => setRisk(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <h4 className={classes.symptomsHeading}>Additional Risk Factors</h4>

                    <p className={classes.symptoms}>Other type of contact</p>
                    <p className={classes.symptoms}>Current cancer</p>
                    <p className={classes.symptoms}>Diseases or drugs that weaken immune system</p>
                    <p className={classes.symptoms}>Long-term stay at a care facility or nursing home</p>
                    <p className={classes.symptoms}>Diabetes</p>
                    <p className={classes.symptoms}>Cardiovascular disease</p>
                    <p className={classes.symptoms}>History of chronic lung disease</p>
                    <p className={classes.symptoms}>History of chronic liver disease</p>
                    <p className={classes.symptoms}>History of chronic kidney disease</p>

                    <TextField
                        id="other"
                        name="other"
                        label="Submit additional risk factors given above"
                        fullWidth
                        value={additionalRisk}
                        onChange={(e) => setAdditionalRisk(e.target.value)}
                    />
                </Grid>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                >
                    Next
                </Button>

            </Grid>
        </React.Fragment>
    );
}