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
            "last": ""
        },
        "email": "",
        "password": "",
        "photoFile": "",
        "isManager": true
    };

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialForm,
        mode: "onChange",
        resolver: joiResolver(registerSchema)
    });

    const submitForm = async (form: any) => {
        try {
            const toBase64 = (file: any) => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
            });

            let base64Photo: any = "";

            if (form.photoFile && form.photoFile.length > 0) {
                base64Photo = await toBase64(form.photoFile[0]);
            }

            const payload = {
                name: form.name,
                email: form.email,
                password: form.password,
                isManager: form.isManager,
                photoFile: base64Photo,
            };

            await axios.post(`${VITE_API_URL}/users/register`, payload);

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
                console.log(error.response?.data);
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