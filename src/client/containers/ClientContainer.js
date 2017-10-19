import React from 'react'
import { connect } from 'react-redux'
import { load } from '../actions/docs_actions'
import { updateGroupInput, updateNameInput, hideModal} from '../actions/save_request_actions'
import { executeSave } from '../actions/profile_actions'
import RequestClient from './RequestClient'
import ResponseClient from './ResponseClient'
import EndpointManager from './EndpointManager'
import Docs from './Docs'
import TDNavOverlay from '../components/nav_overlay/TDNavOverlay'
import SaveRequestModal from '../components/SaveRequestModal'
import colors, {borderColor} from '../constants/colors'

class ClientContainer extends React.Component {

  constructor (props){
    super(props)
    this.state = { isOverlayVisible: false }
  }

  componentDidMount(){
    this.props.load()
  }

  handleNavClick =()=>{
    this.setState({isOverlayVisible: !this.state.isOverlayVisible})
  }

  onDeleteCancel =()=>{

  }

  onDeleteConfirm =()=>{

  }

  onSaveConfirm =()=>{
    this.props.executeSave()
    this.clearModalInputs()
  }

  onSaveCancel =()=>{
    this.props.hideModal()
    this.clearModalInputs()
  }

  clearModalInputs =()=>{
    this.props.updateGroupInput('')
    this.props.updateNameInput('')
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
      },
      clientContainer:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRight: `1px solid ${borderColor}`,
        height: '100vh'
      }
    }

    return(
      <div style={ styles.base }>
        <TDNavOverlay
          onClose={ this.handleNavClick }
          isVisible={this.state.isOverlayVisible}
        />
        <EndpointManager onNavClick={ this.handleNavClick }/>
        <div style={ styles.clientContainer }>
          <RequestClient />
          <ResponseClient />
        </div>
        <Docs/>

        <SaveRequestModal
          isVisible={this.props.isModalVisible}
          onSave={ this.onSaveConfirm }
          onCancel={ this.onSaveCancel }
          onGroupChange={this.props.updateGroupInput}
          onNameChange={this.props.updateNameInput}
          name={this.props.name}
          group={this.props.group}
        />
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    docs: state.docs.payload,
    name: state.saveRequest.name,
    group: state.saveRequest.group,
    isModalVisible: state.saveRequest.isModalVisible
  }
}
export default connect(mapStateToProps, {
  load,
  updateGroupInput,
  updateNameInput,
  hideModal,
  executeSave
})(ClientContainer)