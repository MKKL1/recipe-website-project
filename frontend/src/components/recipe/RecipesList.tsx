import {RecipeOverview} from "../../models/RecipeOverview.ts";
import RecipeElement from "./RecipeElement.tsx";
import {Button, Pagination, Stack} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {environment} from "../../../environment.ts";
import {useNavigate} from "react-router-dom";

// TODO
// add loading animation
// add loading new recipes
export default function RecipesList(){
    const [recipes, setRecipes] = useState([]);
    const LIMIT: number = 10;
    // let hasNextPage: boolean = false;
    const [paginator, setPaginator] = useState({
        page: 1,
        totalPages: 1,
        hasPrevPage: false,
        prevPage: 0,
        hasNextPage: false,
        nextPage: 0,

    });
    // const [pageCount, setPageCount] = useState<number>(1);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        loadRecipes(page);
    }, [page]);

    function loadRecipes(page: number) {
        setRecipes([]);
        axios.get(environment.apiUrl + "recipe", {
            params: {
                page: page,
                limit: LIMIT
            }
        })
            .then(res => {
                console.log(res.data);
                const docs = res.data.docs;
                setPaginator(res.data.paginator);

                setRecipes(docs);
            })
            .catch(err => {
                console.error(err);
            });
    }

    function handlePageChange(newPage: number) {
        setPage(newPage);
    }

    return (
        <Stack>
            recipes.length === 0 ?
            <div>
                <h1>No recipes found!</h1>
            </div>
            :
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {recipes.map((recipe: RecipeOverview) => (
                <div className="col mb-5">
                    <RecipeElement key={recipe.id} recipe={recipe}/>
                </div>
            ))}
            </div>
            <div className="d-flex justify-content-center mt-4">
                <Pagination>
                    <Pagination.Prev onClick={() => handlePageChange(paginator.prevPage)} disabled={!paginator.hasPrevPage}/>
                    {
                        [...Array(paginator.totalPages)].map((_, i) =>
                            <Pagination.Item
                                key={i}
                                active={i + 1 === page}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </Pagination.Item>)
                    }
                    <Pagination.Next onClick={() => handlePageChange(paginator.nextPage)} disabled={!paginator.hasNextPage}/>
                </Pagination>
            </div>
        </Stack>
    );
}