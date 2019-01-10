import React, { Component } from 'react';
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import ListBook from './ListBook';

class ListShelf extends Component {
  static propTypes = {
    shelf: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    //
  }

  render() {
    const { shelf, shelves, books, onUpdateBook } = this.props

    let listingBooks = books.sort(sortBy('name'))

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {listingBooks.map((book) => (
              <li key={book.id}>
                <ListBook
                  shelves={shelves}
                  book={book}
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
