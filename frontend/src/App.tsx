import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavigationBar from "./components/NavigationBar.tsx";
import Home from "./components/pages/Home.tsx";
import Recipes from "./components/recipe/Recipes.tsx";
import Register from "./components/pages/Register.tsx";
import Login from "./components/pages/Login.tsx";
import {Button} from "react-bootstrap";
import RecipeForm from "./components/recipe/RecipeForm.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <BrowserRouter>
            <NavigationBar/>
            <h1>Main page</h1>
            <Routes>
                <Route path='/' Component={Home}/>
                <Route path='/login' Component={Login}/>
                <Route path='/register' Component={Register}/>
                <Route path='/add' Component={RecipeForm}/>
                <Route path='/recipes' Component={Recipes}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
