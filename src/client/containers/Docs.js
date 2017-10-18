import React from 'react'
import { connect } from 'react-redux'
import { Table, Th, Td } from 'reactables'
import colors, { secondary } from '../constants/colors'
import Toolbar from '../components/Toolbar'
import Heading from '../components/Heading'

class Docs extends React.Component {

  render(){

    const {environment, route} = this.props

    const styles = {
      base: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderBottom: `1px solid ${colors.grey[500]}`,
        boxSizing: 'border-box'
      },
      body: {
        flex: 1,
        padding: '20px 10px',
        backgroundColor: colors.blueGrey[900],
        color: colors.white,
        overflowY: 'auto'
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 20
      },
      section: {
        paddingBottom: 30
      },
      description: {
        padding: 15,
        margin: 0,
        fontSize: 14,
        fontWeight: 200,
        backgroundColor: secondary,
        borderRadius: 2
      },
      displayName: {
        base:{
          color: colors.yellow[600]
        }
      },
      parameters:{
        table:{
          base:{
            border: `1px solid ${secondary}`,
            borderRadius: 2,
            backgroundColor: secondary
          }
        },
        th:{
          base:{
            border: 'none'
          }
        },
        tr:{
          base:{
            border: 'none',
            backgroundColor: colors.blueGrey[900]
          },
          striped:{
            backgroundColor: secondary
          },
          hovered:{
            backgroundColor: colors.blueGrey[700]
          }
        },
        td:{
          base: {
            border: 'none',
            fontSize: 14,
            fontWeight: 300,
            padding: 15,
          }
        }
      }
    }

    return (
      <div style={styles.base}>
        <Toolbar
          height={60}
          left={[<Heading size={2} text={'Documentation'}/>]}
        />
        <div style={ styles.body }>
          <header style={styles.header}>
            <Heading size={3} text={route.displayName} style={ styles.displayName }/>
            <Heading size={3} text={ route.endpoint ? `${route.method.toUpperCase()}  /${route.endpoint}` : '' }/>
          </header>
          <section style={styles.section}>
            <p style={ styles.description }>{ route.description }</p>
          </section>
          <header style={styles.header}>
            <Heading size={3} text={'Parameters'}/>
          </header>

          {route.name ?
            <Table
              isStriped
              style={ styles.parameters }
              data={ route.body || route.params }
              columnConfig={[
                {
                  key: 'name',
                  renderHeading: () => <Th style={{base: {display: 'none'}}}/>,
                  renderCell: (data, column, rowIndex, style) =>
                    <Td style={{...style, base:{fontWeight: 500}}} value={data}/>
                },
                {
                  key: 'description',
                  renderHeading: () => <Th style={{base:{display: 'none'}}}/>,
                  renderCell: (data, column, rowIndex, style) =>
                    <Td style={ style } value={data}/>
                }
              ]}
            />
            : null }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    query: state.router.query,
    route: state.docs.selectedRoute,
    environment: state.docs.selectedEnvironment
  }
}
export default connect(mapStateToProps, {

})(Docs)

