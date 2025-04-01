import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TRootState } from "../Store/bigPie";


export const myCreatedDiscussions = () => {
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
                confirmButtonText: "Yes, Delete it"

            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.delete("http://localhost:8080/discussions/" + discussion._id);
                    const index = discussions.indexOf(discussion);
                    const newDiscussions = [...discussions];

                    if (res) {
                        Swal.fire({
                            title: "Discussion Deleted",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            timer: 1500,
                            timerProgressBar: true,
                        });
                        newDiscussions.splice(index, 1);
                        setDiscussions(newDiscussions);
                    }
                };
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "could not delete Discussion",
                icon: "error",
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                timerProgressBar: true
            });
        }
    };

    const navToDiscussion = (id: string) => {
        nav(`/discussion/${id}`);
    }

    const editDiscussion = (id: string) => {
        nav(`/editdiscussion/${id}`);
    }

    const navToCreateDiscussion = () => {
        nav('/createtask');
    }

    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 8;
    const onPageChange = (page: number) => setCurrentPage(page);

    const indexOfLastCard = currentPage * tasksPerPage;
    const indexOfFirstCard = indexOfLastCard - tasksPerPage;
    const currentDiscussions = searchDiscussions().slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(searchDiscussions().length / tasksPerPage);

    const getData = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["x-auth-token"] = token;
        }

        const res = await axios.get('http://localhost:8080/discussions/my-createdDiscussions');
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
        currentPage,
        totalPages,
        onPageChange,
        currentDiscussions,
        navToDiscussion,
        editDiscussion
    })
}