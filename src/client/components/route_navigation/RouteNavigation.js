import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import Expand from '../transitions/Expand'
import icons from '../../constants/icons'
import { getStyleValue } from '../../helpers/styles'
import RouteHeading from './RouteHeading'
import Route from './Route'

export default class RouteNavigation extends React.Component{
  static propTypes = {
    heading: PropTypes.string,
    routes: PropTypes.array,
    onClick: PropTypes.func,
    onDelete: PropTypes.func,
    isSaved: PropTypes.bool
  }

  static defaultProps = {
    routes: [],
    isSaved: false
  }
  constructor (props){
    super(props)
    this.state = {
      isExpanded: false
    }
  }

  handleExpand =()=>{
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  handleRouteClick =(route)=>{
    this.props.onClick(route)
  }

  handleRouteDelete =(route)=>{
    this.props.onDelete(route)
  }

  render(){
    const { heading, routes } = this.props
    return(
      <div style={{overflow: 'hidden'}}>
        <RouteHeading
          heading={ heading }
          isExpanded={this.state.isExpanded}
          isSaved={ this.props.isSaved }
          onClick={ this.handleExpand }
        />
        <Expand
          shouldAnimate={this.state.isExpanded}
          height={ routes.length * 40 }
        >
          <div>
            {routes.map(route =>
              <Route
                key={route.name}
                displayName={route.displayName}
                method={route.method}
                isHidden={!this.state.isExpanded}
                isSaved={this.props.isSaved}
                onClick={ ()=> this.handleRouteClick(route.name) }
                onDelete={ ()=> this.handleRouteDelete(route)}
              />
            )}
          </div>
        </Expand>
      </div>
    )
  }
}