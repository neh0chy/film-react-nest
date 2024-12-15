import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be json: log', () => {
    const addMock = jest.spyOn(console, 'log').mockImplementation(() => {});
    const message = 'JSON log level test text';
    logger.log(message);
    const expected = JSON.stringify({
      level: 'log',
      message: message,
      optionalParams: [],
    });
    expect(addMock).toHaveBeenCalledWith(expected);
  });

  it('should be json: error', () => {
    const addMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    const message = 'JSON error level test text';
    logger.error(message);
    const expected = JSON.stringify({
      level: 'error',
      message: message,
      optionalParams: [],
    });
    expect(addMock).toHaveBeenCalledWith(expected);
  });

  it('should be json: warn', () => {
    const addMock = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const message = 'JSON warning level test text';
    logger.warn(message);
    const expected = JSON.stringify({
      level: 'warn',
      message: message,
      optionalParams: [],
    });
    expect(addMock).toHaveBeenCalledWith(expected);
  });
});
