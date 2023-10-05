export const paramChecker = (param)=>{
    return (req,res,next)=>{
        if(!req.query.hasOwnProperty(param)){
            return res.json({error:`Error Occurred , For Querying, param '${param}' requiered `}).status(400)
        }
        next();
    }
}