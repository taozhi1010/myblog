const {
    exec
} = require("../db/mysql")

const getList = (author, keyword) => {
    //先返回假数据
    // return [{
    //     id: 1,
    //     title: "标题A",
    //     content: "内容A",
    //     createTime: "11111111",
    //     author: "zhangsan"
    // }, {
    //     id: 2,
    //     title: "标题B",
    //     content: "内容B",
    //     createTime: "22222222",
    //     author: "lisi"
    // }]
    //数据库查找
    // console.log(author, keyword)
    let sql = `select * from blogs where 1=1`
    if (author) {
        sql += `and author=${author}`
    }
    if (keyword) {
        sql += `and title like '%${keyword}%'`
    }
    sql += ` order by createtime desc;`
        // console.log(sql)
    return exec(sql)
}
const getDetail = (id) => {
    let sql = `select * from blogs where id=${id}`
    return exec(sql)
}

const getNewBlog = (title, content, author) => {
    let sql = `insert into blogs (title,content,createtime,author) values ('${title}','${content}','${Date.now()}','${author}');`
    return exec(sql)
}
const getUpdateBlog = (id, blogData = {}) => {
    const title = blogData.title
    const content = blogData.content
    const sql = `update blogs set title='${title}', content='${content}' where id=${id};`
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
}
const getDelBlog = (id, author) => {
    const sql = `delete from blogs where id=${id} and author='${author}'`
    console.log("sql======:", sql)
    return exec(sql).then(delData => {
        console.log("delData====>", delData)
        if (delData.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
}
module.exports = {
    getList,
    getDetail,
    getNewBlog,
    getDelBlog,
    getUpdateBlog
}