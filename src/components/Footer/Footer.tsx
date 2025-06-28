import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer className="shadow bg-slate-200 dark:bg-gray-900">
                <div className="w-full max-w-screen-xl p-4 mx-auto md:flex md:items-center md:justify-between">
                    <span className="text-gray-500 text-md sm:text-center dark:text-gray-400">© 2025 Nikolas™ All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 font-semibold text-gray-500 text-md dark:text-gray-400 sm:mt-0">
                        <li>
                            <a href="https://www.linkedin.com/in/nikolas-lushnikov-957a9b1b8/" className="flex flex-row items-center gap-1 hover:underline" >Contact <FaLinkedin /></a>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    )
}

export default Footer