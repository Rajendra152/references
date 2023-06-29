const express = require('express')
const router = express.Router()
const Data = require('../models/logic')


router.get('/', async(req,res) => {
    try{
           const record = await Data.find()
           res.json(record)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
           const recordId = await Data.findById(req.params.id)
           res.json(recordId)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/', async(req,res) => {
    const updateRecord = new Data({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })

    try{
        const a1 =  await updateRecord.save() 
        res.json(a1)
    }catch(err){
        res.send('Not created')
    }
})

router.patch('/:id',async(req,res)=> {
    try{
        const addRecord = await Data.findById(req.params.id) 
        addRecord.sub = req.body.sub
        const a1 = await addRecord.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})

router.delete('/:id', async (req, res) => {
     try { 
         author = await Data.findByIdAndDelete(req.params.id) 
         res.send("sucessfully deleted")
         
     }
           catch (err){
               console.log("error") 
               
        }
    
})

module.exports = router