import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {Button, Modal, Stack} from "react-bootstrap";
import {useEffect, useState} from "react";
import CommentForm from "./CommentForm.tsx";
import {Comment} from "../../models/Comment.ts";
import CommentElement from "./CommentElement.tsx";
import {useNotificationContext} from "../../contexts/NotificationContext.tsx";
import {Variant} from "../../models/Variant.ts";

export default function Comments({commentsProp, recipeId}){
    const {isAuth} = useAuthContext();
    const {pushNotification} = useNotificationContext();
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isEditting, setIsEditting] = useState(false);
    const [commentToEdit, setCommentToEdit] = useState<Comment | null>(null);

    useEffect(() => {
        setComments(commentsProp);
    }, [commentsProp]);

    const handleCloseModal = (added: boolean, comment?: Comment) =>{
        setIsEditting(false);
        setCommentToEdit(null);
        setShowModal(false);

        if(comment){
            if(added){
                setComments([comment, ...comments]);
                pushNotification("Comment added", Variant.success);
            } else {
                // update comments
                const editedComments = comments.map(com => comment._id === com._id ? comment : com);
                setComments(editedComments);
                pushNotification("Comment edited", Variant.info);
            }
        }
    }
    const handleShowModal = () => setShowModal(true);

    function handleCommentEdit(comment: Comment){
        setIsEditting(true);
        setCommentToEdit(comment);
        handleShowModal();
    }

    function onCommentDelete(id: string){
        const filteredComments = comments.filter(comment => comment._id !== id);
        setComments(filteredComments);
        pushNotification("Deleted comment", Variant.danger);
    }

    return (
        <div>
            <Stack direction="horizontal">
                <h1>Comments</h1>
                {
                    isAuth &&
                    <div className="ms-auto">
                        <Button onClick={handleShowModal}>Add comment</Button>
                        <CommentForm show={showModal} handleClose={handleCloseModal} recipeId={recipeId} isEditting={isEditting} comment={commentToEdit}/>
                    </div>
                }
            </Stack>
            {
                comments.length === 0 ?
                    <div></div>
                    :
                    <Stack>
                        {
                            comments.map((comment: Comment) => (
                                <CommentElement key={comment._id} comment={comment} onDelete={onCommentDelete} onEdit={handleCommentEdit}/>
                            ))
                        }
                    </Stack>
            }
        </div>
    );
}