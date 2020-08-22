import { Model, Tensor, load, terminate } from "../dist/tractjs.js";

describe('model', () => {
  test('fails to load without input parameters', async () => {
    await expect(load('./tests/plus3.pb')).rejects.toThrow();
  });

  test('fails to load with wrong input parameters', async (done) => {
    await expect(load('./tests/plus3.pb', {
      inputFacts: {
        0: ['float32', [111, 2]],
      },
    })).rejects.toThrow();
  });

  test('loads with input parameters', async (done) => {
    try {
      const model: Model = await load('./tests/plus3.pb', {
        inputFacts: {
          0: ['float32', [1, 3]],
        },
      });
      const tensor = new Tensor(new Float32Array([1.0, 2.0, 3.0]), [1, 3]);
      const prediction = await model.predict([tensor]);
      expect(prediction).toEqual([new Tensor(new Float32Array([4.0, 5.0, 6.0]), [1, 3])]);
    } finally {
      terminate();
      done();
    }
  });
});
