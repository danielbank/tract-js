import { Model, terminate } from "../dist/tractjs.js";

describe('model', () => {
  test('fails to load without input parameters', async (done) => {
    const model: Model = new Model('./tests/plus3.pb');
    await expect(model.modelId).rejects.toThrow();
    terminate();
    setTimeout(() => {
      done();
    }, 2000)
  });
});
