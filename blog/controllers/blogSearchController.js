import {filterBlogsCache} from "../other/blogSearchFilter.js"

export function searchFilter(req, res) {
    try {
        const data = req.blogs;
        const query = req.query.search;
        const blogs = filterBlogsCache(data, query)
        return res.json({ query, result: blogs })

    } catch (error) {
        console.log(error)
        return res.json({ error: "Internal Server Error" }).status(500)
    }
}