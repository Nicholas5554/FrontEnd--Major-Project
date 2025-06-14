import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { registerSchema } from "../components/validations/registerSchema";

const { VITE_API_URL } = import.meta.env;


export const registerPage = () => {
    const nav = useNavigate();

    const initialForm = {
        "name": {
            "first": "",
            "middle": "",
            "last": ""
        },
        "phone": "",
        "email": "",
        "password": "",
        "image": {
            "url": "",
            "alt": ""
        },
        "address": {
            "country": "",
            "city": "",
            "street": "",
            "houseNumber": 0,
        },
        "isManager": false
    };

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialForm,
        mode: "onChange",
        resolver: joiResolver(registerSchema)
    });

    const submitForm = async (form: any) => {

        try {
            await axios.post(`${VITE_API_URL}/users/register`, form);
            Swal.fire({
                title: `Welcome ${form.name.first} ${form.name.last}`,
                text: "successfully Registerd",
                icon: "success",
                timer: 2000,
                timerProgressBar: true,
                confirmButtonColor: "#3085d6",
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
            });
            nav("/login");

        } catch (error) {
            if (axios.isAxiosError(error)) {
                Swal.fire({
                    title: "Error",
                    text: "please check your data",
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
    };

    return ({
        register,
        handleSubmit,
        errors,
        isValid,
        submitForm
    });
}