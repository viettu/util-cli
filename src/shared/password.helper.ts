import { injectable } from "inversify";
import {readFileSync} from 'fs';
import {pbkdf2} from 'crypto';
import {promisify} from 'util';


@injectable()
export class PasswordHelper {
  private readonly pbkdf2Async = promisify(pbkdf2);

  public async hashPassword(
    pass: string,
    salt: Buffer,
    iterations: number,
    keyLen: number,
    algorithm: string,
  ): Promise<string> {
    const encodedBuf = await this.pbkdf2Async(pass, salt, iterations, keyLen, algorithm);
    return encodedBuf.toString('base64');
  }
  
  public convertHexToBuffer(hex: string, removeOx = true): Buffer {
    const normalizeHexString = this.normalizeHex(hex, removeOx);

    const binary = [];
    for (let i=0; i<normalizeHexString.length/2; i++) {
        const startPos = i*2;
        const h = normalizeHexString.substring(startPos, startPos + 2);
        binary[i] = parseInt(h, 16);        
    }

    return Buffer.of(...new Uint8Array(binary));
  }

  public readSaltFile(filename: string): Buffer {
    return readFileSync(filename);
  }

  private normalizeHex(hex: string, remove0x: boolean) {
    let input = hex.toUpperCase();

    if (remove0x) {
      input = input.replace(/0x/gi, "");        
    }
    
    const currentInput = input;
    input = input.replace(/[^A-Fa-f0-9]/g, "");
    if (currentInput != input) {
        console.log("Warning! Non-hex characters (including newlines) in input string ignored.");
    }

    return input;
  } 
}