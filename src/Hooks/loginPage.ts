import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginSchema } from "../components/validations/loginSchema";
import { decode } from "../Services/tokenService";
import { userActions } from "../Store/userSlice";

const { API_URL } = import.meta.env;

export const loginPage = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const loginForm = {
        "email": "",
        "password": "",
    }

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: loginForm,
        mode: 'onChange',
        resolver: joiResolver(loginSchema)
    });

    const submitLogin = async (form: any) => {

        try {
            const token = await axios.post(`${API_URL}/login`, form);

            localStorage.setItem("token", token.data);
            const id = decode(token.data)._id;
            axios.defaults.headers.common["x-auth-token"] = token.data;
            const user = await axios.get(
                "http://localhost:8080/users/" + id,
            );
            dispatch(userActions.login(user.data));
            Swal.fire({
                toast: true,
                position: "top-right",
                text: `welcome back ${user.data.name.first}`,
                icon: "success",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
            });
            nav("/profile");

        } catch (error) {
            if (axios.isAxiosError(error)) {
                Swal.fire({
                    title: "Error",
                    text: "Email or Password Invalid",
                    icon: "error",
                    timer: 2000,
                    timerProgressBar: true,
                    confirmButtonColor: "#3085d6",
                    customClass: {
                        popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                    },
                    background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                    color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
                });

            } else {
                Swal.fire({
                    title: "Error",
                    text: "Unexpected Error Please Try again",
                    icon: "error",
                    timer: 2000,
                    timerProgressBar: true,
                    confirmButtonColor: "#3085d6",
                    customClass: {
                        popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                    },
                    background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                    color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
                });
            }
        }
    }

    return ({
        register,
        handleSubmit,
        errors,
        isValid,
        submitLogin
    });
};