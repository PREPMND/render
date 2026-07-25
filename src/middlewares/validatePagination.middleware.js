import { apiError } from "../utils/apiError.js";
export const validatePagination=async(req,res)=>{
    const page=(req.query.page)|| 1;
    if(page<1 || !isNaN(Number(page))){
        throw new apiError
    }
    const limit=(req.query.limit) ||6;

}