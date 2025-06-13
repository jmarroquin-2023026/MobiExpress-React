import { AuthPage } from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";


export const routes=[
    {
        path:'/auth',
        element:<AuthPage/>
    },
    {
        path:'/',
        element:<AuthPage/>
    },
    {
        path:'/Test',
        element:<NotFoundPage/>
    }
]