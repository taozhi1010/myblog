const env = process.env.NODE_ENV //环境变量
console.log(env)
let MYSQL_CONF
if (env === 'dev') {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "123456",
        prot: "3306",
        database: "myblog"
    }
}
if (env === 'production') {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "123456",
        prot: "3306",
        database: "myblog"
    }
}
module.exports = {
    MYSQL_CONF
}