//Dummy Middleware for Auth
export const adminAuth = (req,res,next)=>{
    const token = 'xyz'
    console.log("Calling middleware!");
    if(token!='xyz'){
        res.status(401).send("Invalid token");
    }
    next();
}
