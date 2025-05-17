import React from 'react';
import PropTypes from 'prop-types';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import '../../styles/components/buttons.css'; 

export const Button = React.forwardRef(
  (
    {
      variant = 'default',
      size = 'default',
      isLoading = false,
      icon,
      asChild = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={clsx('btn', `btn--${variant}`, `btn--${size}`, className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <span className="btn-spinner">⏳</span>}
        {!isLoading && icon && <span className="btn-icon">{icon}</span>}
        <span>{children}</span>
      </Comp>
    );
  }
);

Button.displayName = 'Button';

Button.propTypes = {
  variant: PropTypes.oneOf([
    'default',      // Create, Save, Pair
    'cancel',       // Cancel
    'cancel-light',  //Cancel for delete pop up
    'destructive',  // Delete
    'edit'          // Edit
  ]),
  size: PropTypes.oneOf(['sm', 'default', 'lg']),
  isLoading: PropTypes.bool,
  icon: PropTypes.node,
  asChild: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
