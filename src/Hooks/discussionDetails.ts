import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const { VITE_API_URL } = import.meta.env;

export const discussionDetails = () => {
    const [discussion, setDiscussion] = useState<TDiscussion>();
    const { id } = useParams<{ id: string }>();
    const nav = useNavigate();

    const getData = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.get(`${VITE_API_URL}/discussions/` + id);
            setDiscussion(res.data);

        } catch (err) {
            Swal.fire({
                title: "error",
                text: "could not get the Discussion",
                icon: "error",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined

            });
        }
    }

    const addComment = async () => {
        const { value: text } = await Swal.fire({
            title: "Write your comment",
            input: "text",
            inputLabel: "Comment",
            inputPlaceholder: "Type something...",
            inputAttributes: {
                style: "color: black;"
            },
            showCancelButton: true,
            confirmButtonText: "Submit",
            cancelButtonText: "Cancel",
            cancelButtonColor: "#d33",
            confirmButtonColor: '#3085d6',
            background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
            color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
            customClass: {
                popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
            }
        });

        if (!text || text.trim() === "") return;

        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";

            const res = await axios.patch(`${VITE_API_URL}/discussions/${id}/comments`, { comments: [{ text }] });

            setDiscussion((prev) => {
                if (!prev) return prev;
                const updatedComments = [...prev.comments, res.data];
                return { ...prev, comments: updatedComments };
            });

            getData();

            await Swal.fire({
                title: "Comment Added",
                icon: "success",
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
            });


        } catch (err) {
            Swal.fire({
                title: "Error",
                text: "Could not add the comment",
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
                confirmButtonColor: '#3085d6',
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined

            });
        }
    };


    const navToComments = (id: string) => {
        nav(`/discussion/${id}/comments`);
    }


    useEffect(() => {
        getData();
    }, []);

    return ({
        discussion,
        setDiscussion,
        id,
        getData,
        navToComments,
        addComment
    })
}