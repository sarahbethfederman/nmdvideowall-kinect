import * as Common from './common.js';

// Collapsed styles (no namespaces)
// e.g. Common.Whatever -> SharedStyles.Whatever
const collapsedStyles = Object.assign({},
  Common
);

// Namespaced styles
// e.g. Common.Whatever -> SharedStyles.Common.Whatever
// const sharedStyles = {
//   Common
// };

export default collapsedStyles;
