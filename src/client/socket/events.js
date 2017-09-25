import {subscribe, unsubscribe, emit, connect, disconnect } from './manager/events'



/**
 * Socket Events
 */
// const onConnect =()=> {
//   console.log('SocketIO: connected to server.')
// }
//
// const onDisconnect =()=>{
//   console.log('SocketIO: disconnected from server.')
// }


/**
 * Subscribe handlers (eventData, store, socket)
 */
const STATUS_CHANGED = 'event:statusChanged'

const statusHandler =(data, store, socket) =>{
  console.log(data)
}

const secondaryHandler =(data, store, socket) =>{
  console.log(data)
}


/**
 * Emitters (store, action)
 */
const BUTTON_WAS_CLICKED = 'button:wasClicked'
const buttonClick = (store, action)=>{
  //return what should be emitted
  return action.data
}


/**
 * Rules (store, action)
 */

const statusRule =(store, action)=>{
  const routing = store.getState()
  return routing.location.pathname === '/mypage'
}



const shouldEmit =(store, action)=>{
  return action.type === 'BUTTON_CLICK'
}

export const socketEvents = [

  emit(BUTTON_WAS_CLICKED,  buttonClick, shouldEmit)
]