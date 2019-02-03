# Page Magnifier

#### In-page JavaScript content magnifier for web pages

<p align="center"><img src="https://imgur.com/uU14R2k.gif" width=600></p>

<p align="center">Shown with magnifiable background image</p>

See a live version of the magnifier [here](https://davidmwald.github.io/page-magnifier/).

## Languages

- JavaScript
- HTML
- CSS

## Features

- Magnifying viewport overlaying desired magnifiable page content
- Mouse cursor tracking for centroidal positioning of magnifier, restricted within bounds of magnifiable region
- Position-matched content zooming in/out from 1-4x (customizable) magnification levels using mouse wheel scrolling
- Hidden page scrollbars when using magnifier to prevent simultaneous mouse wheel page scrolling
- Hidden mouse cursor over magnifiable region for optimal viewing
- Supports solid color page backgrounds and both the magnification and non-magnification of non-solid page backgrounds including gradients and non-fixed images 

## Installation / Customization

The code and example assets, as described and illustrated herein, can be acquired by forking/cloning this repository or from the latest release. Required and optional/customizable portions of the code (described below) can be combined with any desired page content, styles, and other scripts for developer use.

#### <ins>JavaScript (magnifier.js)</ins>

Unless otherwise commented as "optional," all code provided is required for functional use of the magnifier. All optional code includes that needed to include a non-solid page background that should not be magnified.

The lower and upper magnification limits and +/- magnification step for mouse wheel scrolling can be customized and are currently assigned values of 1x, 4x, and +/- 0.25x, respectively. These parameters are commented as "parameters can be customized." 

#### <ins>HTML (index.html)</ins>

The container div for magnifiable content with id "magRegion" and the magnifier viewport div with id "magnifier" are required, along with all specified event handlers.

Any desired magnifiable content can be placed within the container div.

#### <ins>CSS (styles.css)</ins>

Styles necessary for the magnifier are listed under the "MAGNIFIER CSS" comment heading. The comments primarily describe any required properties and denote optional or example-specific properties. 

It is highly recommended that the magnifier components for the #magRegion, #magCopy, and #unmagBg selectors utilize border-box sizing to help mitigate fractional CSS pixel rounding in different browsers.

Possible customizations include:

- Magnifier shape, border, and size -- currently a 150px circle with border
- Mouse cursor visibility -- currently hidden when over magnifiable region
- User selection of magnified content -- currently disabled

The comments also provide instructions for the magnifier to work with solid color, non-solid and magnifiable, or non-solid and non-magnifiable page backgrounds. The magnifier does not currently support fixed backgrounds. Examples of different background options are provided [here](docs/BACKGROUND-EXAMPLES.md).

## Usage

The magnifier, as currently provided, is automatically enabled for the defined magnifiable region of the page.

Move the magnifier around using the mouse. The magnifier will center-track the current mouse position over the magnifiable region, but its center cannot extend beyond the bounds of the magnifiable region. The magnifier can still be moved as long as the mouse cursor is positioned over the bounded magnifier. The mouse cursor is hidden when specifically over the magnifiable region and visible at all other times.

Use the mouse wheel to zoom in and out on magnifiable content while the magnifier is moveable (i.e., active). The point of interest for magnification will be aligned with the center of the magnifier. Zoom in by scrolling outward, away from the user. Zoom out by scrolling inward, toward the user. Page scrolling with the mouse wheel is prevented when the magnifier is active.

## Potential Future Work

- Toggle to turn magnifier on/off
- Displayable magnification levels
- Allowing for custom specifying magnification level
- Support for fixed page backgrounds
- Touch capability

## Version History

#### v1.0.0 -- February 3, 2019

- Initial release
- Mouse functionality
- Magnifier automatically enabled
