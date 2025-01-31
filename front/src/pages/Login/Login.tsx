import { TbLockPassword } from 'react-icons/tb';
import style from './Login.module.css';
import { IoIosPerson } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import MsgError from '../../components/MsgError/MsgError';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [msgError, setMsgError] = useState('');

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
      localStorage.setItem('id', data.user.id);
      console.log(data.user);
      if (data.user && data.user.isAdministrator === "1") {
        localStorage.setItem('isAdmin', 'true');
        window.location.href = '/admin';
      } else {
        localStorage.setItem('isAdmin', 'false');
        window.location.href = '/';
      }

    } else {
      setPassword('');
      setShowPassword(false);
      setMsgError('Usuário ou senha inválidos');
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (localStorage.getItem('isAdmin') === 'false') {
        window.location.href = '/';
      } else {
        window.location.href = '/admin';
      }
    }
  }, []);

  useEffect(() => {
    if (msgError) {
      const timer = setTimeout(() => {
        setMsgError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [msgError]);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <> {msgError && <MsgError msg={msgError} />}
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
                <input
                  id='email'
                  type="text"
                  placeholder="E-mail"
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={
                    (e) => {
                      if (e.key === 'Enter') {
                        const nextInput = document.getElementById('password');
                        if (nextInput) {
                          nextInput.focus();
                        }
                      }
                    }}
                  value={email}
                />
              </div>
              <div className={style.inputs}>
                <TbLockPassword className={style.icons} color='#007bff' onClick={handleFocus} />
                <input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value === '') {
                      setShowPassword(false);
                    }
                  }}
                  onKeyDown={
                    (e) => {
                      if (e.key === 'Enter') {
                        handleLogin(e);
                      }
                    }}
                  value={password}
                />
                {password.length > 0 && (showPassword ? <FaEye className={style.icons} onClick={handlePasswordVisibility} color='#007bff' /> : <FaEyeSlash className={style.icons} onClick={handlePasswordVisibility} color='#007bff' />)}
              </div>
              <button className={style.btn} type='submit' onClick={handleLogin}>Entrar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;