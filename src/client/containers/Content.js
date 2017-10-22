import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Bundle from '../components/tools/Bundle'
import loadClientContainer from 'bundle-loader?lazy!./ClientContainer'
import { withMediaQueries } from 'reactables'

class Content extends React.Component {
  componentDidMount(){
    loadClientContainer(()=>{})
  }

  render(){

    return(
      <div>
        <Switch>
          <Route
            render={ props =>
              <Bundle
                path={'/:environment?/:endpoint?'}
                load={ loadClientContainer }
              >
                { ClientContainer => ClientContainer
                  ? <ClientContainer {...props} docFile={this.props.docFile}/> : null
                }
              </Bundle>
            }
          />
        </Switch>
      </div>
    )
  }
}

// Content = withMediaQueries(Content, {
//   lg: 1030,
//   md: 991,
//   sm: 885,
//   xl: 1440,
//   xs: 414,
//   xxl: Infinity
// })

function mapStateToProps(state){
  return{
    query: state.router.query,
  }
}
export default connect(mapStateToProps, {

})(Content)