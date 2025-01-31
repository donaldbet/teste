import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import Alunos from './pages/Admin/Alunos/Alunos'
import { Layout } from './layout'
import Professores from './pages/Admin/Professores/Professores'
import Cursos from './pages/Admin/Cursos/Cursos'
import Matriculas from './pages/Admin/Matriculas/Matriculas'
import Disciplinas from './pages/Admin/Disciplinas/Disciplinas'
import AlunosRegister from './pages/Admin/Alunos/AlunosRegister'
import CursosRegister from './pages/Admin/Cursos/CursosRegister'
import ProfessoresRegister from './pages/Admin/Professores/ProfessoresRegister'
import MatriculasRegister from './pages/Admin/Matriculas/MatriculasRegister'
import DisciplinasRegister from './pages/Admin/Disciplinas/DisciplinasRegister'
import { useEffect } from 'react'
import Aluno from './pages/Aluno/Aluno'
function App() {
  useEffect(() => {
    if (window.location.pathname !== '/login') {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login'
      } else {
        try {
          if (token) {
            fetch(`${import.meta.env.VITE_API_URL}/verify`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }).then(response => {
              if (response.status === 401) {
                localStorage.removeItem('token')
                window.location.href = '/login'
              }
            })
          } else {
            window.location.href = '/login'
          }
        } catch (error) {
          //
        }
      }
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path='/aluno' element={<Aluno />} />
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin/alunos' element={<Alunos />} />
          <Route path='/admin/alunos/cadastrar' element={<AlunosRegister />} />
          <Route path='/admin/professores' element={<Professores />} />
          <Route path='/admin/professores/cadastrar' element={<ProfessoresRegister />} />
          <Route path='/admin/cursos' element={<Cursos />} />
          <Route path='/admin/cursos/cadastrar' element={<CursosRegister />} />
          <Route path='/admin/matriculas' element={<Matriculas />} />
          <Route path='/admin/matriculas/cadastrar' element={<MatriculasRegister />} />
          <Route path='/admin/disciplinas' element={<Disciplinas />} />
          <Route path='/admin/disciplinas/cadastrar' element={<DisciplinasRegister />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
