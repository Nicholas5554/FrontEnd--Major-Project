import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { TRootState } from "../Store/bigPie";

export const discussionCrmFuncs = () => {

    const [discussions, setDiscussions] = useState<TDiscussion[]>([]);

    const searchWord = useSelector((state: TRootState) => state.searchSlice.search);
    const user = useSelector((state: TRootState) => state.userSlice);

    const searchDiscussions = () => {
        return discussions?.filter((item: TDiscussion) => item.title.includes(searchWord.toLocaleLowerCase()));
    }

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 8;
    const onPageChange = (page: number) => setCurrentPage(page);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentTasks = searchDiscussions().slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(searchDiscussions().length / cardsPerPage);

    const fetchDiscussions = async () => {
        try {
            const res = await axios.get('http://localhost:8080/discussions');
            setDiscussions(res.data);
        } catch (err: any) {
            Swal.fire({
                title: "Error",
                text: "Could not get Discussions",
                icon: "error",
                timerProgressBar: true,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
            });
        }
    }

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
                            title: "Card Deleted",
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
            ;
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

    useEffect(() => {
        fetchDiscussions();
    }, []);

    return ({
        discussions,
        searchDiscussions,
        fetchDiscussions,
        user,
        currentPage,
        totalPages,
        onPageChange,
        currentTasks,
        deleteDiscussion
    })
}