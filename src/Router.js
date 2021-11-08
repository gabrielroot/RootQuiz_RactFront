import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Quiz from './pages/Quiz'
import NotFound from './pages/NotFound'
import Questao from './pages/Questao'
import Admin from './pages/Admin'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Quiz/>}/>
            </Routes>

            <Routes>
                <Route exact path="/admin/pergunta" element={<Admin/>}/>
            </Routes>

            <Routes>
                <Route exact path="/admin/pergunta/nova" element={<Questao/>}/>
            </Routes>

            <Routes>
                <Route element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}
