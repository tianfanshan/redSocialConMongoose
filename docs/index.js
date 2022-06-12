const basicInfo = require('./basicInfo')
const components = require('./components')
const users = require('./users')

module.exports = {
    ...basicInfo,
    ...components,
    ...users
}