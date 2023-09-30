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
        - *color*: index (0..15) of a color in the current palette`.replace(/    /g, ""),
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