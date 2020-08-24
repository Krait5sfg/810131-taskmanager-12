import moment from 'moment';

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

export const formatTaskDueDate = (dueDate) => {
  if (!(dueDate instanceof Date)) {
    return ``;
  }

  return moment(dueDate).format(`D MMMM`);
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortTaskUp = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return taskA.dueDate.getTime() - taskB.dueDate.getTime();
};

export const sortTaskDown = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return taskB.dueDate.getTime() - taskA.dueDate.getTime();
};
