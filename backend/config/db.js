const mongoonse=require('mongoose')


const connectWithDb=()=>{
    mongoonse.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(console.log("DB connected successfully"))
    .catch(error=>{
        console.log("DB connection issues");
        console.log(error);
        process.exit(1);
    });
}

module.exports=connectWithDb