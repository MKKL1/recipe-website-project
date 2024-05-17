import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {Button, Modal, Stack} from "react-bootstrap";
import {useEffect, useState} from "react";
import CommentForm from "./CommentForm.tsx";
import {Comment} from "../../models/Comment.ts";
import CommentElement from "./CommentElement.tsx";

export default function Comments({commentsProp, recipeId}){
    const {isAuth} = useAuthContext();
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isEditting, setIsEditting] = useState(false);
    const [commentToEdit, setCommentToEdit] = useState<Comment | null>(null);

    useEffect(() => {
        setComments(commentsProp);
    }, [commentsProp]);

    const handleCloseModal = (added: boolean, comment?: Comment) =>{
        console.log('test');
        setIsEditting(false);
        setCommentToEdit(null);
        setShowModal(false);
        if(comment){
            if(added){
                setComments([comment, ...comments]);
            } else {
                // update comment
                console.log(comment)
                const editedComments = comments.map(com => {
                    return comment._id === com._id ? comment : com
                });

                console.log(editedComments);
                setComments(editedComments);
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
    }

    return (
        <>
            <h1>Comments</h1>
            {
               isAuth &&
                <div>
                    <Button onClick={handleShowModal}>Add comment</Button>
                    <CommentForm show={showModal} handleClose={handleCloseModal} recipeId={recipeId} isEditting={isEditting} comment={commentToEdit}/>
                </div>
            }
            <Stack>
                {
                    comments.map((comment: Comment) => (
                        <CommentElement key={comment._id} comment={comment} onDelete={onCommentDelete} onEdit={handleCommentEdit}/>
                    ))
                }
            </Stack>
        </>
    );
}