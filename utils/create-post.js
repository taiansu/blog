const fs = require('fs')
const moment = require('moment')

let [_node, _entry, postName] = process.argv

function createPost(postName) {
    let today = moment().format("YYYY-MM-DD")
    let dirName = `./content/blog/${today}-${postName}`
    fs.mkdirSync(dirName)
    fs.copyFileSync('./src/templates/sample.md', `${dirName}/index.md`)
}

createPost(postName)
