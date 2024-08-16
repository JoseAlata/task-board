import { useEffect, useState } from "react";
import { Task } from "../types/types";

interface taskProps {
  onAddTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  taskToEdit: Task | undefined;
  handleOpenForm: (value: boolean) => void;
}

function TaskForm({
  onAddTask,
  onEditTask,
  taskToEdit,
  handleOpenForm,
}: taskProps) {
  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    status: "todo",
  });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (taskToEdit) {
      onEditTask(task);
      console.log("tarea editado");
    } else {
      onAddTask({ ...task, id: Date.now().toString() });
      console.log("tarea agregado");
    }
    setTask({
      id: "",
      title: "",
      description: "",
      status: "todo",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='task-form'>
      <div className='task-form__card'>
        <button
          className='task-form__close'
          onClick={() => handleOpenForm(false)}
        >
          <span className='material-symbols-outlined'>close</span>
        </button>
        <h2 className='task-form__title'>
          {taskToEdit ? "Editar" : "Agregar"} tarea
        </h2>
        <form onSubmit={handleSubmit} className='task-form__form'>
          <label htmlFor='title' className='task-form__label'>
            Título
          </label>
          <input
            type='text'
            id='title'
            value={task.title}
            placeholder='Titulo'
            onChange={handleChange}
            name='title'
            className='task-form__input'
            required
          />

          <label htmlFor='description' className='task-form__label'>
            Descripción
          </label>

          <input
            type='text'
            value={task.description}
            placeholder='Descripción'
            name='description'
            id='description'
            onChange={handleChange}
            className='task-form__input'
            required
          />
          <button type='submit' className='task-form__submit'>
            {taskToEdit ? "Editar" : "Agregar"} tarea
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
