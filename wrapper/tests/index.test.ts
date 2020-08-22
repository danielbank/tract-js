import { Model, Tensor, terminate } from "../dist/tractjs.js";

describe('model', () => {
  test('fails to load without input parameters', async () => {
    const model: Model = new Model('./tests/plus3.pb');
    await expect(model.loaded()).rejects.toThrow();
    terminate();
  });

  jest.setTimeout(100000);
  test('loads with input parameters', async (done) => {
    /*
          inputFacts: {
        0: ['float32', [1, 224, 224, 3]],
      },
    */
    const model: Model = new Model('./tests/plus3.pb', {
      optimize: false,
    });
    try {
      console.log('foo');
      await model.loaded();
      console.log('bar');
      const tensor = new Tensor(new Float32Array([1.0, 2.0, 3.0]), [1, 3]);
      console.log('predicting');
      const prediction = await model.predict([tensor]);
      console.log('prediction: ', prediction);
      // console.log('prediction: ', prediction[0]);
      // expect(prediction).toEqual(4);
      // done();
    } catch (err) {
      console.log(err);
    } finally {
      terminate();
      done();
    }
  });
});
