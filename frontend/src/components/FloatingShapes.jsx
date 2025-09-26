import React from 'react'

// Modern decorative SVG blobs — purely visual, not interactive
export default function FloatingShapes(){
  return (
    <div className='floating-shapes' aria-hidden={true} tabIndex={-1}>
      {/* Blob 1 */}
      <svg className='blob blob-1' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg' style={{ left: '6%', top: '8%' }}>
        <defs>
          <linearGradient id='g1' x1='0' x2='1'>
            <stop offset='0%' stopColor='#ff9ab0' />
            <stop offset='100%' stopColor='#ff5c7a' />
          </linearGradient>
        </defs>
        <path fill='url(#g1)' d='M43.2,-60.3C57.5,-50.5,72.4,-41.9,78.9,-29.7C85.4,-17.5,83.6,-1.7,78.3,12.7C73,27.1,64.3,39.9,51.3,49.2C38.3,58.6,21.2,64.6,4.6,61.4C-12,58.2,-24,45.7,-34.3,33.3C-44.6,20.9,-53.2,8.6,-58.1,-5.9C-63,-20.3,-64.1,-36.9,-55.4,-47.9C-46.7,-58.8,-28.2,-64.2,-10.1,-61.6C8,-59,16,-48.1,43.2,-60.3Z' transform='translate(100 100)' />
      </svg>

      {/* Blob 2 */}
      <svg className='blob blob-2' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg' style={{ right: '6%', top: '18%' }}>
        <defs>
          <linearGradient id='g2' x1='0' x2='1'>
            <stop offset='0%' stopColor='#ffd6e0' />
            <stop offset='100%' stopColor='#ffb3d1' />
          </linearGradient>
        </defs>
        <path fill='url(#g2)' d='M36.4,-53.9C50.3,-45.2,66,-36.4,73.6,-23.9C81.1,-11.4,80.5,5.8,73.8,21.1C67.1,36.4,54.4,49.8,39,58.2C23.6,66.6,5.6,70,-11.7,68.4C-29,66.8,-46.7,60.2,-57.7,47.8C-68.6,35.4,-72.8,17.7,-71.8,0.1C-70.7,-17.5,-64.4,-35,-52.6,-45C-40.8,-55,-23.5,-57.5,-6.5,-54.3C10.4,-51.1,20.7,-42.6,36.4,-53.9Z' transform='translate(100 100)' />
      </svg>

      {/* Blob 3 */}
      <svg className='blob blob-3' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg' style={{ left: '20%', bottom: '6%' }}>
        <defs>
          <linearGradient id='g3' x1='0' x2='1'>
            <stop offset='0%' stopColor='#ffd9f0' />
            <stop offset='100%' stopColor='#ffc0e6' />
          </linearGradient>
        </defs>
        <path fill='url(#g3)' d='M40.2,-62.3C54.6,-56.4,69.9,-49.3,76.6,-37.4C83.3,-25.6,81.5,-9,77.9,6.7C74.3,22.4,68.9,37.4,57.8,48.1C46.7,58.8,29.9,65.1,13.1,67.2C-3.7,69.3,-19.6,67.2,-35.3,60.9C-50.9,54.7,-66.3,44.3,-72.9,29.9C-79.5,15.5,-77.2,-2,-70.5,-17.8C-63.9,-33.6,-52.8,-47.7,-38.1,-54.6C-23.4,-61.5,-11.7,-61.2,2,-63.3C15.7,-65.4,31.4,-69.9,40.2,-62.3Z' transform='translate(100 100)' />
      </svg>
    </div>
  )
}
