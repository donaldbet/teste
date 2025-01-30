import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Menu } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { pathname } = location;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    setIsMenuOpen(false)
    const navLinks = document.querySelectorAll('nav span');
    navLinks.forEach((link) => {
      const navLink = link.querySelector('a');
      if (navLink && navLink.getAttribute('href') === pathname) {
        link.classList.add('bg-[#FFF]');
        link.classList.add('text-[#00254d]');
        link.classList.add('font-bold');
        link.classList.add('lg:p-2');
        link.classList.add('pr-1');
        link.classList.add('pl-1');
        link.classList.add('rounded-full');
      } else {
        link.classList.remove('bg-[#FFF]');
        link.classList.remove('text-[#00254d]');
        link.classList.remove('font-bold');
        link.classList.remove('lg:p-2');
        link.classList.remove('pr-1');
        link.classList.remove('pl-1');
        link.classList.remove('rounded-full');
      }
    });
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className='flex bg-[#00254d] text-white justify-between px-8 bg-custom-gradient h-24 items-center fixed w-screen'>
        <div className='flex justify-center items-center gap-4' onClick={() => window.location.href = '/admin'}>
          <img src={logo} className='h-20 z-40' />
          <h1 className='text-3xl font-bold'>Sistema Escolar</h1>
        </div>
        <button
          className='md:hidden z-40'
          onClick={toggleMenu}
        >
          <Menu />
        </button>
        <nav className={`lg:flex items-center flex-col gap-4 w-[100%] md:w-auto left-0 absolute bg-custom-gradient md:bg-none px-4 pt-4 pb-2 md:p-0 md:m-0 md:static flex md:flex-row transition-all duration-300 ease-in-out ${isMenuOpen ? 'flex border-t pr-8 top-24 opacity-100 h-auto position-relative bg-[#00254d] items-end' : 'hidden top-24 opacity-0 h-0'} md:opacity-100 md:h-auto`}>
          <span>
            <NavLink to='/admin' className='hover:underline'>Dashboard</NavLink>
          </span>
          <span>
            <NavLink to='/admin/alunos' className='hover:underline'>Alunos</NavLink>
          </span>
          <span>
            <NavLink to='/admin/professores' className='hover:underline'>Professores</NavLink>
          </span>
          <span>
            <NavLink to='/admin/cursos' className='hover:underline'>Cursos</NavLink>
          </span>
          <span>
            <NavLink to='/admin/matriculas' className='hover:underline'>Matrículas</NavLink>
          </span>
          <span>
            <NavLink to='/admin/disciplinas' className='hover:underline'>Disciplinas</NavLink>
          </span>
        </nav>
        {isMenuOpen && <div className="fixed inset-0 top-86 bg-black opacity-50 z-30" onClick={toggleMenu}></div>}
      </header>
      <main className='pt-24'></main>
    </>
  )
}