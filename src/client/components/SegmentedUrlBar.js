import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import { TextField, Dropdown, DropdownOption, DropdownMenu, DropdownNode } from 'reactables'
import Icon from './Icon'
import { white, black, borderColor, secondary, primary } from '../constants/colors'
import icons from '../constants/icons'

export default class SegmentedUrlBar extends React.Component {

  static propTypes = {
    baseUrl: PropTypes.string,
    endpoint: PropTypes.string
  }

  structureBaseUrl =(baseUrl, endpoints)=>{

  }

  onSegmentUpdate =()=>{

  }

  onMethodUpdate =()=>{

  }

  addSegmentPadding =(style, index, length)=> {

    if(index + 1 === length)
      style = merge({}, style, {
      wrapper:{
        base:{
          paddingRight: 10
        }}})

    return style
  }


  render(){

    const {endpoint, baseUrl} = this.props


    let segment = 0
    const endpoints = endpoint
      .split('/')
      .reduce((array, param) =>{
        if(param.charAt(0) !== ':') {
          array[segment] = (array[segment] || '') + `/${param}`
        } else {
          segment = segment + 1
          array[segment] = param
          segment = segment + 1
        }

        return array

      }, [baseUrl])


    console.log(endpoints)


    const styles = {
      base:{
        display: 'flex'
      },
      textField:{
        wrapper:{
          base:{
            height: 36,
            paddingLeft: 10
          }
        },
        input:{
          base:{
            color: white,
            backgroundColor: primary,
            border: 'none',
            fontSize: 14
          }
        }
      },
      dropdownNode:{
        base:{
          backgroundColor: primary,
          color: white,
          borderRight: `1px solid ${secondary}`,
        }
      },
      dropdownOption:{
        base:{
          color: black
        }
      },
      segment:{
        wrapper: {
          base: {
            height: 36,
            borderLeft: `1px solid ${secondary}`,
          }
        },
        input:{
          base:{
            color: white,
            backgroundColor: primary,
            border: 'none',
            fontSize: 14
          }
        }
      }
    }


    return(
      <span style={styles.base}>
        <TextField
          value={ endpoints[0] }
          style={ styles.textField }
          appendExtension={'left'}
          isDisabled={true}
          extension={
            <Dropdown>
              <DropdownNode style={ styles.dropdownNode }>
                { this.props.urlMethod
                  ? this.props.urlMethod.toUpperCase()
                  : 'Method'
                }
                <Icon name={icons.arrow_drop_down}/>
              </DropdownNode>
              <DropdownMenu>
                { ['GET', 'POST', 'PUT', 'DELETE'].map(method =>
                  <DropdownOption
                    style={styles.dropdownOption }
                    key={method}
                    text={method}
                    value={method}
                    onClick={this.onMethodUpdate}
                  />
                )}
              </DropdownMenu>
            </Dropdown>
          }
        />

        {endpoints.slice(1, endpoints.length).map((e, i)=> e.charAt(0) === ':'
          ? <TextField
              key={i}
              placeholder={'/' + e}
              value={''}
              style={this.addSegmentPadding(styles.segment, i, endpoints.length - 1)}
            />
          : <TextField
              key={i}
              value={e}
              isDisabled={true}
              style={this.addSegmentPadding(styles.segment, i, endpoints.length - 1)}
            />
        )}


      </span>
    )
  }
}
