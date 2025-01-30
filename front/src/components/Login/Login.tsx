import { TbLockPassword } from 'react-icons/tb';
import style from './Login.module.css';
import { IoIosPerson } from 'react-icons/io';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e: any) => {
    const input = e.currentTarget.querySelector('input');
    if (input) {
      input.focus();
    }
  }

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);      
      if (data.user && data.user.isAdministrator === 1) {
        localStorage.setItem('isAdministrator', 'true');
        window.location.href = '/admin';
      } else {
        localStorage.setItem('isAdministrator', 'false');
        window.location.href = '/';
      }
    }
    
  }

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.frameBlue}>
          <div className={style.apresentacao}>
            <h1>Olá, Aluno</h1>
            <h1>Bem vindo de volta!</h1>
          </div>
          <p>Para continuar, faça login na sua conta</p>
          <div className={style.form}>
            <div className={style.inputs} onClick={handleFocus}>
              <IoIosPerson className={style.icons} color='#007bff' onClick={handleFocus} />
              <input type="text" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={style.inputs}>
              <TbLockPassword className={style.icons} color='#007bff' onClick={handleFocus} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value === '') {
                    setShowPassword(false);
                  }
                }}
              />
              {password.length > 0 && (showPassword ? <FaEye className={style.icons} onClick={handlePasswordVisibility} color='#007bff' /> : <FaEyeSlash className={style.icons} onClick={handlePasswordVisibility} color='#007bff' />)}
            </div>
            <button className={style.btn} type='submit' onClick={handleLogin}>Entrar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;