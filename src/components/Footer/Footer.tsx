const Footer = () => {
    return (
        <>
            <footer className="shadow bg-slate-200 dark:bg-gray-900">
                <div className="w-full max-w-screen-xl p-4 mx-auto md:flex md:items-center md:justify-between">
                    <span className="text-gray-500 text-md sm:text-center dark:text-gray-400">© 2024 <a href="/" className="hover:underline">Nikolas™</a>. All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 font-semibold text-gray-500 text-md dark:text-gray-400 sm:mt-0">
                        <li>
                            <a href="/about" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="https://mail.google.com/mail/u/0/#inbox" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    )
}

export default Footer