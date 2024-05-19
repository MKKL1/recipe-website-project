import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {environment} from "../../../environment.ts";
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {useNotificationContext} from "../../contexts/NotificationContext.tsx";
import {Variant} from "../../models/Variant.ts";

export default function CommentForm({show, handleClose, recipeId, isEditting, comment}){
    const [message, setMessage] = useState('');
    const {pushNotification} = useNotificationContext();
    const {token} = useAuthContext();

    useEffect(() => {
        console.log(comment);

        if(isEditting && comment !== null){
            setMessage(comment.content);
        }
    }, [isEditting]);

    async function addComment(e: any){
        e.preventDefault();

        if(message.length < 3){
            pushNotification("Message must have at least 3 characters", Variant.danger);
            return;
        }

        if(isEditting){
            axios.put(environment.apiUrl + "recipe/" + recipeId + "/comments/" + comment._id,
                {content: message},
                {headers: { Authorization: `Bearer ${token}`}})
                .then(res => {
                    handleClose(false, res.data);
                    setMessage("");
                })
                .catch(err => {
                    console.log(err);
                    pushNotification("Error during editing comment", Variant.danger);
                });
        } else {
            axios.post(environment.apiUrl + "recipe/" + recipeId + "/comments",
                {content: message},
                {headers: { Authorization: `Bearer ${token}`}})
                .then(res => {
                    // close modal and display new element in comments list
                    handleClose(true, res.data);
                    setMessage("");
                })
                .catch(err => {
                    console.log(err);
                    pushNotification("Error during adding comment", Variant.danger);
                });
        }
    }

    return (
        <>
            <Modal show={show} size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
                   onHide={() => {
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