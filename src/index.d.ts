// Type definitions for anki
// Project: anki
// Definitions by: fritzvd

export as namespace anki;

/*~ If this module has methods, declare them as functions like so.
 */
export function read(a: string): string;

/*~ You can declare types that are available via importing the module */
export interface AnkiObj {
  name: string;
}

export function Anki(a: AnkiObj): AnkiObj;

