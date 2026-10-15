'use client';

import * as React from 'react';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Slider(props: SliderProps) {
  return <input type="range" className="w-full accent-black" {...props} />;
}
