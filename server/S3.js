const AWS = require('aws-sdk')

const {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET} = require('./config')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || AWS_SECRET_ACCESS_KEY
})
const S3 = new AWS.S3()



module.exports = S3

// const uploadImage = async (data) => {
//   try {
//     console.log('upload images is being called!' )
//     const regex = /data:image\/(\w+);base64,(.*)/
//     const matches = regex.exec(data)
//     const extension = matches[1]
//     const imageData = matches[2]

//     // const extensions = data.split(';')[0].split('/')
//     // const extension = extensions[extensions.length-1]
//     // const Body = new Buffer(data.replace(/^data:image\/\w+;base64,/,''),'base64')
//     const Body = new Buffer(imageData,'base64')

//     const Key = `${submission.id.toString()}.${extension}`

//     await S3.putObject({
//       Bucket: AWS_BUCKET,
//       ACL: 'public-read',
//       Body,
//       ContentType: `image/${extension}`,
//       Key
//     }).promise()

//     const drawingUrl = `https://s3.amazonaws.com/${AWS_BUCKET}/${Key}`
//     console.log('drawing was uploaded to this url: ', drawingUrl)
//     return drawingUrl

//   } catch(err) {
//     console.log(err)
//   }
// }

// module.exports = uploadImage



