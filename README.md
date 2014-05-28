# {docss}

[![Build Status](http://img.shields.io/travis/MoOx/docss.svg?style=flat)](https://travis-ci.org/MoOx/docss)

> A simple CSS styleguide generator from doc blocks

## Install

    $ npm i docss

## API

### docss(css)

Return an new `Docss` instance for the given string of css.

### Docss#toArray

Return an array containing all doc blocks with the structure below

```js
[{
  "name": "Name",
  "description": [
    "lines",
    "of",
    "description"
  ],
  "states": {
    ":hover": "state",
    ".state": "another tate"
  }
  "markup": [
    "<markup>",
    "example",
    "</markup>",
  ]
}]
```

---

## Possible Comment blocks

This library can parse those kind of comment blocks

### Expanded block (recommanded)

	/**
	 * Name
	 *
	 * Description
	 * Still description
	 *
	 * .state: This is a state
	 * .state - This is a another
	 *
	 * <markup>
	 */

### Verbose block (DSS style)

	/**
	 * @name Name
	 *
	 * @description Description
	 * Still description
	 *
	 * @state .state: This is a state
	 * @state .state - This is a another
	 *
	 * @markup <markup>
	 */

### Condensed block (KSS style)

	/**
	Name
	Description
	Still description
	:hover .state: State
	*/

### Mixed style

	/**
	 * Name
	 *
	 * Description
	 * Still description
	 *
	 * @state .state: This is a state
	 * @state .state - This is a another
	 *
	 * @markup <markup>
	 */

### Shitty style (_seriously not recommanded_)

	/**
	 * @description Description
	* Name
	 *
	Still description
	*
	* @state .state: This is a state

	@markup <markup>
	* <markup>
	 *
	.another-state - This is a another
	*/
