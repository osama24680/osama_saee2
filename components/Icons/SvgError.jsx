import * as React from 'react';

const SvgComponent = props => (
  <svg
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <title />
    <path
      d='M21.74 18.51 14.16 3.33a2.42 2.42 0 0 0-4.32 0L2.26 18.51A2.4 2.4 0 0 0 4.41 22h15.18a2.4 2.4 0 0 0 2.15-3.49ZM12 17a1 1 0 1 1 1-1 1 1 0 0 1-1 1Zm1-5a1 1 0 0 1-2 0V9a1 1 0 0 1 2 0Z'
      fill={props.fill}
    />
  </svg>
);

export default SvgComponent;
