import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be TSKV log level', () => {
    const addMock = jest.spyOn(console, 'log').mockImplementation(() => {});
    const message = 'TSKV log level test text';
    const optionalParams = 'Params test text';
    logger.log(message, optionalParams);
    const expected = `level=log\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(addMock).toHaveBeenCalledWith(expected);
  });

  it('Should be TSKV error level', () => {
    const addMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    const message = 'TSKV error level test text';
    const optionalParams = 'Params test text';
    logger.error(message, optionalParams);
    const expected = `level=error\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(addMock).toHaveBeenCalledWith(expected);
  });

  it('Should be TSKV warn level', () => {
    const addMock = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const message = 'TSKV warning level test text';
    const optionalParams = 'Params test text';
    logger.warn(message, optionalParams);
    const expected = `level=warn\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(addMock).toHaveBeenCalledWith(expected);
  });
});
