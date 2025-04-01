import { Button } from "flowbite-react";
import { TbError404 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Error = () => {

    const path = useNavigate();
    const pathHome = () => {
        path('/');
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-5/5 dark:text-white">
                <h1 className="mt-6">Error</h1>
                <TbError404 className="w-[400px] h-[200px]" />
                <Button onClick={pathHome}>Go Home</Button>
            </div>
        </>
    )
}

export default Error;