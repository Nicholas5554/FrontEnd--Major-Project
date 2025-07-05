import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const { VITE_API_URL } = import.meta.env;


export const showComments = () => {
    const [comments, setComments] = useState<TDiscussion & { likes?: string[] }>();
    const { id } = useParams<{ id: string }>();

    const getData = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.get(`${VITE_API_URL}/discussions/` + id + `/comments`);
            setComments(res.data);

        } catch (err) {
            Swal.fire({
                title: "error",
                text: "could not get the Comments",
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

    const deleteComment = async (comment: TDiscussion["comments"][0]) => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            await axios.delete(`${VITE_API_URL}/discussions/${id}/comments/${comment._id}`);

            setComments((prev) => {
                if (!prev) return prev;
                const updatedComments = prev.comments.filter((c) => c._id !== comment._id);
                return { ...prev, comments: updatedComments };
            });

            await Swal.fire({
                toast: true,
                position: "top-right",
                title: "Comment Deleted",
                icon: "success",
                customClass: {
                    popup: `colored-toast ${document.documentElement.classList.contains("dark") ? "swal-dark" : ""}`,
                },
                timerProgressBar: true,
                showConfirmButton: false,
                timer: 1500,
                confirmButtonColor: '#3085d6',
            });

        } catch (err) {
            Swal.fire({
                title: "Error",
                text: "Could not delete comment",
                icon: "error",
                timerProgressBar: true,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
            });
            console.log(err);
        }
    };

    const likeComment = async (comment: TDiscussion["comments"][0]) => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";

            const res = await axios.patch(`${VITE_API_URL}/discussions/${id}/comments/${comment._id}`);


            if (res) {
                const updatedComment = res.data;

                setComments((prev) => {
                    if (!prev) return prev;
                    const updatedComments = prev.comments.map((c) =>
                        c._id === updatedComment._id ? updatedComment : c
                    );
                    return { ...prev, comments: updatedComments };
                });

                const updatedLikes = updatedComment.likes || [];

                const token = localStorage.getItem("token");

                if (!token) {
                    console.error("No token found in localStorage");
                    return;
                }

                const payloadBase64 = token.split('.')[1];
                const payloadDecoded = JSON.parse(atob(payloadBase64));
                const userId = payloadDecoded._id;
                const isLiked = updatedLikes.includes(userId);

                await Swal.fire({
                    title: isLiked ? 'Comment Liked' : 'Comment Disliked',
                    icon: isLiked ? 'success' : 'warning',
                    toast: true,
                    position: "top-right",
                    customClass: {
                        popup: `colored-toast ${document.documentElement.classList.contains("dark") ? "swal-dark" : ""}`,
                    },
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });

            }
        } catch (err) {
            Swal.fire({
                title: "Error",
                text: "Could not like/unlike comment",
                icon: "error",
                timerProgressBar: true,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
            });
            console.log(err);

        }
    };

    let userId = "";
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const payloadBase64 = token.split('.')[1];
            const payloadDecoded = JSON.parse(atob(payloadBase64));
            userId = payloadDecoded._id;
        } catch (e) {
            console.error("Invalid token:", e);
        }
    }

    useEffect(() => {
        getData();

        const interval = setInterval(() => {
            getData();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return ({
        comments,
        setComments,
        likeComment,
        id,
        getData,
        userId,
        deleteComment
    })
}