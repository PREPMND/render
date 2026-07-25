import { apiError } from "../utils/apiError.js";
export const validatePagination=async(req,res)=>{
    const page=(req.query.page)|| 1;
    if(page<1 || !isNaN(Number(page))){
        throw new apiError(401,"Page parameters are wrong")
    }
    const limit=(req.query.limit) ||6;

}