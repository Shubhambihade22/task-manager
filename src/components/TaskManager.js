import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import TaskTable from "./TaskTable";
import TaskModal from "./TaskModal";
import { LoadingIndicator } from "./LoadingIndicator";

const API_URL = "http://localhost:8082/api/tasks";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "TODO",
  });

  const [file, setFile] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL);

      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddClick = () => {
    setIsEditing(false);

    setTaskData({
      title: "",
      description: "",
      deadline: "",
      status: "TODO",
    });

    setFile(null);

    setOpen(true);
  };

  const handleEditClick = (task) => {
    setIsEditing(true);

    setTaskData({
      _id: task._id,
      title: task.title,
      description: task.description,
      deadline: task.deadline?.substring(0, 10),
      status: task.status,
    });

    setFile(null);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    setFile(null);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("title", taskData.title);
      formData.append("description", taskData.description);
      formData.append("deadline", taskData.deadline);
      formData.append("status", taskData.status);

      if (file) {
        formData.append("linkedFile", file);
      }

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      if (isEditing) {
        await axios.put(`${API_URL}/${taskData._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(API_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      handleClose();

      fetchTasks();
    } catch (err) {
      console.error("Error saving task:", err.response?.data || err);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleMarkAsDone = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}/done`);

      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "TaskFile.pdf");

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : tasks.length === 0 ? (
        <Box
          sx={{
            height: "75vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">No Tasks Found!</Typography>
        </Box>
      ) : (
        <TaskTable
          tasks={tasks}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          onMarkAsDone={handleMarkAsDone}
          onDownloadFile={handleDownload}
        />
      )}

      <TaskModal
        open={open}
        handleClose={handleClose}
        taskData={taskData}
        handleChange={(field, value) =>
          setTaskData((prev) => ({
            ...prev,
            [field]: value,
          }))
        }
        handleSave={handleSave}
        handleFileChange={handleFileChange}
        file={file}
        isEditing={isEditing}
      />

      <Fab
        aria-label="add"
        color="primary"
        onClick={handleAddClick}
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default TaskManager;
