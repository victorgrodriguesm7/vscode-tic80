import * as vscode from 'vscode';
import { getMarkDownOnly } from './utils/markdown';

export type RuntimeType = {
    label: vscode.CompletionItemLabel
    wikiPath: string;
    documentation: string;
    type: vscode.CompletionItemKind
    signature: vscode.SignatureInformation
}

const getWikiUrl = (wikiPath: string): string => {
    return `https://github.com/nesbox/TIC-80/wiki/${wikiPath}`;
}
// TODO: Think in a better way to implement peek and poke functions!
const rawRuntimeTypes: RuntimeType[] = [
    {
        label: {
            label: "btn",
        },
        wikiPath: "btn",
        documentation: `
        <code>function btn(id: number): boolean</code>
        This function allows you to read the status of TIC's controller buttons. It returns true if the button with the supplied id is currently in the pressed state and remains true for as long as the button is held down. To see if a button was just pressed, use [btnp](${getWikiUrl("btnp")}) instead.
        ## Parameters
        - *id*: id (0..31) of the key we want to interrogate [see the KeyMap](${getWikiUrl("key-map")}) for reference or type help buttons in console).
        ## Returns
        - *is_pressed*: button is pressed (true/false)
        - *GAMEPADS data*: 32-bit value that represents current state of all GAMEPAD button inputs`.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function btn(id: number): boolean",
            parameters: [
                {
                    label: [13,23],
                    documentation: getMarkDownOnly(`
                    Id between 0 and 31
                    | Action | P1 ID | P2 ID | P3 ID | P4 ID |
                    |---|---|---|---|---|
                    | Up | 0 | 8 | 16 | 24 |
                    | Down | 1 | 9 | 17 | 25 |
                    | Left | 2 | 10 | 18 | 26 |
                    | Right | 3 | 11 | 19 | 27 |
                    | A | 4 | 12 | 20 | 28 |
                    | B | 5 | 13 | 21 | 29 |
                    | X | 6 | 14 | 22 | 30 |
                    | Y | 7 | 15 | 23 | 31 |\n\n`.replace(/    /g, "")
                    )
                }
            ]
        }
    },
    {
        label: {
            label: "btnp"
        },
        wikiPath: "btnp",
        documentation: `
            <code>function btnp(id: number, hold?: number, period?: number): boolean</code>
            This function allows you to read the status of one of TIC's buttons. It returns true only if the key has been pressed since the last frame.
            ## Parameters
            - *id*: id (0..31) of the key we want to interrogate [see the KeyMap](${getWikiUrl("key-map")}) for reference or type help buttons in console).
            ## Returns
            - *is_pressed*: button is pressed (true/false)
            - *GAMEPADS data*: 32-bit value that represents current state of all GAMEPAD button inputs`.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function btnp(id: number, hold?: number, period?: number): boolean",
            parameters: [
                {
                    label: [14,24],
                    documentation: getMarkDownOnly(`
                    Id between 0 and 31
                    | Action | P1 ID | P2 ID | P3 ID | P4 ID |
                    |---|---|---|---|---|
                    | Up | 0 | 8 | 16 | 24 |
                    | Down | 1 | 9 | 17 | 25 |
                    | Left | 2 | 10 | 18 | 26 |
                    | Right | 3 | 11 | 19 | 27 |
                    | A | 4 | 12 | 20 | 28 |
                    | B | 5 | 13 | 21 | 29 |
                    | X | 6 | 14 | 22 | 30 |
                    | Y | 7 | 15 | 23 | 31 |\n\n`.replace(/    /g, "")
                    )
                },
                {
                  label: [25,39],
                  documentation: "Time (in ticks) the button must be pressed before re-checking"
                }, 
                {
                  label: [40,56],
                  documentation: "Time (in ticks) after hold before this function will return true again"
                }
            ]
        }
    },
    {
        label: {
            label: "circ"
        },
        wikiPath: "circ",
        documentation: `
            <code>function circ(x: number, y: number, radius: number, color: number)</code>
            This function draws a filled circle of the desired radius and color with its center at x, y. It uses the Bresenham algorithm.
            ## Parameters
            - *x, y* : the coordinates of the circle's center
            - *radius* : the radius of the circle in pixels
            - *color*: the index of the desired color in the current palette `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function circ(x: number, y: number, radius: number, color: number)",
            parameters: [
                {
                    label: [14,23],
                    documentation: "X coordinates"
                },
                {
                    label: [24,34],
                    documentation: "Y coordinates"
                },
                {
                    label: [35,50],
                    documentation: "Radius of the circle in pixels"
                },
                {
                    label: [51,65],
                    documentation: "Index of the desired color in the current palette"
                }
            ]
        }
    },
    {
        label: {
            label: "circb"
        },
        wikiPath: "circb",
        documentation: `
        <code>function circb(x: number, y: number, radius: number, color: number)</code>
        Draws the circumference of a circle with its center at x, y using the radius and color requested. It uses the Bresenham algorithm.
        ## Parameters
        - *x, y*: the coordinates of the circle's center
        - *radius*: the radius of the circle in pixels
        - *color*: the index of the desired color in the current palette`.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function circb(x: number, y: number, radius: number, color: number)",
            parameters: [
                {
                    label: [15,24],
                    documentation: "X coordinates"
                },
                {
                    label: [25,35],
                    documentation: "Y coordinates"
                },
                {
                    label: [36, 51],
                    documentation: "Radius of the circle in pixels"
                },
                {
                    label: [52,66],
                    documentation: "Index of the desired color in the current palette"
                }
            ]
        }
    },
    {
        label: {
            label: "clip"
        },
        wikiPath: "clip",
        documentation: `
        <code>function clip(x: number, y: number, width: number, height: number)</code>
        This function limits drawing to a clipping region or 'viewport' defined by x,y, width, and height. Any pixels falling outside of this area will not be drawn.
        ## Parameters
        - *x, y* : coordinates of the top left of the clipping region
        - *width* : width of the clipping region in pixels
        - *height* : height of the clipping region in pixels`.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function clip(x: number, y: number, width: number, height: number)",
            parameters: [
                {
                    label: [14,23],
                    documentation: "X coordinates"
                },
                {
                    label: [24,34],
                    documentation: "Y coordinates"
                },
                {
                    label: [35,49],
                    documentation: "Width"
                },
                {
                    label: [50,65],
                    documentation: "Height"
                }
            ]
        }
    },
    {
        label: {
            label: "cls"
        },
        wikiPath: "cls",
        documentation: `
        <code>function cls(color?: number = 0)</code>
        This function clears/fills the entire screen using color. If no parameter is passed, index 0 of the palette is used.
        ## Parameters
        - *color*: The index (0..15) of a color in the current palette`.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function cls(color?: number = 0)",
            parameters: [
                {
                    label: [13,31],
                    documentation: "Index of a color in the current palette"
                }
            ]
        }
    },
    {
        label: {
            label: "elli"
        },
        wikiPath: "elli",
        documentation: `
        <code>function elli(x: number, y: number, a: number, b: number, color: number)</code>
        This function draws a filled ellipse centered at x, y using palette index color and radii a and b. It uses the Bresenham algorithm.
        ## Parameters
        - *x, y*: the coordinates of the ellipse's center
        - *a*: the horizontal radius of the ellipse in pixels
        - *b*: the vertical radius of the ellipse in pixels
        - *color*: the index of the desired color in the current palette`.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function elli(x: number, y: number, a: number, b: number, color: number)",
            parameters: [
                {
                    label: [14,23],
                    documentation: "X coordinates"
                },
                {
                    label: [24,34],
                    documentation: "Y coordinates"
                },
                {
                    label: [35,45],
                    documentation: "Horizontal radius"
                },
                {
                    label: [46,56],
                    documentation: "Vertical radius"
                },
                {
                    label: [57,71],
                    documentation: "Index of a color in the current palette"
                }
            ]
        }
    },
    {
        label: {
            label: "ellib"
        },
        wikiPath: "ellib",
        documentation: `
        <code>function ellib(x: number, y: number, a: number, b: number, color: number)</code>
        This function draws an ellipse border with the radiuses a b and color with its center at x, y. It uses the Bresenham algorithm.
        ## Parameters
        - *x, y*: the coordinates of the ellipse's center
        - *a*: the horizontal radius of the ellipse in pixels
        - *b*: the vertical radius of the ellipse in pixels
        - *color*: the index of the desired color in the current palette`.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function ellib(x: number, y: number, a: number, b: number, color: number)",
            parameters: [
                {
                    label: [15,24],
                    documentation: "X coordinates"
                },
                {
                    label: [25,35],
                    documentation: "Y coordinates"
                },
                {
                    label: [36,46],
                    documentation: "Horizontal radius"
                },
                {
                    label: [47,57],
                    documentation: "Vertical radius"
                },
                {
                    label: [58,72],
                    documentation: "Index of a color in the current palette"
                }
            ]
        }
    },
    {
        label: {
            label: "exit"
        },
        wikiPath: "exit",
        documentation: `
        <code>function exit(): void</code>
        This function causes program execution to be terminated after the current TIC function ends. The entire function is executed, including any code that follows exit(). When the program ends you are returned to the console.`.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function exit(): void",
            documentation: "This function causes program execution to be terminated after the current TIC function ends. The entire function is executed, including any code that follows exit(). When the program ends you are returned to the console.",
            parameters: []
        }
    },
    {
        label: {
            label: "fget"
        },
        wikiPath: "fget",
        documentation: `
        <code>function fget(spriteId: number, flag: number): boolean</code>
        Returns true if the specified flag of the sprite is set. Each sprite has eight flags which can be used to store information or signal different conditions. For example, flag 0 might be used to indicate that the sprite is invisible, flag 6 might indicate that the sprite should be drawn scaled etc.
        ## Parameters
        - *spriteId*: Sprite index (0..511)
        - *flag*: flag index to check
        ## Returns
        - Whether the flag was set`.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function fget(spriteId: number, flag: number): boolean",
            parameters: [
                {
                    label: [14,30],
                    documentation: "Sprite index (0..511)"
                },
                {
                    label: [32,44],
                    documentation: "Flag index to check (0..7)"
                }
            ]
        }
    },
    {
        label: {
            label: "fset"
        },
        wikiPath: "fset",
        documentation: `
        <code>function fset(spriteId: number, flag: number, state: boolean): void</code>
        This function sets the sprite flag to a given boolean value. Each sprite has eight flags which can be used to store information or signal different conditions. For example, flag 0 might be used to indicate that the sprite is invisible, flag 6 might indicate that the sprite should be drawn scaled etc.
        ## Parameters
        - *spriteId*: Sprite index (0..511)
        - *flag*: index of flag (0..7) to set
        - *state*: state to set (true/false)
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function fset(spriteId: number, flag: number, state: boolean): void",
            parameters: [
                {
                    label: [14,30],
                    documentation: "Sprite index (0..511)"
                },
                {
                    label: [32, 44],
                    documentation: "Flag index to check (0..7)"
                },
                {
                    label: [46, 60],
                    documentation: "State to set(true/false)"
                }
            ]
        }
    },
    {
        label: {
            label: "font"
        },
        wikiPath: "font",
        documentation: `
        <code>function font(text: string, x: number, y: number, transcolor?: number, charWidth?: number, charHeight?: number, fixed?: boolean = false, scale?: number = 1): number</code>
        This function will draw text to the screen using the foreground spritesheet as the font. Sprite #256 is used for ASCII code 0, #257 for code 1 and so on
        ## Parameters
        - *text*: Any string to be printedto the screen
        - *x, y*: coordinates for printing the text
        - *transcolor*: The palette index to use for transparency
        - *char width*: distance between start of each character, in pixels
        - *char height*: distance vertically between start of each character, in pixels, when priting multi-line text
        - *fixed*: indicate wheter the font is fixed width
        - *scale*: font scaling (defaults to 1)
        ## Returns
        - *text width*: returns the width of the text in pixels.`.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function font(text: string, x: number, y: number, transcolor?: number, charWidth?: number, charHeight?: number, fixed?: boolean = false, scale?: number = 1): number",
            parameters: [
                {
                    label: [14, 26],
                    documentation: "Any string to be printed to the screen"
                },
                {
                    label: [28, 37],
                    documentation: "X coordinates"
                },
                {
                    label: [39, 48],
                    documentation: "Y coordinates"
                },
                {
                    label: [50, 69],
                    documentation: "The palette index to use for transparency"
                },
                {
                    label: [71,89],
                    documentation: "Distance between start of each character, in pixels"
                },
                {
                    label: [91,110],
                    documentation: "Distance vertically between start of each character, in pixels, when priting multi-line text"
                },
                {
                    label: [112,135],
                    documentation: "Indicate wheter the font is fixed width"
                },
                {
                    label: [137,155],
                    documentation: "Font scaling (defaults to 1)"
                }
            ]
        }
    },
    {
        label: {
            label: "key"
        },
        wikiPath: "key",
        documentation: `
        <code>function key(keyCode?: number): boolean</code>
        The function returns if the key denoted by keycode is pressed, if no keycode is specified
        then will return a boolean value indicating if any key is pressed.
        ## Parameters
        - *keyCode*: The key code to check (1..65), see the table below or type \`help keys\` in console.
        ## Returns
        - *pressed*: key is pressed(true/false)

        ## Keycodes:
        | Letters | Digits | Characters | Edits /<br>Directions | Modifiers /<br>Function Keys | Numeric Keypad |
        |:---:|:---:|:---:|:---:|:---:|:---:|
        | 01 = A | 27 = 0 | 37 = MINUS | 50 = RETURN | 62 = CAPSLOCK | 79 = NUMPAD0 |
        | 02 = B | 28 = 1 | 38 = EQUALS | 51 = BACKSPACE | 63 = CTRL | 80 = NUMPAD1 |
        | 03 = C | 29 = 2 | 39 = LEFTBRACKET | 52 = DELETE | 64 = SHIFT | 81 = NUMPAD2 |
        | 04 = D | 30 = 3 | 40 = RIGHTBRACKET | 53 = INSERT | 65 = ALT | 82 = NUMPAD3 |
        | 05 = E | 31 = 4 | 41 = BACKSLASH |  |  | 83 = NUMPAD4 |
        | 06 = F | 32 = 5 | 42 = SEMICOLON | 54 = PAGEUP | 66 = ESC | 84 = NUMPAD5 |
        | 07 = G | 33 = 6 | 43 = APOSTROPHE | 55 = PAGEDOWN | 67 = F1 | 85 = NUMPAD6 |
        | 08 = H | 34 = 7 | 44 = GRAVE | 56 = HOME | 68 = F2 | 86 = NUMPAD7 |
        | 09 = I | 35 = 8 | 45 = COMMA | 57 = END | 69 = F3 | 87 = NUMPAD8 |
        | 10 = J | 36 = 9 | 46 = PERIOD | 58 = UP | 70 = F4 | 88 = NUMPAD9 |
        | 11 = K |  | 47 = SLASH | 59 = DOWN | 71 = F5 | 89 = NUMPADPLUS |
        | 12 = L |  | 48 = SPACE | 60 = LEFT | 72 = F6 | 90 = NUMPADMINUS |
        | 13 = M |  | 49 = TAB | 61 = RIGHT | 73 = F7 | 91 = NUMPADMULTIPLY |
        | 14 = N |  |  |  | 74 = F8 | 92 = NUMPADDIVIDE |
        | 15 = O |  |  |  | 75 = F9 | 93 = NUMPADENTER |
        | 16 = P |  |  |  | 76 = F10 | 94 = NUMPADPERIOD |
        | 17 = Q |  |  |  | 77 = F11 |  |
        | 18 = R |  |  |  | 78 = F12 |  |
        | 19 = S |  |  |  |  |  |
        | 20 = T |  |  |  |  |  |
        | 21 = U |  |  |  |  |  |
        | 22 = V |  |  |  |  |  |
        | 23 = W |  |  |  |  |  |
        | 24 = X |  |  |  |  |  |
        | 25 = Y |  |  |  |  |  |
        | 26 = Z |  |  |  |  |  |
        `.replace(/    /g, ""), 
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function key(keyCode?: number): boolean",
            parameters: [
                {
                    label: [13,29],
                    documentation: getMarkDownOnly(`
                    | Letters | Digits | Characters | Edits /<br>Directions | Modifiers /<br>Function Keys | Numeric Keypad |
                    |:---:|:---:|:---:|:---:|:---:|:---:|
                    | 01 = A | 27 = 0 | 37 = MINUS | 50 = RETURN | 62 = CAPSLOCK | 79 = NUMPAD0 |
                    | 02 = B | 28 = 1 | 38 = EQUALS | 51 = BACKSPACE | 63 = CTRL | 80 = NUMPAD1 |
                    | 03 = C | 29 = 2 | 39 = LEFTBRACKET | 52 = DELETE | 64 = SHIFT | 81 = NUMPAD2 |
                    | 04 = D | 30 = 3 | 40 = RIGHTBRACKET | 53 = INSERT | 65 = ALT | 82 = NUMPAD3 |
                    | 05 = E | 31 = 4 | 41 = BACKSLASH |  |  | 83 = NUMPAD4 |
                    | 06 = F | 32 = 5 | 42 = SEMICOLON | 54 = PAGEUP | 66 = ESC | 84 = NUMPAD5 |
                    | 07 = G | 33 = 6 | 43 = APOSTROPHE | 55 = PAGEDOWN | 67 = F1 | 85 = NUMPAD6 |
                    | 08 = H | 34 = 7 | 44 = GRAVE | 56 = HOME | 68 = F2 | 86 = NUMPAD7 |
                    | 09 = I | 35 = 8 | 45 = COMMA | 57 = END | 69 = F3 | 87 = NUMPAD8 |
                    | 10 = J | 36 = 9 | 46 = PERIOD | 58 = UP | 70 = F4 | 88 = NUMPAD9 |
                    | 11 = K |  | 47 = SLASH | 59 = DOWN | 71 = F5 | 89 = NUMPADPLUS |
                    | 12 = L |  | 48 = SPACE | 60 = LEFT | 72 = F6 | 90 = NUMPADMINUS |
                    | 13 = M |  | 49 = TAB | 61 = RIGHT | 73 = F7 | 91 = NUMPADMULTIPLY |
                    | 14 = N |  |  |  | 74 = F8 | 92 = NUMPADDIVIDE |
                    | 15 = O |  |  |  | 75 = F9 | 93 = NUMPADENTER |
                    | 16 = P |  |  |  | 76 = F10 | 94 = NUMPADPERIOD |
                    | 17 = Q |  |  |  | 77 = F11 |  |
                    | 18 = R |  |  |  | 78 = F12 |  |
                    | 19 = S |  |  |  |  |  |
                    | 20 = T |  |  |  |  |  |
                    | 21 = U |  |  |  |  |  |
                    | 22 = V |  |  |  |  |  |
                    | 23 = W |  |  |  |  |  |
                    | 24 = X |  |  |  |  |  |
                    | 25 = Y |  |  |  |  |  |
                    | 26 = Z |  |  |  |  |  |`.replace(/    /g, ""))
                }
            ]
        }
    },
    {
        label: {
            label: "keyp"
        },
        wikiPath: "keyp",
        documentation: `
        <code>function key(keyCode?: number, hold?: number, period?: number): boolean</code>
        This function returns true if the given key is pressed but wasn't pressed in the previous frame. 
        If no keycode is specified, it will return true if any key is pressed but wasn't in the previous frame.
        Refer to [btnp](${getWikiUrl("btnp")}) for an explanation of the optional hold and period parameters.
        ## Parameters
        - *keyCode*: The key code to check (1..65), see the table below or type \`help keys\` in console.
        - *hold*: Time in ticks before auto-repeat
        - *period*: Time in ticks for auto-repeat interval
        ## Returns
        - *pressed*: key is pressed(true/false)

        ## Keycodes:
        | Letters | Digits | Characters | Edits /<br>Directions | Modifiers /<br>Function Keys | Numeric Keypad |
        |:---:|:---:|:---:|:---:|:---:|:---:|
        | 01 = A | 27 = 0 | 37 = MINUS | 50 = RETURN | 62 = CAPSLOCK | 79 = NUMPAD0 |
        | 02 = B | 28 = 1 | 38 = EQUALS | 51 = BACKSPACE | 63 = CTRL | 80 = NUMPAD1 |
        | 03 = C | 29 = 2 | 39 = LEFTBRACKET | 52 = DELETE | 64 = SHIFT | 81 = NUMPAD2 |
        | 04 = D | 30 = 3 | 40 = RIGHTBRACKET | 53 = INSERT | 65 = ALT | 82 = NUMPAD3 |
        | 05 = E | 31 = 4 | 41 = BACKSLASH |  |  | 83 = NUMPAD4 |
        | 06 = F | 32 = 5 | 42 = SEMICOLON | 54 = PAGEUP | 66 = ESC | 84 = NUMPAD5 |
        | 07 = G | 33 = 6 | 43 = APOSTROPHE | 55 = PAGEDOWN | 67 = F1 | 85 = NUMPAD6 |
        | 08 = H | 34 = 7 | 44 = GRAVE | 56 = HOME | 68 = F2 | 86 = NUMPAD7 |
        | 09 = I | 35 = 8 | 45 = COMMA | 57 = END | 69 = F3 | 87 = NUMPAD8 |
        | 10 = J | 36 = 9 | 46 = PERIOD | 58 = UP | 70 = F4 | 88 = NUMPAD9 |
        | 11 = K |  | 47 = SLASH | 59 = DOWN | 71 = F5 | 89 = NUMPADPLUS |
        | 12 = L |  | 48 = SPACE | 60 = LEFT | 72 = F6 | 90 = NUMPADMINUS |
        | 13 = M |  | 49 = TAB | 61 = RIGHT | 73 = F7 | 91 = NUMPADMULTIPLY |
        | 14 = N |  |  |  | 74 = F8 | 92 = NUMPADDIVIDE |
        | 15 = O |  |  |  | 75 = F9 | 93 = NUMPADENTER |
        | 16 = P |  |  |  | 76 = F10 | 94 = NUMPADPERIOD |
        | 17 = Q |  |  |  | 77 = F11 |  |
        | 18 = R |  |  |  | 78 = F12 |  |
        | 19 = S |  |  |  |  |  |
        | 20 = T |  |  |  |  |  |
        | 21 = U |  |  |  |  |  |
        | 22 = V |  |  |  |  |  |
        | 23 = W |  |  |  |  |  |
        | 24 = X |  |  |  |  |  |
        | 25 = Y |  |  |  |  |  |
        | 26 = Z |  |  |  |  |  |
        `.replace(/    /g, ""), 
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function key(keyCode?: number, hold?: number, period?: number): boolean",
            parameters: [
                {
                    label: [13,29],
                    documentation: getMarkDownOnly(`
                    | Letters | Digits | Characters | Edits /<br>Directions | Modifiers /<br>Function Keys | Numeric Keypad |
                    |:---:|:---:|:---:|:---:|:---:|:---:|
                    | 01 = A | 27 = 0 | 37 = MINUS | 50 = RETURN | 62 = CAPSLOCK | 79 = NUMPAD0 |
                    | 02 = B | 28 = 1 | 38 = EQUALS | 51 = BACKSPACE | 63 = CTRL | 80 = NUMPAD1 |
                    | 03 = C | 29 = 2 | 39 = LEFTBRACKET | 52 = DELETE | 64 = SHIFT | 81 = NUMPAD2 |
                    | 04 = D | 30 = 3 | 40 = RIGHTBRACKET | 53 = INSERT | 65 = ALT | 82 = NUMPAD3 |
                    | 05 = E | 31 = 4 | 41 = BACKSLASH |  |  | 83 = NUMPAD4 |
                    | 06 = F | 32 = 5 | 42 = SEMICOLON | 54 = PAGEUP | 66 = ESC | 84 = NUMPAD5 |
                    | 07 = G | 33 = 6 | 43 = APOSTROPHE | 55 = PAGEDOWN | 67 = F1 | 85 = NUMPAD6 |
                    | 08 = H | 34 = 7 | 44 = GRAVE | 56 = HOME | 68 = F2 | 86 = NUMPAD7 |
                    | 09 = I | 35 = 8 | 45 = COMMA | 57 = END | 69 = F3 | 87 = NUMPAD8 |
                    | 10 = J | 36 = 9 | 46 = PERIOD | 58 = UP | 70 = F4 | 88 = NUMPAD9 |
                    | 11 = K |  | 47 = SLASH | 59 = DOWN | 71 = F5 | 89 = NUMPADPLUS |
                    | 12 = L |  | 48 = SPACE | 60 = LEFT | 72 = F6 | 90 = NUMPADMINUS |
                    | 13 = M |  | 49 = TAB | 61 = RIGHT | 73 = F7 | 91 = NUMPADMULTIPLY |
                    | 14 = N |  |  |  | 74 = F8 | 92 = NUMPADDIVIDE |
                    | 15 = O |  |  |  | 75 = F9 | 93 = NUMPADENTER |
                    | 16 = P |  |  |  | 76 = F10 | 94 = NUMPADPERIOD |
                    | 17 = Q |  |  |  | 77 = F11 |  |
                    | 18 = R |  |  |  | 78 = F12 |  |
                    | 19 = S |  |  |  |  |  |
                    | 20 = T |  |  |  |  |  |
                    | 21 = U |  |  |  |  |  |
                    | 22 = V |  |  |  |  |  |
                    | 23 = W |  |  |  |  |  |
                    | 24 = X |  |  |  |  |  |
                    | 25 = Y |  |  |  |  |  |
                    | 26 = Z |  |  |  |  |  |`.replace(/    /g, ""))
                },
                {
                    label: [30, 44],
                    documentation: "Time in ticks before auto-repeat"
                },
                {
                    label: [45,61],
                    documentation: "Time in ticks for auto-repeat interval"
                }
            ]
        }
    },
    {
        label: {
            label: "line"
        },
        wikiPath: "line",
        documentation: `
        <code>function line(x0: number, y0: number, x1: number, y1: number, color: number): void</code>
        Draws a straight line from point (x0,y0) to point (x1,y1) in the specified color.
        ## Parameters
        - *x0, y0*: The coordinates of the start of the line
        - *x1, y1*: The coordinates of the end of the line
        - *color*: The index of the desired color in the current palette
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function line(x0: number, y0: number, x1: number, y1: number, color: number): void",
            parameters: [
                {
                    label: [14,24],
                    documentation: "X coordinate of the start"
                },
                {
                    label: [25,36],
                    documentation: "X coordinate of the start"
                },
                {
                    label: [37,48],
                    documentation: "X coordinate of the end"
                },
                {
                    label: [49,60],
                    documentation: "Y coordinate of the end"
                },
                {
                    label: [61,75],
                    documentation: "Index of the desired color in the current palette"
                }
            ]
        }
    },
    {
        label: {
            label: "map"
        },
        wikiPath: "map",
        documentation: `
        <code>function map(x: number = 0,y: number = 0, width: number = 0, height: number = 17, screenX: number = 0, screenY = 0, colorKey: number | number[] = -1, scale: number = 1, remap?: Callback): void</code>
        This function will draw the desired area of the map to a specified screen position.
        ## Parameters
        - *x, y*: The coordinates of the top left map cell to be drawn.
        - *width, height*: Numbers of cells to draw horizontally and vertically.
        - *screenX, screenY*: The screen coordinates where drawing of the map section will start.
        - *colorKey*: The palette index or array of index to use for transparency.
        - *scale*: Map scaling
        - *remap*: An optional function called before every tile draw.
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function map(x: number = 0,y: number = 0, width: number = 0, height: number = 17, screenX: number = 0, screenY = 0, colorKey: number | number[] = -1, scale: number = 1, remap?: Callback): void",
            parameters: [
                {
                    label: [13,26],
                    documentation: "Map x coordinates"
                },
                {
                    label: [27,40],
                    documentation: "Map y coordinates"
                },
                {
                    label: [41,59],
                    documentation: "Width"
                },
                {
                    label: [60,80],
                    documentation: "Height"
                },
                {
                    label: [81,101],
                    documentation: "X coordinates"
                },
                {
                    label: [102,114],
                    documentation: "Y coordinates"
                },
                {
                    label: [115,148],
                    documentation: "The palette index or array of index to use for transparency"
                },
                {
                    label: [150,167],
                    documentation: "Map scale 1"
                },
                {
                    label: [169,185],
                    documentation: "Function called for every tile before draw"
                }
            ]
        }
    },
    {
        label: {
            label: "memcpy"
        },
        wikiPath: "memcpy",
        documentation: `
        <code>function memcpy(to: number, from: number, length: number): void</code>
        This function copies a continuous block of RAM from one address to another. Addresses are specified in hexadecimal format, values are decimal.
        ## Parameters
        - *to*: The address you want to write to
        - *from*: The address you want to copy from
        - *length*: The length of the memory block you want to copy (in bytes)
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function memcpy(to: number, from: number, length: number): void",
            parameters: [
                {
                    label: [16,26],
                    documentation: "The address that will be written"
                },
                {
                    label: [27,40],
                    documentation: "The address that will be copied"
                },
                {
                    label: [41,56],
                    documentation: "The length of memory block you want to copy"
                }
            ]
        }
    },
    {
        label: {
            label: "memset"
        },
        wikiPath: "memset",
        documentation: `
        <code>function memset(addr: number, value: number, length: number): void</code>
        This function sets a continuous block of RAM to the same value. The address is specified in hexadecimal format, the value in decimal.
        ## Parameters
        - *addr*: The address of the first byte of RAM you want to write to
        - *value*: The value you want to write (0..255)
        - *length*: The length of the memory block you want to set
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function memset(addr: number, value: number, length: number): void",
            parameters: [
                {
                    label: [16,28],
                    documentation: "The start of the address that you want to write"
                },
                {
                    label: [29,43],
                    documentation: "The value you want to write (0..255)"
                },
                {
                    label: [44,59],
                    documentation: "The length of the memory block you want to set"
                }
            ]
        }
    },
    {
        label: {
            label: "mget"
        },
        wikiPath: "mget",
        documentation: `
        <code>function mget(x: number, y: number): number</code>
        This function returns the index of the tile at the specified map coordinates
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function mget(x: number, y: number): number",
            parameters: [
                {
                    label: [14,23],
                    documentation: "X coordinates"
                },
                {
                    label: [24,34],
                    documentation: "Y coordinates"
                }
            ]
        }
    },
    {
        label: {
            label: "mset"
        },
        wikiPath: "mset",
        documentation: `
        <code>function mset(x: number, y: number, tileId: number): void</code>
        This function writes the specified background tile tile_id into the map at the given position. By default, changes to the map are lost when execution ends but they can be made permanent using [sync](${getWikiUrl("sync")})
        ## Parameters
        - *x, y*: Map coordinates
        - *tileId*: Tile index (0-255)
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function mset(x: number, y: number, tileId: number): void",
            parameters: [
                {
                    label: [14,23],
                    documentation: "X coordinates"
                },
                {
                    label: [24,34],
                    documentation: "Y coordinates"
                },
                {
                    label: [35,50],
                    documentation: "Tile index (0-255)"
                }
            ]
        }
    },
    {
        label: {
            label: "mouse"
        },
        wikiPath: "mouse",
        documentation: `
        <code>function mouse(): [x, y, left, middle, right, scrollX, scrollY]</code>
        This function returns the mouse coordinates, a boolean value for the state of each mouse button (with true indicating that a button is pressed) and any change in the scroll wheel. Note that scrollx values are only returned for devices with a second scroll wheel, trackball etc.
        ## Returns
        - *x, y*: Coordinates of the mouse pointer
        - *left*: State of Left Button (true/false)
        - *middle*: State of Middle button (true/false)
        - *right*: State of Right button (true/false)
        - *scrollX*: X scroll delta since last frame (-31..32)
        - *scrollY*: Y scroll delta since last frame (-31..32)
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function mouse(): [x, y, left, middle, right, scrollX, scrollY]",
            parameters: []
        }
    },
    {
        label: {
            label: "music"
        },
        wikiPath: "music",
        documentation: `
        <code>function music(track?: number -1, frame?: number = -1, loop?: boolean = true, sustain?: boolean = false, tempo?: number = -1, speed?: number = -1): void</code>
        This function starts playing a track created in the [Music Editor](${getWikiUrl("Music-Editor")}), if no arg is passed the function will stop any music playing.
        ## Parameters
        - *track*: The id of the track to play (0..7)
        - *frame*: The index of the frame to play from (0..15)
        - *row*: The index of the row to play from (0..63)
        - *loop*: Loop music (true) or play it once (false)
        - *sustain*: Sustain notes after the end of each frame or stop them (true/false)
        - *tempo*: Play track with the specified tempo
        - *speed*: Play track with the specified speed
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function music(track?: number -1, frame?: number = -1, loop?: boolean = true, sustain?: boolean = false, tempo?: number = -1, speed?: number = -1): void",
            parameters: [
                {
                    label: [15,32],
                    documentation: "Id of the track to play (0..7)"
                },
                {
                    label: [33,53],
                    documentation: "Index of the frame to play (0..15)"
                },
                {
                    label: [54,76],
                    documentation: "If false it will play only once"
                },
                {
                    label: [77,103],
                    documentation: "Sustain notes after the end of each frame or stop them (true/false)"
                },
                {
                    label: [104,124],
                    documentation: "Play track with the specified tempo"
                },
                {
                    label: [125,145],
                    documentation: "Play track with the specified speed"
                }
            ]
        }
    },
    {
        label: {
            label: "pix"
        },
        wikiPath: "pix",
        documentation: `
        <code>function pix(x: number, y: number, color?: number): number | void</code>
        This function can read or write individual pixel color values. When called with a color argument, the pixel at the specified coordinates is set to that color. When called with only *x* *y* arguments, the color of the pixel at the specified coordinates is returned.
        ## Parameters:
        - *x, y*: Coordinates of the pixel
        - *color*: The index (0..15) of a color in the current palette
        ## Returns
        - *color*: The index (0..15) of a color in the current palette
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function pix(x: number, y: number, color?: number): number | void",
            parameters: [
                {
                    label: [13,22],
                    documentation: "X coordinates"
                },
                {
                    label: [23,33],
                    documentation: "Y coordinates"
                },
                {
                    label: [34,49],
                    documentation: "Index of a color in the current palette"
                }
            ]
        }
    },
    {
        label: {
            label: "pmem"
        },
        wikiPath: "pmem",
        documentation: `
        <code>function pmem(index: number, val32?: number): number</code>
        The name "pmem" means persistent memory. This function allows you to save and retrieve data in one of the 256 individual 32-bit slots available in the cartridge's persistent memory. This is useful for saving high-scores, level advancement or achievements. Data is stored as unsigned 32-bit integer (i.e. in the range 0 to 4294967295).

        When writing a new value, the previous value is returned.
        ## Parameters
        - *index*: an index (0.255) into the persistent memory of a cartridge
        - *val32*: the 32-bit integer value you want to store. Omit this parameters to read.
        ## Returns
        - *val32*: the current/prior value saved to the specified memory slot.
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function pmem(index: number, val32?: number): number",
            parameters: [
                {
                    label: [14,27],
                    documentation: "Index (0..255) into the persistent memory of a cartridge"
                },
                {
                    label: [28,43],
                    documentation: "val32?: number"
                }
            ]
        }
    },
    {
        label: {
            label: "print",
        },
        wikiPath: "print",
        documentation: `
        <code>function print(text: string, x: number = 0, y: number = 0, color: number = 15, fixed: boolean = false, scale: number = 1, smallfont: boolean = false): number</code>
        ## Parameters
        - *text*: any string to be printed to the screen
        - *x, y*: coordinates for printing the text
        - *color*: the color to use to draw the text to the screen
        - *fixed*: a flag indicating whether fixed width printing is required
        - *scale*: font scaling
        - *smallfont* : use small font if true
        ## Returns
        - *text width*: returns the width of the text in pixels.`.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function print(text: string, x: number = 0, y: number = 0, color: number = 15, fixed: boolean = false, scale: number = 1, smallfont: boolean = false): number",
            parameters: [
                {
                    label: [15,27],
                    documentation: "Any string to be printed to the screen"
                },
                {
                    label: [29,42],
                    documentation: "X coordinates"
                },
                {
                    label: [44,57],
                    documentation: "Y coordinates"
                },
                {
                    label: [59,77],
                    documentation: "The color to use to draw the text to the screen"
                },
                {
                    label: [79,101],
                    documentation: "A flag indicating whether fixed width printing is required"
                },
                {
                    label: [103,120],
                    documentation: "Font scaling value"
                },
                {
                    label: [122,148],
                    documentation: "use small font if true"
                }
            ]
        }
    },
    {
        label: {
            label: "rect"
        },
        wikiPath: "rect",
        documentation: `
        <code>function rect(x: number, y: number, width: number, height: number, color: number): void</code>
        This function draws a filled rectangle at the specified position.

        ## Parameters
        - *x, y*: Coordinates of the top left corner of the rectangle
        - *width*: The width the rectangle in pixels
        - *height*: The height of the rectangle in pixels
        - *color* : The index (0..15) of a color in the current palette
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function rect(x: number, y: number, width: number, height: number, color: number): void",
            parameters: [
                {
                    label: [14,23],
                    documentation: "X coordinates"
                },
                {
                    label: [24,34],
                    documentation: "Y coordinates"
                },
                {
                    label: [35,49],
                    documentation: "Width"
                },
                {
                    label: [50,65],
                    documentation: "Height"
                },
                {
                    label: [66,80],
                    documentation: "The index (0..15) of a color in the current palette"
                }
            ]
        }
    },
    {
        label: {
            label: "rectb"
        },
        wikiPath: "rectb",
        documentation: `
        <code>function rectb(x: number, y: number, width: number, height: number, color: number): void</code>
        This function draws a one pixel thick rectangle border.
        ## Parameters
        - *x, y*: Coordinates of the top left corner of the rectangle
        - *width*: The width the rectangle in pixels
        - *height*: The height of the rectangle in pixels
        - *color* : The index (0..15) of a color in the current palette
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function rectb(x: number, y: number, width: number, height: number, color: number): void",
            parameters: [
                {
                    label: [14,23],
                    documentation: "X coordinates"
                },
                {
                    label: [24,34],
                    documentation: "Y coordinates"
                },
                {
                    label: [35,49],
                    documentation: "Width"
                },
                {
                    label: [50,65],
                    documentation: "Height"
                },
                {
                    label: [66,80],
                    documentation: "The index (0..15) of a color in the current palette"
                }
            ]
        }
    },
    {
        label: {
            label: "reset"
        },
        wikiPath: "reset",
        documentation: `
        <code>function reset(): void</code>
        Resets the TIC virtual "hardware" and immediately restarts the cartridge.

        To simply return to the console, please use [exi]t(${getWikiUrl("exit")}).
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function reset(): void",
            parameters: []
        }
    },
    {
        label: {
            label: "sfx"
        },
        wikiPath: "sfx",
        documentation: `
        <code>function sfx(id: number, note?: number = -1, duration?: number = -1, channel?: number, volume?: number = 15, speed?: number = 0): void</code>
        This function will play the sound with id created in the SFX Editor. Calling the function with an id of -1 will stop playing a channel: sfx(-1) stops the default channel (0), sfx(-1, nil, nil, n) stops playing channel 'n'.

        The note can be supplied as an integer between 0 and 95 (representing 8 octaves of 12 notes each) or as a string giving the note name and octave. For example, a note value of '14' will play the note 'D' in the second octave. The same note could be specified by the string 'D-2'. Note names consist of two characters, the note itself (in upper case) followed by '-' to represent the natural note or '#' to represent a sharp. There is no option to indicate flat values. The available note names are therefore: C-, C#, D-, D#, E-, F-, F#, G-, G#, A-, A#, B-. The octave is specified using a single digit in the range 0 to 8.

        The duration specifies how many ticks to play the sound for; since TIC-80 runs at 60 frames per second, a value of 30 represents half a second. A value of -1 will play the sound continuously.

        The channel parameter indicates which of the four channels (0 to 3) to use.

        Volume can be set within the range 0 to 15.

        Speed in the range -4 to 3 specifies the speed at which the SFX envelope is traversed and corresponds with the speed setting in the SFX Editor.
        ## Parameters
        - *id*: The SFX id (0..63) or -1 to stop playing
        - *note*: The note number or name (see below) or -1 to play the last note note assigned in the SFX Editor
        - *duration*: The duration (number of frames) or -1 to play continuously
        - *channel*: The audio channel to use (0..3)
        - *volume*: The volume (0..15)
        - *speed*: The speed (-4..3)
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function sfx(id: number, note?: number = -1, duration?: number = -1, channel?: number, volume?: number = 15, speed?: number = 0): void",
            parameters: [
                {
                    label: [13,23],
                    documentation: " The SFX id (0..63) or -1 to stop playing"
                },
                {
                    label: [24,43],
                    documentation: "The note number or name (see below) or -1 to play the last note note assigned in the SFX Editor"
                },
                {
                    label: [44,67],
                    documentation: "The duration (number of frames) or -1 to play continuously"
                },
                {
                    label: [68,85],
                    documentation: "The audio channel to use (0..3)"
                },
                {
                    label: [86,107],
                    documentation: "The volume (0..15)"
                },
                {
                    label: [108,127],
                    documentation: "The speed (-4..3)"
                }
            ]
        }
    },
    {
        label: {
            label: "spr"
        },
        wikiPath: "spr",
        documentation: `
        <code>function spr(id: number, x: number, y: number, colorKey?: number = -1, scale?: number = 1, flip?: number = 0, rotate?: number = 0, width?: number = 1, height?: number = 1): void</code>
        Draws the sprite number index at the x and y coordinate.
        You can specify a colorKey in the palette which will be used as the transparent color or use a value of -1 for an opaque sprite.
        The sprite can be scaled up by a desired factor. For example, a scale factor of 2 means an 8x8 pixel sprite is drawn to a 16x16 area of the screen.

        ## Parameters
        - *id*: Index of the sprite (0..511)
        - *x, y*: Coordinates of the top left corner of the sprite.
        - *colorKey*: The palette index or array of index to use for transparency..
        - *scale*: Sprite scale factor.
        - *flip*: Flip the sprite vertically or horizontally or both.
        - *rotate*: Rotate the sprite by 0, 90, 180 or 270 degrees.
        - *width*: Width of composite sprite
        - *height*: Height of composite sprite
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function spr(id: number, x: number, y: number, colorKey?: number = -1, scale?: number = 1, flip?: number = 0, rotate?: number = 0, width?: number = 1, height?: number = 1): void",
            parameters: [
                {
                    label: [13,23],
                    documentation: "Index of the sprite (0..511)"
                },
                {
                    label: [24,34],
                    documentation: "X coordinates"
                },
                {
                    label: [35,45],
                    documentation: "Y coordinates"
                },
                {
                    label: [46,69],
                    documentation: "The palette index or array of index to use for transparency"
                },
                {
                    label: [70,89],
                    documentation: "Sprite scale factor"
                },
                {
                    label: [90,108],
                    documentation: getMarkDownOnly(`
                        Flip the sprite vertically or horizontally or both.

                        Possible values:
                        - 0 = No Flip
                        - 1 = Flip horizontally
                        - 2 = Flip vertically
                        - 3 = Flip both vertically and horizontally
                    `.replace(/    /g, ""))
                },
                {
                    label: [109,129],
                    documentation: getMarkDownOnly(`
                    Rotate the sprite by 0, 90, 180 or 270 degrees.

                    Possible values:
                    - 0 = No rotation
                    - 1 = 90° rotation
                    - 2 = 180° rotation
                    - 3 = 270° rotation
                `.replace(/    /g, ""))
                },
                {
                    label: [130,149],
                    documentation: "Width of sprite"
                },
                {
                    label: [150,170],
                    documentation: "Height of sprite"
                }
            ]
        }
    },
    {
        label: {
            label: "sync"
        },
        wikiPath: "sync",
        documentation: `
        <code>function sync(mask: number = 0, bank: number = 0, toCart: boolean = false): void</code>
        Use sync() to save data you modify during runtime and would like to persist, or to restore runtime data from the cartridge. For example, if you have manipulated the runtime memory (e.g. by using mset), you can reset the active state by calling sync(0,0,false). This resets the whole of runtime memory to the contents of bank 0.
        
        Note that sync is never used to load code from banks; this is done automatically. All data is restored from cartridge on every startup.
        ## Parameters
        - *mask*: Mask of sections you want to switch
        - *bank*: memory bank (0..7)
        - *toCart*: If true save memory from runtime to bank/cartridge else load data from bank to runtime
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function sync(mask: number = 0, bank: number = 0, toCart: boolean = false): void",
            parameters: [
                {
                    label: [14,30],
                    documentation: getMarkDownOnly(`
                    The mask of sections you want to switch:
                    \`\`\`javascript
                    tiles   = 1<<0 -- 1
                    sprites = 1<<1 -- 2
                    map     = 1<<2 -- 4
                    sfx     = 1<<3 -- 8
                    music   = 1<<4 -- 16
                    palette = 1<<5 -- 32
                    flags   = 1<<6 -- 64
                    screen  = 1<<7 -- 128 (as of 0.90)
                    \`\`\``.replace(/    /g, ""))
                },
                {
                    label: [31,48],
                    documentation: "Memory bank (0..7)"
                },
                {
                    label: [49,73],
                    documentation: "If true save memory from runtime to bank/cartridge else load data from bank to runtime"
                }
            ]
        }
    },
    {
        label: {
            label: "ttri"
        },
        wikiPath: "ttri",
        documentation: `
        <code>function ttri(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, u1: number, v1: number, u2: number, v2: number, u3: number, textSrc?: number = 0, chromaKey?: number = -1, z1: number = 0, z2: number = 0, z3: number = 0): void</code>
        This function draws a triangle filled with texture from either SPRITES or MAP RAM or VBANK.
        ## Parameters
        - *x1, y1*: The coordinates of the first corner
        - *x2, y2*: The coordinates of the second corner
        - *x3, y3*: The coordinates of the third corner
        - *u1, v1*: The UV coordinates of the first corner
        - *u2, v2*: The UV coordinates of the second corner
        - *u3, v3*: The UV coordinates of the third corner
        - *texsrc*: If 0 (default), the triangle's texture is read from SPRITES RAM. If 1, the texture comes from the MAP RAM.
          If 2, the texture comes from the screen RAM in the next VBANK (the one following the VBANK on which the ttri() is set to be displayed) (e.g., a ttri() on vbank(0) with the texsrc=2 will use vbank(1) as its texture at the time of its execution). Although there is technically no vbank(2), this can be used on a ttri() with texsrc=2 that's rendered on vbank(1).
        - *chromaKey*: The palette index or array of index to use for transparency
        - *z1, z2, z3*: Depth parameters for texture correction
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function ttri(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, u1: number, v1: number, u2: number, v2: number, u3: number, v3: number, textSrc?: number = 0, chromaKey?: number = -1, z1: number = 0, z2: number = 0, z3: number = 0): void",
            parameters: [
                {
                    label: [14,24],
                    documentation: "The X coordinates of the first corner"
                },
                {
                    label: [25,36],
                    documentation: "The Y coordinates of the first corner"
                },
                {
                    label: [37,48],
                    documentation: "The X coordinates of the second corner"
                },
                {
                    label: [49,60],
                    documentation: "The Y coordinates of the second corner"
                },
                {
                    label: [61,72],
                    documentation: "The X coordinates of the third corner"
                },
                {
                    label: [73,84],
                    documentation: "The Y coordinates of the third corner"
                },
                {
                    label: [85,96],
                    documentation: "The UV coordinates of the first corner"
                },
                {
                    label: [97,108],
                    documentation: "The UV coordinates of the first corner"
                },
                {
                    label: [109,120],
                    documentation: "The UV coordinates of the second corner"
                },
                {
                    label: [121,132],
                    documentation: "The UV coordinates of the second corner"
                },
                {
                    label: [133,144],
                    documentation: "The UV coordinates of the third corner"
                },
                {
                    label: [145,156],
                    documentation: "The UV coordinates of the third corner"
                },
                {
                    label: [157,178],
                    documentation: "If 0 (default), the triangle's texture is read from SPRITES RAM. If 1, the texture comes from the MAP RAM. If 2, the texture comes from the screen RAM in the next VBANK (the one following the VBANK on which the ttri() is set to be displayed) (e.g., a ttri() on vbank(0) with the texsrc=2 will use vbank(1) as its texture at the time of its execution). Although there is technically no vbank(2), this can be used on a ttri() with texsrc=2 that's rendered on vbank(1)."
                },
                {
                    label: [179,203],
                    documentation: "The palette index or array of index to use for transparency"
                },
                {
                    label: [204,219],
                    documentation: "Depth parameters for texture correction"
                },
                {
                    label: [220,235],
                    documentation: "Depth parameters for texture correction"
                },
                {
                    label: [236,251],
                    documentation: "Depth parameters for texture correction"
                }
            ]
        }
    },
    {
        label: {
            label: "time"
        },
        wikiPath: "time",
        documentation: `
        <code>function time(): number</code>
        This function returns the number of milliseconds elapsed since the cartridge began execution. Useful for keeping track of time, animating items and triggering events.
        ## Returns
        - *ticks*: The number of milliseconds elapsed since the game was started
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function time(): number",
            parameters: [
            ]
        }
    },
    {
        label: {
            label: "trace"
        },
        wikiPath: "trace",
        documentation: `
        <code>function trace(message: string, color: number = 15): void</code>
        This is a service function, useful for debugging. It prints the supplied string or variable to the console in the (optional) color specified.
        ## Parameters
        - *message*: The string to print
        - *color*: The index (0..15) of a color in the current palette
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function trace(message: string, color: number = 15): void",
            parameters: [
                {
                    label: [15,30],
                    documentation: "The string to print"
                },
                {
                    label: [31,50],
                    documentation: "The index (0..15) of a color in the current palette"
                }
            ]
        }
    },
    {
        label: {
            label: "tri"
        },
        wikiPath: "tri",
        documentation: `
        <code>function tri(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number): void</code>
        This function draws a triangle filled with *color*, using the supplied vertices.
        ## Parameters
        - *x1, y1*: The coordinates of the first triangle corner
        - *x2, y2*: The coordinates of the second corner
        - *x3, y3*: The coordinates of the third corner
        - *color*: The index (0..15) of a color in the current palette
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function tri(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number): void",
            parameters: [
                {
                    label: [13,23],
                    documentation: "X coordinates of first corner"
                },
                {
                    label: [24,35],
                    documentation: "Y coordinates of first corner"
                },
                {
                    label: [36,47],
                    documentation: "X coordinates of second corner"
                },
                {
                    label: [48,59],
                    documentation: "Y coordinates of second corner"
                },
                {
                    label: [60,71],
                    documentation: "X coordinates of third corner"
                },
                {
                    label: [72,83],
                    documentation: "Y coordinates of third corner"
                },
                {
                    label: [84,98],
                    documentation: "The index (0..15) of a color in the current palette"
                }
            ]
        }
    },
    {
        label: {
            label: "trib"
        },
        wikiPath: "trib",
        documentation: `
        <code>function trib(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number): void</code>
        This function draws a triangle border with color, using the supplied vertices.
        ## Paramters
        - *x1, y1*: The coordinates of the first triangle corner
        - *x2, y2*: The coordinates of the second corner
        - *x3, y3*: The coordinates of the third corner
        - *color*: The index (0..15) of a color in the current palette
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function trib(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number): void",
            parameters: [
                {
                    label: [14,24],
                    documentation: "X coordinates of first corner"
                },
                {
                    label: [25,36],
                    documentation: "Y coordinates of first corner"
                },
                {
                    label: [37,48],
                    documentation: "X coordinates of second corner"
                },
                {
                    label: [49,60],
                    documentation: "Y coordinates of second corner"
                },
                {
                    label: [62,72],
                    documentation: "X coordinates of third corner"
                },
                {
                    label: [73,84],
                    documentation: "Y coordinates of third corner"
                },
                {
                    label: [85,99],
                    documentation: "The index (0..15) of a color in the current palette"
                }
            ]
        }
    },
    {
        label: {
            label: "tstamp"
        },
        wikiPath: "tstamp",
        documentation: `
        <code>function tstamp(): number</code>
        This function returns the number of seconds elapsed since January 1st, 1970. This can be quite useful for creating persistent games which evolve over time between plays.
        ## Returns
        - *timestamp*: The current Unix timestamp in seconds
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function tstamp(): number",
            parameters: []
        }
    },
    {
        label: {
            label: "vbank"
        },
        wikiPath: "vbank",
        documentation: `
        <code>function vbank(bankId: number): void</code>
        VRAM is double-banked, such that the entire 16kb VRAM address space can be "swapped" at any time between banks 0 and 1. This is most commonly used for layering effects (background vs foreground layers, or a HUD that sits overtop of your main gameplay area, etc).
        ## Paramters
        - *id*: The VRAM bank ID to switch to (0 or 1)
        `.replace(/    /g, ""),
        type: vscode.CompletionItemKind.Function,
        signature: {
            label: "function vbank(bankId: number): void",
            parameters: [
                {
                    label: [15,29],
                    documentation: "The VRAM bank ID to switch to (0 or 1)"
                }
            ]
        }
    },
]

const addWikiReference = (runtimeType: RuntimeType): RuntimeType => {
    runtimeType.documentation += `\n\n [TIC-80 Wiki Reference](${getWikiUrl(runtimeType.wikiPath)})`;

    return runtimeType
}

const addTicRuntimeDetail = (runtimeType: RuntimeType): RuntimeType => {
    runtimeType.label.description = "Tic-80 Runtime"

    return runtimeType
}


export const runtimeTypes = rawRuntimeTypes
    .map(addWikiReference)
    .map(addTicRuntimeDetail)