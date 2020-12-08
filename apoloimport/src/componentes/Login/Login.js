import React from 'react';
import ImgLogin from './imgLogin/login.jpg';
import IconApolo from './imgLogin/apolo.png';
import './Login.css';
//sirve para la validacion de datos
import { useForm } from 'react-hook-form'

function Login() {

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data,e) => {
        console.log(data);
        e.target.reset();
    }

    const [shown, setShown] = React.useState(false);

    const switchShown = () => setShown(!shown);

    return (
        <div className="d-flex align-items-center min-vh-100 py-3 py-md-0">
            <div className="container mt-5">
                <div className="card login-card">
                    <div className="row no-gutters">
                        <div className="colorFondo col-md-5">
                            <img src={ImgLogin} alt="login" className="login-card-img" />
                        </div>
                        <div className="br"></div>
                        <div className="col-md-7">
                            <div className="card-body text-center">
                                <div className="brand-wrapper">
                                    <img src={IconApolo} alt="logo" className="w-50 logo" />
                                </div>
                                <p className="login-card-description">Iniciar sesión en su cuenta</p>
                                <form onSubmit={handleSubmit(onSubmit)} >
                                    <span className="mb-1 text-danger text-left font-weight-light d-block">
                                        {errors?.usuario?.message}
                                    </span>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <i className="user input-group-text fas fa-user-tie" id="addon1"></i>
                                        </div>
                                        <input
                                            type="text"
                                            name="usuario"
                                            id="usuario"
                                            className="form-control"
                                            placeholder="Usuario"
                                            ref={
                                                register({
                                                    required: {
                                                        value: true,
                                                        message: 'campo obligatorio'
                                                    },
                                                    maxLength: {
                                                        value: 25,
                                                        message: `maximo 25 carácteres!`
                                                    }
                                                })
                                            }
                                        />
                                    </div>
                                    <span className="mb-1 text-danger text-left font-weight-light d-block">
                                        {errors?.contraseña?.message}
                                    </span>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <i className="pass input-group-text fas fa-lock" id="addon1"></i>
                                        </div>
                                        <input
                                            type={shown ? 'text' : 'password'}
                                            name="contraseña"
                                            id="contraseña"
                                            aria-describedby="pass"
                                            className="form-control"
                                            placeholder="Contraseña"
                                            ref={
                                                register({
                                                    required: {
                                                        value: true,
                                                        message: 'Campo Obligatorio'
                                                    },
                                                    maxLength: {
                                                        value: 8,
                                                        message: 'maximo 8 carácteres!'
                                                    },
                                                    minLength: {
                                                        value: 5,
                                                        message: 'minimo 5 carácteres!'
                                                    }
                                                })
                                            }
                                        />
                                        <span className="password-toggle-icon">
                                            {shown ?
                                                <i onClick={switchShown} className="color fas fa-eye" />
                                                :
                                                <i onClick={switchShown} className="color fas fa-eye-slash" />
                                            }
                                        </span>
                                    </div>
                                    <button className="btn btn-outline-success w-100 ">Enviar</button>
                                </form>
                                <a href="#!" className="forgot-password-link">¿se te olvidó tu contraseña?</a>
                                <p className="login-card-footer-text">¿no tienes una cuenta? <a href="#!" className="text-reset">solicite aqui!</a></p>
                                <nav className="text-center login-card-footer-nav">
                                    <a href="#!">Términos de Uso. Política de privacidad.</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;