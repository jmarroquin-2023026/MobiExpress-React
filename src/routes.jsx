import { Children } from "react";
import { Login } from "./components/Auth/Login";
import { AuthPage } from "./pages/AuthPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Categories } from "./components/Categories/Categories";
import { CategoryForm } from "./components/Categories/CategoryForm";
import { CardForm } from "./components/Card/CardForm";
import { SavedCards } from "./components/Card/SavedCards";


export const routes=[
    {
        path:'/auth',
        element:<Login/>
    },
    {
        path:'/',
        element:<AuthPage/>
    },
    {
        path:'/dashboard',
        element:<CategoriesPage/>,
        children:[
            {
                path:'categories',
                element:<Categories/>
            },
            {
                path:'addCategory',
                element:<CategoryForm/>
            },
            {
                path:'updateCategory/:id',
                element:<CategoryForm/>
            }
        ]
    },
    {
        path:'/card',
        element:<SavedCards/>
    }
]