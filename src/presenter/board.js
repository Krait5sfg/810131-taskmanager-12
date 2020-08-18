import BoardView from '../view/board.js';
import BoardTasksView from '../view/board-tasks.js';
import SortView from '../view/sort.js';
import LoadMoreButtonView from '../view/load-button.js';
import NoTaskView from '../view/no-task.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import TaskPresenter from './task.js';
import {SortType} from '../const.js';
import {sortTaskUp, sortTaskDown} from '../utils/task.js';
import {updateItem} from "../utils/common.js";

const TASK_COUNT_PER_STEP = 8;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._boardElement = new BoardView();
    this._sortElement = new SortView();
    this._boardTasksElement = new BoardTasksView();
    this._noTaskElement = new NoTaskView();
    this._loadMoreButtonElement = new LoadMoreButtonView();
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleTaskChange = this._handleTaskChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._currenSortType = SortType.DEFAULT;
    this._taskPresenter = {}; // все презентеры задач
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();

    this._sourcedBoardTasks = boardTasks.slice();// сохраняем исходный массив

    render(this._boardContainer, this._boardElement, RenderPosition.BEFOREEND);
    render(this._boardElement, this._boardTasksElement, RenderPosition.BEFOREEND);
    this._renderBoard();
  }

  _handleModeChange() {
    Object
      .values(this._taskPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.DATE_UP:
        this._boardTasks.sort(sortTaskUp);
        break;
      case SortType.DATE_DOWN:
        this._boardTasks.sort(sortTaskDown);
        break;
      default:
        this._boardTasks = this._sourcedBoardTasks.slice();
    }
    this._currenSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currenSortType === sortType) {
      return;
    }
    this._sortTasks(sortType);
    this._clearTaskList();
    this._renderTaskList();
  }

  _clearTaskList() {
    Object
      .values(this._taskPresenter)
      .forEach((presenter) => presenter.destroy());
    this._taskPresenter = {};
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
  }

  _renderSort() {
    render(this._boardElement, this._sortElement, RenderPosition.AFTERBEGIN);
    this._sortElement.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTask(task) {
    const taskPresenter = new TaskPresenter(this._boardTasksElement, this._handleTaskChange, this._handleModeChange);
    taskPresenter.init(task);
    this._taskPresenter[task.id] = taskPresenter;
  }

  _renderTasks(from, to) {
    this._boardTasks
      .slice(from, to)
      .forEach((boardTask) => this._renderTask(boardTask));
  }

  _renderNoTasks() {
    render(this._boardElement, this._noTaskElement, RenderPosition.AFTERBEGIN);
  }

  _handleLoadMoreButtonClick() {
    this._renderTasks(this._renderedTaskCount, this._renderedTaskCount + TASK_COUNT_PER_STEP);
    this._renderedTaskCount += TASK_COUNT_PER_STEP;
    if (this._renderedTaskCount >= this._boardTasks.length) {
      remove(this._loadMoreButtonElement);
    }
  }

  _renderLoadMoreButton() {
    render(this._boardElement, this._loadMoreButtonElement, RenderPosition.BEFOREEND);
    this._loadMoreButtonElement.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderTaskList() {
    this._renderTasks(0, Math.min(this._boardTasks.length, TASK_COUNT_PER_STEP));

    if (this._boardTasks.length > TASK_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderBoard() {
    if (this._boardTasks.every((task) => task.isArchive)) {
      this._renderNoTasks();
      return;
    }
    this._renderSort();
    this._renderTaskList();
  }

  _handleTaskChange(updatedTask) {
    this._boardTasks = updateItem(this._boardTasks, updatedTask);
    this._sourcedBoardTasks = updateItem(this._sourcedBoardTasks, updatedTask);
    this._taskPresenter[updatedTask.id].init(updatedTask);// сохраняем в презентере обновленную задачу
  }
}
