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
//create a book
app.post('/create-book', (req, res,next) => {
    const book = req.body;
    books.push(book);
    res.send('Book added to database successfully');
});

//fetch all books
app.get('/books', (req, res) => {
    //return a json response
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
    res.sendStatus(404);
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
    //get isbn from url parameters
    const isbn = req.params.isbn;
    //the request
    const newBookDetails = req.body;
    //original book details
    let oldBook = books.find((book) => book.isbn == req.params.isbn);
    //mapping
    books = books.map((book) => {
        //if you find the book update
        if (book.isbn == isbn){
            return newBookDetails;
        }
        //else 
        return oldBook;
    });

    res.send("Details Updated successfully");
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));