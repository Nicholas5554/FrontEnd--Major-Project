import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TRootState } from "../Store/bigPie";

const { VITE_API_URL } = import.meta.env;

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

        const res = await axios.get(`${VITE_API_URL}/discussions/my-discussions`);
        setDiscussions(res.data);
    }


    useEffect(() => {
        getData();

        const interval = setInterval(() => {
            getData();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

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