import { Card } from "flowbite-react";
import { taskDetails } from "../../Hooks/taskDetails";

const TaskDetails = () => {

    const { task } = taskDetails();

    return (
        <Card className="flex items-center justify-center w-auto text-center dark:text-white">
            <h1>{task && task?.title!}</h1>
            <h3> {task && task?.type!}</h3>
            <p>the user who Created the Task : {task && task?.userId!}</p>
            <p>the user who got it : {task && task.assignedTo!}</p>
            <p>Status : {task && task.status}</p>
            <p>priority : {task && task.priority}</p>
            <p>description : {task && task.description}</p>
        </Card>
    )
};

export default TaskDetails;