import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { discussionSchema } from "../components/validations/discussionSchema";

const { VITE_API_URL } = import.meta.env;

export const editDiscussion = () => {
    const [workers, setWorkers] = useState([]);
    const [discussion, setDiscussion] = useState<TDiscussion | null>(null);
    const { id } = useParams<{ id: string }>();

    const nav = useNavigate();

    interface EditDiscussionForm {
        title?: string;
        content?: string;
        description?: string;
        users: string[] | string;
    }

    const initialDiscussion: EditDiscussionForm = {
        title: discussion?.title,
        content: discussion?.content,
        description: discussion?.description,
        users: Array.isArray(discussion?.users) ? discussion.users.map(user => user._id) : [],
    }

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<EditDiscussionForm>({
        defaultValues: initialDiscussion,
        mode: "onChange",
        resolver: joiResolver(discussionSchema)
    });

    useEffect(() => {
        if (discussion) {
            reset({
                title: discussion.title,
                content: discussion.content,
                description: discussion.description,
                users: Array.isArray(discussion.users)
                    ? discussion.users.map(user => user._id).join(",")
                    : "",
            });
        }
    }, [discussion, reset]);

    const getData = async () => {

        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.get(`${VITE_API_URL}/discussions/` + id);
            setDiscussion(res.data);

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Error getting your Discussion",
                icon: "error",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
            })
        }
    };


    const submitForm = async (form: typeof initialDiscussion) => {

        const usersArray = typeof form.users === "string"
            ? form.users.split(",").map(id => id.trim()).filter(Boolean)
            : form.users;

        const payload = {
            ...form,
            users: usersArray,
        };

        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.put(`${VITE_API_URL}/discussions/` + discussion?._id, payload);
            setDiscussion(res.data);
            nav("/mycreateddiscussions")

            Swal.fire({
                title: "success",
                text: "Discussion updated successfully",
                icon: "success",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
            });

        } catch (error) {
            Swal.fire({
                title: "error",
                text: "error updating Discussion",
                icon: "error",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
            })
        }
    }

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
                const res = await axios.get(`${VITE_API_URL}/users/myworkers`);
                setWorkers(res.data);
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Error getting workers",
                    icon: "error",
                    confirmButtonColor: '#3085d6',
                    timer: 1500,
                    timerProgressBar: true,
                    customClass: {
                        popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                    },
                    background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                    color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
                })
            }
        };
        fetchWorkers();
    })


    useEffect(() => {
        getData();
    }, [id]);

    return ({
        discussion,
        register,
        handleSubmit,
        errors,
        isValid,
        submitForm,
        workers
    })
}