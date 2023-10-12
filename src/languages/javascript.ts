import * as vscode from 'vscode';
import { RuntimeType, runtimeTypes } from '../runtime_functions';
import { Debug } from '../debug';
import { getMarkDownOnly } from '../utils/markdown';

type DefinitionResolver = vscode.CompletionItemProvider<vscode.CompletionItem>["provideCompletionItems"];
type SignatureProvider = vscode.SignatureHelpProvider['provideSignatureHelp'];

export const completionDefinitionResolver: DefinitionResolver = (document, position, _token, _context) => {
    const linePrefix = document.lineAt(position).text.slice(0, position.character);
    const match = linePrefix.match(/[a-zA-Z]*/g);

    Debug.log(match)
    if (match == null) return [];

    const matchValues = match!.filter((value) => value.length > 0);
    const currValue = matchValues[matchValues.length - 1];

    Debug.log(matchValues, currValue)
    if (currValue == null) return [];

    return runtimeTypes
            .filter(({ label }) => label.label.includes(currValue) || currValue.length == 0)
            .map(({ label, documentation, type }) => {
                const item = new vscode.CompletionItem(label, type);
                const doc = getMarkDownOnly(documentation);

                item.documentation = doc;

                return item;
            }
        ).filter((value) => value != null) as vscode.CompletionItem[]
}

export const signatureHelpProvider: SignatureProvider = (document, position, _token, _context) => {
    const linePrefix = document.lineAt(position).text.slice(0, position.character);

    Debug.log("Line: " + linePrefix);

    const currType = runtimeTypes.filter(
        ({ label: { label }}) => linePrefix.includes(label) && !linePrefix.includes(")") && linePrefix.includes("(")
    ).reduce((biggerType, currType) => biggerType.label.label.length > currType.label.label.length ? biggerType : currType, { label: { label: "" }} as RuntimeType);

    if (currType == null) return null;

    const periodCount = linePrefix.match(/,/g)?.length ?? 0;

    return {
        activeParameter: periodCount,
        activeSignature: 0,
        signatures: [
            currType?.signature
        ]
    } as vscode.ProviderResult<vscode.SignatureHelp>
}