![Classy logo](https://inturn.github.io/classy/dist/classy-logo-color.svg)

[![npm version](https://badge.fury.io/js/react-classy.svg)](http://badge.fury.io/js/react-classy)
[![Build Status](https://travis-ci.org/inturn/classy.svg)](https://travis-ci.org/inturn/classy)
[![Dependency Status](https://david-dm.org/inturn/classy.svg)](https://david-dm.org/inturn/classy)
[![devDependency Status](https://david-dm.org/inturn/classy/dev-status.svg)](https://david-dm.org/inturn/classy#info=devDependencies)

### Table of Contents

- [Install](#install)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API](#api)

Install
-------

##### `npm install react-classy`

Getting Started
---------------

Classy makes styling React components *composable*, *extensible*, and *simple*.
Implementation requires only 3 steps:

0. Import `react-classy` into your React component module
0. Decorate your React component class with `@Classy`.
0. Assign a CSS string to a static `style` prop on your React component class.

The styles defined on your React component will get automatically injected into
the DOM right before your component mounts. Check out some examples of basic
and advanced usage in the next section.

Usage
-----

Let's say have a file called `MyButton.js` in which we plan to create a button
React component. The following examples illustrate how you might use Classy to
encapsulate your component's styles as part of an ES7 class definition.

### Basic

Tightly coupling a component with its styles is easily achieved:

```js
import React from 'react';
// Import Classy
import Classy from 'react-classy';

// Decorate your component
@Classy
export default class MyButton extends React.Component {
  render() {
    return (
      <button className="my-button">Push Me!</button>;
    );
  }
  // Assign some stringified CSS to a static `style` prop
  static style = `
    .my-button {
      color: white;
      background: blue;
      border-radius: 0;
    }
  `
}
```

### Advanced

If you'd like to use custom settings, theme your styles, or use custom
css-rendering middleware, we've also got your back:

```js
import React from 'react';
// Import Classy decorator and utils modules
import { Classy, Utils } from './react-classy';
// Stylus CSS pre-processor
import stylus from 'stylus';

// Classy's decorator accepts an options object, so let's construct one.
const CLASSY_SETTINGS = {
  // Logs rendered css and operation duration
  debug: true,
  // Will render CSS from `stylus` prop instead of `style`
  styleProp: 'stylus'
};

// Pass the options to the decorator
@Classy(CLASSY_SETTINGS)
export default class Button extends React.Component {

  // We'll render a button that switches themes when it's clicked.
  render() {
    return (
      <button
        className="my-button"
        onClick={e => this.switchTheme(e)}>
        Touch Me!
      </button>
    );
  }

  // So let's define our themes as a static prop.
  // This makes is easy for others to modify a component's theme(s)
  // via class extension.
  static themes = {
    light: {
      textColor: 'blue',
      background: 'white'
    },
    dark: {
      textColor: 'white',
      background: 'blue'
    }
  }

  // Instead of a hard-coding your CSS,
  // you can assign a method that returns Promise that fulfills a CSS string.
  // Using this approach, you can easily transform/preprocess your styles.
  // We can also set the default theme via rest param.
  static stylus(theme=this.constructor.themes.light) {
    return new Promise((fulfill, reject) =>
      stylus(`
        .my-button
          color: convert($theme.textColor)
          background: convert($theme.background)
      `)
        .set('imports', [])
        .define('$theme', theme, true)
        .render((err, css) => {
          if (err) return reject(err);
          fulfill(css);
        })
    );
  }

  // Method that switches the component's theme.
  // Will toggle from 'light' to 'dark' and vice versa.
  switchTheme(e) {
    let { name } = this.constructor;
    let theme = Utils.getTheme(name);
    theme = 'light' === theme ? 'dark' : 'light';
    Utils.setTheme(name, theme);
  }

}
```

[Decorator](#decorator) options and [util](#utils) methods are comprehensively documented in the next
section.


API
---

### Decorator

#### @Classy([options])

A class decorator will automatically inject styles into the DOM when your `ReactComponent` instance mounts.

##### options

Type: `Object`

Default: see below

An object that allows you to customize your Classy component settings.
All settings are optional. See defaults below.

##### options.debug

Type: `Boolean`

Default: `false`

[description]

##### options.styleProp

Type: `String`

Default: `style`

[description]

##### options.themeProp

Type: `String`

Default: `themes`

[description]

##### options.alias

Type: `String`

Default: `<ReactComponent>.name_<hash>`

Example: `MyButton_fxhhf`

[description]

##### options.elemId

Type: `String`

Default: `alias`

[description]

##### options.elemProps

Type: `String`

Default: `text/css`

[description]

##### options.appendTo

Type: `String`

Default: `head`

[description]

### Utils

#### Utils.setTheme(name [, theme])

##### name

Type: `String`

[description]

##### theme

Type: `String`

[description]

#### Utils.updateStyle(name)

##### name

Type: `String`

[description]

#### Utils.removeStyle(name)

##### name

Type: `String`

[description]

#### Utils.getComponentState(name)

##### name

Type: `String`

[description]

#### Utils.createComponentState(Component [, options])

##### Component

Type: `ReactComponent`

[description]

##### options

Type: `Object`

Same options as the [@Classy decorator options](#options)
