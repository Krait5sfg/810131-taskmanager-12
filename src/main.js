import SiteMenuView from './view/menu.js';
import FilterView from './view/filter.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from './mock/filter.js';
import BoardPresenter from './presenter/board.js';
import {render, RenderPosition} from './utils/render.js';

const COUNT_TASK = 20;

const tasks = new Array(COUNT_TASK).fill(``).map(generateTask);
const filters = generateFilter(tasks);

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

render(mainControlElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(mainElement, new FilterView(filters), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(mainElement);
boardPresenter.init(tasks);
