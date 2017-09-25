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
    onClick: PropTypes.func
  }

  static defaultProps = {
    routes: []
  }
  constructor (props){
    super(props)
    this.state = {isExpanded: false}
  }

  handleExpand =()=>{
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  handleRouteClick =(route)=>{
    this.props.onClick(route)
  }

  render(){
    const { heading, routes } = this.props
    return(
      <div>
        <RouteHeading
          heading={ heading }
          isExpanded={this.state.isExpanded}
          onClick={ this.handleExpand }
        />
        <Expand
          appear={false}
          shouldAnimate={this.state.isExpanded}
          height={ routes.length * 40 }
        >
          <div ref={ ref => this.ref = ref }>
            {routes.map(route =>
              <Route
                key={route.name}
                displayName={route.displayName}
                method={route.method}
                onClick={ ()=> this.handleRouteClick(route.name) }
                isHidden={ !this.state.isExpanded }
              />
            )}
          </div>
        </Expand>
      </div>
    )
  }
}