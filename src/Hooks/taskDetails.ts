import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const { VITE_API_URL } = import.meta.env;


export const taskDetails = () => {
    const [task, setTask] = useState<TTask>();
    const { id } = useParams<{ id: string }>();

    const getData = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.get(`${VITE_API_URL}/tasks/` + id);
            setTask(res.data);

        } catch (err) {
            Swal.fire({
                title: "error",
                text: "could not get the Task",
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
            console.log(err);

        }
    }

    useEffect(() => {
        getData();
    }, []);

    return ({
        task,
        setTask,
        id,
        getData
    })
}