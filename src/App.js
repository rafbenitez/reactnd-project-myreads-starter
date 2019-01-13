import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListLibrary from './ListLibrary'
import SearchBooks from './SearchBooks'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    query: '',
    searchResults: [],
    shelves: [
      {
        id: 'move',
        title: 'Move to...',
        optionOrder: 1,
        optionEnabled: false,
        shelfOrder: -1
      },
      {
        id: 'currentlyReading',
        title: 'Currently Reading',
        optionOrder: 2,
        optionEnabled: true,
        shelfOrder: 1
      },
      {
        id: 'wantToRead',
        title: 'Want to Read',
        optionOrder: 3,
        optionEnabled: true,
        shelfOrder: 2
      },
      {
        id: 'read',
        title: 'Read',
        optionOrder: 4,
        optionEnabled: true,
        shelfOrder: 3
      },
      {
        id: 'none',
        title: 'None',
        optionOrder: 5,
        optionEnabled: true,
        shelfOrder: -1
      }
    ]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  searchBooks = (query) => {
    this.setState({ query })
    if (query.length > 0) {
      BooksAPI.search(query).then((results) => {
        if (Array.isArray(results)) {
          results = results.map((resultsBook) => {
            let myBook = this.state.books.find((book) => {return book.id === resultsBook.id})
            if (myBook) {
              // console.log( { ...resultsBook, shelf: myBook.shelf} )
              return { ...resultsBook, shelf: myBook.shelf }
            } else {
              return { ...resultsBook, shelf: 'none' }
            }
          })
          this.setState({ searchResults: results.sort(sortBy('title')) })
        } else {
          this.setState({ searchResults: [] })
        }
      })
    } else {
      this.setState({ searchResults: [] })
    }
  }

  updateBook = (updatedBook, newShelf) => {
    BooksAPI.update(updatedBook, newShelf).then(() => {
      this.setState((state) => {
        let newBooks = state.books
        if (newBooks.findIndex((e) => e.id === updatedBook.id) < 0 ) {
          newBooks.push(updatedBook)
        }
        return {
          books: newBooks.map((book) => {
            return (book.id === updatedBook.id) ? { ...book, shelf: newShelf } : book
          })
      }})
    })
  }

  render() {

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListLibrary
            books={this.state.books}
            shelves={this.state.shelves}
            onUpdateBook={this.updateBook}
          />
        )}/>
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            books={this.state.books}
            query={this.state.query}
            searchResults={ Array.isArray(this.state.searchResults) ? this.state.searchResults : [] }
            shelves={this.state.shelves}
            onSearchBooks={this.searchBooks}
            onUpdateBook={this.updateBook}
          />
         )}/>
      </div>
    )
  }
}

export default BooksApp
