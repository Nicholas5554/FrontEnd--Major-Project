import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TRootState } from "../Store/bigPie";

export const useMyAssignedTasks = () => {
    const [tasks, setTasks] = useState<TTask[]>([]);
    const nav = useNavigate();
    const searchWord = useSelector((state: TRootState) => state.searchSlice.search);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 8;

    const searchTasks = () => {
        return tasks.filter((item: TTask) => item.title.toLowerCase().includes(searchWord.toLowerCase()));
    };

    const navToTask = (id: string) => {
        nav(`/task/${id}`);
    };

    const onPageChange = (page: number) => setCurrentPage(page);

    const indexOfLastCard = currentPage * tasksPerPage;
    const indexOfFirstCard = indexOfLastCard - tasksPerPage;
    const currentTasks = searchTasks().slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(searchTasks().length / tasksPerPage);

    useEffect(() => {
        const getData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    axios.defaults.headers.common["x-auth-token"] = token;
                }
                const res = await axios.get('http://localhost:8080/tasks/myAssignedTasks');
                setTasks(res.data);
            } catch (err) {
                console.error("Error fetching tasks:", err);
            }
        };

        getData();
    }, []);

    const user = useSelector((state: TRootState) => state.userSlice);

    return {
        tasks,
        searchTasks,
        navToTask,
        user,
        currentPage,
        totalPages,
        onPageChange,
        currentTasks,
    };
};
