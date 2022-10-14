import { handler } from '../app/handler';

describe('[myFunction]', () => {
  it('should not crash', async () => {
    await handler({}, {});
  });
});