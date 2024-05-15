import {RecipeOverview} from "../../models/RecipeOverview.ts";
import {environment} from "../../../environment.ts";

export default function RecipeElement({recipe}: {recipe: RecipeOverview}){
    // image_id is same as id
    // image cant be loaded

    return (
        <>
            <h1>Recipe</h1>
            <img src={environment.apiUrl + "image/" + recipe.image_id} alt={recipe.title}/>
            <p>Title {recipe.title}</p>
            <p>Author {recipe.author_id}</p>
            <p>Image {recipe.image_id}</p>
            <p>Id {recipe.id}</p>
        </>
    );
}