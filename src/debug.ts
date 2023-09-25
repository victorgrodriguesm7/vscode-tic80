export class Debug {
    static isDebug: boolean = true;

    static log = (...data: any[]) => {
        if(!this.isDebug) return;

        console.log(...data);
    }
}