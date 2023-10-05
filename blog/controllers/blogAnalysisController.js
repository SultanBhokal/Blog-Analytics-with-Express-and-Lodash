import { memoizeBlogStatsFunc } from "../other/blogStats.js";

export function blogStats(req, res) {
    const key = "blogstats"
    try {
        const data = req.blogs;
        console.log(memoizeBlogStatsFunc.cache.size)
        const result = memoizeBlogStatsFunc(data,key);

        return res.json({msg:"Successfully completed request",data:result}).status(200)

    } catch (error) {
        console.log(error)
        return res.json({error:"Internal Server Error"}).status(500)
    }
}
