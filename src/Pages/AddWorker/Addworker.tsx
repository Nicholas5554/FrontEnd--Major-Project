import { Button, FloatingLabel } from "flowbite-react";
import { addWorker } from "../../Hooks/addWorker";

const AddWorker = () => {

    const {
        register,
        handleSubmit,
        errors,
        isValid,
        submitForm
    } = addWorker();

    return (
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center justify-center gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-1/1">

            <h1 className="text-2xl font-bold dark:text-white">Worker Registration</h1>

            <div className="flex flex-row justify-around gap-11 w-80">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="First Name"
                        {...register("name.first")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.name?.first?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Last Name"
                        {...register("name.last")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.name?.last?.message}</span>
                </div>
            </div>

            <div className="flex flex-row justify-around gap-11 w-80">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="email"
                        variant="standard"
                        label="Email"
                        {...register("email")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.email?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="password"
                        variant="standard"
                        label="Password"
                        {...register("password")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.password?.message}</span>
                </div>
            </div>


            <Button type="submit" disabled={!isValid} className="w-full dark:text-white">
                Add Worker
            </Button>

        </form>
    )
}

export default AddWorker;