import {Pagination, Stack} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {environment} from "../../../environment.ts";
import {Variant} from "../../models/Variant.ts";
import {useNotificationContext} from "../../contexts/NotificationContext.tsx";
import {RecipesByCategories} from "../../models/RecipesByCategories.ts";
import RecipeElement from "./RecipeElement.tsx";

export default function Categories(){
    const {pushNotification} = useNotificationContext();
    const [recipes, setRecipes] = useState<[RecipesByCategories] | undefined>(undefined);

    useEffect(() => {
        loadRecipes();
    }, []);

    function loadRecipes() {
        axios.get(environment.apiUrl + "recipe/categories", )
            .then(res => {
                console.log(res.data);
                // mapping to valid format
                res.data.map(recipeCategory => {
                    recipeCategory.recipes.map(recipe => {
                        recipe.category = recipeCategory.category_name;
                        recipe.id = recipe._id;
                    });
                });

                setRecipes(res.data);
            })
            .catch(err => {
                console.error(err);
                pushNotification("Error occur during loading recipes", Variant.danger);
            });
    }

    return (
        <Stack>
            <h1 className="text-center" style={{marginBottom: '50px', marginTop: '50px'}}>Recipes: </h1>
            {recipes ?
                recipes.map((recipecategory, index) => (
                    <>
                        <h2>{recipecategory.category_name}</h2>
                        <Stack>
                            <div className="container-fluid">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-lg-10 col-xl-8">
                                        <div
                                            className="row gx-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center mx-1">
                                            {recipecategory.recipes.map((recipe, index) => (
                                                <div key={index} className="col mb-5">
                                                    <RecipeElement recipe={recipe}/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Stack>
                    </>
                ))
            :
            <div>
                <h1>No recipes found!</h1>
            </div>}
        </Stack>
    );
}