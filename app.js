const querystring = require("querystring")
const handleBlogRouter = require("./src/router/blog")
const handleUserRouter = require("./src/router/user")
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== "POST") {
            resolve({})
            return
        }
        if (req.headers["content-type"] !== "application/json") {
            resolve({})
            return
        }
        let postData = ""
        req.on("data", chunk => {
            postData += chunk.toString()
        })
        req.on("end",
            () => {
                if (!postData) {
                    resolve({})
                    return
                }
                console.log(typeof postData)
                if (JSON.parse(postData)) {
                    resolve(JSON.parse(postData))
                } else {
                    resolve({})
                    return
                }


            }
        )

    })
    return promise
}
const serverHandle = (req, res) => {
    res.setHeader("Content-type", "application/json")
    const url = req.url
    req.path = url.split("?")[0]

    req.query = querystring.parse(url.split("?")[1])
        //处理blog路由
    getPostData(req).then(postData => {
        req.body = postData
            // const blogData = handleBlogRouter(req, res)
            // if (blogData) {
            //     res.end(JSON.stringify(blogData))
            //     return
            // }
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData))
            })
            return
        }

        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                res.end(JSON.stringify(userData))
            })
            return
        }
        res.writeHeader(404, {
            "Content-type": "text/plain"
        })
        res.write("404 Not Found\n")
        res.end()
    })

};

module.exports = serverHandle