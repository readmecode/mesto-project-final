export default class Section {
  constructor({renderer}, itemsContainer) {
    this._renderer = renderer
    this._container = itemsContainer
  }

  addItem(elem) {
    this._container.prepend(elem)
  }

  renderedItems(items) {
    items.forEach(element => {
      this._renderer(element)
    });
  }
}