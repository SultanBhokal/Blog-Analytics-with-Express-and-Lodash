import { api } from "../../axios/interceptor.js"
let counter = 0;

export async function fetchBlog(req, res, next) {
    try {
        const data = await api.get("https://intent-kit-16.hasura.app/api/rest/blogs");
        counter+=1;
        console.log("Api fetched in total : ",counter)
        
        
        req.blogs = data.data
        next()
        // return res.json({msg:"Successfully retrived",data:result}).status(200)

    } catch (error) {
        console.log("Error : ", error)
        return res.json({error:error?.response?.data || "External API Error"}).status(error?.response?.status || 500)
    }
}

export const errorHandlerFetchingApi = (err, req, res, next) => {
    console.error('Error:', err);
  
    let statusCode = 500;
    let errorMsg = 'Internal server error';
  
    if (err.response && err.response.status) {
      statusCode = err.response.status;
      errorMsg = err.response.data || 'External API error';
    }
  
    return res.status(statusCode).json({ error: errorMsg });
  };
