import { useEffect, useState } from "react";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectUserName, selectUserPhoto } from "../../features/user/userSlice";
import { db } from "../../firebase";
import PostModal from '../PostModal/PostModal'
import ReactTimeago from 'react-timeago';
import FlipMove from 'react-flip-move';
import Comment from "./Comment";

const Main = (props) => {
  const userPhoto = useSelector(selectUserPhoto)
  const username = useSelector(selectUserName)

  const [showModal, setShowModal] = useState("close")
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    db
      .collection("articles")
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setArticles(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
  }, [])

  const handleClick = (e) => {
    e.preventDefault();

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;

      case "close":
        setShowModal("open");
        break;

      default:
        setShowModal("close");
        break;
    }
  }

  return (
    <>
      <Container>

        <ScrollUpButton />

        <marquee behavior="scroll" direction="left">
          <strong> ATTENTION</strong> - Protect yourself from fake news, not just corona virus !!
        </marquee>

        <ShareBox>
          <div>
            {username ? <img src={userPhoto} alt="" /> : <img src="/images/user.svg" alt="" />}

            <button onClick={handleClick}>Start a POST</button>
          </div>

          <div>
            <button onClick={handleClick}>
              <img src="/images/photo.svg" alt="" />
              <span>Photo</span>
            </button>

            <button onClick={handleClick}>
              <img src="/images/article.svg" alt="" style={{ width: "40px" }} />
              <span>Write Article</span>
            </button>
          </div>
        </ShareBox>

        <div>
          <FlipMove>
            {
              articles.length > 0 ? articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.post.image} alt="" />
                      <div>
                        <span style={{ color: "black" }}>{article.post.title}</span>
                        <span>{article.post.email}</span>
                        <span>
                          <ReactTimeago
                            date={new Date(article.post.timestamp?.toDate()).toUTCString()}
                          />
                        </span>
                      </div>
                    </a>
                  </SharedActor>

                  <Description>
                    {article.post.description}
                  </Description>

                  <SharedImg>
                    <a>
                      {
                        !article.post.imageUrl && article.post.video ?
                          <ReactPlayer width={'100%'} url={article.post.video} />
                          :
                          (
                            article.post.imageUrl &&
                            <img src={article.post.imageUrl} alt="" />
                          )
                      }
                    </a>

                  </SharedImg>

                  <Comment
                    id={article.id}
                    username={username}
                  />

                </Article>
              )) : <h1>No Posts yet !! Be the first one to Post</h1>
            }

          </FlipMove>
        </div>

        <PostModal showModal={showModal} handleClick={handleClick} />

      </Container>
    </>
  );
};

const Container = styled.div`
  grid-area: main;

  marquee {
    color: red;
    font-style: italic;
    letter-spacing: 1.5px;
    font-size: 20px;
  }
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      cursor: pointer;
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0 16px;

      img {
        width: 40px;
        border-radius: 50%;
        margin-right: 8px;
      }

      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px; 
        }
      }
    }
  }
`

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;

  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      
      span {
        text-align: left;

        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n+1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
`

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`

export default Main;
