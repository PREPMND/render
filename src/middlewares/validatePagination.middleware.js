import { apiError } from "../utils/apiError.js";
export const validatePagination=async(req,res)=>{
    try {
        const page=(req.query.page)||1;
        if(page<1 || !isNaN(Number(page))){
            throw new apiError(401,"Page parameters are wrong.");
        }
        const limit=(req.query.limit) || 6;
        if(limit>10 || limit<1 || !isNaN(Number(limit))){
            throw new apiError(401,"Limit should'nt exceed 10 and should be a number");
        }
        page=Number(page);
        limit=Number(limit);
        req.validatedQuery={
            ...req.validatedQuery,
            page,
            limit
        }
        next();
    } catch (error) {
        throw new apiError(401,`The request responded with ${error.}`)
    }
}