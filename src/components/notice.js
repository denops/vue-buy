

// 最终对外暴露的接口
import Notification from './notification'

let msgInstance 

function getInstance(){
  msgInstance = msgInstance || Notification.newKaikeba()
  return msgInstance 
}
function info({duration=2, content=""}){
  let ins = getInstance()
  ins.add({
    content,
    duration
  })
}
export default {
  info
}