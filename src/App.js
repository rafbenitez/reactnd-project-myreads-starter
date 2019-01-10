import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListLibrary from './ListLibrary'
import SearchBooks from './SearchBooks'
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
    shelves: [
      {
        id: "move",
        title: "Move to...",
        optionOrder: 1,
        optionEnabled: false,
        shelfOrder: -1
      },
      {
        id: "currentlyReading",
        title: "Currently Reading",
        optionOrder: 2,
        optionEnabled: true,
        shelfOrder: 1
      },
      {
        id: "wantToRead",
        title: "Want to Read",
        optionOrder: 3,
        optionEnabled: true,
        shelfOrder: 2
      },
      {
        id: "read",
        title: "Read",
        optionOrder: 4,
        optionEnabled: true,
        shelfOrder: 3
      },
      {
        id: "none",
        title: "None",
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

  updateBook = (updatedBook) => {
    this.setState((state) => ({
      books: state.books.map((book) => {
        return (book.id === updatedBook.id) ? updatedBook : book
      })
    }))
  }

  render() {

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListLibrary
            onUpdateBook={this.updateBook}
            books={this.state.books}
            shelves={this.state.shelves}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            onUpdateBook={this.updateBook}
            shelves={this.state.shelves}
            // onCreateContact={(contact) => {
            //   this.createContact(contact)
            //   history.push('/')
            // }}
          />
        )}/>
      </div>
    )


  }
}

export default BooksApp
