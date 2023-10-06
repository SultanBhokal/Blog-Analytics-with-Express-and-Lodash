import _ from "lodash";

let cacheExpire = []


function cachData(key, expiresIn, count) {

    if (filterBlogsCache.cache.size >= 10) {
        // Remove using Least recently used cache

        let leastRecentlyUsedObj = cacheExpire[0];

        cacheExpire.forEach(obj => {
            if (obj.count < leastRecentlyUsedObj.count) {
                leastRecentlyUsedObj = obj

            }
        })
        cacheExpire = cacheExpire.filter(obj => obj.key !== leastRecentlyUsedObj.key)
        filterBlogsCache.cache.delete(leastRecentlyUsedObj.key)

        
    }

    cacheExpire.push({ key, expiresIn, count })

}


function filterBlogs(data, key) {
    console.log("Performing search filter")
    const expiresIn = new Date().getTime() * 10 * 60 * 1000
    cachData(key, expiresIn, 1)

    return _.filter(data.blogs, (blog) => {
        return blog.title.toLowerCase().includes(key.toLowerCase())
    })
}

function filterBlogCachResolver(data, key) {
    return key
}

export const filterBlogsCache = _.memoize(filterBlogs, filterBlogCachResolver);

// if already cach than manually increacsing counter 
export const checkAlreadyCacheCounter = (key) => {
    cacheExpire = cacheExpire.map(obj => {
        if (obj.key === key) {
            obj.count += 1
        }
        return obj
    })
}


function checkExpiry() {
    const currentTime = new Date().getTime()
    // cacheExpire.map(obj=>{
    //     if(obj.expiresIn<currentTime){
    //         filterBlogsCache.cache.delete(obj.key)
    //     }
    // })
    // cacheExpire = cacheExpire.filter(obj=>obj.expiresIn>currentTime)
    cacheExpire = cacheExpire.reduce((cache, obj) => {
        if (obj.expiresIn <= currentTime) {
            filterBlogsCache.cache.delete(obj.key)
        }
        else {
            cache.push(obj)
        }
        return cache
    }, []) 
}

export function checkResultsInSearchBlogCache(key){
    checkAlreadyCacheCounter(key);
    const result = filterBlogsCache.cache.get(key)
    if(result){
        return result
    }
    else{
        return null
    }
}

// delete cache keys if expired
setInterval(checkExpiry, 15 * 60 * 1000)
