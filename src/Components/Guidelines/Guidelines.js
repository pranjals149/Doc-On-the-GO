import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';

function Guidelines() {
    return (
        <CardContainer>
            <img src="https://unamo.com/blog/wp-content/uploads/2016/09/redirects-640x250.png" alt="Avatar" style={{ width: "100%" }} />
            <Container>
                <Button variant="contained" color="primary">
                    <a href="https://www.mohfw.gov.in/" target="_blank" rel="noopener noreferrer">Redirect to Official Guidelines</a>
                </Button>
            </Container>
        </CardContainer>
    )
}

const CardContainer = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 40%;
    margin: 0 auto;
    margin-top: 20px;
    padding: 20px;

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`

const Container = styled.div`
    padding: 20px;
    text-align: center;

    a {
        outline: none;
        text-decoration: none;
        color: whitesmoke;
    }
`

export default Guidelines
