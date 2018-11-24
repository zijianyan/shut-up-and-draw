try {
  Object.assign(process.env, require('../secrets'))
} catch(err) {
}

module.exports = process.env
