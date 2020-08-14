const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  return currentDate;
};

export const isTaskExpired = (dueDate) => {
  const currentDate = getCurrentDate();
  return dueDate === null ? false : currentDate.getTime() > dueDate.getTime();
};

export const isTaskExpiringToday = (dueDate) => {
  const currentDate = getCurrentDate();
  return dueDate === null ? false : currentDate.getTime() === dueDate.getTime();
};

export const isTaskRepeating = (repeating) => Object.values(repeating).some(Boolean);

export const humanizeTaskDueDate = (dueDate) => dueDate.toLocaleString(`en-GB`, {day: `numeric`, month: `long`});
