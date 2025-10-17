import { Button, FloatingLabel } from "flowbite-react";
import { registerPage } from "../../Hooks/registerPage";

const RegisterPage = () => {

    const {
        register,
        handleSubmit,
        errors,
        isValid,
        submitForm
    } = registerPage();

    return (
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center justify-center gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-1/1">

            <h1 className="text-2xl font-bold dark:text-white">Register</h1>

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

            <div className="flex flex-col w-full px-10">
                <label htmlFor="photoFile" className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Profile Photo
                </label>
                <input
                    id="photoFile"
                    type="file"
                    accept="image/png, image/jpeg, image/gif, image/webp"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    {...register("photoFile")}
                />
                {errors.photoFile && (
                    <span className="w-full mt-1 text-sm text-red-500">{errors.photoFile.message as string}</span>
                )}
            </div>


            <Button type="submit" disabled={!isValid} className="w-full dark:text-white">
                Register
            </Button>

        </form>
    )
}

export default RegisterPage;