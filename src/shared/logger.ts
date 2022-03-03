import { injectable } from "inversify";

@injectable()
export class Logger {
    log(text: string) {
        console.log(text);
    }
}