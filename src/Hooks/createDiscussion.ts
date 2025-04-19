import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editDiscussionSchema } from "../components/validations/editDiscussionSchema";

export const createDiscussion = () => {
    const nav = useNavigate();

    const initialFromData = {
        "title": "",
        "description": "",
        "content": "",
        "users": "",
    }

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialFromData,
        mode: "onChange",
        resolver: joiResolver(editDiscussionSchema)
    });

    const onSubmit = async (form: typeof initialFromData) => {

        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";

            await axios.post("http://localhost:8080/discussions", form);
            Swal.fire({
                title: 'Success!',
                text: 'Discussion created successfully',
                icon: 'success',
                confirmButtonText: 'Cool',
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
            });
            nav("/mycreateddiscussions");

        } catch (error) {

            Swal.fire({
                title: 'Error!',
                text: 'Discussion creation failed',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3085d6',
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
            })
        }
    };

    return ({
        register,
        handleSubmit,
        errors,
        isValid,
        onSubmit,
    });
};