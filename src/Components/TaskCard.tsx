import { Task } from "../types/types";
import { handleDragStart } from "../utils/dndUtils";
interface TaskCardProps {
  task: Task;
  onEditClick: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export default function TaskCard({
  task,
  onEditClick,
  onDeleteTask,
}: TaskCardProps) {
  return (
    <div
      className='task-card'
      draggable
      onDragStart={(e) => handleDragStart(e, task.id)}
    >
      <p className='task-card__title'>{task.title}</p>
      <p className='task-card__description'>{task.description}</p>
      <div className='task-card__actions'>
        <button className='task-card__edit' onClick={() => onEditClick(task)}>
          Editar
        </button>
        <button
          className='task-card__delete'
          onClick={() => onDeleteTask(task.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
