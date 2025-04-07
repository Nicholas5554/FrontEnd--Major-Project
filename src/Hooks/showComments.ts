import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


export const showComments = () => {
    const [comment, setComment] = useState<TDiscussion>();
    const { id } = useParams<{ id: string }>();

    const getData = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.get("http://localhost:8080/discussions/" + id + "/comments");
            setComment(res.data);

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

    const likeComment = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.patch("http://localhost:8080/discussions/" + id + "/comments/" + comment?.comments[0]._id, { commentId: id });
            setComment(res.data);

            Swal.fire({
                title: "success",
                text: "Comment liked successfully",
                icon: "success",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true
            });
        } catch (err) {
            Swal.fire({
                title: "error",
                text: "could not like the Comment",
                icon: "error",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true
            });
            console.log(err);

        }
    }

    useEffect(() => {
        getData();
    }, []);

    return ({
        comment,
        setComment,
        likeComment,
        id,
        getData
    })
}