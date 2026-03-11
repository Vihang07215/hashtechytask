exports.sendResponse = (data=null,isError=false,message="")=>{
    return {
        data,
        is_error:isError,
        message
    }
}