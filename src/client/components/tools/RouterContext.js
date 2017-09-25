import React from 'react'
import PropTypes from 'prop-types'
import { queryToObject } from '../../helpers/query'

export default class RouterContext extends React.Component {

  static propTypes = {
    context: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node
  }

  componentWillMount(){
    this.updateContext(this.props)
  }

  componentWillReceiveProps(nextProps){
    const { location } = this.props.context

    const url = location
      ? location.pathname + location.search
      : null

    const nextUrl = nextProps.context
      ? nextProps.context.location.pathname + nextProps.context.location.search
      : null

    if(url !== nextUrl) this.updateContext(nextProps)
  }

  updateContext (props){

    const {match, location, history } = props.context

    props.onChange({
      match,
      location,
      history,
      query: queryToObject(location.search)
    })
  }

  render(){
    return (<div>{ this.props.children }</div>)
  }

}