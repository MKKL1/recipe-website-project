import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {Button, Card, DropdownButton, DropdownItem, Stack} from "react-bootstrap";
import axios from "axios";
import {environment} from "../../../environment.ts";
import {Comment} from "../../models/Comment.ts";

export default function CommentElement({comment, onDelete, onEdit}: {comment: Comment, onDelete: any, onEdit: any}) {
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
        <Card className="m-2">
            <Card.Body>
                <Stack direction="horizontal">
                    <Stack>
                        <Stack direction="horizontal">
                            <h5 className="mb-0 me-3">{comment.user_id}</h5>
                            <h5 className="mb-0">{comment.edited ? comment.updatedAt.toLocaleString() : comment.createdAt.toLocaleString()}</h5>
                        </Stack>
                        <p>{comment.content}</p>
                    </Stack>
                    {
                        user.id === comment.user_id && isAuth &&
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