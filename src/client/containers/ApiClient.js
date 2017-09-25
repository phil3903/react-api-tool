import React from 'react'
import { connect } from 'react-redux'
import colors, {primaryDark, borderColor} from '../constants/colors'
import RequestClient from './RequestClient'
import ResponseClient from './ResponseClient'

export default class ApiClient extends React.Component {

  render(){

    const styles = {
      base:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRight: `1px solid ${borderColor}`,
        height: '100vh'
      }
    }

    return(
      <div style={ styles.base }>
        <RequestClient />
        <ResponseClient />
      </div>
    )
  }
}

