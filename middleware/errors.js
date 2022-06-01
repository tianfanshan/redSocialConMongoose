const hadleValidationError = (err,res)=>{
    let errors = err.errors.map(el=>el.message);
    if(errors.length>1){
        let chain = "";
        for(let i = 0 ;i < errors.length;i++){
            chain += errors[i]+"||";
        }
        const string = chain.slice(0,-4);
        res.status(400).send({messages:string});
    }else{
        res.status(400).send({messages:errors})
    }
}
//     const typeError = (err,req,res,next)=>{
//         const errOrigin= err.origin
//         if(err.name ===  || ){
//             return err = handleValidationError(err,res);
//         }else
//             if(errOrigin==='User'){
//                 res.status(500).send('Hubo un problema a la hora de crear un usuario')
//             }
//     }
// }

// module.exports = { TypeError }