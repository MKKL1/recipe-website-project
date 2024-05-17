import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {Button, Modal, Stack} from "react-bootstrap";
import {useEffect, useState} from "react";
import CommentForm from "./CommentForm.tsx";
import {RecipeOverview} from "../../models/RecipeOverview.ts";
import RecipeElement from "../recipe/RecipeElement.tsx";
import {Comment} from "../../models/Comment.ts";
import CommentElement from "./CommentElement.tsx";

export default function Comments({commentsProp, recipeId}){
    const {isAuth} = useAuthContext();
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    // comments is not a function - for some reason it won't render list
    useEffect(() => {
        console.log(commentsProp);
        setComments(commentsProp);
        console.log(comments);
    }, [commentsProp]);

    return (
        <>
            <h1>Comments</h1>
            {
               isAuth &&
                <div>
                    <Button onClick={handleShowModal}>Add comment</Button>
                    <CommentForm show={showModal} handleClose={handleCloseModal} recipeId={recipeId}/>
                </div>
            }
            <Stack>
                {
                    comments.map((comment) => (
                        <CommentElement key={comment._id} comment={comment}/>
                    ))
                }
            </Stack>
        </>
    );
}