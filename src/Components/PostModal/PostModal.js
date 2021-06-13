import React, { useState } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'

import { selectUserName, selectUserPhoto, selectUserEmail } from '../../features/user/userSlice'
import { useSelector } from 'react-redux'
import firebase from 'firebase'
import { db, storage } from '../../firebase'
import { toast } from 'react-toastify'
import { Button } from '@material-ui/core'

function PostModal(props) {

    const [editorText, setEditorText] = useState("")
    const [shareImage, setShareImage] = useState("")
    const [videoLink, setVideoLink] = useState("")
    const [assetArea, setAssetArea] = useState("")

    const userPhoto = useSelector(selectUserPhoto)
    const username = useSelector(selectUserName)
    const userEmail = useSelector(selectUserEmail)

    const handleChange = (e) => {
        const image = e.target.files[0];

        if (image === "" || image === undefined) {
            alert(`Not a image, the given image file is a ${typeof image}`)
            return;
        }

        setShareImage(image);
    }

    const switchAssetArea = (area) => {
        setShareImage("")
        setVideoLink("")
        setAssetArea(area);
    }

    const postArticle = (e) => {
        e.preventDefault()

        if (e.target !== e.currentTarget) {
            return;
        }

        if (shareImage) {
            const upload = storage
                .ref(`images/${userEmail}/${shareImage.name}`).put(shareImage)

            upload.on('state_change', null, (error) => {
                console.log(error);
            }, () => {
                storage.ref('images').child(userEmail).child(shareImage.name).getDownloadURL().then((url) => {
                    db.collection('articles').add({
                        imageUrl: url,
                        image: userPhoto,
                        title: username,
                        email: userEmail,
                        description: editorText,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                })
            }
            )
        }
        else {
            db.collection('articles').add({
                title: username,
                image: userPhoto,
                email: userEmail,
                description: editorText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }

        if (videoLink) {
            db.collection('articles').add({
                video: videoLink,
                title: username,
                image: userPhoto,
                email: userEmail,
                description: editorText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }

        toast.success("Your post was posted successfully!");


        reset(e);
    }

    const reset = (e) => {
        setEditorText("");
        setShareImage("")
        setVideoLink("")
        switchAssetArea("")
        props.handleClick(e);
    }

    return (
        <>
            { props.showModal === "open" &&
                <Container>
                    <Content>
                        <Header>
                            <h2>Create a Post</h2>
                            <button onClick={(e) => reset(e)}>
                                <img src="/images/close-icon.svg" alt="" />
                            </button>
                        </Header>

                        <SharedContent>
                            <UserInfo>

                                {userPhoto ?
                                    <img src={userPhoto} alt="" />
                                    :
                                    <img src="/images/user.svg" alt="" />}

                                <span>{username}</span>
                            </UserInfo>

                            <Editor>
                                <textarea
                                    value={editorText}
                                    onChange={(e) => setEditorText(e.target.value)}
                                    placeholder="What do you want to post about ?"
                                    autofocus={true}
                                />

                                {assetArea === 'image' ?
                                    <UploadImage>
                                        <input
                                            type="file"
                                            accept="image/gif, image/jpeg, image/png, image/jpg"
                                            name="image"
                                            id="file"
                                            style={{
                                                display: "none"
                                            }}
                                            onChange={handleChange}
                                        />
                                        <Button variant="contained" color="primary">
                                            <p>
                                                <label
                                                    htmlFor="file"
                                                    style={{
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    {/* Select an image to share */}

                                                    Select an image to share

                                            </label>
                                            </p>
                                        </Button>

                                        {shareImage &&
                                            <img src={URL.createObjectURL(shareImage)} alt="" />
                                        }
                                    </UploadImage>
                                    :
                                    assetArea === "media" &&
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Please input a video link"
                                            value={videoLink}
                                            onChange={(e) => setVideoLink(e.target.value)}
                                        />
                                        {
                                            videoLink && <ReactPlayer
                                                width={"100%"}
                                                url={videoLink}
                                            />
                                        }
                                    </>
                                }

                            </Editor>
                        </SharedContent>

                        <ShareCreation>
                            <AttachAssets>
                                <AssetButton onClick={() => switchAssetArea('image')}>
                                    <p>Image</p>
                                </AssetButton>

                                <AssetButton onClick={() => switchAssetArea('media')}>
                                    <p>Video</p>
                                </AssetButton>
                            </AttachAssets>

                            <ShareComment>
                                <AssetButton>
                                    <img src="/images/eye.svg" alt="" />
                                    Public
                                </AssetButton>
                            </ShareComment>

                            <PostButton
                                disabled={!editorText ? true : false}
                                onClick={(e) => postArticle(e)}
                            >
                                POST
                            </PostButton>

                        </ShareCreation>
                    </Content>
                </Container>
            }
        </>
    )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    color: black;
    background-color: rgba(0 , 0, 0, 0.8);
    animation: fadeIn 0.3s;
`

const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;

    @media (max-width: 768px) {
        margin: 0;
        padding: 0;
        width: 100vw;
        top: 30%,
    }
`

const Header = styled.div`
    display: block;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0,0,0,0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        height: 40px;
        width: 40px;
        min-width: auto;
        color: rgba(0,0,0,0.15);
        cursor: pointer;

        svg, img {
            pointer-events: none;
        }
    }
`

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;

    svg, img {
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }

    span {
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`

const ShareCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`

const AssetButton = styled.button`
    display: flex; 
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.5);
`

const AttachAssets = styled.div`
    align-items: center;
    display: flex;
    padding-right: 8px;

    ${AssetButton} {
        width: 50px;
    }
`

const ShareComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.15);

    ${AssetButton} {
        img {
            width: 20px;
            margin-right: 5px;
        }
    }
`

const PostButton = styled.button`
    min-width: 60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${(props) => (props.disabled ? "whitesmoke" : "rgba(0,0,0,0.8)")};
    color: ${(props) => (props.disabled ? "black" : "white")};
    /* color: rgba(0,0,0,0.6); */
    border: none;
    cursor: pointer;
`

const Editor = styled.div`
    padding: 12px 24px;
    
    textarea {
        width: 100%;
        min-height: 100px;
        resize: none;
    }

    input {
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;
    }
`

const UploadImage = styled.div`
    text-align: center;

    img {
        width: 100%;
    }
`

export default PostModal;
