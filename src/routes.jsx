import { Children } from "react";
import { Login } from "./components/Auth/Login";
import { AuthPage } from "./pages/AuthPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Categories } from "./components/Categories/Categories";
import { CategoryForm } from "./components/Categories/CategoryForm";
import { CardForm } from "./components/Card/CardForm";
import { SavedCards } from "./components/Card/SavedCards";

import { UpdatePage } from "./components/User/UpdateInfo";
import { ChangePasswordPage } from "./components/User/ChangePassword";
import { Users } from "./components/User/Users";
import { element } from "prop-types";
import { AddEmployee } from "./components/User/AddEmployee";
import { UsersConfPage } from "./pages/userPages/UsersConfPage";
import { ProfileConfPage } from "./pages/userPages/ProfileConfPage";
import { ChangeProfilePicture } from "./components/User/ChangeProfilePicture";
import { ProductsPage } from "./pages/ProductsPage";
import { Products } from "./components/Products/Products";
import { HomePage } from "./pages/HomePage";
import {GetByCategorie} from './components/Products/GetByCategorie'

import { OrderCard } from "./components/Order/OrderCard";
import { UserOrderCard } from "./components/Order/UserOrderCard";
import { ProductDetails } from "./components/Products/ProductDetails";
import { ProductForm } from "./components/Products/ProductForm";
import { OrderForm } from "./components/Order/OrderForm";

export const routes = [
    {
        path: '/auth',
        element: <Login />
    },
    {
        path: '/',
        element: <AuthPage />
    },
    {
        path:'/HomePage',
        element:<HomePage/>
    },
    {
        path: '/dashboard',
        element: <CategoriesPage />,
        children: [
            {
                path: 'categories',
                element: <Categories />
            },
            {
                path: 'addCategory',
                element: <CategoryForm />
            },
            {
                path: 'updateCategory/:id',
                element: <CategoryForm />
            },
            {
                path:'searchByCategory/:id',
                element:<GetByCategorie/> 
            },
            {
                path: 'profile',
                element: <ProfileConfPage />,
                children: [
                    {
                        path: 'updateProfile',
                        element: <UpdatePage />
                    },
                    {
                        path: 'updatePassword',
                        element: <ChangePasswordPage />
                    },
                    {
                        path: 'changeProfilePicture',
                        element: <ChangeProfilePicture />
                    },

                ]
            }   
        ]
    },
    {
        path: '/users',
        element: <UsersConfPage />,
        children: [
            {
                path: 'getUsers',
                element: <Users />
            },
            {
                path: 'addEmployee',
                element: <AddEmployee />
            }
        ]
    },
    {
     path: '/card',
       children:[
        {
            path:'myCards',
            element:<SavedCards/>
        },
        {
            path:'addCard',
            element:<CardForm/>
        }
       ]
    },
    {
        path: '/products',
        element: <ProductsPage />,
        children: [
            {
                path: 'list',
                element: <Products />
            },
            {
                path: 'details/:id',
                element: <ProductDetails/>
            },
            {
                path: 'form',
                element: <ProductForm />
            },
            {
                path: 'updateProduct/:id',
                element: <ProductForm />
            },
        ]
    },
    {
        path: '/orders',
        children: [
            {
                path: 'Allorders',
                element: <OrderCard/>
            },
            {
                path:'MyOrder',
                element:<UserOrderCard/>
            },
            {
                path:'completeOrder',
                element:<OrderForm/>
            }
        ]
    }
]