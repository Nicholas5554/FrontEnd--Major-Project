import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TRootState } from "../Store/bigPie";
import { userActions } from "../Store/userSlice";

const { VITE_API_URL } = import.meta.env;

export const profile = () => {

    const user = useSelector((state: TRootState) => state.userSlice.user);

    const dispatch = useDispatch();

    const nav = useNavigate();

    const navToChange = () => {
        nav("/edituser/" + user?._id);
    }

    const getData = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.get(`${VITE_API_URL}/users/` + user?._id);
            dispatch(userActions.login(res.data));

        } catch (error) {
            Swal.fire({
                title: "error",
                text: "error getting your user",
                icon: "error",
                confirmButtonColor: '#3085d6',
                timerProgressBar: true
            })
        }
    };

    useEffect(() => {
        getData();
    }, [])

    return ({
        user,
        navToChange,
    })
}