import BoardView from '../view/board.js';
import BoardTasksView from '../view/board-tasks.js';
import SortView from '../view/sort.js';
import TaskEditView from '../view/edit-task.js';
import TaskView from '../view/task.js';
import LoadMoreButtonView from '../view/load-button.js';
import NoTaskView from '../view/no-task.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';

const TASK_COUNT_PER_STEP = 8;
const Key = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._boardElement = new BoardView();
    this._sortElement = new SortView();
    this._boardTasksElement = new BoardTasksView();
    this._noTaskElement = new NoTaskView();
    this._loadMoreButtonElement = new LoadMoreButtonView();
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();

    render(this._boardContainer, this._boardElement, RenderPosition.BEFOREEND);
    render(this._boardElement, this._boardTasksElement, RenderPosition.BEFOREEND);
    this._renderBoard();
  }

  _renderSort() {
    render(this._boardElement, this._sortElement, RenderPosition.AFTERBEGIN);
  }

  _renderTask(task) {
    const taskElement = new TaskView(task);
    const taskEditElement = new TaskEditView(task);

    const replaceCardToForm = () => {
      replace(taskEditElement, taskElement);
    };

    const replaceFormToCard = () => {
      replace(taskElement, taskEditElement);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskElement.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditElement.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._boardTasksElement, taskElement, RenderPosition.BEFOREEND);
  }

  _renderTasks(from, to) {
    this._boardTasks
      .slice(from, to)
      .forEach((boardTask) => this._renderTask(boardTask));

  }

  _renderNoTasks() {
    render(this._boardElement, this._noTaskElement, RenderPosition.AFTERBEGIN);
  }

  _renderLoadMoreButton() {
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    render(this._boardElement, this._loadMoreButtonElement, RenderPosition.BEFOREEND);

    this._loadMoreButtonElement.setClickHandler(() => {
      this._boardTasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((boardTask) => this._renderTask(boardTask));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= this._boardTasks.length) {
        remove(this._loadMoreButtonElement);
      }
    });
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
}
