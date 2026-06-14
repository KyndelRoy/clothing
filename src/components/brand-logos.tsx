import type { ReactNode } from 'react'

const svgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 400 400',
  className: 'text-foreground size-20'
} as const

const brandLogos: Record<string, ReactNode> = {
  apex: (
    <svg {...svgProps}>
      <polygon points='200,60 120,200 280,200' fill='currentColor' />
      <polygon points='200,110 150,190 250,190' className='fill-background' />
      <text x='200' y='280' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='bold' fontSize='72' fill='currentColor'>
        APEX
      </text>
      <text x='200' y='320' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='300' fontSize='24' fill='currentColor' opacity='0.5'>
        ATHLETICS
      </text>
    </svg>
  ),
  vorn: (
    <svg {...svgProps}>
      <circle cx='200' cy='120' r='70' fill='none' stroke='currentColor' strokeWidth='14' />
      <line x1='150' y1='70' x2='250' y2='170' stroke='currentColor' strokeWidth='14' />
      <text x='200' y='280' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='bold' fontSize='78' fill='currentColor'>
        VORN
      </text>
      <line x1='110' y1='300' x2='290' y2='300' stroke='currentColor' strokeWidth='4' />
    </svg>
  ),
  drift: (
    <svg {...svgProps}>
      <path d='M80,80 Q140,50 200,80 T320,80' fill='none' stroke='currentColor' strokeWidth='10' strokeLinecap='round' />
      <path d='M80,120 Q140,90 200,120 T320,120' fill='none' stroke='currentColor' strokeWidth='10' strokeLinecap='round' />
      <path d='M80,160 Q140,130 200,160 T320,160' fill='none' stroke='currentColor' strokeWidth='10' strokeLinecap='round' />
      <text x='200' y='270' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='bold' fontSize='84' fill='currentColor'>
        DRIFT
      </text>
      <text x='200' y='310' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='300' fontSize='20' fill='currentColor' opacity='0.5'>
        STREETWEAR
      </text>
    </svg>
  ),
  koda: (
    <svg {...svgProps}>
      <polygon points='200,40 280,120 200,200 120,120' fill='currentColor' />
      <polygon points='200,75 250,120 200,165 150,120' className='fill-background' />
      <circle cx='200' cy='120' r='10' fill='currentColor' />
      <text x='200' y='290' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='bold' fontSize='78' fill='currentColor'>
        KODA
      </text>
      <text x='200' y='325' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='300' fontSize='18' fill='currentColor' opacity='0.5'>
        OUTERWEAR CO.
      </text>
    </svg>
  ),
  flux: (
    <svg {...svgProps}>
      <rect x='80' y='60' width='240' height='22' fill='currentColor' />
      <rect x='120' y='100' width='160' height='22' fill='currentColor' />
      <rect x='160' y='140' width='80' height='22' fill='currentColor' />
      <text x='200' y='260' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='bold' fontSize='90' fill='currentColor'>
        FLUX
      </text>
      <line x1='120' y1='280' x2='280' y2='280' stroke='currentColor' strokeWidth='3' />
      <text x='200' y='315' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='300' fontSize='22' fill='currentColor' opacity='0.5'>
        APPAREL
      </text>
    </svg>
  ),
  zenith: (
    <svg {...svgProps}>
      <path d='M100,180 A140,140 0 0,1 300,180' fill='none' stroke='currentColor' strokeWidth='12' strokeLinecap='round' />
      <circle cx='200' cy='52' r='12' fill='currentColor' />
      <text x='200' y='280' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='bold' fontSize='66' fill='currentColor'>
        ZENITH
      </text>
      <text x='200' y='320' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='300' fontSize='20' fill='currentColor' opacity='0.5'>
        EST. 2024
      </text>
    </svg>
  )
}

export default brandLogos
