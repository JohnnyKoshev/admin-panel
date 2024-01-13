import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.scss';
import './normalize.css';
import SignIn from './components/SignIn/SignIn';
import {LoaderProvider} from "./components/Loader/Loader";
import Layout from "./components/admin/Layout/Layout";
import Products from "./components/admin/Products/Products";
import Users from "./components/admin/Users/Users";
import Posts from "./components/admin/Posts/Posts";
import Todos from "./components/admin/Todos/Todos";

function App() {
    return (
        <LoaderProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/sign-in" replace/>}/>
                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path="/main/*" element={<Layout/>}>
                        <Route
                            index
                            element={<Navigate to="/main/products" replace/>}
                        />
                        <Route path="products" element={<Products/>}/>
                        <Route path="users" element={<Users/>}/>
                        <Route path="posts" element={<Posts/>}/>
                        <Route path="todos" element={<Todos/>}/>
                    </Route>
                </Routes>
            </Router>
        </LoaderProvider>
    );
}

export default App;
