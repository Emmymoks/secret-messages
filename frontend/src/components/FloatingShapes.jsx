import React from 'react'

export default function FloatingShapes(){
  return (
    // aria-hidden should be a string or boolean attribute; also ensure shapes are not focusable
    <div className='floating-shapes' aria-hidden="true" tabIndex={-1}>
      <div className='shape heart' style={{ left: '5%', top: '10%', animationDelay: '0s' }} />
      <div className='shape diamond' style={{ left: '70%', top: '5%', animationDelay: '1s' }} />
      <div className='shape heart' style={{ left: '25%', top: '70%', animationDelay: '2s', transform: 'scale(0.8) rotate(20deg)' }} />
      <div className='shape diamond' style={{ right: '8%', top: '55%', animationDelay: '3s', transform: 'scale(1.1) rotate(10deg)' }} />
    </div>
  )
}
