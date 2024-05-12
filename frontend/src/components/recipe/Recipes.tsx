import RecipesList from "./RecipesList.tsx";
import RecipeDetails from "./RecipeDetails.tsx";
import {Stack} from "react-bootstrap";

export default function Recipes(){


    return (
        <Stack direction="horizontal">
            <Stack>
                <h1>Recipes: </h1>
                <RecipesList/>
            </Stack>
            <RecipeDetails/>
        </Stack>
    );
}