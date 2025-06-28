import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editUserSchema } from "../components/validations/editUserSchema";
import { userActions } from "../Store/userSlice";
import { TUser } from "../Types/TUser";

const { VITE_API_URL } = import.meta.env;

export const editUser = () => {
    const [userInfo, setUserInfo] = useState<TUser | null>(null);;
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();

    const nav = useNavigate();

    const initialUser = {
        name: {
            first: userInfo?.name.first,
            last: userInfo?.name.last
        },
        password: userInfo?.password
    }

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        defaultValues: initialUser,
        mode: "onChange",
        resolver: joiResolver(editUserSchema)
    });

    useEffect(() => {
        if (userInfo) {
            reset(initialUser);
        }
    }, [userInfo, reset]);

    const getData = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.get(`${VITE_API_URL}/users/` + id);
            setUserInfo(res.data);
            dispatch(userActions.login(res.data));

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Error getting your user",
                icon: "error",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
            })
        }
    };

    const submitForm = async (form: typeof initialUser) => {

        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.put(`${VITE_API_URL}/users/` + userInfo?._id, form);
            setUserInfo(res.data);

            Swal.fire({
                title: "success",
                text: "user info updated successfully",
                icon: "success",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
            });
            navToProfile();

        } catch (error) {
            Swal.fire({
                title: "error",
                text: "error updating user",
                icon: "error",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
            })
        }
    }

    const patchUserStatus = () => {

        Swal.fire({
            title: "Are you sure?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Change your status to ${userInfo?.isManager ? "personal" : "manager"}`,
            customClass: {
                popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
            },
            background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
            color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,

        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
                    const res = await axios.patch(
                        `${VITE_API_URL}/users/` + userInfo?._id, { manager: !userInfo?.isManager }
                    );
                    setUserInfo(res.data);

                    Swal.fire({
                        title: "success",
                        text: `User status updated to ${userInfo?.isManager ? "personal" : "manager"}`,
                        icon: "success",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true,
                        customClass: {
                            popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                        },
                        background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                        color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
                    });
                    navToProfile();

                } catch (error) {
                    Swal.fire({
                        title: "error",
                        text: "error updating Manager status",
                        icon: "error",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true,
                        customClass: {
                            popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                        },
                        background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                        color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
                    });
                }
            };
        });
    }

    const deleteUser = () => {

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            text: "Your account will be deleted",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete my account",
            customClass: {
                popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
            },
            background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
            color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,

        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
                    const res = await axios.delete(`${VITE_API_URL}/users/` + userInfo?._id);
                    setUserInfo(res.data);
                    dispatch(userActions.logout());
                    localStorage.removeItem("token");

                    Swal.fire({
                        title: "success",
                        text: "account deleted",
                        icon: "success",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true,
                        customClass: {
                            popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                        },
                        background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                        color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
                    });
                    nav("/");
                } catch (error) {
                    Swal.fire({
                        title: "error",
                        text: "error deleting account try again",
                        icon: "error",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true,
                        customClass: {
                            popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                        },
                        background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                        color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
                    })
                }
            };
        });
    }

    const navToProfile = () => {
        nav("/profile")
    }

    useEffect(() => {
        getData();
    }, [id]);

    return ({
        userInfo,
        register,
        handleSubmit,
        errors,
        isValid,
        submitForm,
        patchUserStatus,
        deleteUser,
        navToProfile
    })
}