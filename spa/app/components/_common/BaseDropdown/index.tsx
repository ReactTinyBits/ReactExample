import React from 'react';

import { DropdownProps } from 'semantic-ui-react';
import { BaseDropdownWrapper, IconWrapperColored, BaseDropdownLoader } from './Wrappers';
import DropdownIcon from '../../Icons/Dropdown';

const BaseDropdown = (props: BaseDropdownProps) => (
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
);

type BaseDropdownProps = {
    loading?: boolean;
    icon?: React.ReactNode;
    singleLine?: boolean;
} & DropdownProps;

export default BaseDropdown;
