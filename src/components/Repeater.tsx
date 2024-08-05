// // ** Third Party Components
// import PropTypes from 'prop-types'

// const Repeater = (props: any) => {
//   // ** Props
//   const { count, tag, children, ...rest } = props

//   // ** Custom Tag
//   const Tag = tag

//   // ** Default Items
//   const items = []

//   // ** Loop passed count times and push it in items Array
//   for (let i = 0; i < count; i++) {
//     items.push(children(i))
//   }

//   return <Tag {...rest}>{items}</Tag>
// }

// // ** PropTypes
// Repeater.propTypes = {
//   count: PropTypes.number.isRequired,
//   tag: PropTypes.string.isRequired
// }

// // ** Default Props
// Repeater.defaultProps = {
//   tag: 'div'
// }

// export default Repeater


import PropTypes from 'prop-types';
import { FC } from 'react';

interface RepeaterProps {
  count: number;
  tag?: keyof JSX.IntrinsicElements;
  children: (index: number) => JSX.Element;
  [key: string]: any;
}

const Repeater: FC<RepeaterProps> = ({ count, tag = 'div', children, ...rest }) => {
  const Tag = tag;
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(children(i));
  }
  return <Tag {...rest}>{items}</Tag>;
};

Repeater.propTypes = {
  count: PropTypes.number.isRequired,
  tag: PropTypes.string,
};

export default Repeater;
