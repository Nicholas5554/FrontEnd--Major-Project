import { Button, Checkbox, FloatingLabel, Label } from "flowbite-react";
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
                        label="Middle Name"
                        {...register("name.middle")}
                    />
                    <span className="w-32 text-sm text-red-500 ">{errors.name?.middle?.message}</span>
                </div>
            </div>

            <div className="flex flex-row justify-around gap-11 w-80">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Last Name"
                        {...register("name.last")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.name?.last?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="phone"
                        variant="standard"
                        label="phone"
                        {...register("phone")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.phone?.message}</span>
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

            <div className="flex flex-row justify-around gap-11 w-80">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="image url"
                        {...register("image.url")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.image?.url?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="image alt"
                        {...register("image.alt")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.image?.alt?.message}</span>
                </div>
            </div>

            <div className="flex flex-row justify-around gap-11 w-80">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="country"
                        {...register("address.country")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.address?.country?.message}</span>
                </div>
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="city"
                        {...register("address.city")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.address?.city?.message}</span>
                </div>
            </div>

            <div className="flex flex-row justify-around gap-11 w-80">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="street"
                        {...register("address.street")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.address?.street?.message}</span>
                </div>
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="number"
                        variant="standard"
                        label="houseNumber"
                        {...register("address.houseNumber")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.address?.houseNumber?.message}</span>
                </div>
            </div>

            <Label htmlFor="isBusiness">Manager account</Label>
            <Checkbox {...register("isManager")} />
            <span className="text-sm text-red-500">{errors.isManager?.message}</span>

            <Button type="submit" disabled={!isValid} className="w-full dark:text-white">
                Register
            </Button>

        </form>
    )
}

export default RegisterPage;