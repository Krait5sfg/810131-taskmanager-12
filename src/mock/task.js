import {COLORS} from '../const.js';
import {getRandomInteger} from '../utils.js';

const generateDescription = () => {
  const description = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ];
  const randomIndex = getRandomInteger(0, description.length - 1);
  return description[randomIndex];
};

const generateDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);

  if (!isDate) {
    return null;
  } else {
    return new Date(currentDate);
  }

};

const generateRepeatingDays = () => {
  return {
    mo: false,
    tu: false,
    we: Boolean(getRandomInteger(0, 1)),
    th: false,
    fr: Boolean(getRandomInteger(0, 1)),
    sa: false,
    su: false
  };
};

const getRandomColor = () => {
  const randomIndex = getRandomInteger(0, COLORS.length - 1);
  return COLORS[randomIndex];
};

export const generateTask = () => {
  const dueDate = generateDate();
  const repeatingDays = dueDate === null
    ? generateRepeatingDays()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };

  return {
    description: generateDescription(),
    dueDate,
    repeatingDays,
    color: getRandomColor(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isArchive: Boolean(getRandomInteger(0, 1)),
  };
};
