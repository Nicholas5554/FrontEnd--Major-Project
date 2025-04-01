import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


export const taskDetails = () => {
    const [task, setTask] = useState<TTask>();
    const { id } = useParams<{ id: string }>();

    const getData = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.get("http://localhost:8080/tasks/" + id);
            setTask(res.data);

        } catch (err) {
            Swal.fire({
                title: "error",
                text: "could not get the data",
                icon: "error",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true
            });
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