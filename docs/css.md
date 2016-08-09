## CSS

We recently removed sass from the boilerplate, and opted in several postcss plugins:
- [postcss-import](https://github.com/postcss/postcss-import)
- [postcss-mixins](https://github.com/postcss/postcss-mixins)[unused]
- [postcss-simple-vars](https://github.com/postcss/postcss-simple-vars)
- [postcss-nested](https://github.com/postcss/postcss-nested)
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [postcss-reporter](https://github.com/postcss/postcss-reporter)


Please refer to [this](https://github.com/choonkending/react-webpack-node/issues/150) for more reading.

Note: This change to postcss is experimental, as there might be features you want from a preprocessor such as sass that might not be supported - unless you write a plugin yourself.

## CSS module questions

#### How do I reuse a class?
```css
/* Within the same file */
.borderLine {
  border-bottom: 1px solid #000;
}

.actualClass {
  composes: borderLine;
}

/* From a different file */
.actualClass {
  composes: borderLine from './border.css';
}

```

#### How do I reuse a value?
```css
/* Within the same file */
@value color-white: #fff;

.actualClass {
  color: color-white;
}

/* From a different file */
@value color-white from './colors.css';
.actualClass {
  color: color-white;
}

```

## Suggested Readings;
- [Composition in CSS Modules](https://github.com/css-modules/css-modules/blob/master/docs/composition.md)
- [CSS Modules by Glen Maddern](http://glenmaddern.com/articles/css-modules)
- [CSS modules values](https://github.com/css-modules/postcss-modules-values)
