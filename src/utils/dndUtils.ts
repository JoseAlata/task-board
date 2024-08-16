export const handleDragStart = (
  e: React.DragEvent<HTMLDivElement>,
  taskId: string
) => {
  e.dataTransfer.setData("taskId", taskId);
};
