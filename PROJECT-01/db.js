import { connect } from 'mongoose';

connect('mongodb+srv://deepak93o:Deep@k455@cluster69.wicir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster69')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("Error: ", err));
