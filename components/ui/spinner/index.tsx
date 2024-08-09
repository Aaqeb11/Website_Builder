'use client';
import { ActivityIndicator, ColorValue } from 'react-native';
import React from 'react';
import { createSpinner } from '@gluestack-ui/spinner';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { cssInterop } from 'nativewind';

const UISpinner = createSpinner({ Root: ActivityIndicator });

(cssInterop as any)(UISpinner, {
  className: { target: 'style', nativeStyleToProp: { color: true } }
});

const spinnerStyle = tva({});

type ISpinnerProps = React.ComponentProps<typeof UISpinner> & {
  ref?: React.Ref<ActivityIndicator>;
};

const Spinner = React.forwardRef<ActivityIndicator, ISpinnerProps>(
  ({ className, color, ...props }, ref) => {
    return (
      <UISpinner
        {...props}
        color={color as ColorValue}
        className={spinnerStyle({ class: className })}
      />
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner };