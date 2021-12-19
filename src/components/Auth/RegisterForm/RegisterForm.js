import React from 'react'
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import  *  as Yup from 'yup';
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../gql/user";
import { toast } from "react-toastify";
import "./RegisterForm.scss";

function RegisterForm(props) {
    const  {setShowLogin}  = props;

    const [ register ] = useMutation(REGISTER);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            name: Yup.string().required("Campo obligatorio."),

            username: Yup.string()
            .matches(/^[a-zA-Z0-9-]+$/,"El nombre de usuario no puede contener espacios.")
            .required(),

            email: Yup.string()
            .email("Email no válido.")
            .required("Campo obligatorio."),

            password: Yup.string()
            .required("Campo obligatorio.")
            .oneOf([ Yup.ref("repeatPassword"), "Contraseñas no coinciden." ]),

            repeatPassword: Yup.string()
            .required("Campo obligatorio.")
            .oneOf([ Yup.ref("password"), "Contraseñas no coinciden."])
        }),
        onSubmit:async(formData)=>{

            try {
                const newUser = formData;
                delete newUser.repeatPassword ;

                const result = await register({
                    variables:{
                        input: newUser
                    }
                });
                toast.success("Usuario registrado correctamente");
                setShowLogin(true);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    });

    return (
        <>
            <h2 className="register-form-title">Registrate para ver fotos y videos de tus amigos</h2>
            <Form className="register-form" onSubmit={ formik.handleSubmit } >
                <Form.Input
                type="text"
                placeholder="Nombre de y apellidos"
                name="name"
                error={ formik.errors.name && true }
                onChange={ formik.handleChange }
                />
                <Form.Input
                type="text"
                placeholder="Nombre de usuario"
                name="username"
                error={ formik.errors.username && true }
                onChange={ formik.handleChange }
                />
                <Form.Input
                type="text"
                placeholder="Correo electronico"
                name="email"
                error={ formik.errors.email && true }
                onChange={ formik.handleChange }
                />
                <Form.Input
                type="password"
                placeholder="Contraseña"
                name="password"
                error={ formik.errors.password && true }
                onChange={ formik.handleChange }
                />
                <Form.Input
                type="password"
                placeholder="Repetir contraseña"
                name="repeatPassword"
                error={ formik.errors.repeatPassword && true }
                onChange={ formik.handleChange }
                />
                <Button type="submit" className="btn-submit">Registrarse</Button>
            </Form>
        </>
    )
}

function initialValues(){
    return{
        name:"",
        username:"",
        email:"",
        password:"",
        repeatPassword:"",
    }
}

export default RegisterForm;
