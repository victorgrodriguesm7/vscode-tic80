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
        This function allows you to read the status of TIC's controller buttons. It returns true if the button with the supplied id is currently in the pressed state and remains true for as long as the button is held down. To see if a button was just pressed, use btnp instead.
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