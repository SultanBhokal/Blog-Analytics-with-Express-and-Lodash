import {checkStatResultInBlogStatsCache} from "../other/blogStats.js"
import { checkResultsInSearchBlogCache } from "../other/blogSearchFilter.js";


export function getResultFromBlogStatCache(req,res,next){
    try {
        
        const result = checkStatResultInBlogStatsCache("blogstats");
        if(result){
            return res.json({result}).status(200)
        }
        next()

    } catch (error) {
        console.log("error")
        next()
    }
}

export function getResultFromSearchFilterCache(req,res,next){
    const query = req.query.search;
    try {

        const result = checkResultsInSearchBlogCache(query);
        if(result){
            return res.json({result}).status(200)
        }
        next()
    } catch (error) {
        next()
        console.log("Error",error)
    }
}