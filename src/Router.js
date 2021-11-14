import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Quiz from './pages/Quiz'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
import Login from './pages/Login'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Quiz/>}/>

                <Route exact path="/admin" element={<Admin/>}/>

                <Route exact path="/login" element={<Login/>}/>

                <Route element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}
