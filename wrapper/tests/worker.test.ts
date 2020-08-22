import Worker from "web-worker";
import datauri from 'datauri';
import fs from "fs";

describe('worker', () => {
  let worker: Worker;

  beforeAll(async () => {
    worker = new Worker(await datauri("./dist/worker.js"));
  });

  test('can load a model', async (done) => {
    const modelData = await fs.promises.readFile("./tests/plus3.pb");
    const options = {
      optimize: false,
      format: 'tensorflow',
      inputFacts: {},
    };

    const handler = (e) => {
      expect(e.data.uid).toEqual(1);
      expect(e.data.type).toEqual("load");
      expect(e.data.body).toEqual(0);
      worker.removeEventListener("message", handler);
      done()
    };
    worker.addEventListener("message", handler);
    worker.postMessage({ type: 'load', body: { data: modelData, options }, uid: 1 });
  });

  afterAll(() => {
    worker.terminate();
  });
});
