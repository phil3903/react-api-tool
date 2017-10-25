import React from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { Table, Th, Td, TextField } from 'reactables'
import colors, { secondary, secondaryHover, white } from '../constants/colors'
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
        fontSize: 16,
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
            fontSize: 16,
            fontWeight: 300,
            padding: 15,
          }
        }
      },
      example:{
        backgroundColor: secondaryHover,
        color: white,
        whiteSpace: 'pre-wrap',
        padding: 10,
        margin: '10px 0 0',
        borderRadius: 2,
      }
    }

    const textStyles = {
      method: {
        get: {color: colors.green[500]},
        post: {color: colors.purple[500]},
        put: {color: colors.blue[500]},
        delete: {color: colors.red[500]}
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
            <Heading
              size={3}
              text={ route.doc_display_name
                ? `${route.doc_display_name} ${ route.doc_display_name !== route.displayName ? `(${route.displayName})` : '' }`
                : ''}
              style={ styles.displayName }
            />
            <Heading
              size={3}
              text={ route.endpoint
                ? <span>
                    <span style={textStyles.method[route.method]}>
                      {route.method.toUpperCase()}
                    </span> /{route.endpoint}
                  </span>
                : ''
              }
            />
          </header>
          <section style={styles.section}>
            <p style={ styles.description }>{ route.description }</p>
          </section>

          { route.body || route.params ?
            <header style={styles.header}>
              <Heading size={3} text={'Parameters'}/>
            </header> : null }

          {route.name && (route.body || route.params) ?
            <section style={styles.section}>
              <Table
                isStriped
                style={ styles.parameters }
                data={ route.body || route.params }
                columnConfig={[
                  {
                    key: 'name',
                    isSortable: false,
                    renderCell: (data, column, rowIndex, style) =>
                      <Td style={{...style, base:{fontFamily: 'Lato-Regular'}}} value={data}/>
                  },
                  {
                    key: 'default',
                    isSortable: false,
                    renderCell: (data, column, rowIndex, style) =>
                      <Td style={ style} value={data || 'null'}/>
                  },
                  {
                    key: 'description',
                    isSortable: false,
                    renderCell: (data, column, rowIndex, style) =>
                      <Td style={ style } value={data}/>
                  }
                ]}
              />
            </section>
            : null }

          { get(route, 'example') ?
            <header style={styles.header}>
              <Heading size={3} text={'Example'}/>
            </header> : null }


          { get(route, 'example.description') ?
            <section style={styles.section}>
              <p style={ styles.description }>{ route.example.description }</p>

              <p style={ styles.example }>
                { route.example.value }
              </p>
            </section>
              : null
          }


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

