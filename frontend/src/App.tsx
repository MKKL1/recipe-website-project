import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavigationBar from "./components/NavigationBar.tsx";
import Home from "./components/Home.tsx";
import Recipes from "./components/recipe/Recipes.tsx";
import Register from "./components/Register.tsx";
import Login from "./components/Login.tsx";
import {Button} from "react-bootstrap";

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
                <Route path='/recipes' Component={Recipes}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
