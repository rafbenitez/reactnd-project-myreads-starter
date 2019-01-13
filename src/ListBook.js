import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class ListBook extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  handleChangeShelf = (event) => {
    const { book, onUpdateBook } = this.props

    onUpdateBook(book, event.target.value)
  }

  render() {
    const { book, shelves } = this.props

    let shelfOptions = shelves.sort(sortBy('optionOrder'))

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url(${ (book.imageLinks) ? book.imageLinks.smallThumbnail : '' })` }}>
          </div>
          <div className="book-shelf-changer">
            <select
              value={book.shelf}
              onChange={this.handleChangeShelf}
            >
              {shelfOptions.map((option) => (
                <option
                  key={option.id}
                  value={option.id}
                  disabled={!option.optionEnabled}
                >{option.title}
                </option>
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
