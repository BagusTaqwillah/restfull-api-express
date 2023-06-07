import { book, addBook, bookId, deleteBook, updateBook } from"../controller/Book.js"
import express from "express"
const bookRouter=express.Router()
bookRouter.get("/book",book)
bookRouter.post("/addBook",addBook)
bookRouter.get("/book/:id",bookId)
bookRouter.delete("/book/:id",deleteBook)
bookRouter.put("/book/:id",updateBook)

export default bookRouter