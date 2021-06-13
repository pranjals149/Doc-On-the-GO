import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../../firebase'
import styled from 'styled-components'

function Comment({ id, username }) {

    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])

    useEffect(() => {
        let unsubscribe;
        if (id) {
            unsubscribe = db
                .collection("articles")
                .doc(id)
                .collection("comments")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }

        return () => {
            unsubscribe();
        };
    }, [id]);

    const postComment = (e) => {
        e.preventDefault()

        db.collection("articles").doc(id).collection("comments").add({
            text: comment,
            username: username,
        });
        setComment("");
    }

    return (
        <div>

            <PostComments>
                {comments.map((comment) => (
                    <p>
                        <b>{comment.username}</b> {comment.text}
                    </p>
                ))}
            </PostComments>

            <CommentBox className="post__commentBox">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                    style={{
                        cursor: comment ? "pointer" : "not-allowed"
                    }}
                >
                    Post
                </button>
            </CommentBox>

        </div>
    )
}

const PostComments = styled.div`
    padding: 10px;
    text-align: left;
`

const CommentBox = styled.div`
    display: flex;
    margin-top: 10px;

    input {
        flex: 1;
        border: none;
        padding: 10px;
        border-top: 1px solid lightgray;
    }

    button {
        border: none;
        border-top: 1px solid lightgray;
        color: #6082a3;
        background-color: transparent;
        flex: 0;
    }
`

export default Comment
