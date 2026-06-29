import { Modal, Box, TextField, Button, Typography } from "@mui/material";

import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
};

export default function EditTaskModal({ open, handleClose, task, onUpdate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = () => {
    onUpdate(task._id, {
      title,
      description,
      deadline: task.deadline,
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6">Edit Task</Typography>

        <TextField
          fullWidth
          label="Title"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Update Task
        </Button>
      </Box>
    </Modal>
  );
}
