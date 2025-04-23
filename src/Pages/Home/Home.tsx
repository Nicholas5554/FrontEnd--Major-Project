import { useNavigate } from "react-router-dom";
import 'animate.css';


const Home = () => {

    const nav = useNavigate();
    const navToRegister = () => {
        nav("/register");
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-4/6 text-center gap-7 dark:text-white ">
                <h1 className="text-7xl animate__animated animate__fadeIn">Time To Move NEX</h1>
                <p className="text-3xl animate__animated animate__fadeIn">Minimalist task organizer</p>
                <button type="button" className="h-10 text-white transition-all duration-300 ease-in-out bg-blue-600 rounded-md animate__animated animate__fadeIn w-52 hover:bg-blue-700 hover:scale-105 hover:shadow-lg" onClick={navToRegister}>Take me to the NEX Level</button>
            </div>
        </>
    )
}


export default Home;