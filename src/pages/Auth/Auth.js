import { useState } from 'react';
import { Container, Image } from 'semantic-ui-react';
import RegisterForm from "../../components/Auth/RegisterForm"
import  LoginForm from "../../components/Auth/LoginForm";

import instagram from '../../assets/instagram.png';
import "./Auth.scss";

function Auth() {
    const [showLogin, setShowLogin] = useState(true)
    return (
        <Container fluid className="auth">
            <Image src={ instagram } />
            <div className="container-form">
           { showLogin? <LoginForm />: <RegisterForm setShowLogin = {setShowLogin}></RegisterForm> }
            </div>

            <div className="change-form">
                { showLogin? (
                    <>
                    ¿No tienes cuenta? 
                    <span onClick={ ()=>setShowLogin(!showLogin) }>Registrate</span>
                    </>
                ):(
                    <>
                    ¡Entra con tu cuenta!
                    <span onClick={ ()=>setShowLogin(!showLogin) }>Iniciar Sesión</span>
                    </> 
                ) }
            </div>

        </Container>
    )
}

export default Auth;