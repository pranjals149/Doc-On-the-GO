import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { auth } from '../../firebase';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setExpertLoginDetails } from '../../features/expert/expertSlice';
import { toast } from 'react-toastify';
import firebase from "firebase"

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1509475826633-fed577a2c71b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80)',
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
}));

export default function ExpertLogin() {

    const history = useHistory()
    const dispatch = useDispatch()

    const classes = useStyles();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const expertLogin = (e) => {
        e.preventDefault()

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                toast.success("Successfully Logged In")
                history.push('/dashboard')
                dispatch(
                    setExpertLoginDetails({
                        id: auth.user.uid,
                        email: auth.user.email,
                    })
                )
            })
            .catch(err => toast.error(err.message))
    }

    const forgotPassword = () => {

        firebase.auth().sendPasswordResetEmail(email)
            .then(function () {
                toast.success('Link for resetting your password has been sent to your provided email. Please check ...')
            }).catch(function (e) {
                toast.error(e);
            })
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
                        Sign in
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
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={expertLogin}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" onClick={forgotPassword}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/expertReg" variant="body2">
                                    {"Don't have an account? Sign Up"}
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
            </Grid>
        </Grid>
    );
}