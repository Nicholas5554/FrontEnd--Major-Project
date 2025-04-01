const About = () => {
    return (
        <div className="text-center dark:text-white w-[90vw] text-lg">
            <h1 className="font-bold text-teal-500">About CardGen</h1>
            <p className="size-auto">
                The User Cards Manager is a React-based application designed to help you efficiently manage user profiles.
                With this tool, you can easily add, edit, and delete user information, and display it in an intuitive card format.
            </p>
            <br />
            <h2 className="font-bold text-teal-500">Features</h2>
            <ul>
                <li>Add new users with detailed information including name, email, and profile picture.</li>
                <li>Edit existing user profiles to keep information up to date.</li>
                <li>Delete user profiles that are no longer needed.</li>
                <li>View user details in an easy-to-read card layout.</li>
                <li>Responsive design, making it accessible on both desktop and mobile devices.</li>
            </ul>
            <br />
            <h2 className="font-bold text-teal-500">Technologies Used</h2>
            <p>
                The User Cards Manager is built using modern web technologies including:
            </p>
            <ul>
                <li><strong>React:</strong> For building the user interface.</li>
                <li><strong>React Router:</strong> For managing application routing.</li>
                <li><strong>CSS/Sass:</strong> For styling the components.</li>
                <li><strong>Bootstrap:</strong> For responsive design and pre-built components.</li>
            </ul>
            <br />
            <h2 className="font-bold text-teal-500">How It Works</h2>
            <p>
                The application is structured as a single-page application, where the main content changes dynamically based on user interaction. The user data is managed through a combination of React state and props, ensuring that the information displayed is always current and accurate.
            </p>
            <p>
                This project is ideal for anyone looking to build or improve their skills in React, and it serves as a practical example of managing dynamic data in a user-friendly interface.
            </p>
        </div>
    );
};


export default About;