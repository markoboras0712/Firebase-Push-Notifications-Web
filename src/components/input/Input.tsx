import React from 'react';
import classes from './Input.module.css';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <input ref={ref} {...props} className={classes.form__input} />
  ),
);
