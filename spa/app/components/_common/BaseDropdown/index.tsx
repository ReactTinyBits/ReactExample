import React from 'react';

import { DropdownProps } from 'semantic-ui-react';
import { BaseDropdownWrapper, IconWrapperColored, BaseDropdownLoader } from './Wrappers';
import DropdownIcon from '../../Icons/Dropdown';
import { Label } from '../Input/Wrappers';

const BaseDropdown = (props: BaseDropdownProps) => (
  <div style={{ position: 'relative' }}>
    {props.label ? <Label>{props.label}</Label> : ''}
    <BaseDropdownWrapper
      {...props}
      icon={
        props.loading ? (
          <BaseDropdownLoader active={props.loading} size="tiny" />
        ) : (
          <IconWrapperColored>
            {props.icon ? props.icon : <DropdownIcon width="1em" height="1em" color={props.color} />}
          </IconWrapperColored>
        )
      }
    />
  </div>
);

type BaseDropdownProps = {
  loading?: boolean;
  icon?: React.ReactNode;
  singleLine?: boolean;
  label?: string;
} & DropdownProps;

export default BaseDropdown;
