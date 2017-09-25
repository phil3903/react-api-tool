import React from 'react'
import Route from 'react-router-dom/Route'

export default class PrivateRoute extends React.Component {

  componentWillMount(){
    this.autoLogin(this.props)
  }

  componentWillReceiveProps(nextProps){
    this.autoLogin(nextProps)
  }

  autoLogin(props){
    const { isAuthenticated, executeAutoLogin } = props

    if(isAuthenticated === null || isAuthenticated === undefined)
      executeAutoLogin()
  }

  render(){
    const {component: Component, isAuthenticated, ...rest} = this.props

    if(!isAuthenticated)
      return null

    return(
      <Route {...rest} render={ props =>
        <Component {...props}/>
      }/>
    )
  }
}