import io from 'socket.io-client'

const configureSocket =(url = '', config)=>{
  return {
    connect: ()=> io.connect(url, config),
    handlers: {}
  }
}

export const INIT_SOCKET = {type: 'INIT_SOCKET_MANAGER'}
export default configureSocket