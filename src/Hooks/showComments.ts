import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


export const showComments = () => {
    const [comments, setComments] = useState<TDiscussion & { likes?: string[] }>();
    const { id } = useParams<{ id: string }>();

    const getData = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.get("http://localhost:8080/discussions/" + id + "/comments");
            setComments(res.data);

        } catch (err) {
            Swal.fire({
                title: "error",
                text: "could not get the Comments",
                icon: "error",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true
            });
        }
    }

    const deleteComment = async (comment: TDiscussion["comments"][0]) => {
        try {

            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            await axios.delete(`http://localhost:8080/discussions/${id}/comments/${comment._id}`);

            setComments((prev) => {
                if (!prev) return prev;
                const updatedComments = prev.comments.filter((c) => c._id !== comment._id);
                return { ...prev, comments: updatedComments };
            });

            await Swal.fire({
                title: "Comment Deleted",
                icon: "success",
                timerProgressBar: true,
                showConfirmButton: true,
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
            });
        }
    };

    const likeComment = async (comment: TDiscussion["comments"][0]) => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";

            const res = await axios.patch(`http://localhost:8080/discussions/${id}/comments/${comment._id}`);

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
            });
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