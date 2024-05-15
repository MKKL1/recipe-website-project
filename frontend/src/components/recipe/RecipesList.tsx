import {RecipeOverview} from "../../models/RecipeOverview.ts";
import RecipeElement from "./RecipeElement.tsx";
import {Button, Stack} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {environment} from "../../../environment.ts";

// TODO
// add loading animation
// add loading new recipes
export default function RecipesList(){
    const [recipes, setRecipes] = useState([]);
    const LIMIT: number = 3;
    let hasNextPage: boolean = false;
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        setRecipes([]);
        hasNextPage = false;
        setPage(1);

        axios.get(environment.apiUrl + "recipe", {
            params: {
                page: page,
                limit: LIMIT
            }
        })
            .then(res => {
                const docs = res.data.docs;
                const paginator = res.data.paginator;

                // @ts-ignore
                setRecipes(docs);

                if(paginator.hasNextPage){
                    hasNextPage = true;
                    setPage(paginator.nextPage);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    function changeCurrentRecipe(id: string){
        console.log(id);
    }

    return (
        <Stack>
            {recipes.map((recipe: RecipeOverview) => (
                <div key={recipe.id} onClick={() => changeCurrentRecipe(recipe.id)}>
                    <RecipeElement key={recipe.id} recipe={recipe}/>
                </div>
            ))}
        </Stack>
    );
}