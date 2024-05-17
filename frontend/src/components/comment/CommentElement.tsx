import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {Button} from "react-bootstrap";
import axios from "axios";
import {environment} from "../../../environment.ts";

export default function CommentElement({comment, onDelete, onEdit}){
    const {user, isAuth, token} = useAuthContext();

    function editComment(){
        onEdit(comment);
    }

    function deleteComment(){
        axios.delete(environment.apiUrl + "recipe/" + comment.recipe_id + "/comments/" + comment._id,
            {headers: { Authorization: `Bearer ${token}`}})
            .then(res => {
                onDelete(comment._id);
            })
            .catch(err => {
                console.error(err);
            });
    }

    return(
        <>
            <h1>{comment.content}</h1>
            {
                user.id === comment.user_id && isAuth &&
                    <div>
                        <Button onClick={editComment}>Edit</Button>
                        <Button onClick={deleteComment}>Delete</Button>
                    </div>
            }
        </>
    );
}