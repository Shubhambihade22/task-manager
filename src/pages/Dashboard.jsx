import { Button, Container, Typography } from "@mui/material";

import { useEffect, useState } from "react";

import TaskTable from "../components/TaskTable";
import AddTaskModal from "../components/AddTaskModal";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markDone,
} from "../api/taskApi";
import EditTaskModal from "../components/EditTaskModal";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [open, setOpen] = useState(false);

  const fetchTasks = async () => {
    const res = await getTasks();

    setTasks(res.data);
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  const updateExistingTask = async (id, data) => {
    await updateTask(id, data);

    setEditOpen(false);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (formData) => {
    await createTask(formData);

    fetchTasks();
  };

  const removeTask = async (id) => {
    await deleteTask(id);

    fetchTasks();
  };

  const doneTask = async (id) => {
    await markDone(id);

    fetchTasks();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Task Manager
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Task
      </Button>

      <TaskTable
        tasks={tasks}
        onDelete={removeTask}
        onDone={doneTask}
        onEdit={handleEditClick}
      />

      <AddTaskModal
        open={open}
        handleClose={() => setOpen(false)}
        onSubmit={addTask}
      />

      <EditTaskModal
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        task={selectedTask}
        onUpdate={updateExistingTask}
      />
    </Container>
  );
}
