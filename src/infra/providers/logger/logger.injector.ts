import { Inject, Provider } from '@nestjs/common';
import { InnerLogger } from './logger';

const decoratedTokenPrefix = 'LoggerService:';

const decoratedLoggers = new Set<string>();

export const InjectorLoggerService = (context: string) => {
  decoratedLoggers.add(context);

  return Inject(getLoggerToken(context));
};

const createDecoratedLoggerProvider = (
  context: string,
): Provider<InnerLogger> => ({
  inject: [InnerLogger],
  provide: getLoggerToken(context),
  useFactory: (logger: InnerLogger) => {
    logger.setContext(context);

    return logger;
  },
});

export const createProvidersForDecorated = (): Array<Provider<InnerLogger>> =>
  [...decoratedLoggers.values()].map((context) =>
    createDecoratedLoggerProvider(context),
  );

export const getLoggerToken = (context: string): string =>
  `${decoratedTokenPrefix}${context}`;
