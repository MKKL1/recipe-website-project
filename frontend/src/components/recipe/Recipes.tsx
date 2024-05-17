import RecipesList from "./RecipesList.tsx";
import {Stack} from "react-bootstrap";

export default function Recipes(){

    return (
        <Stack>
            <h1>Recipes: </h1>
            <RecipesList/>
        </Stack>
    );
}