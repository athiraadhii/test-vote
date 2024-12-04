const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://athira:athira@cluster0.pnfsu.mongodb.net/Election?retryWrites=true&w=majority&appName=Cluster0")

.then(()=>{
    console.log("DB Connected")
})
.catch((error)=>{
    console.log(error)
})