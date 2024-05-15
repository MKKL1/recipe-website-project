import {Recipe} from "../../models/Recipe.ts";
import {useRecipeContext} from "../../contexts/RecipeContext.tsx";
import {ref} from "yup";
import {Button, Stack} from "react-bootstrap";
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import Editor from "./RecipeEditor.tsx";

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
                {
                    isAuth && user.id === recipe.author_id &&
                    <div>
                        <Button onClick={onEdit}>Edit</Button>
                        <Button onClick={onDelete} variant="danger">Delete</Button>
                    </div>
                }
            </span>
            {/* Include basic info */}
            <p>{recipe.title}</p>
            <p>{recipe.author_id}</p>
            {/* Display content */}
            <Editor onSave={() => {}} initData={recipe.content} readOnly={true}/>
            {/*  Comments section  */}
            <h1>Comments</h1>
        </Stack>
    );
}