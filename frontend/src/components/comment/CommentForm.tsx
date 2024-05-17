import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {environment} from "../../../environment.ts";
import {useAuthContext} from "../../contexts/AuthContext.tsx";

export default function CommentForm({show, handleClose, recipeId, isEditting, comment}){
    const [message, setMessage] = useState('');
    const {token} = useAuthContext();

    useEffect(() => {
        console.log(comment);

        if(isEditting && comment !== null){
            setMessage(comment.content);
        }
    }, [isEditting]);

    async function addComment(e: any){
        e.preventDefault();

        // handle error in gui
        if(message.length < 3){
            return;
        }

        if(isEditting){
            axios.put(environment.apiUrl + "recipe/" + recipeId + "/comments/" + comment._id,
                {content: message},
                {headers: { Authorization: `Bearer ${token}`}})
                .then(res => {
                    console.log(res);
                    handleClose(false, res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            axios.post(environment.apiUrl + "recipe/" + recipeId + "/comments",
                {content: message},
                {headers: { Authorization: `Bearer ${token}`}})
                .then(res => {
                    // close modal and display new element in comments list
                    handleClose(true, res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    return (
        <>
            <Modal show={show} onHide={() => {
                    setMessage("");
                    handleClose();
                }
            }>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditting ? "Edit your comment" : "Add new comment"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Your comment</Form.Label>
                        <Form.Control as="textarea" type="text" name="content" value={message} placeholder="Enter your comment" onChange={(e) => setMessage(e.target.value)}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setMessage("");
                        handleClose();
                        }
                    }>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addComment}>
                        {isEditting ? "Edit comment" : "Add comment"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}