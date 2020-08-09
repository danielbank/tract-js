import Worker from "web-worker";
import datauri from 'datauri';

describe('worker', () => {
  let worker: Worker;

  beforeAll(async () => {
    worker = new Worker(await datauri("./dist/worker.js") as string);
  });

  test('loads the worker with errors', (done) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (e: any) => {
      expect(e.data.uid).toEqual(1);
      expect(e.data.type).toEqual("error");
      expect(e.data.body.message).toEqual("invalid_argument");
      worker.removeEventListener("message", handler);
      done()
    };
    worker.addEventListener("message", handler);
    worker.postMessage({ type: 'load', body: { data: 1, options: {} }, uid: 1 });
  });

  afterAll(() => {
    worker.terminate();
  });
});
