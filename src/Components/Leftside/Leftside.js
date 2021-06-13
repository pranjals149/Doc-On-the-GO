import styled from "styled-components";
import {
  selectUserName,
  selectUserPhoto,
} from "../../features/user/userSlice";
import { useSelector } from 'react-redux'

const Leftside = (props) => {

  const username = useSelector(selectUserName)
  const userPhoto = useSelector(selectUserPhoto)

  return (
    <Container>

      <ArtCard>
        <UserInfo>
          <CardBackground />
          <a>
            {userPhoto ? <Photo src={userPhoto} /> : <Photo src="/images/user.svg" />}

            {username ?
              <Link>
                Welcome, {username}
              </Link>
              :
              <Link>
                Welcome
              </Link>
            }
          </a>
        </UserInfo>
      </ArtCard>

      <ImgContainer>
        <img src="/images/U.png" alt="" />
      </ImgContainer>

      <ImgContainer>
        <img src="/images/fake-news.jpeg" alt="" />
      </ImgContainer>

      <ImgContainer>
        <img src="https://images.unsplash.com/photo-1593007791459-4b05e1158229?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="" />
      </ImgContainer>

      <ImgContainer>
        <img src="https://images.unsplash.com/photo-1585997091460-8ed8ae2282cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=731&q=80" alt="" />
      </ImgContainer>

      <ImgContainer>
        <img src="https://images.unsplash.com/photo-1585222515068-7201a72c4181?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80" alt="" />
      </ImgContainer>

      <ImgContainer>
        <img src="https://images.unsplash.com/photo-1585417238790-f6d290d6490c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=808&q=80" alt="" />
      </ImgContainer>

    </Container>
  );
};

const Container = styled.div`
  grid-area: leftside;
`;

const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
`;

const CardBackground = styled.div`
  background: url("https://images.unsplash.com/photo-1602096933111-f11679566597?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80");
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;

const Photo = styled.img`
  box-shadow: none;
  /* background-image: url("/images/photo.svg"); */
  width: 72px;
  height: 72px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-position: center;
  background-size: 60%;
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -38px auto 12px;
  border-radius: 50%;
`;

const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

const ImgContainer = styled.div`
  width: 100%;

  img {
    width: 100%;
    border-radius: 10px;
  }
`

export default Leftside;
