import { Global, Module } from '@nestjs/common';
import { HashProvider } from './hash-provider';

@Global()
@Module({
  providers: [HashProvider],
  exports: [HashProvider],
})
export class CommomModule {}
