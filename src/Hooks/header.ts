import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TRootState } from "../Store/bigPie";
import { searchActions } from "../Store/SearchSlice";
import { userActions } from "../Store/userSlice";

const { VITE_API_URL } = import.meta.env;


export const header = () => {

    const loc = useLocation().pathname;
    const user = useSelector((state: TRootState) => state.userSlice.user);
    const dispatch = useDispatch();
    const nav = useNavigate();

    const logout = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log me out",
            customClass: {
                popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
            },
            background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
            color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Successfully logged out",
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
                localStorage.removeItem("token");
                dispatch(userActions.logout());
                nav('/');
            };
        });
    };

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(searchActions.searchWord(value));
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    axios.defaults.headers.common["x-auth-token"] = token;
                    const decodedToken = jwtDecode(token) as { _id: string };
                    const response = await axios.get(
                        `${VITE_API_URL}/users/` + decodedToken._id
                    );
                    dispatch(userActions.login(response.data));

                    ;
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Could not get user data",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    customClass: {
                        popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                    },
                    background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                    color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
                });
            }
        };
        fetchUser();
    }, [dispatch]);

    return ({
        loc,
        user,
        logout,
        search
    })
}