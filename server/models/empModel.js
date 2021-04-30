const mongoose = require('mongoose')
const Schema = mongoose.Schema

const opts = { toJSON: { virtuals: true } };

const empSchema = new Schema(
    {
        eid: { type: String, required: true, unique : true},
        ename: {type: String, required: true},
        eage: {type: String, required: true}
    }, opts
)

module.exports = mongoose.model('employee', empSchema)