import React from 'react'
import styled from 'styled-components'
import { db } from '../../firebase'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast } from 'react-toastify';
import validator from 'validator';
import firebase from 'firebase'

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ContactUs() {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [message, setMessage] = React.useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const reset = () => {

        setName("");
        setEmail("")
        setMessage("")

        toast.success("Your message is sent to us Successfully")
    }

    const sendMessage = (e) => {
        e.preventDefault();

        if (!validator.isEmail(email)) {
            toast.error(`${email} is not a valid email.`)
            return
        }

        if (!name.length) {
            toast.error("You must provide your full name")
            return;
        }

        if (!message.length) {
            toast.error("You must type the message first")
            return;
        }

        db
            .collection("contactUs")
            .add({
                name: name,
                email: email,
                message: message,
                time: firebase.firestore.FieldValue.serverTimestamp(),
            })

        reset();
    }

    return (
        <ContactContainer>
            <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{
                fontSize: "15px",
                padding: "10px"
            }}>
                Want to get in touch with us ?
            </Button>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">

                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <div className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                    <TouchAppIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    GET IN TOUCH
                                </Typography>
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
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoFocus
                                    />

                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="name"
                                        label="Full Name"
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoComplete="name"
                                    />

                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="message"
                                        label="Type your message here"
                                        type="text"
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />

                                </form>
                            </div>

                        </Container>

                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                    <Button onClick={sendMessage} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </ContactContainer>
    )
}

const ContactContainer = styled.div`
    text-align: center;
    padding: 20px;
`

export default ContactUs
