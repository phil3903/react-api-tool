import React from 'react'
import { connect } from 'react-redux'
import { load } from '../actions/docs_actions'
import colors from '../constants/colors'
import EndpointManager from './EndpointManager'
import ApiClient from './ApiClient'
import Docs from './Docs'

class ClientContainer extends React.Component {

  componentDidMount(){
    this.props.load()
  }

  render(){
    const styles = {
      base:{
        display: 'flex',
        width: '100%',
        height: '100vh',
        overflowY: 'hidden',
        margin: 0,
        padding: 0,
        backgroundColor: colors.grey[100]
      }
    }
    return(
      <div style={ styles.base }>
        <EndpointManager/>
        <ApiClient/>
        <Docs/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    docs: state.docs.payload
  }
}
export default connect(mapStateToProps, {
  load
})(ClientContainer)