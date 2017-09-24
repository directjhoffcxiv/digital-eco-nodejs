'use strict'
const line = require('./index')

// init with auth token
line.init({
  accessToken: '{N1GTeUQXeB77zQpSTKeoprctXQDZI1OQPAJNfuDZVHgUHBEeY2zPQXiLG7dOhFodGwCu1PXFv+bY/wDAODAFN+rpKMLoQaUYjJGdxNIMWGcOMy7sbNjv8mDcMrFSw4HpMn2VmSR0s+CgY4kHc7BMDwdB04t89/1O/w1cDnyilFU=}',
  // (Optional) for webhook signature validation
  channelSecret: '{b99029980da84da3980d785cf5737d63}'
})

line.client
  .pushMessage({
    to: '{YOUR_MID}',
    messages:[
        {
            "type":"text",
            "text":"Hello, world1"
        },
        {
            "type":"text",
            "text":"Hello, world2"
        }
    ]
  })
  .then(() => console.log({success: true}))
  .catch(err => console.log(err))
