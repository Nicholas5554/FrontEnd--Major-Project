import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TRootState } from "../Store/bigPie";


export const myDiscussions = () => {
    const [discussions, setDiscussions] = useState<TDiscussion[]>([]);
    const nav = useNavigate();
    const searchWord = useSelector((state: TRootState) => state.searchSlice.search);


    const searchDiscussions = () => {
        return discussions.filter((item: TDiscussion) => item.title.includes(searchWord.toLocaleLowerCase()));
    };

    const navToDiscussion = (id: string) => {
        nav(`/discussion/${id}`);
    }

    const getData = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["x-auth-token"] = token;
        }

        const res = await axios.get('http://localhost:8080/discussions/my-discussions');
        setDiscussions(res.data);
        if (res.data.length === 0) {
            Swal.fire({
                title: "No Discussions Found",
                text: "could not find Discussions",
                icon: "question",
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                timerProgressBar: true,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined

            });
        }

    }


    useEffect(() => {
        getData();
    }, [])

    const user = useSelector(
        (state: TRootState) => state.userSlice,
    );


    return ({
        discussions,
        searchDiscussions,
        user,
        navToDiscussion
    })
}