import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {Button, Modal} from "react-bootstrap";
import CommentsList from "./CommentsList.tsx";
import {useState} from "react";
import CommentForm from "./CommentForm.tsx";

export default function Comments(){
    const {isAuth} = useAuthContext();
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    return (
        <>
            <h1>Comments</h1>
            {
               isAuth &&
                <div>
                    <Button onClick={handleShowModal}>Add comment</Button>
                    <CommentForm show={showModal} handleClose={handleCloseModal}/>
                </div>
            }
            <CommentsList/>
        </>
    );
}