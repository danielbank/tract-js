import worker from '../dist/worker';

describe('worker', () => {
  it('loads the worker without errors', async () => {
    expect(worker).not.toEqual({});
  });
})
