import { Model, Tensor, load, terminate } from "../dist/tractjs.js";

describe('model', () => {
  afterAll((done) => {
    terminate();
    setTimeout(() => done(), 2000)
  });

  test('cannot be created directly', () => {
    // @ts-ignore: Constructor of class 'Model' is private.
    expect(() => new Model()).toThrow();
  });

  test('fails gracefully when loaded incorrectly', async () => {
    await expect(load('./tests/plus3.pb')).rejects.toThrow();
    await expect(load('./tests/plus3', { optimize: false })).rejects.toThrow();
  });

  test('can load a model', async () => {
    await expect(load('./tests/plus3.pb', { optimize: false })).resolves.toBeInstanceOf(Model)
    await expect(load('./tests/plus3', { format: 'tensorflow', optimize: false })).resolves.toBeInstanceOf(Model)
  });

  test('can predict on a single input tensor', async () => {
    const model: Model = await load('./tests/plus3.pb', {
      inputFacts: {
        0: ['float32', [1, 3]],
      },
    });
    const input = new Tensor(new Float32Array([1, 2, 3]), [1, 3]);
    const prediction = await model.predict_one(input);
    expect(Array.from(prediction.data)).toEqual([4, 5, 6]);
  });

  test('can predict on multiple input tensors', async () => {
    const model: Model = await load('./tests/plus3.pb', {
      inputFacts: {
        0: ['float32', [1, 3]],
      },
    });
    const input = new Tensor(new Float32Array([1, 2, 3]), [1, 3]);
    const predictions = await model.predict([input]);
    expect(Array.from(predictions[0].data)).toEqual([4, 5, 6]);
  });
});
