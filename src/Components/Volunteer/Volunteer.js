import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../../firebase'
import firebase from 'firebase'
import validator from 'validator';

import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1614583224978-f05ce51ef5fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=838&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    fields: {
        paddingTop: "10px",
        color: "red"
    }
}));

export default function Volunteer() {

    const classes = useStyles();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [aadhar, setAadhar] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [howContribute, setHowContribute] = useState("");
    const [whyContribute, setWhyContribute] = useState("");

    const reset = () => {
        setName("");
        setEmail("")
        setAadhar("")
        setAddress("");
        setContact("")
        setHowContribute("")
        setWhyContribute("")

        toast.success("Thankyou for showing interest !! Your response is stored with us. One of our team members will contact you shortly.")
    }

    const addVolunteer = (e) => {
        e.preventDefault();

        if (!name.length) {
            toast.error("You must enter your full name")
            return;
        }

        if (!validator.isEmail(email)) {
            toast.error(`${email} is not a valid email.`)
            return
        }

        if (aadhar.length !== 12) {
            toast.error("Aadhar number must be of 12 digits")
            return;
        }

        if (!address.length) {
            toast.error("You must enter your address")
            return;
        }

        if (contact.length !== 10) {
            toast.error("Contact number must be of 10 digits")
            return;
        }

        if (!howContribute.length) {
            toast.error("You must enter your how can you contribute")
            return;
        }

        db
            .collection("volunteer")
            .add({
                name: name,
                email: email,
                aadhar: aadhar,
                address: address,
                contact: contact,
                how_can_you_contribute: howContribute,
                why_do_you_want_to_contribute: whyContribute,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })

        reset();
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up for Volunteer
                    </Typography>

                    <div className={classes.fields}>
                        <p>Fields marked with * are important</p>
                    </div>

                    <form className={classes.form} noValidate>

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoComplete="name"
                            type="text"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            type="text"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="aadhar"
                            label="Aadhar no."
                            type="text"
                            id="aadhar"
                            autoComplete="aadhar"
                            value={aadhar}
                            onChange={(e) => setAadhar(e.target.value)}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
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

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="contact"
                            label="Contact no."
                            type="text"
                            id="contact"
                            autoComplete="contact"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="contribute"
                            label="How can you contribute ?"
                            type="text"
                            id="contribute"
                            autoComplete="contribute"
                            value={howContribute}
                            onChange={(e) => setHowContribute(e.target.value)}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="Why_Contribute"
                            label="Why do you want to contribute ?"
                            type="text"
                            id="Why_Contribute"
                            autoComplete="Why_Contribute"
                            value={whyContribute}
                            onChange={(e) => setWhyContribute(e.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={addVolunteer}
                        >
                            Register as a Volunteer
                        </Button>

                    </form>
                </div>

            </Grid>
        </Grid>
    );
}