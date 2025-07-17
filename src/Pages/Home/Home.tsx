import { useNavigate } from "react-router-dom";
import 'animate.css';
import { IoIosPhoneLandscape } from "react-icons/io";
import { FaListAlt } from "react-icons/fa";



const Home = () => {

    const nav = useNavigate();
    const navToRegister = () => {
        nav("/register");
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-4/6 text-center gap-7 dark:text-white ">
                <h1 className="text-7xl animate__animated animate__fadeIn">Time To Move NEX</h1>
                <p className="text-4xl animate__animated animate__fadeIn">Minimalist Task Organizer</p>
                <FaListAlt className="size-0 md:size-20 lg:size-20 animate__animated animate__fadeIn" />
                <button type="button" className="text-xl text-white transition-all duration-300 ease-in-out bg-blue-600 rounded-md h-11 animate__animated animate__fadeIn w-60 hover:bg-blue-700 hover:scale-105 hover:shadow-lg" onClick={navToRegister}>Take Me To The NEX Level</button>
                <IoIosPhoneLandscape className="size-36 sm:size-20 md:size-0 lg:size-0 animate__animated animate__rotateInDownLeft animate_slower animate__infinite infinite animate__slow" />
            </div>
        </>
    )
}


export default Home;