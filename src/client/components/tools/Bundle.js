import React from 'react'

export default class Bundle extends React.Component {
  state = {
    mod: null
  }

  componentDidMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {

    this.setState({
      mod: null
    })

    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })

  }

  render() {
    return this.props.children(this.state.mod)
  }
}