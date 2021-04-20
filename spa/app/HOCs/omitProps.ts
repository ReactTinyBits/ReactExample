import React from 'react';

const omitProps = (Target, ...propsToOmit) => props => {
  const newProps = {};
  for (const prop in props) {
    // eslint-disable-next-line no-prototype-builtins
    if (!props.hasOwnProperty || props.hasOwnProperty(prop)) {
      if (propsToOmit.indexOf(prop) === -1) {
        newProps[prop] = props[prop];
      }
    }
  }
  return React.createElement(Target, newProps);
};

export default omitProps;
