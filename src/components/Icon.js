import React from 'react';

export function Icon(props) {
  var classNames = "fa fa-" + props.type
  return(
    <i className={classNames} />
  )
}
