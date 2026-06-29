export const getTaskStatus = (task) => {
  const today = new Date();
  const deadline = new Date(task.deadline);

  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  if (today <= deadline) {
    return "In Progress";
  }

  if (task.status === "DONE") {
    return "Achieved";
  }

  return "Failed";
};

export const getStatusColor = (status) => {
  switch (status) {
    case "Achieved":
      return "success";

    case "Failed":
      return "error";

    case "In Progress":
    default:
      return "warning";
  }
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB");
};
