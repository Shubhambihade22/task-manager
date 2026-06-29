import React from "react";
import { Modal, TextField, Button, Box, IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskModal = ({
  open,
  handleClose,
  taskData,
  handleChange,
  handleSave,
  handleFileChange,
  file,
  isEditing,
}) => {
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 420,
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          value={taskData?.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Description"
          value={taskData?.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          type="date"
          label="Deadline"
          InputLabelProps={{ shrink: true }}
          value={formatDateForInput(taskData?.deadline)}
          onChange={(e) => handleChange("deadline", e.target.value)}
        />

        {!isEditing && (
          <>
            <input
              hidden
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />

            <label htmlFor="pdf-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<UploadIcon />}
                sx={{ mt: 2 }}
              >
                {file ? file.name : "Upload PDF"}
              </Button>
            </label>

            {file && (
              <IconButton
                color="error"
                sx={{ ml: 1 }}
                onClick={() =>
                  handleFileChange({
                    target: { files: [] },
                  })
                }
              >
                <DeleteIcon />
              </IconButton>
            )}
          </>
        )}

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button onClick={handleClose}>Cancel</Button>

          <Button variant="contained" onClick={handleSave}>
            {isEditing ? "Update" : "Save"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;
