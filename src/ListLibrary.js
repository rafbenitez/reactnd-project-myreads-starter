import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ListShelf from './ListShelf'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class ListLibrary extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    //
  }

  render() {
    const { books, shelves, onUpdateBook } = this.props

    let listingShelves = shelves.filter((shelf) => shelf.shelfOrder > 0).sort(sortBy('shelfOrder'))

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {listingShelves.map((shelf) => (
              <div key={shelf.id}>
                <ListShelf
                  books={books.filter((book) => book.shelf === shelf.id)}
                  shelf={shelf}
                  shelves={shelves}
                  onUpdateBook={onUpdateBook}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
            className='open-search'
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListLibrary
