import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavigationBar from "./components/NavigationBar.tsx";
import Home from "./components/pages/Home.tsx";
import Recipes from "./components/recipe/Recipes.tsx";
import Register from "./components/pages/Register.tsx";
import Login from "./components/pages/Login.tsx";
import RecipeForm from "./components/recipe/RecipeForm.tsx";
import {AuthProvider, useAuthContext} from './contexts/AuthContext.tsx';
import Profile from "./components/pages/Profile.tsx";
import RecipeDetails from "./components/recipe/RecipeDetails.tsx";
import {useEffect} from "react";
import Notification from "./components/Notification.tsx";
import {useNotificationContext} from "./contexts/NotificationContext.tsx";
import AuthGuard from "./guards/AuthGuard.tsx";
import GuestGuard from "./guards/GuestGuard.tsx";
import AdminGuard from "./guards/AdminGuard.tsx";


function App() {
    const {message, variant} = useNotificationContext();

    // fix Editor js again
    // edit recipe
    // fix recipe form
    // pagination

  return (
    <div>
        <BrowserRouter>
            <NavigationBar/>
            <Routes>
                <Route path='/' Component={Home}/>
                <Route path='/login' element={<GuestGuard>
                    <Login/>
                </GuestGuard>}/>
                <Route path='/register' element={<GuestGuard>
                    <Register/>
                </GuestGuard>}/>
                <Route path='/add' element={<AdminGuard>
                    <RecipeForm/>
                </AdminGuard>}/>
                <Route path='/recipes' Component={Recipes}/>
                <Route path='/recipe-details/:id' Component={RecipeDetails}/>
                <Route path='/profile' element={<AuthGuard>
                    <Profile/>
                </AuthGuard>}/>
            </Routes>
        </BrowserRouter>
        <Notification message={message} variant={variant}/>
    </div>
  )
}

export default App
