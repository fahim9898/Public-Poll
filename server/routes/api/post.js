const express = require("express");
const mongodb = require("mongodb");

const router = express.Router()


// let _collection = loadDataFromMongodb()



/* router.get('/', async (req, res) => {
    // res.send('hello done ')
    try{
        const posts = await loadDataFromMongodb();
        await console.log(posts , "---")
        res.send(await posts.findOne({}).toArray());
    } catch(err){
        console.log(err)
    }
})
 */

 /* router.get('/', async (req, res)=>{
     const post = await loadDataFromMongodb();
     res.send(await post.find({}).toArray())
 }) */
 
 router.get('/',  (req, res)=>{
    //  const post = await loadDataFromMongodb();
    //  res.send(await post.find({}).toArray())
    loadDataFromMongodbPromisse().then((collection)=> {
        collection.find({}).toArray().then(data=>{
            res.send(data);
        })
    }).catch(err => res.status(404).send(err))
 })

 /* router.post("/getObjectUsingId", async (req, res) => {
    console.log(req.body)
    const post = await loadDataFromMongodb();
    res.send(await post.find({_id: new mongodb.ObjectID(req.body.id)}).toArray());
 }); */

 router.post("/getObjectUsingId", (req, res) => {    
    loadDataFromMongodbPromisse()
      .then((collection) => {
        collection
          .find({ _id: new mongodb.ObjectID(req.body.id) })
          .toArray()
          .then((data) => res.send(data))
          .catch((err) => res.status(404).send(err));
        
      })
      .catch((err) => res.status(404).send(err));
});
 
 /* router.post("/updateObjectUsingId", async (req, res) => {
    console.log(req.body)
    const post = await loadDataFromMongodb();
    // await post.find({_id: new mongodb.ObjectID(req.body.id)}).updateOne({
    //     '$set': { 'name': req.body.name }
    // }) ;
    
    await post.updateOne(
      { _id: new mongodb.ObjectID(req.body.id) },
      { $set: { question: req.body.question,
                Question_options: req.body.Question_options } });
    console.log("okay")
                res.status(201).send("")
}); */

 router.post("/updateObjectUsingId", async (req, res) => {
    
    loadDataFromMongodbPromisse()
      .then((collection) => {
        collection
          .updateOne(
            { _id: new mongodb.ObjectID(req.body.id) },
            {
              $set: {
                question: req.body.question,
                Question_options: req.body.Question_options,
              },
            }
          )
          .then((server_res) => {
            res.status(201).send(server_res);
          })
          .catch((err) => res.status(404).send(err));
      })
      .catch((err) => res.status(404).send(err));
});
 
 /* router.post('/', async (req, res)=>{
     const post = await loadDataFromMongodb();
     let data = await post.insertOne({
       question: req.body.Question,
       Question_options: req.body.Question_options
     });
     console.log("____------____" , post , data)

     res.status(201).send(`Poll/?id=${data.insertedId}`)
 }) */
 
 router.post('/', (req, res)=>{
    loadDataFromMongodbPromisse()
      .then((collection) => {
        collection
          .insertOne({
            question: req.body.Question,
            Question_options: req.body.Question_options,
          })
          .then((data) => {
            res.status(201).send(`Poll/?id=${data.insertedId}`);
          })
          .catch((err) => {
            res.status(404).send(err);
          });
      })
      .catch((err) => res.status(404).send(err));
 })

 router.get('/deleteData', (req, res)=>{
    loadDataFromMongodbPromisse()
      .then(collection=>{
        collection.remove({})
      }).catch(err => res.status(404).send(err))
 })

async function loadDataFromMongodb() {
    const client = await mongodb.MongoClient.connect(
        "mongodb+srv://admin123:admin123@cluster0.mrgae.mongodb.net/Vue_first?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
        );
        return client.db('Vue_first').collection('Info');
        // "mongodb+srv://admin123:admin123@cluster0.gyquq.mongodb.net/vue_demo?retryWrites=true&w=majority",
        // "mongodb+srv://admin123:admin123@cluster0.60ibo.azure.mongodb.net/vue_demo?retryWrites=true&w=majority",
}

function loadDataFromMongodbPromisse() {
    return new Promise((resolve, reject)=>{
        try{
             mongodb.MongoClient.connect(
                "mongodb+srv://admin123:admin123@cluster0.mrgae.mongodb.net/Vue_first?retryWrites=true&w=majority",
                { useNewUrlParser: true, useUnifiedTopology: true }
            ).then((client)=>{
                    resolve(client.db("Vue_first").collection("Info"));
            }).catch(err => {reject(err)} )
        }catch(err){
            reject(err)
        }
    })
}




module.exports = router

