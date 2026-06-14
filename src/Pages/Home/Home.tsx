import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'animate.css';
import { IoIosPhoneLandscape } from "react-icons/io";
import { FaListAlt } from "react-icons/fa";

type Sparkle = {
    id: number;
    x: number;
    y: number;
    tx: number;
    ty: number;
    color: string;
    char: string;
};

const SPARKLE_CHARS = ['✦', '★', '✸', '✺', '✼', '❋'];

const Home = () => {

    const nav = useNavigate();
    const navToRegister = () => {
        nav("/register");
    }

    const [isMagic, setIsMagic] = useState(false);
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    const handleMagicClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isMagic) return;
        setIsMagic(true);

        const rect = e.currentTarget.getBoundingClientRect();
        const newSparkles: Sparkle[] = Array.from({ length: 24 }, (_, i) => ({
            id: i,
            x: Math.random() * rect.width,
            y: Math.random() * rect.height,
            tx: (Math.random() - 0.5) * 130,
            ty: -(Math.random() * 90 + 30),
            color: `hsl(${(i / 24) * 360}, 100%, 65%)`,
            char: SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)],
        }));
        setSparkles(newSparkles);

        setTimeout(() => setSparkles([]), 1000);
        setTimeout(() => setIsMagic(false), 3000);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center w-4/6 text-center gap-7 dark:text-white ">
                <h1 className="text-7xl animate__animated animate__fadeIn">Time To Move NEX</h1>
                <p className="text-4xl animate__animated animate__fadeIn">Minimalist Task Organizer</p>
                <FaListAlt className="size-0 md:size-20 lg:size-20 animate__animated animate__fadeIn" />
                <button type="button" className="text-xl text-white transition-all duration-300 ease-in-out bg-blue-600 rounded-md h-11 animate__animated animate__fadeIn w-60 hover:bg-blue-700 hover:scale-105 hover:shadow-lg" onClick={navToRegister}>Take Me To The NEX Level</button>
                <div className="relative inline-block animate__animated animate__fadeIn">
                    <button
                        type="button"
                        className={`text-xl text-white rounded-md h-11 w-60 ${
                            isMagic
                                ? 'magic-button-active'
                                : 'bg-blue-600 transition-all duration-300 ease-in-out hover:bg-blue-700 hover:scale-105 hover:shadow-lg'
                        }`}
                        onClick={handleMagicClick}
                    >
                        ✨ Show me magic
                    </button>
                    {sparkles.map(s => (
                        <span
                            key={s.id}
                            className="sparkle-particle"
                            style={{
                                left: s.x,
                                top: s.y,
                                color: s.color,
                                '--tx': `${s.tx}px`,
                                '--ty': `${s.ty}px`,
                            } as React.CSSProperties}
                        >
                            {s.char}
                        </span>
                    ))}
                </div>
                <IoIosPhoneLandscape className="size-36 sm:size-20 md:size-0 lg:size-0 animate__animated animate__rotateInDownLeft animate_slower animate__infinite infinite animate__slow" />
            </div>
        </>
    )
}


export default Home;