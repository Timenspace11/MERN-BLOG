import mongoose from 'mongoose';

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            
        },

        profilePicture:{
           type:String,
           default:"https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },

        isAdmin:{
           type:Boolean,
           default:false, 
        },
    },{timestamps:true}

    //{timestamps:true}-->well we want save two thing  while we are adding a new users the time of creation and the time of update 
    //so we need these informations later in our applications to  sort .for example post the users etc...  After doing ths mongodb store two extra information
);

const User=mongoose.model('User',userSchema);
export default User;

