import { useEffect, useState } from "react";
import TaskForm from "./Components/TaskForm";
import { Task } from "./types/types";
import TaskColumn from "./Components/TaskColumn";
import Header from "./Components/Header";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = window.localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task: Task) => {
    setTaskToEdit(undefined);
    setTasks([...tasks, task]);
    setOpenForm(false);
  };
  const handleEditTask = (updateTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updateTask.id ? updateTask : task))
    );
    setTaskToEdit(undefined);
    setOpenForm(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id != id));
  };

  const dropTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };
  const handleEditClick = (task: Task) => {
    setTaskToEdit(task);
    setOpenForm(true);
  };
  const handleOpenForm = (value: boolean) => {
    setOpenForm(value);
    setTaskToEdit(undefined);
  };
  return (
    <div className='task-board'>
      {openForm && (
        <TaskForm
          onAddTask={handleAddTask}
          taskToEdit={taskToEdit}
          onEditTask={handleEditTask}
          handleOpenForm={handleOpenForm}
        />
      )}
      <Header />
      <button className='task-add-button' onClick={() => handleOpenForm(true)}>
        <span className='material-symbols-outlined'>add</span>
      </button>

      <div className='task-columns'>
        <TaskColumn
          tasks={tasks}
          taskscolumn={tasks.filter((task) => task.status == "todo")}
          status='todo'
          onEditClick={handleEditClick}
          onDeleteTask={handleDeleteTask}
          onDropTask={dropTask}
        />
        <TaskColumn
          tasks={tasks}
          taskscolumn={tasks.filter((task) => task.status == "in-progress")}
          status='in-progress'
          onEditClick={handleEditClick}
          onDeleteTask={handleDeleteTask}
          onDropTask={dropTask}
        />
        <TaskColumn
          tasks={tasks}
          taskscolumn={tasks.filter((task) => task.status == "done")}
          status='done'
          onEditClick={handleEditClick}
          onDeleteTask={handleDeleteTask}
          onDropTask={dropTask}
        />
      </div>
    </div>
  );
}

export default App;
