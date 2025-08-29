import { Card } from "flowbite-react";
import { taskDetails } from "../../Hooks/taskDetails";

const TaskDetails = () => {

    const { task } = taskDetails();
    return (
        <Card className="flex items-center justify-center w-auto text-center dark:text-white">
            <h1>Title : {task && task?.title!}</h1>
            <p>the user who Created the Task : {task && task.userId && task.userId.name ? `${task.userId.name.first} ${task.userId.name.last}` : "Unknown"}</p>
            <p>the user who got it : {task && task.assignedTo ? `${task.assignedTo.name.first} ${task.assignedTo.name.last}` : "Unassigned"}</p>
            <p>Status : {task && task.status}</p>
            <p>priority : {task && task.priority}</p>
            <p>description : {task && task.description}</p>
        </Card>
    )
};

export default TaskDetails;