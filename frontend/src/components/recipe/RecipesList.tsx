import {RecipeOverview} from "../../models/RecipeOverview.ts";
import RecipeElement from "./RecipeElement.tsx";
import {Stack} from "react-bootstrap";

export default function RecipesList(){
    // fetch from backend
    const recipes: RecipeOverview[] = [];

    // filling with example data
    for(let i=0; i<10; i++){
        recipes.push(new RecipeOverview(`${i}`,"name" + i, "content" + i));
    }

    return (
        <Stack>
            {recipes.map((recipe: RecipeOverview) => (
                <RecipeElement recipe={recipe}/>
            ))}
        </Stack>
    );
}