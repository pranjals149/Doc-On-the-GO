import React from 'react'
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ContactUs from '../ContactUs/ContactUs';

const Rightside = (props) => {

    const history = useHistory()

    return (
        <Container>
            <FollowCard>
                <Title>
                    <h1>OUR SERVICES</h1>
                </Title>

                <FeedList>

                    <li onClick={() => history.push('/symptoms')}>
                        <a>
                            <Avatar style={{
                                backgroundImage: "url('https://images.unsplash.com/photo-1597926575506-1cfcc11283bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80')"
                            }} />
                        </a>
                        <div style={{ textAlign: "left" }}>
                            <span>Symptom Checker and Self report generator</span>
                        </div>
                    </li>

                    <li onClick={() => history.push('/fetchReports')}>
                        <a>
                            <Avatar style={{
                                backgroundImage: "url('https://images.unsplash.com/flagged/photo-1558963675-94dc9c4a66a9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=333&q=80')"
                            }} />
                        </a>
                        <div style={{ textAlign: "left" }}>
                            <span>Fetch your previously generated report</span>
                        </div>
                    </li>

                    <li onClick={() => history.push('/allExperts')}>
                        <a>
                            <Avatar style={{
                                backgroundImage: "url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80')"
                            }} />
                        </a>
                        <div style={{ textAlign: "left" }}>
                            <span>Book an appointment with our experts</span>
                        </div>
                    </li>

                    <li onClick={() => history.push('/prescriptions')}>
                        <a>
                            <Avatar style={{
                                backgroundImage: "url('https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80')"
                            }} />
                        </a>
                        <div style={{ textAlign: "left" }}>
                            <span>Your Prescriptions</span>
                        </div>
                    </li>

                    <li onClick={() => history.push('/resources')}>
                        <a>
                            <Avatar
                                style={{
                                    backgroundImage: "url('https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80')"
                                }}
                            />
                        </a>
                        <div>
                            <span>Available Resources</span>
                        </div>
                    </li>

                    <li onClick={() => history.push('/helpline')}>
                        <a>
                            <Avatar
                                style={{
                                    backgroundImage: "url('https://images.unsplash.com/photo-1500099817043-86d46000d58f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80')"
                                }}
                            />
                        </a>
                        <div>
                            <span>Helplines (Life Saviour)</span>
                        </div>
                    </li>

                    <li onClick={() => history.push('/guidelines')}>
                        <a>
                            <Avatar
                                style={{
                                    backgroundImage: "url('https://images.unsplash.com/photo-1477408326134-9b64b5934e46?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80')"
                                }}
                            />
                        </a>
                        <div>
                            <span>Covid-19 Guidelines</span>
                        </div>
                    </li>

                    <li onClick={() => history.push('/volunteer')}>
                        <a>
                            <Avatar
                                style={{
                                    backgroundImage: "url('https://images.unsplash.com/photo-1556413084-41a81ea2ade7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80')"
                                }}
                            />
                        </a>
                        <div>
                            <span>Want to Volunteer ?</span>
                        </div>
                    </li>

                </FeedList>

            </FollowCard>

            {/* Contact US */}
            <ContactUs />

        </Container>
    );
};

const Container = styled.div`
  grid-area: rightside;
`;

const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding: 12px;
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  width: 100%;
  text-decoration: overline;
`;

const FeedList = styled.ul`
  margin-top: 16px;

  li {
    display: flex;
    align-items: center;
    margin: 12px 0;
    position: relative;
    font-size: 14px;
    cursor: pointer;
    font-weight: 600;
    border-radius: 15px;
    background-color: whitesmoke;
    padding: 20px;

    & > div {
      display: flex;
      flex-direction: column;
    }

    button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
      padding: 16px;
      align-items: center;
      border-radius: 15px;
      box-sizing: border-box;
      font-weight: 600;
      display: inline-flex;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
    }
  }
`;

const Avatar = styled.div`
  background-image: url("https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 48px;
  height: 48px;
  margin-right: 8px;
  border-radius: 99px;
`;

export default Rightside;