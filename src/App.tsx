import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.scss';
import SignIn from './components/SignIn/SignIn';
import {LoaderProvider} from "./components/Loader/Loader";

function App() {
    return (
        <LoaderProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/sign-in" replace/>}/>
                    <Route path="/sign-in" element={<SignIn/>}/>
                </Routes>
            </Router>
        </LoaderProvider>
    );
}

export default App;
