import {Recipe} from "../../models/Recipe.ts";
import {Button, Modal, Stack} from "react-bootstrap";
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import Editor from "./RecipeEditor.tsx";
import Comments from "../comment/Comments.tsx";
import {environment} from "../../../environment.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function RecipeDetails(){
    const navigate = useNavigate();
    const location = useLocation();
    const {user, isAuth, token} = useAuthContext();

    const [recipe, setRecipe] = useState(new Recipe('','','',[],''));
    const [showConfirm, setShowConfirm] = useState(false);

    const handleCloseConfirm = () => setShowConfirm(false);
    const handleShowConfirm = () => setShowConfirm(true);

    useEffect(() => {
        axios.get(environment.apiUrl + "recipe/" + location.state.recipeId)
            .then(res => {
                setRecipe(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    }, []);

    function onEdit(){
        console.log("Editing...");
        // add editing
        navigate('/add', {
            state: {
                update: true,
                recipe: recipe
            }
        });
    }

    function onDelete(){
        console.log("Deleting...");
        // add deleting
        axios.delete(environment.apiUrl + "recipe/" + recipe._id,
            {headers: { Authorization: `Bearer ${token}`}})
            .then(res => {
                console.log(res);
                navigate('/recipes');
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Stack>
            <span>
                <h1>Details</h1>
                <img src={environment.apiUrl + "image/" + recipe.image_id} alt={recipe.title}
                style={{width: 300, height: 300}}/>
                {
                    isAuth && user.id === recipe.author_id &&
                    <div>
                        <Button onClick={onEdit}>Edit</Button>
                        <Button onClick={() => setShowConfirm(true)} variant="danger">Delete</Button>
                    </div>
                }
            </span>
            {/* Include basic info - lacking id for some reason */}
            <p> title {recipe.title}</p>
            <p> id {recipe._id}</p>
            <p>image {recipe.image_id}</p>
            <p> author {recipe.author_id}</p>
            {/* Display content */}
            <Editor onSave={() => {}} initData={recipe.content} readOnly={true}/>
            {/*  Comments section  */}
            <Comments/>
            {/* Modal for delete confirmation*/}
            <Modal show={showConfirm} onHide={handleCloseConfirm} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Are you sure you want to delete this recipe?</h1>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirm}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={onDelete}>
                        Delete recipe
                    </Button>
                </Modal.Footer>
            </Modal>
        </Stack>
    );
}