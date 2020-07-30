import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createBoardTemplate} from './view/board.js';
import {createSortingTemplate} from './view/sorting.js';
import {createEditTaskTemplate} from './view/edit-task.js';
import {createTaskTemplate} from './view/task.js';
import {createLoadButtonTemplate} from './view/load-button.js';

const TASK_REPEAT = 3;
const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(mainControlElement, createMenuTemplate(), `beforeend`);
render(mainElement, createFilterTemplate(), `beforeend`);
render(mainElement, createBoardTemplate(), `beforeend`);

const boardElement = mainElement.querySelector(`.board`);
const boardTasksElement = boardElement.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), `afterbegin`);
render(boardTasksElement, createEditTaskTemplate(), `beforeend`);
for (let x = 0; x < TASK_REPEAT; x++) {
  render(boardTasksElement, createTaskTemplate(), `beforeend`);
}
render(boardElement, createLoadButtonTemplate(), `beforeend`);
