import Color from 'color';

/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

// Base colors

const basePrimary = 'rgb(157, 32, 82)';
const baseSecondary = '#C23B47';
const baseSuccess = '#5bde4e';
const baseWarn = '#ffb741';
const baseError = '#ea4444';

// Greyscale

export const white = '#fff';
export const black = '#222';
export const greyLightest = '#f9f7f8';
export const greyLighter = '#f2f2f2';
export const greyLight = '#eee';
export const grey = '#ddd';
export const greyDark = '#ccc';
export const greyDarker = '#888';
export const greyDarkest = '#444';

// Main variations

export const primary = Color(basePrimary).hsl().string();
export const primaryLight = Color(basePrimary).lighten(0.1).hsl().string();
export const primaryLighter = Color(basePrimary).lighten(0.2).hsl().string();
export const primaryLightest = Color(basePrimary).lighten(0.3).hsl().string();
export const primaryDark = Color(basePrimary).darken(0.2).hsl().string();
export const primaryDarker = Color(basePrimary).darken(0.4).hsl().string();
export const primaryDarkest = Color(basePrimary).darken(0.6).hsl().string();

export const secondary = Color(baseSecondary).hsl().string();
export const secondaryLight = Color(baseSecondary).lighten(0.1).hsl().string();
export const secondaryLighter = Color(baseSecondary)
  .lighten(0.2)
  .hsl()
  .string();
export const secondaryLightest = Color(baseSecondary)
  .lighten(0.3)
  .hsl()
  .string();
export const secondaryDark = Color(baseSecondary).darken(0.2).hsl().string();
export const secondaryDarker = Color(baseSecondary).darken(0.4).hsl().string();
export const secondaryDarkest = Color(baseSecondary).darken(0.6).hsl().string();

export const error = Color(baseError).hsl().string();
export const errorLight = Color(baseError).lighten(0.2).hsl().string();
export const errorLighter = Color(baseError).lighten(0.4).hsl().string();
export const errorLightest = Color(baseError).lighten(0.6).hsl().string();
export const errorDark = Color(baseError).darken(0.2).hsl().string();
export const errorDarker = Color(baseError).darken(0.4).hsl().string();
export const errorDarkest = Color(baseError).darken(0.6).hsl().string();

export const success = Color(baseSuccess).hsl().string();
export const successLight = Color(baseSuccess).lighten(0.2).hsl().string();
export const successLighter = Color(baseSuccess).lighten(0.4).hsl().string();
export const successLightest = Color(baseSuccess).lighten(0.6).hsl().string();
export const successDark = Color(baseSuccess).darken(0.2).hsl().string();
export const successDarker = Color(baseSuccess).darken(0.4).hsl().string();
export const successDarkest = Color(baseSuccess).darken(0.6).hsl().string();

export const warn = Color(baseWarn).hsl().string();
export const warnLight = Color(baseWarn).lighten(0.2).hsl().string();
export const warnLighter = Color(baseWarn).lighten(0.4).hsl().string();
export const warnLightest = Color(baseWarn).lighten(0.6).hsl().string();
export const warnDark = Color(baseWarn).darken(0.2).hsl().string();
export const warnDarker = Color(baseWarn).darken(0.4).hsl().string();
export const warnDarkest = Color(baseWarn).darken(0.6).hsl().string();

// Backgrounds
export const background = '#222223';
export const backgroundSeparator = '#404144';
export const backgroundGradientFrom = primary;
export const backgroundGradientTo = secondary;
export const backgroundGradientSeparator = '#D5395E';

// AttendeeAvatars
export const circlePrimaryBg = primary;
export const circleSecondaryBg = white;
export const textPrimary = white;
export const textSecondary = primary;

// LoadingBalls
export const ballPrimary = primary;
export const ballSecondary = white;

// ToggleButton
export const primaryBgOff = greyDark;
export const primaryBallOff = white;
export const primaryBallOn = white;
export const primaryBorder = white;
export const primaryBgOn = primary;
export const secondaryBgOff = white;
export const secondaryBallOff = greyDark;
export const secondaryBallOn = primary;
export const secondaryBorder = primary;
export const secondaryBgOn = white;

// Buttons
export const btnPrimary = '#D5395E';
export const btnPrimaryGradient = secondary;
export const btnPrimaryText = white;
export const btnSecondary = 'transparent';
export const btnSecondaryGradient = greyLightest;
export const btnSecondaryText = white;

//  Inputs
export const inputBorder = primary;

// Text
export const text = white;
export const textShadow = greyDarkest;
export const textInverse = black;
export const textTitle = greyLightest;
export const textTitleShadow = greyDarkest;
export const textTitleInverse = greyDarkest;
export const textTitleInverseShadow = greyLightest;

// Header
export const headerText = white;
export const headerBackground = '#1C1C1F';
export const headerBottomLine = '#464646';

// Logo
export const logoPrimaryText = 'white';
export const logoSecondaryText = 'black';
export const logoPrimarySmallText = 'indianred';
export const logoSecondarySmallText = 'indianred';

// Export theme object also for easier consumation for eg. ThemeProvider
export const theme = {
  /* eslint-disable */
  fontImportUrl:
    typeof fontImportUrl !== 'undefined' && fontImportUrl
      ? fontImportUrl
      : false,
  /* eslint-enable */
  primaryBgOff,
  primaryBallOff,
  primaryBallOn,
  primaryBorder,
  primaryBgOn,
  secondaryBgOff,
  secondaryBallOff,
  secondaryBallOn,
  secondaryBorder,
  secondaryBgOn,
  ballPrimary,
  ballSecondary,
  circlePrimaryBg,
  circleSecondaryBg,
  textPrimary,
  textSecondary,
  primary,
  primaryLight,
  primaryLighter,
  primaryLightest,
  primaryDark,
  primaryDarker,
  primaryDarkest,
  secondary,
  secondaryLight,
  secondaryLighter,
  secondaryLightest,
  secondaryDark,
  secondaryDarker,
  secondaryDarkest,
  error,
  errorLight,
  errorLighter,
  errorLightest,
  errorDark,
  errorDarker,
  errorDarkest,
  success,
  successLight,
  successLighter,
  successLightest,
  successDark,
  successDarker,
  successDarkest,
  warn,
  warnLight,
  warnLighter,
  warnLightest,
  warnDark,
  warnDarker,
  warnDarkest,
  grey,
  greyLightest,
  greyLighter,
  greyLight,
  greyDark,
  greyDarker,
  greyDarkest,
  white,
  black,
  background,
  backgroundSeparator,
  btnPrimary,
  btnPrimaryGradient,
  btnPrimaryText,
  btnSecondary,
  btnSecondaryGradient,
  btnSecondaryText,
  inputBorder,
  text,
  textShadow,
  textInverse,
  textTitle,
  textTitleShadow,
  textTitleInverse,
  textTitleInverseShadow,
  headerText,
  headerBackground,
  headerBottomLine,
  logoPrimaryText,
  logoSecondaryText,
  logoPrimarySmallText,
  logoSecondarySmallText,
};

export default { theme };
