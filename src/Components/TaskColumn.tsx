import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "../types/types";
interface TaskColumnProps {
  tasks: Task[];
  taskscolumn: Task[];
  status: "todo" | "in-progress" | "done";
  onDropTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onEditClick: (task: Task) => void;
}
const TaskColumn: React.FC<TaskColumnProps> = ({
  tasks,
  taskscolumn,
  status,
  onDropTask,
  onDeleteTask,
  onEditClick,
}) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    console.log(taskId);
    console.log(tasks);
    const task = tasks.find((task) => task.id === taskId);
    console.log(task);
    if (task) {
      onDropTask({ ...task, status });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={`task-column ${status}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2>
        {status === "todo"
          ? "Por Hacer"
          : status === "in-progress"
          ? "En Proceso"
          : "Hecho"}
      </h2>
      {taskscolumn.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onEditClick={onEditClick}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
