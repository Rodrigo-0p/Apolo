import React from 'react';
import ImgLogin from './imgLogin/login.jpg';
import IconApolo from './imgLogin/apolo.png';
import './Login.css';
//sirve para la validacion de datos
import { useForm } from 'react-hook-form'

function Login() {

    const { register, errors, handleSubmit } = useForm();

    //enviamos los datos
    const onSubmit = async (data,e) => {
        try {
            let enviarDatos = await fetch('http://localhost:3001/api/user/login', {
                method: 'Post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                        //'auth-token': this.token
                },
            });
            const req = await enviarDatos.json()
            if(!req.error){
                console.log(req.data.token);
            } else{
                console.log(req.message);
            }

          } catch (error) {
            console.log(error)
          }

        //console.log(data);
        //e.target.reset();
    }

    //esto lo realizamos para poder visuarizar la contraseña
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
                                            type="email"
                                            name="email"
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
                                                    minLength: {
                                                        value: 7,
                                                        message: 'minimo 8 carácteres!'
                                                    },
                                                    maxLength: {
                                                        value: 10,
                                                        message: 'maximo 8 carácteres!'
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