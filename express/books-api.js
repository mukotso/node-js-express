// import body parser and express
//which helps us decode the body from an HTTP request:
const express = require('express')
const cors = require('cors');

const app = express();
app.use(express.json())
const port = 3000;

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware



//create a book
app.post('/create-book', (req, res,next) => {
    const book = req.body;
    console.log(book);
    books.push(book);
    res.send('Book added to database successfully');
});

//fetch all books
app.get('/books', (req, res) => {
    res.json(books);
});


//find byISBN
app.get('/book/:isbn', (req, res) => {
    // Reading isbn from the URL
    const isbn = req.params.isbn;

    // Searching books for the isbn
    for (let book of books) {
        if (book.isbn == isbn) {
            res.json(book);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Book not found');
});

//delete
app.get('/book/delete/:isbn', (req, res) => {
    // Reading isbn from the URL
    const isbn = req.params.isbn;

    // Searching books for the isbn
    for (let book of books) {
        if (book.isbn == isbn) {
            books.pop(book);
            res.json('Book deleted');
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.send("Book not found");
});

//update
app.put('/book/update-details/:isbn',(req, res) => {
    const isbn = req.params.isbn;
    const newBookDetails = req.body;
    let oldBook = books.find((book) => book.isbn == req.params.isbn);
    books = books.map((book) => {
        if (book.isbn == isbn){
            return newBookDetails;
        }
        return oldBook;
    });

    res.send("Details Updated successfully");
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));