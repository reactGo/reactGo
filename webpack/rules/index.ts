import image from './image';
import typescript from './typescript';
import css from './css';

export default ({ production = false, browser = false } = {}) => (
  [
    typescript({ production }),
    css({ production, browser }),
    image()
  ]
);
