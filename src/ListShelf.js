import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import ListBook from './ListBook'

class ListShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {
    const { books, shelf, shelves, onUpdateBook } = this.props

    let listingBooks = books.sort(sortBy('title'))

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {listingBooks.map((book) => (
              <li key={book.id}>
                <ListBook
                  book={book}
                  shelves={shelves}
                  onUpdateBook={onUpdateBook}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default ListShelf
