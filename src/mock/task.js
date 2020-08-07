import {COLORS} from '../const.js';
import {getRandomInteger} from '../utils.js';

const DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];
const MAX_DAYS_GAP = 7;

const generateDescription = (descriptions) => descriptions[getRandomInteger(0, descriptions.length - 1)];

const generateDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));
  if (!isDate) {
    return null;
  }
  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRepeatingDays = () => ({
  mo: false,
  tu: false,
  we: Boolean(getRandomInteger(0, 1)),
  th: false,
  fr: Boolean(getRandomInteger(0, 1)),
  sa: false,
  su: false
});

const getRandomColor = () => COLORS[getRandomInteger(0, COLORS.length - 1)];
const getRandomBooleanValue = () => Boolean(getRandomInteger(0, 1));

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
    description: generateDescription(DESCRIPTIONS),
    dueDate,
    repeatingDays,
    color: getRandomColor(),
    isFavorite: getRandomBooleanValue(),
    isArchive: getRandomBooleanValue(),
  };
};
