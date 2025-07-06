import React from "react";
export const TableRow = React.forwardRef(function TableRow(props, ref) {
  return <tr ref={ref} {...props}>{props.children}</tr>;
});
