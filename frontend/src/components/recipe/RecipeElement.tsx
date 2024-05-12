import {RecipeOverview} from "../../models/RecipeOverview.ts";

export default function RecipeElement({recipe}: {recipe: RecipeOverview}){
    console.log(recipe);

    return (
        <>
            <h1>Recipe</h1>
            <p>{recipe.name} | {recipe.content}</p>
        </>
    );
}