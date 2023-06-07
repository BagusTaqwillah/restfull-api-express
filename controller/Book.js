import Book from "../models/book.js"
export const book=async (req,res)=>{
    try {
        await Book.findAll().then(result=>{
            console.log(result)
            res.json({
                status:"ok",
                data:result
            })
        })
    } catch (error) {
        res.status(304).json({
            msg:error
        })
    }
}
export function addBook(req,res) {
    const{title,deskripsi,img}=req.body
    const data={
        title:title,
        deskripsi:deskripsi,
        img:img
    }
    if (data.title===undefined) {
        res.status(303).json({
            msg:"book required"
        })
    }else{
        Book.create(data).then(result=>{
            res.json({
                msg:"success add book",
                book:result
            })
        })
    }
}
export const bookId=async (req,res)=>{
    try {
        const {id}=req.params
        await Book.findByPk(id).then(result=>{
            if (result!=null) {   
                res.json({
                    msg:`book id ${id}`,
                    book:result
                })
            }else{
                res.status(303).json({
                    msg:`book id ${id} Not found`
                })
            }
        })
    } catch (error) {
        res.status(303).json({
            msg:"forbiden"
        })
    }
}
export const deleteBook=async (req,res)=>{
    try {
        const {id}=req.params
        await Book.destroy({where:{
            id:id
        }}).then(result=>{
            console.log(result)
            if (result!=false) {
                res.json({
                    msg:`id ${id} is deleted`
                })
            }else{
                res.status(303).json({
                    msg:"id not found"
                })
            }
        })
    } catch (error) {
        res.status(303).json({
            msg:"forbiden"
        })
    }
}
export function updateBook(req,res){
 try {
    const {id}=req.params
    const {title,deskripsi,img}=req.body
    const data={
        id:id,
        title:title,
        deskripsi:deskripsi,
        img:img,
    }
    Book.update(data,{where:{ id:id }}).then(result=>{
        res.status(202).json({
            msg:"success update",
            data:data
        })
    })
 } catch (error) {
    res.status(303).json({
        msg:"forbiden"
    })
 }
}