import React from 'react'
import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  Togglable.displayName='Togglable'
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return ( { toggleVisibility } )
  })

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <button className="siteButton" style={{ ...hideWhenVisible, marginLeft: '0' }} onClick={toggleVisibility}>{props.buttonLabel}</button>
      <div style={showWhenVisible}>
        {props.children}
        <button style={{ marginLeft: '0' }} className="siteButton" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable