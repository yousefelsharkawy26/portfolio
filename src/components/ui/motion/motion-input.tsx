'use client';

import { motion, MotionProps } from 'framer-motion';
import React, { ForwardedRef } from 'react';

type MotionInputProps = React.InputHTMLAttributes<HTMLInputElement> & MotionProps;
type MotionTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & MotionProps;

export const MotionInput = React.forwardRef(function MotionInput(
  { children, ...props }: MotionInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <motion.input ref={ref} {...props}>
      {children}
    </motion.input>
  );
});
MotionInput.displayName = 'MotionInput';

export const MotionTextArea = React.forwardRef(function MotionTextArea(
  { children, ...props }: MotionTextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <motion.textarea ref={ref} {...props}>
      {children}
    </motion.textarea>
  );
});
MotionTextArea.displayName = 'MotionTextArea';