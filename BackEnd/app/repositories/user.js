const { User, JobRole } = require("../models/index.js");
const bcrypt = require("bcrypt");

const genericInclude = {
    model: JobRole,
    attributes: [
        "roleName", "salary"
    ]
};

async function findAll() {
    return await User.findAll({ include: [ genericInclude ], attributes: { exclude: ["encryptedPassword"] } });
}

async function create(body) {
    return await User.create(body);
}

/**
* Filter the course with specific condition.
* [filter] - Object to specifying the condition (Ex. { id: 1 })
*/
async function findOne(filter) {
    if (typeof filter !== "object" && filter != null) return new Error('filter is not an object');
    return await User.findOne({ where: filter, 
        include: [ genericInclude ]
    });
}

async function checkPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

async function update(userId, payload) {
    const [_,data] = await User.update(payload, { where: { id:userId }, returning:true });
    return data[0]
}

async function findByPk(id) {
    return await User.findByPk(id);
}

async function notification(id) {
    return await User.findByPk(id, { include: ["notifications"],attributes: ['id', 'name'] });
}

module.exports = {
    findAll,
    create,
    findOne,
    checkPassword,
    findByPk,
    notification,
    update
}