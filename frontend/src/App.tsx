import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavigationBar from "./components/NavigationBar.tsx";
import Home from "./components/pages/Home.tsx";
import Recipes from "./components/recipe/Recipes.tsx";
import Register from "./components/pages/Register.tsx";
import Login from "./components/pages/Login.tsx";
import RecipeForm from "./components/recipe/RecipeForm.tsx";
import { AuthProvider } from './contexts/AuthContext.tsx';
import Profile from "./components/pages/Profile.tsx";


function App() {

  return (
    <AuthProvider>
        <div>
            <BrowserRouter>
                <NavigationBar/>
                <Routes>
                    <Route path='/' Component={Home}/>
                    <Route path='/login' Component={Login}/>
                    <Route path='/register' Component={Register}/>
                    <Route path='/add' Component={RecipeForm}/>
                    <Route path='/recipes' Component={Recipes}/>
                    <Route path='/profile' Component={Profile}/>
                </Routes>
            </BrowserRouter>
        </div>
    </AuthProvider>
  )
}

export default App
