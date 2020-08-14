import {COLORS} from '../const.js';
import {getRandomInteger} from "../utils/common.js";

const DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];
const MAX_DAYS_GAP = 7;

const DateNumber = {
  HOURS: 23,
  MINUTES: 59,
  SECONDS: 59,
  MIL_SECONDS: 999,
};

const generateDescription = () => DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
const getRandomBooleanValue = () => Boolean(getRandomInteger(0, 1));

const generateDate = () => {
  const isDate = getRandomBooleanValue();
  if (!isDate) {
    return null;
  }
  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const currentDate = new Date();
  currentDate.setHours(DateNumber.HOURS, DateNumber.MINUTES, DateNumber.SECONDS, DateNumber.MIL_SECONDS);
  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRepeatingDays = () => ({
  mo: false,
  tu: false,
  we: getRandomBooleanValue(),
  th: false,
  fr: getRandomBooleanValue(),
  sa: false,
  su: false
});

const getRandomColor = () => COLORS[getRandomInteger(0, COLORS.length - 1)];

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
    isFavorite: getRandomBooleanValue(),
    isArchive: getRandomBooleanValue(),
  };
};
