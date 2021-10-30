import React from "react";
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {useMutation} from "@apollo/client";
import {REGISTER} from "../../../gql/user";
import "./RegisterForm.scss";

export default function RegisterForm(props){
    const {setShowLogin} = props;
    const [register]=useMutation(REGISTER);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            name: Yup.string().required("Tu nombre es obligatorio"),
            username: Yup.string().
                matches(
                    /^[a-zA-Z0-9-]*$/,
                    "El nombre de usuario no puede tener espacio"
                )
                .required("El nombre de usuario es obligatorio"),
            email: Yup.string()
                .email("El email no es valido")
                .required("El email es obligatorio"),
            password: Yup.string()
                .required("La contraseña es obligatoria")
                .oneOf([Yup.ref("repeatPassword")], "Las contraseñas no son iguales"),
            repeatPassword: Yup.string()
                .required("La contraseña es obligatoria")
                .oneOf([Yup.ref("password")], "Las contraseñas no son iguales"),
        }),
        onSubmit: async (formData)=>{
            try {
                const newUser = formData;
                delete newUser.repeatPassword;

                await register({
                    variables: {
                        input: newUser,
                    },
                });
            toast.success("Usuario registrado correctamente");
            setShowLogin(true);
            }catch(error){
                toast.error(error.message);
                console.log(error);
            }
        },
    });
    
    return(
        <>
            <h2 className="register-form-title">
                Registrate para ver fotos y videos de tus amigos
            </h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input
                    type="text"
                    placeholder="Nombre y apellidos"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.errors.name && true}
                />
                <Form.Input
                    type="text"
                    placeholder="Nombre de Usuario"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.errors.username && true}
                />
                <Form.Input
                    type="text"
                    placeholder="Correo Electronico"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.username && true}
                />
                <Form.Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password && true}
                />
                <Form.Input
                    type="password"
                    placeholder="Confirmar Password"
                    name="repeatPassword"
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                    error={formik.errors.repeatPassword && true}
                />
                <Button type="submit" className="btn-submit">Registrarse</Button>
                
                <Button type="button" onClick={formik.handleReset}>
                    Limpiar Formulario
                </Button>
                
            </Form>
        </>
    );
}

function initialValues(){
    return{
        name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
    };    
};