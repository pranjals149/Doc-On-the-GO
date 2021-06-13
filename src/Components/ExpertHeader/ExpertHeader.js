import { useHistory } from "react-router";
import styled from "styled-components";
import { auth } from "../../firebase";

import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { selectExpertEmail, setExpertLoginDetails, setExpertSignoutDetails } from "../../features/expert/expertSlice";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const ExpertHeader = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const expertEmail = useSelector(selectExpertEmail)

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user)
                //history.push('/dashboard')
            }
        })
    }, [expertEmail])

    const setUser = (user) => {
        dispatch(
            setExpertLoginDetails({
                id: user.uid,
                email: user.email,
            })
        )
    }

    const signOut = () => {
        auth.signOut()
            .then(() => {
                dispatch(setExpertSignoutDetails());
                history.push('/')
            })
            .catch((err) => alert(err.message))
    }

    return (
        <Container>
            <Content>

                <HeadingContainer onClick={() => history.push('/dashboard')}>
                    <h1>Doc On the GO</h1>
                </HeadingContainer>

                <InfoContainer>
                    <h2>Expert's Dasboard</h2>
                </InfoContainer>

                <EmailContainer title="Click to Signout" onClick={handleClick}>
                    <p>{expertEmail}</p>
                </EmailContainer>

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={signOut}>Logout</MenuItem>
                </Menu>

            </Content>
        </Container>
    );
};


const HeadingContainer = styled.div`
    cursor: pointer;

    h1 {
        font-family: 'Baloo Tammudu 2', cursive;
        font-size: 30px;
        text-decoration: overline;
        letter-spacing: 2px;
    }
`

const InfoContainer = styled.div`
    h2 {
        font-size: 24px;
    }

    @media (max-width: 768px) {
        display: none;
    }
`

const EmailContainer = styled.div`
    p {
        font-size: 16px;
        text-decoration: underline;
        cursor: pointer;
    }
`

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  position: relative;
  top: 0;
  width: 100vw;
  z-index: 100;
`;

const Content = styled.div`
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
  display: flex;
  justify-content: space-between;
  padding: 10px;

   @media (max-width: 768px) {
        display: flex;
        justify-content: space-evenly;
    }
`;

export default ExpertHeader;
