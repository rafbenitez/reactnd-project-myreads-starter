import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListBook extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    //
  }

  render() {
    const { book, shelves, onUpdateBook } = this.props

    let shelfOptions = shelves.sort(sortBy('optionOrder'))

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select onChange={onUpdateBook}>
              {shelfOptions.map((option) => (
                <option key={option.id} value="{option.id}" disabled={!option.optionEnabled}>{option.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default ListBook
