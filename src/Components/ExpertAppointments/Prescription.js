import { Avatar, Button } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { db } from '../../firebase';
import firebase from "firebase"

import { selectExpertEmail } from "../../features/expert/expertSlice";
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Prescription({ id, email, name }) {

    const expertEmail = useSelector(selectExpertEmail)

    const [open, setOpen] = React.useState(false);

    var today = new Date(),
        date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

    const [currentDate, setCurrentDate] = React.useState(date)
    const [medicine, setMedicine] = React.useState("")
    const [expertName, setExpertName] = React.useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const prescibe = (e) => {
        e.preventDefault()

        db
            .collection("prescriptions")
            .doc(email)
            .collection("prescription")
            .add({
                id: id,
                patient_email: email,
                patient_name: name,
                date: currentDate,
                expert: expertEmail,
                expertName: expertName,
                prescription: medicine,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })

        setMedicine("")
        setExpertName("")

        handleClose()

        toast.success(`You have successfully prescribed to the patient ${name}`)
    }

    return (
        <Container>

            <Button variant="contained" fullWidth onClick={handleClickOpen}>
                Send Prescription
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Prescription</DialogTitle>
                <DialogContent>

                    <Button variant="contained" fullWidth disabled style={{ textTransform: "lowercase" }}>
                        {email}
                    </Button>

                    <div>
                        <Button variant="contained" fullWidth disabled style={{ textTransform: "capitalize", marginTop: "10px", marginRight: "10px" }}>
                            {name}
                        </Button>

                        <Button variant="contained" fullWidth disabled style={{
                            textTransform: "capitalize", marginTop: "10px"
                        }}>
                            Date - {currentDate}
                        </Button>
                    </div>

                    <TextareaAutosize
                        aria-label="minimum height"
                        rowsMin={10}
                        placeholder="Enter prescription"
                        value={medicine}
                        onChange={(e) => setMedicine(e.target.value)}
                        style={{
                            width: "100%",
                            marginTop: "10px"
                        }} />

                    <div>
                        <p>
                            <span style={{ paddingTop: "10px" }}><strong>Your Digital Signature</strong></span>
                        </p>

                        <TextField value={expertName} onChange={(e) => setExpertName(e.target.value)} />
                    </div>

                </DialogContent>

                <DialogActions style={{ justifyContent: "space-between" }}>

                    <Avatar src="/images/U.png" />
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={prescibe} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    )
}

const Container = styled.div``

export default Prescription
