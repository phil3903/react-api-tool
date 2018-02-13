import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { Select, SelectOption, Button } from 'reactables'
import ParameterInput from './ParameterInput'
import Heading from './Heading'
import colors, { primary, highlight, highlightHover, disabled } from '../constants/colors'

export default class ExportWizard extends React.Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor (props){
    super(props)
    this.state = {}
  }

  componentDidMount(){

  }

  render(){

    const {
      format,
      columns,
      paths,
      updateFormat,
      addColumn,
      deleteColumn,
      updateColumnKey,
      updateColumnValue,
      executeExport
    } = this.props

    const styles = {
      base:{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: primary
      },
      body:{
        flex: 1,
        padding: 20,
        boxSizing: 'border-box',
        overflowY: 'auto'
      },
      exportButton:{
        base:{
          width: '100%',
          height: 60,
          borderRadius: 0,
          backgroundColor: highlight
        },
        hovered:{
          backgroundColor: highlightHover
        },
        disabled:{
          backgroundColor: disabled
        }
      },
      heading:{
        base: {
          paddingBottom: 10
        }
      },
      section:{
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 40
      },
      addButton:{
        base:{
          alignSelf: 'flex-end',
          padding: 0,
          margin: 0,
          fontSize: 14,
          backgroundColor: 'transparent',
          color: colors.white
        },
        hovered:{
          color: colors.yellow[600],
          backgroundColor: 'transparent',
        }
      },
    }
    return(
      <div style={ styles.base }>
        <div style={styles.body}>

          <section style={styles.section}>
            <Heading size={2} text={'Format'} style={ styles.heading } />
            <Select
              placeholder={'Select Format'}
              onChange={updateFormat}
              value={format}
            >
              <SelectOption value={'json'} text={'JSON'}/>
              <SelectOption value={'csv'} text={'CSV'}/>
            </Select>
          </section>


          { format === 'csv' ?
            <section style={ styles.section }>
              <Heading
                size={2}
                text={'Fields'}
                style={styles.heading}
              />
              <p style={{margin: '0 0 20px 0', padding: 0, fontSize: 12}}>
                Note: Please select the keys you would like to export. A * indicates an array, and " . " indicates an object.
              </p>
              {columns ? columns.map((item, i) =>
                <ParameterInput
                  key={i}
                  index={i}
                  listLength={columns ? columns.length : 0}
                  options={paths || []}
                  param={item.key}
                  value={item.value}
                  onValueUpdate={updateColumnValue}
                  onKeyUpdate={updateColumnKey}
                  onDelete={deleteColumn}
                  onAdd={addColumn}
                />) : null }
                {get(columns[columns.length - 1], 'value.length')
                || get(columns[columns.length - 1], 'key.length')
                  ? <Button
                    text={'Add Another'}
                    style={styles.addButton}
                    onClick={ addColumn }
                  /> : null }
              </section>
            : null }
        </div>

        <Button
          style={styles.exportButton}
          text={'Export Data'}
          onClick={executeExport}
          isDisabled={ !format }
        />
      </div>
    )
  }
}