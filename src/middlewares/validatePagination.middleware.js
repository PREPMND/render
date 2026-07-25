export const validatePagination=async(req,res)=>{
    const page=(req.query.page)|| 1;
    if(page<1 || isNaN(Number()))
    const limit=(req.query.limit) ||6;

}