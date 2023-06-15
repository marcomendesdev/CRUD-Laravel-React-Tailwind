import { createBrowserRouter } from "react-router-dom";
import Default from "./layouts/Default";
import Guest from "./layouts/Guest";
import PageNotFount from "./components/PageNotFount";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import MyItems from "./components/MyItems";
import Items from "./components/Items";
import AddItem from "./components/AddItem";
import Update from "./components/UpdateItem";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Default />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
                children: [
                    {
                        path: "/",
                        element: <Items />,
                    },
                    {
                        path: "/my-items",
                        element: <MyItems />,
                    },
                    {
                        path: "/add-item",
                        element: <AddItem />,
                    },
                    {
                    path: '/update',
                    element: <Update />
                    },
                ],
            },
        ],
    },
    {
        path: "/",
        element: <Guest />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "*",
        element: <PageNotFount />,
    },
]);

export default router;
