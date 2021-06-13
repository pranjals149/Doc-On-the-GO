import React from 'react'
import { useHistory } from 'react-router';
import styled from 'styled-components';

function Resources() {

    const history = useHistory()

    return (
        <CardContainer>
            <Card onClick={() => history.push('/hospitals')}>
                <img src="https://images.unsplash.com/photo-1618882346649-492fa8b96295?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="Avatar" style={{ width: "100%" }} />

                <Container>
                    <h4>Hospitals and Beds</h4>
                </Container>
            </Card>

            <Card onClick={() => history.push('/medicines')}>
                <img src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80" alt="Avatar" style={{ width: "100%" }} />

                <Container>
                    <h4>Medicines</h4>
                </Container>
            </Card>

            <Card onClick={() => history.push('/oxygen')}>
                <img src="https://images.unsplash.com/photo-1615486510988-2c6ecc66ceba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="Avatar" style={{ width: "100%" }} />

                <Container>
                    <h4>Oxygen</h4>
                </Container>
            </Card>

            <Card onClick={() => history.push('/food')}>
                <img src="https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="Avatar" style={{ width: "100%" }} />

                <Container>
                    <h4>Food</h4>
                </Container>
            </Card>
        </CardContainer>
    )
}

const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    width: 25%;
    padding: 20px;
    margin: 20px;
    cursor: pointer;

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    img {
        border-radius: 5px 5px 0 0;
    }
`

const Container = styled.div`
    padding: 2px 16px;

    h4 {
        text-align: center;
        text-transform: uppercase;
    }

    a {
        text-decoration: none;
        color: black;
    }
`;

const CardContainer = styled.div`
    display: flex;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

export default Resources
