import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {Button, Card, DropdownButton, DropdownItem, Stack} from "react-bootstrap";
import axios from "axios";
import {environment} from "../../../environment.ts";
import {Comment} from "../../models/Comment.ts";
import {useNotificationContext} from "../../contexts/NotificationContext.tsx";
import {Variant} from "../../models/Variant.ts";
import "../../styles/Comment.css";

export default function CommentElement({comment, onDelete, onEdit}: {comment: Comment, onDelete: any, onEdit: any}) {
    const {user, isAuth, token} = useAuthContext();
    const {pushNotification} = useNotificationContext();

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
                pushNotification("Error during deleting comment", Variant.danger);
            });
    }


    return(
        <Card className="m-2">
            <Card.Body>
                <Stack direction="horizontal">
                    <Stack>
                        <div className="comment">
                            <p className="mb-0 me-3">{comment.author.username}</p>
                            <p className="mb-0">{comment.edited ?
                                new Date(comment.updatedAt).toLocaleString('pl-PL') :
                                new Date(comment.createdAt).toLocaleString('pl-PL')}</p>
                        </div>
                        <p className="mt-3">{comment.content}</p>
                    </Stack>
                    {
                        user.id === comment.author._id && isAuth &&
                        <div>
                            <DropdownButton title="More" variant="secondary">
                                <DropdownItem onClick={editComment}>Edit</DropdownItem>
                                <DropdownItem onClick={deleteComment}>Delete</DropdownItem>
                            </DropdownButton>
                        </div>
                    }
                </Stack>
            </Card.Body>
        </Card>
    );
}