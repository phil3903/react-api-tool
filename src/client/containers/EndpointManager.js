import React from 'react'
import { connect } from 'react-redux'
import {push} from '../actions/router_actions'
import Icon from '../components/Icon'
import icons from '../constants/icons'
import Toolbar from '../components/Toolbar'
import Heading from '../components/Heading'
import RouteNavigationGroup from '../components/route_navigation/RouteNavigationGroup'
import { ListGroup, List, ListCell, ListToolbar, Dropdown, DropdownNode, DropdownOption, DropdownMenu } from 'reactables'
import colors, {borderColor, secondary} from '../constants/colors'
import { loadRoute, loadEnvironment } from '../actions/docs_actions'
import {reset as resetRequestClient} from '../actions/request_client_actions'
import {reset as resetResponseClient} from '../actions/response_client_actions'
import { executeDelete } from '../actions/profile_actions'
import sortBy from 'lodash/sortBy'
import reverse from 'lodash/reverse'

class EndpointClient extends React.Component {

  handleEnvironment =(env)=>{
    const {loadEnvironment, environments} = this.props
    const environment = environments.find(e => e.name === env)
    loadEnvironment(environment)
  }

  handleEndpoint =(route)=>{
    const {loadRoute, routes, resetRequestClient, resetResponseClient} = this.props

    resetRequestClient()
    resetResponseClient()

    loadRoute(route)
  }

  handleDelete =(route)=>{
    this.props.executeDelete(route)
  }

  render(){

    const styles = {
      base:{
        maxWidth: 250,
        height: '100%',
        borderRight: `1px solid ${borderColor}`,
        backgroundColor: secondary
      },
      cell:{
        base:{
          height: 40
        }
      },
      list:{
        base:{backgroundColor: secondary},
        cells:{overflowY: 'auto'}
      },
      listToolbar: {
        base:{
          boxShadow: null, padding: 0, margin: 0, height: 100
        }
      },
      listCell:{
        base:{
          padding: 0,
          margin: 0,
          border: 'none'
        },
        hovered:{
          backgroundColor: null
        }
      },
      body:{
        width: '100%',
        height: '100%',
        color: colors.white
      },
      dropdown:{
        base:{
          width: '100%'
        }
      },
      dropdownMenu:{
        base:{
          transition: null
        }
      },
      dropdownOption:{
        base:{
          color: colors.black
        }
      },
      environment:{
        base:{
          backgroundColor: colors.yellow[600],
          fontWeight: 400,
          color: secondary,
          justifyContent: 'space-between',
          height: 40,
          width: '100%',
          borderRadius: 0
        }
      },
    }

    const { displayName, environments, routes, groupedRoutes, groupedRequests, selectedEnvironment } = this.props

    return(
      <ListGroup style={ styles }>
        <List style={ styles.list }>
          <ListToolbar
            type={'fixed'}
            style={ styles.listToolbar }>
            <div style={ styles.body }>
              <Toolbar
                height={60}
                left={[
                  <Heading size={1} text={ displayName + ' API' } onClick={this.props.onNavClick } />
                ]}/>
              <Dropdown style={ styles.dropdown }>
                <DropdownNode style={ styles.environment }>
                  <p style={{margin: 0,padding:0}}>
                    { selectedEnvironment.displayName || 'Select Environment'}
                  </p>
                  <Icon name={icons.arrow_drop_down}/>
                </DropdownNode>
                <DropdownMenu style={styles.dropdownMenu }>
                  { environments
                    ? environments.map((env, i) =>
                      <DropdownOption
                        key={i}
                        text={
                          <span>
                            <p style={{padding: 0, margin: 0}}>{ env.displayName || env.name }</p>
                            <p style={{padding: '5px 0 0 0', margin: 0, fontSize: 12}}>{ env.fullUrl }</p>
                          </span>
                        }
                        value={env.name}
                        onClick={ this.handleEnvironment }
                        style={ styles.dropdownOption }
                      />)
                    : null
                  }
                </DropdownMenu>
              </Dropdown>
            </div>
          </ListToolbar>

          {groupedRequests ? Object.keys(groupedRequests)
            .map((group, i) =>
              <ListCell key={i} style={styles.listCell}>
                <RouteNavigationGroup
                  heading={group}
                  routes={ groupedRequests[group] }
                  isSaved={ true }
                  onClick={ this.handleEndpoint }
                  onDelete={this.handleDelete}
                />
              </ListCell>
            ) : null
          }

            { groupedRoutes ? Object.keys(groupedRoutes)
              .map((group, i) =>
                <ListCell key={i} style={styles.listCell}>
                  <RouteNavigationGroup
                    heading={group}
                    routes={ groupedRoutes[group] }
                    onClick={ this.handleEndpoint }
                    onDelete={this.handleDelete}
                />
                </ListCell>
              ) : null
            }

        </List>
      </ListGroup>
    )
  }
}

function mapStateToProps(state){
  return{
    ...state.router,
    ...state.docs,
    groupedRequests: state.profile.groupedRequests
  }
}
export default connect(mapStateToProps, {
  push,
  loadEnvironment,
  loadRoute,
  resetRequestClient,
  resetResponseClient,
  executeDelete
})(EndpointClient)

