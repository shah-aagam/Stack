import React from 'react'

const Avatar = ({ children , backgroundColor , px , py , color , borderRadius , fontSize , cursor }) => {
  
  const style = {
    backgroundColor ,
    padding: `${py} ${px}` ,
    padding: window.innerWidth <= 620 ? '11px 10px' : `${py} ${px}` ,
    color: color || 'white' , 
    borderRadius ,
    fontSize , 
    textAlign: 'center',
    alignItems: 'center',
    marginRight: '20px',
    cursor: cursor || null
  }

  return (
    <div style = {style} >
      { children }
    </div>
  )
}

export default Avatar
