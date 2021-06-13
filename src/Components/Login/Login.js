import { useHistory } from "react-router";
import styled from "styled-components";
import { auth, provider } from '../../firebase'
import { setUserLoginDetails } from '../../features/user/userSlice'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useState } from "react";

import Typewriter from 'react-simple-typewriter'
import 'react-simple-typewriter/dist/index.css'
import { toast } from "react-toastify";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Login = (props) => {

  const history = useHistory()
  const dispatch = useDispatch()

  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const accept = () => {
    handleClose();
  }

  const loginWithGoogle = () => {
    auth.signInWithPopup(provider)
      .then((res) => {

        history.push('/home')

        dispatch(
          setUserLoginDetails({
            id: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
            photo: res.user.photoURL
          })
        )

      })
      .catch(alert);
  }

  const expertPress = (e) => {
    e.preventDefault();

    toast.error("This is an invite only feature")
    return;
  }

  return (

    <Container>

      <Video autoplay muted loop>
        <source src="/images/bg2.mp4" type="video/mp4" />
      </Video>

      <Heading>
        Welcome to <span style={{ textDecoration: "underline", color: "brown" }}>THE COMMUNITY</span>
      </Heading>

      <Para>
        <p>
          Get {" "}
          <span style={{ color: "#293039" }}>
            <Typewriter
              loop
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
              words={["Personalized reports!!", "available resources!!", "to book appointments!!", "to interact with other people!!"]}
            />
          </span>
        </p>
      </Para>

      <ButtonContainer>

        <div>
          <Button variant='contained' color="primary" onClick={loginWithGoogle}>Sign In with Google (As an individual)</Button>
        </div>

        <div style={{ paddingTop: "10px" }}>

          <Button variant="contained" color="primary" style={{
            opacity: "0.5",
            cursor: "not-allowed"
          }} onClick={expertPress}>Join now as an Expert</Button>

        </div>

        <div style={{ paddingTop: "10px" }}>
          <Button variant="contained" color="secondary" onClick={handleClickOpen}>
            Code of Conduct
          </Button>
        </div>
      </ButtonContainer>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Code of Conduct
          </DialogTitle>

        <DialogContent dividers>

          <Typography gutterBottom>
            1. This application <strong>Doc On the GO</strong> is not for commercial usage and was built for creating a community to fight against Coronavirus by sharing resources as a public initiative.
            </Typography>

          <Typography gutterBottom>
            2. The creators of this application are dedicated to providing a safe and comfortable environment and harassment-free experience for everyone. No discrimination, on the basis of the following, shall be tolerated: <br />
              ✔ gender <br />
              ✔ gender identity and expression <br />
              ✔ age<br />
              ✔ sexual orientation<br />
              ✔ disability<br />
              ✔ physical appearance<br />
              ✔ body size<br />
              ✔ race<br />
              ✔ ethnicity<br />
              ✔ nationality<br />
              ✔ religion<br />
              ✔ political views
            </Typography>

          <Typography gutterBottom>
            3. We do not tolerate harassment of people with in the community in any form, including offensive discriminatory posts , public display of sexual material, in public spaces, deliberate intimidation and wilful disruption.
            </Typography>

          <Typography gutterBottom>
            4. The posts posted by the participants in the community must adhere to our strict no-harassment policy. Refer to points 2 and 3.
            </Typography>

          <Typography gutterBottom>
            5. We have included resources such as hospitals with available beds, medicines , food , etc. from the publicly available domains and have not been verified by our team. We wanted to have a further reach for the availability of resources and have included as much as possible.
            </Typography>

          <Typography gutterBottom>
            6. We encourage people to help others within the community so as to have a greater impact on people and greater reach.
            </Typography>

          <Typography gutterBottom>
            7. If you notice any violation of this Code of Conduct or find otherwise suspicious behaviour or have any concerns, please contact a member of the creation team immediately. We will be happy to help by contacting local security or local law enforcement, or otherwise assist those experiencing harassment to feel safe for the duration of your stay in the community. We value your participation.
            </Typography>

        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={accept} color="primary">
            Accept and Close
            </Button>
        </DialogActions>
      </Dialog>

    </Container >

  );
};

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: #293039;
`;

const Heading = styled.h1`
    position: relative;
    font-size: 3.25em;
    letter-spacing: 1.5px;
    color: #293039;
    text-align: center;
    font-family: 'Baloo Tammudu 2', cursive;
    line-height: 1.2;
`

const Para = styled.div`
  position: relative;

  p {
    font-size: 2.65em;
    letter-spacing: 1.5px;
    color: brown;
    text-align: center;
    font-family: 'Baloo Tammudu 2', cursive;
    line-height: 1.2;
  }

`

const Video = styled.video`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Login;
