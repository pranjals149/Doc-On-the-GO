import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router";
import styled from "styled-components";
import { auth } from "../../firebase";
import {
    selectUserName,
    selectUserPhoto,
    setSignOutState,
    setUserLoginDetails
} from "../../features/user/userSlice";

import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Header = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const username = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto)

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
                // history.push('/home')
            }
        })
    }, [username])

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            })
        )
    }

    const signOut = () => {
        auth.signOut()
            .then(() => {
                dispatch(setSignOutState());
                history.push('/')
            })
            .catch((err) => alert(err.message))
    }

    return (
        <Container>
            <Content>

                <HeadingContainer onClick={() => history.push('/home')}>
                    {/* <h1>Doc On the GO</h1> */}
                    <Avatar src="/images/U.png" />
                </HeadingContainer>

                <AvatarContainer>
                    <Avatar onClick={handleClick} title="Click to Signout" src={userPhoto} alt={username} />
                </AvatarContainer>

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={signOut}>Sign Out</MenuItem>
                </Menu>

            </Content>
        </Container>
    );
};

const AvatarContainer = styled.div`
    cursor: pointer;

    &:hover {
        opacity: 0.6;
    }
`

const HeadingContainer = styled.div`
    cursor: pointer;

    h1 {
        font-family: 'Baloo Tammudu 2', cursive;
        font-size: 30px;
        text-decoration: overline;
        letter-spacing: 2px;
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
`;

export default Header;
