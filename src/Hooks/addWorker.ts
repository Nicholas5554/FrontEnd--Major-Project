import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { registerSchema } from "../components/validations/registerSchema";
import { useNavigate } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;


export const addWorker = () => {

    const navigate = useNavigate();

    const initialForm = {
        "name": {
            "first": "",
            "last": ""
        },
        "email": "",
        "password": "",
        "isManager": false
    };

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialForm,
        mode: "onChange",
        resolver: joiResolver(registerSchema)
    });

    const submitForm = async (form: any) => {

        try {
            await axios.post(`${VITE_API_URL}/users/addworker`, form);
            Swal.fire({
                title: `The worker ${form.name.first} ${form.name.last}`,
                text: "successfully Registered",
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
            navigate("/myworkers");

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