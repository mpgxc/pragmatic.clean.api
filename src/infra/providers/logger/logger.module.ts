// import { Global, Module } from '@nestjs/common';
// import { InnerLogger } from './logger';

// @Global()
// @Module({
//   providers: [InnerLogger],
//   exports: [InnerLogger],
// })
// export class LoggerModule {}

import { Global, Module, Provider } from '@nestjs/common';
import { InnerLogger } from './logger';
import { createProvidersForDecorated } from './logger.injector';

@Global()
@Module({
  providers: [InnerLogger],
  exports: [InnerLogger],
})
export class LoggerModule {
  static decorated: Provider<InnerLogger>[] = createProvidersForDecorated();

  static forRoot = () => ({
    module: LoggerModule,
    providers: [InnerLogger, ...LoggerModule.decorated],
    exports: [InnerLogger, ...LoggerModule.decorated],
  });
}
