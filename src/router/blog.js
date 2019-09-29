//博客列表
const {
    getList,
    getDetail,
    getNewBlog,
    getDelBlog,
    getUpdateBlog
} = require("../controller/blog")
const {
    SuccessModel,
    ErrorModel
} = require("../model/resModel")

const handleBlogRouter = (req, res) => {
    const method = req.method
    const url = req.url

    if (method === "GET" && req.path === "/api/blog/list") {
        const author = req.query.author || ""
        const keyword = req.query.keyword || ""
            // const listData = getList(author, keyword)
            // return new SuccessModel(listData)
        return result = getList(author, keyword).then(listData => {
            return new SuccessModel(listData)
        })

    }
    if (method === "GET" && req.path === "/api/blog/detail") {
        const id = req.query.id || ""
        return result = getDetail(id).then(detailData => {
            return new SuccessModel(detailData)
        })
    }
    if (method === "POST" && req.path === "/api/blog/new") {
        const {
            title,
            content,
            author
        } = req.body || {}
        console.log("req.body", req.body)
            // const newBlogData = getNewBlog(id)
        return result = getNewBlog(title,
            content,
            author).then(newBlogData => {
            if (newBlogData && newBlogData.insertId) {
                return new SuccessModel({
                    id: newBlogData.insertId
                })
            } else {
                return new ErrorModel({
                    msg: "新建失败"
                })
            }
        })
    }
    if (method === "POST" && req.path === "/api/blog/update") {
        const id = req.body.id || ""
        const result = getUpdateBlog(id, req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel("更新博客成功")
            } else {
                return new ErrorModel("更新博客失败")
            }
        })
        return new SuccessModel(updateBlogData)
    }
    if (method === "POST" && req.path === "/api/blog/del") {
        const id = req.body.id || ""
        const author = req.body.author
        const result = getDelBlog(id, author)
        return result.then(val => {
            if (val) {
                return new SuccessModel("删除博客成功")
            } else {
                return new ErrorModel("删除博客失败")
            }
        })
    }

}
module.exports = handleBlogRouter