import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import BtnRegister from './components/BtnRegister/BtnRegister'

export function Layout() {
  const location = useLocation()
  const hideHeaderFooter = location.pathname === '/login';
  const hideRegister = ('cadastrar' === location.pathname.split("/").pop()) || location.pathname === '/login' || location.pathname === '/admin' || location.pathname === '/admin/configuracoes' || localStorage.getItem('isAdmin') === 'false';
  const typeRegister = window.location.pathname;
  const pathSegments = typeRegister.split("/");
  let str = pathSegments[pathSegments.length - 1];
  if(str === 'matriculas'){
    let strC: string = 'Matricular Aluno';
    return (
      <>
        {!hideHeaderFooter && <Header />}
        <Outlet />
        {!hideRegister && <BtnRegister strC={strC} str='matriculas'/>}
        {/* {!hideHeaderFooter && <Footer />} */}
      </>
    )
  }
  if(location.pathname === '/'){
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if(isAdmin){
      window.location.href = '/admin';
    }
    else{
      window.location.href = '/aluno';
    }
  }
  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Outlet />
      {!hideRegister && <BtnRegister str={str} />}
      {/* {!hideHeaderFooter && <Footer />} */}
    </>
  )
}