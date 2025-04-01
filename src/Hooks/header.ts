import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TRootState } from "../Store/bigPie";
import { searchActions } from "../Store/SearchSlice";
import { userActions } from "../Store/userSlice";


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
            confirmButtonText: "Yes, log me out"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Successfully logged out",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    timer: 1500,
                    timerProgressBar: true,
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
                        "http://localhost:8080/users/" + decodedToken._id
                    );
                    dispatch(userActions.login(response.data));

                    ;
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
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