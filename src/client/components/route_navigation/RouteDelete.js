import React from 'react'
import {Button} from 'reactables'
import {red, primary, white, secondary, primaryHover, redHover} from '../../constants/colors'


const RouteDelete =({onDelete, onCancel})=>{

  const styles = {
    base:{
      position: 'absolute',
      display: 'flex',
      borderBottom: `1px solid ${secondary}`,
      left:0,
      top:0,
      width: 250,
      height: 40,
      zIndex: 0,
      boxSizing: 'border-box'
    },
    cancelButton:{
      base:{
        backgroundColor: primary,
        color: white,
        width: '50%',
        margin: 0,
        borderRadius: 0
      },
      hovered:{
        backgroundColor: primaryHover
      }
    },
    deleteButton:{
     base:{
       backgroundColor: red,
       color: white,
       width: '50%',
       margin: 0,
       borderRadius: 0
     },
      hovered:{
       backgroundColor: redHover
      }
    }
  }

  return(
    <div style={styles.base}>
      <Button
        text={'Cancel'}
        style={styles.cancelButton}
        onClick={onCancel}
      />
      <Button
        text={'Delete'}
        style={styles.deleteButton}
        onClick={onDelete}
      />
    </div>
  )
}

export default RouteDelete