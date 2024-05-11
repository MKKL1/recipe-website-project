import {Recipe} from "../../models/Recipe.ts";

export default function RecipeDetails(){
    // fetch from backend
    // add context for managing actual recipe
    const recipe: Recipe = new Recipe();

    return (
        <>
            <h1>Details</h1>
        </>
    );
}