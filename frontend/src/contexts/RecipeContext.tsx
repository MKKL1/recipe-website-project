import {Recipe} from "../models/Recipe.ts";
import React, {createContext, useContext, useState} from "react";

type RecipeContextType = {
    recipe: Recipe;
    updateRecipe: (id: string) => void;
};

const RecipeContext = createContext<RecipeContextType>({
    recipe: new Recipe('','','','',''),
    updateRecipe: () => {}
});

export const RecipeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [recipe, setRecipe] = useState<Recipe>(new Recipe('','','','',''));

    const updateRecipe = (id: string) => {

    }

    return (
      <RecipeContext.Provider value={{recipe, updateRecipe}}>
          {children}
      </RecipeContext.Provider>
    );
};

export const useRecipeContext = () => useContext(RecipeContext);