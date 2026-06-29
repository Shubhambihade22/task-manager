import { Modal, Box, TextField, Button, Typography } from "@mui/material";

import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "white",
  p: 4,
  borderRadius: 2,
};

export default function AddTaskModal({ open, handleClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("deadline", form.deadline);
    if (file) {
      formData.append("linkedFile", file);
    }

    onSubmit(formData);

    handleClose();
  };

  return (
    <Modal open={open}>
      <Box sx={style}>
        <Typography variant="h6">Add Task</Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Title"
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          margin="normal"
          multiline
          rows={4}
          label="Description"
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          type="date"
          margin="normal"
          onChange={(e) =>
            setForm({
              ...form,
              deadline: e.target.value,
            })
          }
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
}
