const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')

const authAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'secret')
        const admin = await Admin.findOne({_id: decoded._id, 'tokens.token': token})

        if (!admin) {
            throw new Error('Request failed')
        }

        req.token = token
        req.admin = admin
        next()

    } catch (e) {
        res.status(401).send({error: e.message})
    }
}

module.exports = authAdmin