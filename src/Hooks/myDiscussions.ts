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

    const deleteDiscussion = async (discussion: TDiscussion) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, I want to leave this discussion",
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined


            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.delete("http://localhost:8080/discussions/" + discussion._id);
                    const index = discussions.indexOf(discussion);
                    const newDiscussions = [...discussions];

                    if (res) {
                        Swal.fire({
                            title: "Left Discussion",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            timer: 1500,
                            timerProgressBar: true,
                            customClass: {
                                popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                            },
                            background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                            color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined

                        });
                        newDiscussions.splice(index, 1);
                        setDiscussions(newDiscussions);
                    }
                };
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "could not Leave Discussion",
                icon: "error",
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
        deleteDiscussion,
        user,
        navToDiscussion
    })
}