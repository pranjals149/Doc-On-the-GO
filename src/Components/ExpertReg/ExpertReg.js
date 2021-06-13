import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { auth, db } from '../../firebase';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import validator from 'validator';
import { setExpertLoginDetails } from '../../features/expert/expertSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper__modal: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ExpertReg() {

    const classes = useStyles();
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [aadhar, setAadhar] = useState("")
    const [speciality, setSpeciality] = useState("")
    const [other, setOther] = useState("")
    const [additional, setAdditional] = useState("")
    const [checked, setChecked] = useState(false)

    const history = useHistory()

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addExpert = (e) => {
        e.preventDefault();

        if (!firstName.length) {
            toast.error("You must provide your first name")
            return;
        }

        if (!lastName.length) {
            toast.error("You must provide your last name")
            return;
        }

        if (!validator.isEmail(email)) {
            toast.error(`${email} is not a valid email.`)
            return
        }

        if (password.length < 6) {
            toast.error("Password's must be of six characters")
            return;
        }

        if (phone.length < 10) {
            toast.error("Phone number must be of 10 digits")
            return;
        }

        if (!address.length) {
            toast.error("You must type the address")
            return;
        }

        if (aadhar.length !== 12) {
            toast.error("Aadhar must be of 12 digits")
            return;
        }

        if (!speciality.length) {
            toast.error("You must provide your speciality")
            return;
        }

        if (!checked) {
            toast.error("Agree to the terms and conditions first")
            return;
        }

        db.settings({
            timestampsInSnapshots: true
        });

        db.collection("experts").add({
            email: email,
            first_name: firstName,
            last_name: lastName,
            aadhar: aadhar,
            contact: phone,
            address: address,
            speciality: speciality,
            other_speciality: other,
            additional_comments: additional
        });

        toast.success("You are successfully registered as an Expert")

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    history.push('/dashboard')
                    dispatch(
                        setExpertLoginDetails({
                            id: auth.user.uid,
                            email: auth.user.email,
                        })
                    )
                }
            })
            .catch(error => toast.error(error.message))
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="phone"
                                label="Phone no."
                                type="text"
                                id="phone"
                                autoComplete="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="address"
                                label="Address"
                                type="text"
                                id="address"
                                autoComplete="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="aadhar"
                                label="Aadhar no. (only for verifying bot related activities)"
                                type="text"
                                id="aadhar"
                                autoComplete="aadhar"
                                value={aadhar}
                                onChange={(e) => setAadhar(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="speciality"
                                label="Your Speciality"
                                type="text"
                                id="speciality"
                                autoComplete="speciality"
                                value={speciality}
                                onChange={(e) => setSpeciality(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="other"
                                label="What other things can you do ?"
                                type="text"
                                id="other"
                                autoComplete="other"
                                value={other}
                                onChange={(e) => setOther(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="additional"
                                label="Additional Comments (If any) ?"
                                type="text"
                                id="additional"
                                autoComplete="additional"
                                value={additional}
                                onChange={(e) => setAdditional(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" required onClick={() => setChecked(true)} />}
                                label="I agree to the Code of Conduct."
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={addExpert}
                    >
                        Sign Up as an Expert
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/expertLogin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>

                    <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        className={classes.submit}
                    >
                        <a href='/' style={{
                            color: "white",
                            textDecoration: "none",
                        }}>
                            Return to Home Page
                            </a>
                    </Button>

                </form>
            </div>

        </Container>
    );
}