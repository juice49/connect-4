import * as CSS from 'csstype';

// https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
declare module 'csstype' {
  interface Properties {
    [index: string]: any;
  }
}
