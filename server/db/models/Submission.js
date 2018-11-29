
const db = require('../db')
const S3 = require('../../S3')
const { AWS_BUCKET } = require('../../config')


const Submission = db.define('submission', {
  type: {
    type: db.Sequelize.ENUM('drawing', 'phrase')
  },
  phrase: {
    type: db.Sequelize.STRING
  },
  drawingUrl: {
    type: db.Sequelize.TEXT
  },
})

Submission.uploadImage = async (data, gameId, userId) => {
  try {
    console.log('submission upload is being called!')
    const submission = await Submission.create({type: 'drawing', gameId, userId})
    const regex = /data:image\/(\w+);base64,(.*)/
    const matches = regex.exec(data)
    const extension = matches[1]
    const imageData = matches[2]

    // const extensions = data.split(';')[0].split('/')
    // const extension = extensions[extensions.length-1]
    // const Body = new Buffer(data.replace(/^data:image\/\w+;base64,/,''),'base64')
    const Body = new Buffer(imageData,'base64')
    await S3.createBucket({ Bucket: AWS_BUCKET}).promise();

    const Key = `${submission.id.toString()}.${extension}`

    await S3.putObject({
      Bucket: AWS_BUCKET,
      ACL: 'public-read',
      Body,
      ContentType: `image/${extension}`,
      Key
    }).promise()

    submission.drawingUrl = `https://s3.amazonaws.com/${AWS_BUCKET}/${Key}`
    console.log('drawing was uploaded to this url: ', `https://s3.amazonaws.com/${AWS_BUCKET}/${Key}`)
    await submission.save()
    return submission
  } catch(err) {
    console.log(err)
  }
}

module.exports = Submission
