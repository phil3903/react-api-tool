import React from 'react'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateRouterContext } from '../actions/router_actions'
import Bundle from '../components/tools/Bundle'
import RouterContext from '../components/tools/RouterContext'
import loadContent from 'bundle-loader?lazy!../containers/Content'

class App extends React.Component {

  componentDidMount(){
    loadContent(()=>{})
  }

  render(){

    const { history, updateRouterContext } = this.props

    return (
      <div>
        <Router history={ history }>
          <div>
            {/* Router Context Updater - No Render */}
            <Route
              path="/:environment?/:endpoint?"
              render={ props =>
                <RouterContext
                  context={ props }
                  onChange={ updateRouterContext }
                />}
            />

            {/* Begin Router Switch */}
            <Switch>

              {/* Login */}
              <Route
                render={ props =>
                  <Bundle load={ loadContent }>
                    { Content => Content
                      ? <Content {...props}/> : null
                    }
                  </Bundle>
                }
              />

            </Switch>

          </div>
        </Router>
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, {
  updateRouterContext,
})(App)