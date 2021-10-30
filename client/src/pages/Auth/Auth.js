import React, {useState} from "react";
import {Container, Image} from "semantic-ui-react";
import RegisterForm from "../../components/Auth/RegisterForm";
import LoginForm from "../../components/Auth/LoginForm";
import instaclone from "../../assets/png/instaclone.png";
import "./Auth.scss";

export default function Auth(){
    const [showLogin, setShowLogin] = useState(true);

    return(
        <Container fluid className="auth">
            <Image src={instaclone}/>

            <div className="container-form">
                {showLogin ? (
                    <LoginForm/>
                ) :( 
                    <RegisterForm setShowLogin={setShowLogin}/>
                )}
            </div>

            <div className="change-form">
                <p>
                    {showLogin ? (
                        <>
                            No tienes Cuenta?
                            <span onClick={()=>setShowLogin(!showLogin)}>Registrate</span>
                        </>
                    ):(
                        <>
                            Entra en tu cuenta!
                            <span onClick={()=>setShowLogin(!showLogin)}> Iniciar Sesion</span>
                        </>
                    )}
                </p>
            </div>
        </Container>
    );
}