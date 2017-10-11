import React from 'react'
import PropTypes from 'prop-types'
import { Wizard, WizardStep, Select, SelectOption } from 'reactables'
import ParameterInput from './ParameterInput'
import colors from '../constants/colors'

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
      wizard: {
        base: {
          backgroundColor: colors.blueGrey[900]
        }
      },
      wizardStep:{
        base:{
          backgroundColor: colors.blueGrey[900]
        }
      }
    }
    return(
      <Wizard
        style={styles.wizard}
        shouldShowTimeline={false}
        shouldAnimate={false}
        completeText={'Export'}
      >
        <WizardStep
          name={'format'}
          title={'Select Format'}
          style={styles.wizardStep}
        >
          <Select placeholder={'Select Format'} onChange={()=>{}}>
            <SelectOption value={'json'} text={'JSON'}/>
            <SelectOption value={'csv'} text={'CSV'}/>
          </Select>
        </WizardStep>

        <WizardStep name={'fields'} title={'Fields'} style={styles.wizardStep}>
          <ParameterInput/>
        </WizardStep>
      </Wizard>
    )
  }
}