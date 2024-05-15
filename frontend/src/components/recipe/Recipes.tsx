import RecipesList from "./RecipesList.tsx";
import RecipeDetails from "./RecipeDetails.tsx";
import {Stack} from "react-bootstrap";
import {RecipeProvider} from "../../contexts/RecipeContext.tsx";

export default function Recipes(){

    return (
        <RecipeProvider>
            <Stack direction="horizontal">
                <Stack>
                    <h1>Recipes: </h1>
                    <RecipesList/>
                </Stack>
                <RecipeDetails/>
            </Stack>
        </RecipeProvider>
    );
}