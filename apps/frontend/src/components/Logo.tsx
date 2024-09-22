import { SVGProps } from 'react';

export default function Logo({ width, height, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width={width ?? '30'} height={height ?? '30'} viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <defs>
        <style>
          {`
            .cls-1 { fill: none; }
            .cls-1, .cls-2, .cls-3, .cls-4 { stroke-linecap: round; stroke-linejoin: round; }
            .cls-1, .cls-5, .cls-6 { stroke: #565759; }
            .cls-1, .cls-6 { stroke-width: 6px; }
            .cls-2 { fill: #f99947; stroke: #f99947; stroke-width: 4px; }
            .cls-3 { fill: #80be5d; stroke: #80be5d; stroke-width: 4px; }
            .cls-4 { fill: #e6b264; stroke: #e6b264; stroke-width: 4px; }
            .cls-5 { fill: #565759; }
            .cls-5, .cls-6 { stroke-miterlimit: 10; }
            .cls-6 { fill: #fffcdf; }
          `}
        </style>
      </defs>
      <g id='Layer_2-2' data-name='Layer 2'>
        <rect className='cls-6' x='3' y='3' width='194.06' height='194.06' rx='32.32' ry='32.32' />
        <path className='cls-1' d='M46.07,135.72c-7.6,19.24,1.83,41,21.07,48.61s41-1.83,48.61-21.07c7.6-19.24-1.83-41-21.07-48.61-3.66-1.45-7.4-2.28-11.13-2.54' />
        <path className='cls-1' d='M80.91,149.49L41.47,87.52c-1.4-2.2.18-5.08,2.79-5.08h14.17s15.32-.22,15.88,9.41-8.33,8.87-8.33,8.87' />
        <path className='cls-5' d='M47,94.16H3v5h39.28L3,143.67v6.95c.8,0,1.59-.38,2.07-1.1l44-51.46c.52-.77.57-1.76.14-2.57-.43-.82-1.28-1.33-2.21-1.33Z' />
        <g>
          <path className='cls-3' d='M64.35,38.1s2.88-6.82,11.38-5.62,3.05,10.09,8.25,10.34,9.52-2.27,10.29-6.53.89,7.55,5.21,7.8,9.78-1.65,10.92,1.02-1.61,7.65-1.61,7.65l-5.5,6.06H83.41' />
          <path
            className='cls-4'
            d='M40.69,15.27c-1.7,2.11-1.57,6.3-.31,12.71,2.1,3.45,6.86,2.02,14.06,4.93,0,0-3.3,7-11.79,4.98,1.06,4.19,1.06,4,2.23,7.7,2.79,1.67,9.07,3.79,15.46,4.89,0,0-4.76,5.71-11.88,5.93.85,2.47.87,2.42.87,2.42h23.49c-8.38-26.41-25.65-51.56-32.13-43.56Z'
          />
          <path className='cls-2' d='M83.92,58.51s1.95-10.41,13.52-10.41,13.52,10.41,13.52,10.41' />
          <polyline className='cls-1' points='83.96 100.73 98.69 100.73 114.18 58.82 43.45 58.82 50.31 70.25' />
        </g>
      </g>
    </svg>
  );
}
