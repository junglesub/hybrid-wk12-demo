import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./App.css"; // Import the CSS file

// Define your server's global IP address and port here
const SERVER_URL = "http://localhost:8080";

function BooksList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${SERVER_URL}/books`)
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => {
        console.error("There was an error fetching the books!", error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="header">Books List</h1>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <Link to={`/books/${book.id}`} className="book-link">
              {book.title} by {book.author}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/add-book" className="button add-book-button">
        Add New Book
      </Link>
    </div>
  );
}

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${SERVER_URL}/books/${id}`)
      .then((response) => {
        if (response.status === 404) {
          setError(true);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setBook(data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the book!", error);
        setError(true);
      });
  }, [id]);

  const handleDeleteBook = () => {
    fetch(`${SERVER_URL}/books/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error deleting the book!", error);
      });
  };

  if (error) {
    return <NotFound />;
  }

  return (
    book && (
      <div className="container">
        <h1 className="header">{book.title}</h1>
        <p className="book-detail">Author: {book.author}</p>
        <div className="button-group">
          <Link to={`/edit-book/${book.id}`} className="button edit-button">
            Edit Book
          </Link>
          <button onClick={handleDeleteBook} className="button delete-button">
            Delete Book
          </button>
          <button onClick={() => navigate("/")} className="button back-button">
            Back to List
          </button>
        </div>
      </div>
    )
  );
}

function AddBook() {
  const [newBook, setNewBook] = useState({ title: "", author: "" });
  const navigate = useNavigate();

  const handleAddBook = () => {
    fetch(`${SERVER_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error adding the book!", error);
      });
  };

  return (
    <div className="container">
      <h2 className="header">Add a New Book</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="input-field"
        />
      </div>
      <div className="button-group">
        <button onClick={handleAddBook} className="button add-button">
          Add Book
        </button>
        <button onClick={() => navigate("/")} className="button back-button">
          Cancel
        </button>
      </div>
    </div>
  );
}

function EditBook() {
  const { id } = useParams();
  const [editBook, setEditBook] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${SERVER_URL}/books/${id}`)
      .then((response) => {
        if (response.status === 404) {
          setError(true);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setEditBook(data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the book!", error);
        setError(true);
      });
  }, [id]);

  const handleEditBook = () => {
    fetch(`${SERVER_URL}/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editBook),
    })
      .then(() => {
        navigate(`/books/${id}`);
      })
      .catch((error) => {
        console.error("There was an error updating the book!", error);
      });
  };

  if (error) {
    return <NotFound />;
  }

  return (
    editBook && (
      <div className="container">
        <h2 className="header">Edit Book</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Title"
            value={editBook.title}
            onChange={(e) =>
              setEditBook({ ...editBook, title: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Author"
            value={editBook.author}
            onChange={(e) =>
              setEditBook({ ...editBook, author: e.target.value })
            }
            className="input-field"
          />
        </div>
        <div className="button-group">
          <button onClick={handleEditBook} className="button save-button">
            Save Changes
          </button>
          <button
            onClick={() => navigate(`/books/${id}`)}
            className="button back-button"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );
}

function NotFound() {
  return (
    <div className="container">
      <h1 className="header">404 - Not Found</h1>
      <p className="error-message">
        The requested resource could not be found.
      </p>
      <Link to="/" className="button back-button">
        Go back to the Books List
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
