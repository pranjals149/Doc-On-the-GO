import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

function Food() {

    const [food, setFood] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        axios.get('https://life-api.coronasafe.network/data/food_v2.json')
            .then((res) => {
                setFood(res.data.data)
            }).catch((err) => alert(err.message))
    }, [])

    return (
        <div>
            <Heading>
                FOOD
            </Heading>

            <SearchItem>

                <SearchIcon />
                <TextField
                    placeholder="Search by State name"
                    fullWidth
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </SearchItem>

            {food.filter((val) => {
                if (search === "") return val;
                else if (val.state.toLowerCase().includes(search.toLowerCase())) return val;
            }).map(st => (
                <>
                    <HelpLineContainer>
                        <HelpLineData>
                            <p><strong>State</strong> - {st.state}</p>
                        </HelpLineData>

                        <HelpLineData>
                            <p><strong>District</strong> - {st.district}</p>
                        </HelpLineData>

                        <HelpLineData>
                            <p><strong>Data Name</strong> - {st.data_name}</p>
                        </HelpLineData>

                        <HelpLineData>
                            <p><strong>City</strong> - {st.city}</p>
                        </HelpLineData>

                        <HelpLineData>
                            <p><strong>Description</strong> - {st.description}</p>
                        </HelpLineData>

                        <HelpLineData>
                            <p><strong>Contact</strong> - {st?.phone_1}</p>
                        </HelpLineData>

                        <HelpLineData>
                            <p><strong>Alternate Contact</strong> - {st?.phone_2}</p>
                        </HelpLineData>

                        <HelpLineData>
                            <p><strong>Title</strong> - {st?.title}</p>
                        </HelpLineData>

                        <HelpLineData>
                            <p><strong>Address</strong> - {st?.address}</p>
                        </HelpLineData>

                        <HelpLineData>
                            <p><strong>PIN Code</strong> - {st?.pin_code}</p>
                        </HelpLineData>

                    </HelpLineContainer>
                </>
            ))}
        </div>
    )
}

const HelpLineContainer = styled.div`
    padding: 20px;
    background-color: white;
    border-radius: 20px;
    margin: 20px;
    transition-duration: 0.4s;
    transition-property: transform;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;

    &:hover {
        transform: scale(1.01);
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`

const HelpLineData = styled.div`
    padding: 5px;
`

const Heading = styled.h1`
    text-align: center;
    font-size: 26px;
    letter-spacing: 2px;
`

const SearchItem = styled.div`
    margin: 0 auto;
    display: flex;
    width: 50%;

    svg {
        margin: 5px;
    }
`

export default Food
