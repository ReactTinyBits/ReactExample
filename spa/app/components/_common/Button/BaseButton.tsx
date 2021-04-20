import React from 'react';
import PropTypes from 'prop-types';
import { BaseButtonWrapper } from './Wrappers';

const BaseButton = props => <BaseButtonWrapper {...props} />;

BaseButton.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  shadow: PropTypes.oneOf(['none']),
  textcolor: PropTypes.string,
  color: PropTypes.string,
  backgroundcolor: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  slim: PropTypes.bool,
  as: PropTypes.object,
  to: PropTypes.string,
};

export default BaseButton;
