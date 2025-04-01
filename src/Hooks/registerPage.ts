import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { registerSchema } from "../components/validations/registerSchema";


export const registerPage = () => {
    const nav = useNavigate();

    const initialForm = {
        "name": {
            "first": "",
            "middle": "",
            "last": ""
        },
        "phone": "",
        "email": "",
        "password": "",
        "image": {
            "url": "",
            "alt": ""
        },
        "address": {
            "country": "",
            "city": "",
            "street": "",
            "houseNumber": 0,
        },
        "isManager": false
    };

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialForm,
        mode: "onChange",
        resolver: joiResolver(registerSchema)
    });

    const submitForm = async (form: any) => {


        try {
            await axios.post("http://localhost:8080/users/register", form);
            Swal.fire({
                title: `Welcome ${form.name.first} ${form.name.last}`,
                text: "successfully Registerd",
                icon: "success",
                timer: 2000,
                timerProgressBar: true,
                confirmButtonColor: "#3085d6",
            });
            nav("/login");

        } catch (error) {
            if (axios.isAxiosError(error)) {
                Swal.fire({
                    title: "Error",
                    text: `${error.message}`,
                    icon: "error",
                    timer: 2000,
                    timerProgressBar: true,
                    confirmButtonColor: "#3085d6",
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Unexpected Error Please Try again",
                    icon: "error",
                    timer: 2000,
                    timerProgressBar: true,
                    confirmButtonColor: "#3085d6",
                });
            }
        }
    };

    return ({
        register,
        handleSubmit,
        errors,
        isValid,
        submitForm
    });
}