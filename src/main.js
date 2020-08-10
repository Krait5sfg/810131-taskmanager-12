import SiteMenuView from './view/menu.js';
import FilterView from './view/filter.js';
import BoardView from './view/board.js';
import BoardTasksView from "./view/board-tasks.js";
import SortView from './view/sort.js';
import TaskEditView from './view/edit-task.js';
import TaskView from './view/task.js';
import LoadMoreButtonView from './view/load-button.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from './mock/filter.js';
import {render} from './utils.js';
import {RenderPosition} from './const.js';

const CountType = {
  TASK: 20,
  TASK_PER_STEP: 8,
};

const tasks = new Array(CountType.TASK).fill(``).map(generateTask);
const filters = generateFilter(tasks);

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

render(mainControlElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
const boardElement = new BoardView();
render(mainElement, boardElement.getElement(), RenderPosition.BEFOREEND);
render(boardElement.getElement(), new SortView().getElement(), RenderPosition.AFTERBEGIN);

const boardTasksElement = new BoardTasksView();
render(boardElement.getElement(), boardTasksElement.getElement(), RenderPosition.BEFOREEND);
render(boardTasksElement.getElement(), new TaskEditView(tasks[0]).getElement(), RenderPosition.BEFOREEND);
for (let x = 1; x < CountType.TASK_PER_STEP; x++) {
  render(boardTasksElement.getElement(), new TaskView(tasks[x]).getElement(), RenderPosition.BEFOREEND);
}
if (tasks.length > CountType.TASK_PER_STEP) {
  let renderedTaskCount = CountType.TASK_PER_STEP;
  const loadMoreButtonElement = new LoadMoreButtonView();
  render(boardElement.getElement(), loadMoreButtonElement.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonElement.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + CountType.TASK_PER_STEP)
      .forEach((task) => render(boardTasksElement.getElement(), new TaskView(task).getElement(), RenderPosition.BEFOREEND));

    renderedTaskCount += CountType.TASK_PER_STEP;
    if (renderedTaskCount >= tasks.length) {
      loadMoreButtonElement.getElement().remove();
      loadMoreButtonElement.removeElement();
    }
  });
}
