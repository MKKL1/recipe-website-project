import {Stack} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {environment} from "../../../environment.ts";
import {Variant} from "../../models/Variant.ts";
import {useNotificationContext} from "../../contexts/NotificationContext.tsx";
import {RecipesByCategories} from "../../models/RecipesByCategories.ts";

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
                        <div>
                            {recipecategory.recipes.map((recipe, index) => (
                                <p>
                                    {recipe.title}
                                </p>
                            ))}
                        </div>
                    </>
                ))
            :
            <div>
                <h1>No recipes found!</h1>
            </div>}
        </Stack>
    );
}