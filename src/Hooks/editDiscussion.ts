import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editDiscussionSchema } from "../components/validations/editDiscussionSchema";

export const editDiscussion = () => {
    const [discussion, setDiscussion] = useState<TDiscussion | null>(null);
    const { id } = useParams<{ id: string }>();

    const nav = useNavigate();

    const initialDiscussion = {
        title: discussion?.title,
        content: discussion?.content,
        description: discussion?.description,
        users: Array.isArray(discussion?.users) ? discussion.users.map(user => user._id) : [],
    }

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        defaultValues: initialDiscussion,
        mode: "onChange",
        resolver: joiResolver(editDiscussionSchema)
    });

    useEffect(() => {
        if (discussion) {
            reset(initialDiscussion);
        }
    }, [discussion, reset]);

    const getData = async () => {

        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.get("http://localhost:8080/discussions/" + id);
            setDiscussion(res.data);
            console.log(res.data);



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

        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.put("http://localhost:8080/discussions/" + discussion?._id, form);
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
        getData();
    }, [id]);

    return ({
        discussion,
        register,
        handleSubmit,
        errors,
        isValid,
        submitForm
    })
}