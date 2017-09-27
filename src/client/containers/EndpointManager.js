import React from 'react'
import { connect } from 'react-redux'
import {push} from '../actions/router_actions'
import Icon from '../components/Icon'
import icons from '../constants/icons'
import Toolbar from '../components/Toolbar'
import Heading from '../components/Heading'
import RouteNavigation from '../components/route_navigation/RouteNavigation'
import { ListGroup, List, ListCell, ListToolbar, Dropdown, DropdownNode, DropdownOption, DropdownMenu } from 'reactables'
import colors, {borderColor, primaryDark} from '../constants/colors'
import { loadRoute, loadEnvironment } from '../actions/docs_actions'

class EndpointClient extends React.Component {

  handleEnvironment =(env)=>{
    const {loadEnvironment, environments} = this.props
    const environment = environments.find(e => e.name === env)
    loadEnvironment(environment)
  }

  handleEndpoint =(group, endpoint)=>{
    const {loadRoute, routes} = this.props
    const route = routes[group].find(r => r.name === endpoint )
    loadRoute(route)
  }

  render(){

    const styles = {
      base:{
        maxWidth: 250,
        height: '100%',
        borderRight: `1px solid ${borderColor}`,
        backgroundColor: primaryDark
      },
      cell:{
        base:{
          height: 40
        }
      },
      list:{
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
          color: primaryDark,
          justifyContent: 'space-between',
          height: 40,
          width: '100%',
          borderRadius: 0
        }
      },
    }

    const { displayName, environments, routes, selectedEnvironment, selectedRoute } = this.props

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
                        text={env.displayName || env.name }
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

            { routes ? Object.keys(routes)
              .map((group, i) =>
                <ListCell key={i} style={styles.listCell}>
                  <RouteNavigation
                    heading={group}
                    routes={ routes[group] }
                    onClick={ (route) => this.handleEndpoint(group, route) }
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
    ...state.docs
  }
}
export default connect(mapStateToProps, {
  push,
  loadEnvironment,
  loadRoute
})(EndpointClient)

