import {RecipeOverview} from "../../models/RecipeOverview.ts";
import RecipeElement from "./RecipeElement.tsx";
import {Button, Pagination, Stack} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {environment} from "../../../environment.ts";
import {useRecipeContext} from "../../contexts/RecipeContext.tsx";
import {useNavigate} from "react-router-dom";

// TODO
// add loading animation
// add loading new recipes
export default function RecipesList(){
    const navigate = useNavigate();
    const {recipe, updateRecipe} = useRecipeContext();
    const [recipes, setRecipes] = useState([]);
    const LIMIT: number = 5;
    let hasNextPage: boolean = false;
    const [pageCount, setPageCount] = useState<number>(1);
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
                console.log(res.data);
                const docs = res.data.docs;
                const paginator = res.data.paginator;

                // @ts-ignore
                setRecipes(docs);
                updateRecipe(docs[0].id);


                if(paginator.hasNextPage){
                    hasNextPage = true;
                    setPage(paginator.nextPage);
                }

                setPageCount(paginator.totalPages);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    function changeCurrentRecipe(id: string){
        // updateRecipe(id);
        // @ts-ignore
        navigate('/recipe-details', {state: {recipeId: id}});
    }

    return (
        <Stack>
            {recipes.map((recipe: RecipeOverview) => (
                <div key={recipe.id} onClick={() => changeCurrentRecipe(recipe.id)}>
                    <RecipeElement key={recipe.id} recipe={recipe}/>
                </div>
            ))}
            <Pagination>{
                [...Array(pageCount)].map((e,i) =>
                <Pagination.Item key={i} active={i+1 === page}>{i+1}</Pagination.Item>)
            }</Pagination>
        </Stack>
    );
}