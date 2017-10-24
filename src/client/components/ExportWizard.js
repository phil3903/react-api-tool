import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { Wizard, WizardStep, Select, SelectOption, TextField, Button } from 'reactables'
import ParameterInput from './ParameterInput'
import colors, { secondary } from '../constants/colors'

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
      fileName,
      updateFormat,
      addColumn,
      deleteColumn,
      updateColumnKey,
      updateColumnValue,
      updateFileNameInput,
      executeExport
    } = this.props

    const styles = {
      base:{
        position: 'relative',
        width: '100%',
        height: '100%'
      },
      wizard: {
        base: {
          backgroundColor: colors.blueGrey[900],
          height: '100%'
        },
        controls:{
          button:{
            next: {
              active:{
                backgroundColor: colors.yellow[600],
                color: colors.black
              },
              hovered:{
                backgroundColor: colors.yellow[400],
                color: colors.black
              }

            },
            complete:{
              active:{
                backgroundColor: colors.yellow[600],
                color: colors.black
              },
              hovered:{
                backgroundColor: colors.yellow[400],
                color: colors.black
              }
            }
          }
        }
      },
      wizardStep:{
        base:{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 10px',
          backgroundColor: colors.blueGrey[900],
        }
      },
      textField:{
        input:{
          base:{
            border: 'none',
            borderBottom: `1px solid ${secondary}`,
            borderColor: secondary,
            color: colors.white,
            fontSize: 16,
            borderRadius: 0,
          },
          focused:{
            borderColor: colors.yellow[600]
          },
          blur:{
            borderColor: secondary,
          }
        }
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
      }
    }
    return(
      <div style={ styles.base }>
        <Wizard
          style={styles.wizard}
          shouldShowTimeline={false}
          animationDuration={500}
          completeText={'Export'}
          onComplete={executeExport}
        >
          <WizardStep
            name={'format'}
            title={'Format'}
            style={styles.wizardStep}
          >
            <Select
              placeholder={'Select Format'}
              onChange={updateFormat}
              value={format}
            >
              <SelectOption value={'json'} text={'JSON'}/>
              <SelectOption value={'csv'} text={'CSV'}/>
            </Select>
          </WizardStep>

          <WizardStep name={'fields'} title={'Fields'} style={styles.wizardStep}>
            {columns.map((item, i) =>
              <ParameterInput
                key={i}
                index={i}
                listLength={columns.length}
                keyOptions={paths}
                param={item.key}
                value={item.value}
                onValueUpdate={updateColumnValue}
                onKeyUpdate={updateColumnKey}
                onDelete={deleteColumn}
                onAdd={addColumn}
              />
            )}
            {
              get(columns[columns.length - 1], 'value.length', {})
                ?
                <Button
                  text={'Add Another'}
                  style={styles.addButton}
                  onClick={ addColumn }
                />
                : null
            }
          </WizardStep>
        </Wizard>
      </div>
    )
  }
}