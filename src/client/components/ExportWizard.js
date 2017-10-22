import React from 'react'
import PropTypes from 'prop-types'
import { Wizard, WizardStep, Select, SelectOption, TextField } from 'reactables'
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
    }
    return(
      <div style={ styles.base }>
        <Wizard
          style={styles.wizard}
          shouldShowTimeline={true}
          animationDuration={500}
          completeText={'Export'}
        >
          <WizardStep
            name={'format'}
            title={'Format'}
            style={styles.wizardStep}
          >
            <Select
              placeholder={'Select Format'}
              onChange={()=>{}}
            >
              <SelectOption value={'json'} text={'JSON'}/>
              <SelectOption value={'csv'} text={'CSV'}/>
            </Select>
          </WizardStep>

          <WizardStep name={'fields'} title={'Fields'} style={styles.wizardStep}>
            <ParameterInput/>
          </WizardStep>

          <WizardStep name={'name'} title={'Name'} style={styles.wizardStep}>
            <TextField
              style={styles.textField}
              placeholder={'File Name'}
            />
          </WizardStep>
        </Wizard>
      </div>
    )
  }
}