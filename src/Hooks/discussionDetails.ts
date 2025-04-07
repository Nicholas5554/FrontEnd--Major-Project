import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


export const discussionDetails = () => {
    const [discussion, setDiscussion] = useState<TDiscussion>();
    const { id } = useParams<{ id: string }>();
    const nav = useNavigate();

    const getData = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.get("http://localhost:8080/discussions/" + id);
            setDiscussion(res.data);

        } catch (err) {
            Swal.fire({
                title: "error",
                text: "could not get the Discussion",
                icon: "error",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true
            });
        }
    }

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
        navToComments
    })
}