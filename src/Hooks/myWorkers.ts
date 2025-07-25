import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { TRootState } from "../Store/bigPie";
import { TUser } from "../Types/TUser";

const { VITE_API_URL } = import.meta.env;

export const myWorkers = () => {

    const [users, setUsers] = useState<TUser[]>([]);

    const searchWord = useSelector((state: TRootState) => state.searchSlice.search);

    const searchUsers = () => {
        return users?.filter((item: TUser) => item.name.first.includes(searchWord));
    }

    const getUsers = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.get(`${VITE_API_URL}/users/myworkers`);
            setUsers(res.data);

        } catch (error) {
            Swal.fire({
                title: "No workers found",
                text: "Can't see any workers here",
                icon: "info",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
            });
        }
    }

    const patchManagerStatus = async (user: TUser) => {

        Swal.fire({
            title: "Are you sure?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Change this account status to ${user?.isManager ? "personal" : "Manager"}`,
            customClass: {
                popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
            },
            background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
            color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined

        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
                    await axios.patch(`${VITE_API_URL}/users/` + user?._id, { manager: !user?.isManager });
                    getUsers();

                    Swal.fire({
                        title: "Success",
                        text: "Manager status updated successfully",
                        icon: "success",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true,
                        customClass: {
                            popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                        },
                        background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                        color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
                    });

                } catch (error) {
                    console.log(`error:`, error);
                    Swal.fire({
                        title: "Error",
                        text: "Error updating Manager status",
                        icon: "error",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true,
                        customClass: {
                            popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                        },
                        background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                        color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
                    })
                }

            };
        });
    }

    const deleteUser = async (user: TUser) => {

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            text: "This account will be deleted",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes delete this account",
            customClass: {
                popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
            },
            background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
            color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
                    await axios.delete(`${VITE_API_URL}/users/` + user._id);

                    Swal.fire({
                        title: "Success",
                        text: "Account deleted",
                        icon: "success",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true,
                        customClass: {
                            popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                        },
                        background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                        color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
                    });
                    getUsers();

                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: "Error deleting account try again",
                        icon: "error",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true,
                        customClass: {
                            popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                        },
                        background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                        color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
                    })
                }
            };
        });
    }



    useEffect(() => {
        getUsers();

        const interval = setInterval(() => {
            getUsers();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return ({
        searchUsers,
        patchManagerStatus,
        deleteUser
    })
}