import * as vscode from 'vscode';

interface GetMarkDownProps {
    items: {
        isMarkdown?: boolean;
        isCode?: boolean;
        isText?: boolean;
        text: string;
    }[];
}

export const getMarkDownOnly = (markdown: string): vscode.MarkdownString => {
    return getMarkDownBuilder({
        items: [
            {
                isMarkdown: true,
                text: markdown
            }
        ]
    })
}

export const getMarkDownBuilder = ({ items }: GetMarkDownProps): vscode.MarkdownString => {
    console.log("Error???")
    const builder = new vscode.MarkdownString();

    for (const item of items){
        if (item.isMarkdown) {
            builder.appendMarkdown(item.text);
        }
        else if (item.isText) {
            builder.appendText(item.text);
        }
        else if (item.isCode) {
            builder.appendMarkdown(item.text);
        }
    }
    

    return builder;
}