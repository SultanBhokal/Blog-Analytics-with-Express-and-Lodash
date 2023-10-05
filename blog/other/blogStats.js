import _ from "lodash";


const cachExpire = {}

function blogStatistics(data,key){
    // adding cach record manually to handle delete on expire
    cachExpire.key = key
    //expire time 10 minutes 
    cachExpire.expiresIn = new Date().getTime()*10*60*1000
    
    console.log("Blog analysis operations for ",key)
    const totalBlogs = _.size(data.blogs)
    const longestTitle = _.maxBy(data.blogs, (obj) => obj.title.length);
    const containsWord = _.filter(data.blogs, (blog) => {
        return blog.title.toLowerCase().includes('privacy')
    })

    const uniqueBlogs = _.uniqBy(data.blogs, 'title');

    const result = {
        totalBlogs: totalBlogs,
        longestTitle:longestTitle.title,
        numOfBlogsContainsPrivacy: containsWord.length,
        uniqueBlogs: uniqueBlogs
    }
    return result
}

//  memoize funtion and resolver

function customeResolverForBlogStats(data,key){
    // will use key to retrieve or delete cach after specific time
    // rather than stringying data which can be very large i can use key as cach key for same result

    // return JSON.stringify(data);
    return key
}

export const memoizeBlogStatsFunc=_.memoize(blogStatistics,customeResolverForBlogStats);

function checkExpiry(){
    const currentTime = new Date().getTime()
    if(cachExpire.expiresIn <= currentTime){
        console.log("deleting cach")
        memoizeBlogStatsFunc.cache.delete(cachExpire.key)
    }
}

// delete cache keys if expired
setInterval(checkExpiry,15*60*1000)


export function checkStatResultInBlogStatsCache(key){
    const result = memoizeBlogStatsFunc.cache.get(key)
    if(result){
        return result
    }
    else{
        return null
    }
}
