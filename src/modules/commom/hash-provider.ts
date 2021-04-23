import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class HashProvider {
  async generate(text: string): Promise<string> {
    const hashedText = await hash(text, 10);

    return hashedText;
  }

  async compare(hashedValue: string, plainTextValue: string): Promise<boolean> {
    const match = await compare(plainTextValue, hashedValue);
    return match;
  }
}
