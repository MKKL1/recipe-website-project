import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import {environment} from "../../../environment.ts";
import {useRecipeContext} from "../../contexts/RecipeContext.tsx";
import {useAuthContext} from "../../contexts/AuthContext.tsx";

export default function CommentForm({show, handleClose}){
    const [message, setMessage] = useState('');
    const {recipe} = useRecipeContext();
    const {token} = useAuthContext();

    async function addComment(e: any){
        e.preventDefault();

        if(message.length < 3){
            return
        }

        axios.post(environment.apiUrl + "recipe/" + recipe._id + "/comments",
            {content: message},
            {headers: { Authorization: `Bearer ${token}`}})
            .then(res => {
                // add new comment to ui
                // add confirm message
                handleClose();
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Your comment</Form.Label>
                        <Form.Control type="text" name="content" placeholder="Enter your comment" onChange={(e) => setMessage(e.target.value)}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addComment}>
                        Add comment
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}