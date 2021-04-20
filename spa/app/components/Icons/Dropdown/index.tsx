import React from 'react';
import { IconProps } from '../types';

const DropdownIcon = ({ width = 16, height = 16, color, style = {} }: IconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={style}
  >
    <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Icons/conner" fill={color}>
        <path
          d="M4.8,9.2 L12.1,9.2 C12.5970563,9.2 13,9.60294373 13,10.1 C13,10.5970563 12.5970563,11 12.1,11 L3.9,11 C3.40294373,11 3,10.5970563 3,10.1 L3,1.9 C3,1.40294373 3.40294373,1 3.9,1 C4.39705627,1 4.8,1.40294373 4.8,1.9 L4.8,9.2 Z"
          id="Combined-Shape-Copy"
          transform="translate(8.000000, 6.000000) rotate(-45.000000) translate(-8.000000, -6.000000) "
        />
      </g>
    </g>
  </svg>
);

export default DropdownIcon;
