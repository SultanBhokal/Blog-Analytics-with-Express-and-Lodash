import  axios  from "axios"

const api = axios.create({
    headers: {
        'Content-Type': 'application/json', 
        'x-hasura-admin-secret':"32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6"
      },
})

export {api}