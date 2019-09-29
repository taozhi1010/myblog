const {
    login
} = require("../controller/user")
const {
    SuccessModel,
    ErrorModel
} = require("../model/resModel")
const handleUserRouter = (req, res) => {
    const method = req.method
    const url = req.url
    if (method === "POST" && req.path === "/api/user/login") {
        const {
            username,
            password
        } = req.body
        const result = login(username,
            password)
        return result.then(loginData => {
            if (loginData.username) {
                return new SuccessModel()
            }
            return new ErrorModel("登陆失败")
        })
    }
}
module.exports = handleUserRouter