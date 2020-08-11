import {createElement} from "../utils.js";
import {Number} from '../const.js';

const createFilterItemTemplate = (filter, isChecked) => {
  const {title, count} = filter;

  return `<input type="radio" id="filter__${title}" class="filter__input visually-hidden" name="filter" ${isChecked ? `checked` : ``} ${count === 0 ? `disabled` : ``}/>
  <label for="filter__${title}" class="filter__label">${title}<span class="filter__${title}-count"> ${count}</span></label>`;
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === Number.ZERO))
    .join(``);

  return `<section class="main__filter filter container">
    ${filterItemsTemplate}
    </section>`;
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
