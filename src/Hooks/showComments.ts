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

    const likeComment = async (comment: TDiscussion["comments"][0]) => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";

            const res = await axios.patch(`http://localhost:8080/discussions/${id}/comments/${comment._id}`);

            const updatedComment = res.data;

            if (res.status === 200) {
                console.log(res.data);
                const user = JSON.parse(localStorage.getItem("user") || "{}");
                const userId = user._id;
                const commentIndex = comments?.comments.findIndex(c => c._id === updatedComment._id);
                if (commentIndex === -1 || commentIndex === undefined) return;

                const newComments = [...(comments?.comments ?? [])];
                newComments[commentIndex] = updatedComment;

                setComments({
                    ...comments,
                    comments: newComments,
                    _id: comments?._id || "",
                    title: comments?.title || "",
                    description: comments?.description || "",
                    content: comments?.content || "",
                    userId: comments?.userId || "",
                    users: comments?.users || [],
                    likes: comments?.likes || []
                });

                const isLiked = updatedComment.likes.includes(userId);


                const ToastSweet = Swal.mixin({
                    toast: true,
                    position: "top-right",
                    customClass: {
                        popup: 'colored-toast',
                    },
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });

                ToastSweet.fire({
                    title: isLiked ? 'Comment Liked' : 'Comment Disliked',
                    icon: isLiked ? 'success' : 'warning',
                    toast: true,
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


    useEffect(() => {
        getData();
    }, []);

    return ({
        comments,
        setComments,
        likeComment,
        id,
        getData,
    })
}