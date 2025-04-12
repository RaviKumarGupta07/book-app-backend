const Book = require("./book.model");

const postABook = async(req,res)=>{
    try{
        const newBook = await Book({...req.body});
        await newBook.save() ;
        res.status(200).send({message:"Book posted SuccesFully" , book:newBook})
    } catch(error){
        console.error("Error Creating book", error) ;
        res.status(500).send({message:"Failed to create book"})
    }
}


// get all books
const getAllBooks = async(req,res)=>{
    try{
        const books = await Book.find().sort({createdAt:-1})
        res.status(200).send(books)
    } catch(error){
        console.error("Error Fetching books", error) ;
        res.status(500).send({message:"Failed to fetch books" })
    }
}

// getSingleBook
const getSingleBook = async(req,res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book)  res.status(404).send({message:"Book Not Found" })
        res.status(200).send(book)
    } catch(error){
        console.error("Error Fetching book", error) ;
        res.status(500).send({message:"Failed to fetch book" })
    }
}

const UpdateBook = async(req,res)=>{
    try{
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id,req.body,{new:true});
        if(!updatedBook){
            res.status(404).send({message:"Book Not Found" })
        }
        res.status(200).send({
            message:"Book updated succesFully" ,
            updatedBook
        })
    } catch(error){
        console.error("Error updating book", error) ;
        res.status(500).send({message:"Failed to update book" })
    }
}

const deleteABook =  async(req,res)=>{
    try{
        const {id} = req.params;
        const deletedBook =  await Book.findByIdAndDelete(id);
        if(!deletedBook){
            res.status(404).send({message:"Book Not Found" })
        }
        res.status(200).send({
            message:"Book deleted succesFully" ,
            deletedBook
        })
    } catch(error){
        console.error("Error delete book", error) ;
        res.status(500).send({message:"Failed to delete book" })
    }
}

module.exports = {postABook ,getAllBooks,getSingleBook,UpdateBook,deleteABook}