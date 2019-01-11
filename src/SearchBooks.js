import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ListBook from './ListBook';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    searchResults: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onSearchBooks: PropTypes.func.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { books, searchResults, shelves, onSearchBooks, onUpdateBook } = this.props
    // const { query } = this.state

    // let showingBooks
    // if (query) {
    //   const match = new RegExp(escapeRegExp(query), 'i')
    //   showingBooks = books.filter((book) => match.test(book.name))
    // } else {
    //   showingBooks = books
    // }

    // showingBooks.sort(sortBy('name'))

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type='text'
              placeholder='Search by title or author'
              // value={query}
              onChange={(event) => onSearchBooks(event.target.value)}
            />


          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map((book) => (
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

export default SearchBooks
