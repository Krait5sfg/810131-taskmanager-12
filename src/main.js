import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createBoardTemplate} from './view/board.js';
import {createSortingTemplate} from './view/sorting.js';
import {createEditTaskTemplate} from './view/edit-task.js';
import {createTaskTemplate} from './view/task.js';
import {createLoadButtonTemplate} from './view/load-button.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from './mock/filter.js';
import {render} from './utils.js';

const CountType = {
  TASK: 20,
  TASK_PER_STEP: 8,
};

const tasks = new Array(CountType.TASK).fill(``).map(generateTask);
const filters = generateFilter(tasks);

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

render(mainControlElement, createMenuTemplate(), `beforeend`);
render(mainElement, createFilterTemplate(filters), `beforeend`);
render(mainElement, createBoardTemplate(), `beforeend`);

const boardElement = mainElement.querySelector(`.board`);
const boardTasksElement = boardElement.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), `afterbegin`);
render(boardTasksElement, createEditTaskTemplate(tasks[0]), `beforeend`);
for (let x = 1; x < CountType.TASK_PER_STEP; x++) {
  render(boardTasksElement, createTaskTemplate(tasks[x]), `beforeend`);
}
if (tasks.length > CountType.TASK_PER_STEP) {
  let renderedTaskCount = CountType.TASK_PER_STEP;

  render(boardElement, createLoadButtonTemplate(), `beforeend`);
  const loadMoreElement = boardElement.querySelector(`.load-more`);

  loadMoreElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + CountType.TASK_PER_STEP)
      .forEach((task) => render(boardTasksElement, createTaskTemplate(task), `beforeend`));

    renderedTaskCount += CountType.TASK_PER_STEP;
    if (renderedTaskCount >= tasks.length) {
      loadMoreElement.remove();
    }
  });
}
