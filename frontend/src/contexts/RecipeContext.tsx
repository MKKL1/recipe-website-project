import axios from "axios";
import {Recipe} from "../models/Recipe.ts";
import React, {createContext, useContext, useState} from "react";
import {environment} from "../../environment.ts";

type RecipeContextType = {
    recipe: Recipe;
    updateRecipe: (id: string) => void;
};

const RecipeContext = createContext<RecipeContextType>({
    recipe: new Recipe('','','','',''),
    updateRecipe: () => {}
});

function fetchRecipe(id: string){
    return axios.get(environment.apiUrl + "recipe/" + id);
}

// TODO add loading default recipe
export const RecipeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [recipe, setRecipe] = useState<Recipe>(new Recipe('','','',{blocks: {}},''));

    const updateRecipe = (id: string) => {
        fetchRecipe(id)
            .then(res => {
                setRecipe(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
      <RecipeContext.Provider value={{recipe, updateRecipe}}>
          {children}
      </RecipeContext.Provider>
    );
};

export const useRecipeContext = () => useContext(RecipeContext);