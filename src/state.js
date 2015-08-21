/**
 *
 * Classy - State Helpers
 *
 * @module lib/State
 * @description
 *   Helpers for gettings/setting Classy component state object props
 */

/**
 *
 * Tracks the states of all classyDecorate'd components
 *
 */
const STATE = {};

/**
 *
 * [createComponentState description]
 *
 * @param  {ReactComponent} Component              [description]
 * @param  {Object}         [settings]             [description]
 * @param  {Boolean}        [debug=false]          [description]
 * @param  {String}         [styleProp=style]      [description]
 * @param  {String}         [themeProp=theme]      [description]
 * @param  {String}         [alias=Component.name] [description]
 * @param  {String}         [elemId=alias]         [description]
 * @param  {String}         [appendTo=head]        [description]
 * @param  {Object}         [elemProps ={ type: 'text/css' }]
 *                                        				 [description]
 * @return {Object}                                Component state object
 */
export function createComponentState(
  Component,
  {
    debug      = false,
    styleProp  = 'style',
    themeProp  = 'theme',
    alias      = Component.name,
    elemId     = alias,
    elemProps  = { type: 'text/css' },
    appendTo   = 'head'
  }={}
) {
  let name = alias;
  if (!name) throw new ReferenceError(
    'Classy Error: createComponentState(...)\n' +
    `Component must have a 'name' or component's settings must have an 'alias'.`
  );
  if (getComponentState(name)) return console.warn(
    'Classy Warning: createComponentState(...)\n' +
    `State has already been created for component ${name}.`
  );
  // Construct initial state
  setComponentState(name, {
    Component,
    numMounted: 0,
    isStyled: false,
    currentTheme: undefined,
    cssText: undefined,
    settings: {
      debug,
      styleProp,
      themeProp,
      alias,
      elemId,
      elemProps,
      appendTo,
      immediate
    }
  });
  if (debug) console.debug(
    'Classy Debug: createComponentState(...)\n',
    getComponentState(name)
  );
  return getComponentState(name);
}

/**
 *
 * Assigns component state to `null`
 *
 * @param  {[type]} name [description]
 */
export function nullifyComponentState(name) {
  STATE[name] = null;
}

/**
 *
 * Gets a component's classy state object
 *
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function getComponentState(name) {
  return STATE[name];
}

/**
 *
 * Sets a component's classy state object
 *
 * @param {[type]} name  [description]
 * @param {[type]} state [description]
 */
export function setComponentState(name, state) {
  STATE[name] = state;
}

/**
 *
 * [mergeComponentState description]
 *
 * @param  {[type]} name  [description]
 * @param  {[type]} state [description]
 */
export function mergeComponentState(name, state) {
  STATE[name] = {
    ...STATE[name],
    state
  };
}

/**
 *
 * [removeStyleAndDecNumMounted description]
 *
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function decrProp(name, key) {
  let { [key]: val } = getComponentState(name);
  --val;
  mergeComponentState({ [key]: val });
}

/**
 *
 * [appendStyleAndIncNumMounted description]
 *
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function incrProp(name, key) {
  let { [key]: val } = getComponentState(name);
  ++val;
  mergeComponentState({ [key]: val });
}
