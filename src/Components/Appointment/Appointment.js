import Button from '@material-ui/core/Button'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import firebase from "firebase"

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from 'react-toastify';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { selectUserEmail, selectUserName } from '../../features/user/userSlice';

const useStyles = makeStyles((theme) => ({
    button__container: {
        margin: "0 auto"
    }
}));

function Appointment({ id, name, email }) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [time, setTime] = React.useState("")
    const [reportId, setReportId] = React.useState("")

    const userEmail = useSelector(selectUserEmail)
    const username = useSelector(selectUserName)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const bookSlot = () => {
        if (!time.length) {
            toast.error("Please enter a time slot")
            return;
        }

        else if (!reportId.length) {
            toast.error("Please enter your report ID from the report generated")
            return;
        }

        db
            .collection("UserBookedSlots")
            .doc(userEmail)
            .collection("User_slots")
            .add({
                expert_email: email,
                expert_name: name,
                booked_slot: time,
                reportID: reportId,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })

        db
            .collection("Slots_for_experts")
            .add({
                expert_email: email,
                expert_name: name,
                user: userEmail,
                name: username,
                booked_slot: time,
                reportID: reportId,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })

        handleClose()
        toast.success("Your appointment is booked with our expert.")
        setTime("")

    }

    return (
        <div className={classes.button__container}>
            <Button fullWidth variant="contained" color="primary" onClick={handleClickOpen}>
                Book Appointment
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Book an appointment with the expert</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can chose a time slot before 6:00 PM (IST).
                        <strong>If your registered time slot is already booked then you will be in a queue. In that case, please Be Patient</strong>
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter your time slot (Eg - 1 PM)"
                        type="text"
                        fullWidth
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />

                    <TextField
                        margin="dense"
                        id="report"
                        label="Enter your Report ID"
                        type="text"
                        fullWidth
                        value={reportId}
                        onChange={(e) => setReportId(e.target.value)}
                    />

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                    <Button onClick={bookSlot} color="primary">
                        Book Slot
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Appointment
