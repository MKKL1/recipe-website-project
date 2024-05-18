import RecipesList from "./RecipesList.tsx";
import {Stack} from "react-bootstrap";

export default function Recipes(){

    return (
        <Stack>
            <h1 className="text-center" style={{marginBottom: '50px', marginTop: '50px'}}>Recipes: </h1>
            <RecipesList/>
        </Stack>
    );
}