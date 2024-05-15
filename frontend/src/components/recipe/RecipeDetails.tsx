import {Recipe} from "../../models/Recipe.ts";
import {useRecipeContext} from "../../contexts/RecipeContext.tsx";
import {ref} from "yup";
import {Button, Stack} from "react-bootstrap";
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import Editor from "./RecipeEditor.tsx";
import Comments from "../comment/Comments.tsx";
import {environment} from "../../../environment.ts";

export default function RecipeDetails(){
    const {recipe} = useRecipeContext();
    const {user, isAuth} = useAuthContext();

    function onEdit(){
        console.log("Editing...");
        // add editing
    }

    function onDelete(){
        console.log("Deleting...");
        // add deleting
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
                        <Button onClick={onDelete} variant="danger">Delete</Button>
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
        </Stack>
    );
}