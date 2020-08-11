import SiteMenuView from './view/menu.js';
import FilterView from './view/filter.js';
import BoardView from './view/board.js';
import BoardTasksView from "./view/board-tasks.js";
import SortView from './view/sort.js';
import TaskEditView from './view/edit-task.js';
import TaskView from './view/task.js';
import LoadMoreButtonView from './view/load-button.js';
import {generateTask} from './mock/task.js';
import NoTaskView from "./view/no-task.js";
import {generateFilter} from './mock/filter.js';
import {render} from './utils.js';
import {RenderPosition} from './const.js';

const CountType = {
  TASK: 20,
  TASK_PER_STEP: 8,
};
const Key = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

const renderTask = (taskListElement, task) => {
  const taskElement = new TaskView(task);
  const taskEditElement = new TaskEditView(task);

  const onEscKeyDown = (evt) => {
    if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceCardToForm = () => taskListElement.replaceChild(taskEditElement.getElement(), taskElement.getElement());

  const replaceFormToCard = () => taskListElement.replaceChild(taskElement.getElement(), taskEditElement.getElement());

  taskElement.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditElement.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskElement.getElement(), RenderPosition.BEFOREEND);
};


const tasks = new Array(CountType.TASK).fill(``).map(generateTask);
const filters = generateFilter(tasks);

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

render(mainControlElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

const boardElement = new BoardView();
render(mainElement, boardElement.getElement(), RenderPosition.BEFOREEND);

if (tasks.every((task) => task.isArchive)) {
  render(boardElement.getElement(), new NoTaskView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(boardElement.getElement(), new SortView().getElement(), RenderPosition.AFTERBEGIN);
  const boardTasksElement = new BoardTasksView();
  render(boardElement.getElement(), boardTasksElement.getElement(), RenderPosition.BEFOREEND);
  for (let x = 0; x < CountType.TASK_PER_STEP; x++) {
    renderTask(boardTasksElement.getElement(), tasks[x]);
  }
  if (tasks.length > CountType.TASK_PER_STEP) {
    let renderedTaskCount = CountType.TASK_PER_STEP;
    const loadMoreButtonElement = new LoadMoreButtonView();
    render(boardElement.getElement(), loadMoreButtonElement.getElement(), RenderPosition.BEFOREEND);

    loadMoreButtonElement.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      tasks
        .slice(renderedTaskCount, renderedTaskCount + CountType.TASK_PER_STEP)
        .forEach((task) => renderTask(boardTasksElement.getElement(), task));

      renderedTaskCount += CountType.TASK_PER_STEP;
      if (renderedTaskCount >= tasks.length) {
        loadMoreButtonElement.getElement().remove();
        loadMoreButtonElement.removeElement();
      }
    });
  }
}


