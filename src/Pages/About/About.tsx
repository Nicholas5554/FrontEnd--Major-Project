const About = () => {
    return (
        <div className="text-center dark:text-white w-[90vw] text-lg">
            <h1 className="font-bold text-teal-500">This Is NEX</h1>
            <p className="size-auto">
                NEX is a minimalist task organizer designed to help teams and individuals stay organized, collaborate seamlessly, and achieve their goals.
            </p>
            <br />

            <h2 className="font-bold text-teal-500">Why NEX?</h2>
            <p>
                In today's fast-paced world, staying organized is crucial. NEX provides a simple yet powerful platform for managing tasks and collaborating with others. Whether you're a student, a professional, or part of a team, NEX can help you streamline your workflow and boost productivity.
            </p>
            <br />
            <h2 className="font-bold text-teal-500">How It Works</h2>
            <p>
                NEX allows users to create an account and log in to access their dashboard. Users can create tasks and discussions and assign them to team members by choosing one of the workers they added.
            </p>
            <br />

            <h2 className="font-bold text-teal-500">Features</h2>
            <ul>
                <li>User authentication</li>
                <li>Create, edit, delete, and manage tasks easily</li>
                <li>Discussion boards for collaboration</li>
                <li>Responsive and minimalistic design for a smooth experience</li>
            </ul>
            <br />
            <h2 className="font-bold text-teal-500">Technologies Used</h2>
            <p>
                NEX is built using modern web technologies including:
            </p>
            <ul>
                <li><strong>React:</strong> For building the user interface.</li>
                <li><strong>React Router:</strong> For managing application routing.</li>
                <li><strong>NodeJs:</strong> For back-end logic</li>
                <li><strong>MongoDb:</strong> for storing information</li>
            </ul>


        </div>
    );
};


export default About;