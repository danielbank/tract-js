import Worker from "web-worker";
import datauri from 'datauri';

describe('worker', () => {
  test('loads the worker with errors', async () => {
    const worker = new Worker(await datauri("./dist/worker.js") as string);
    worker.postMessage({ type: 'load', body: { data: 1, options: {} }, uid: 1 });
    return await new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handler = (e: any) => {
        expect(e.data.uid).toEqual(1);
        expect(e.data.type).toEqual("error");
        expect(e.data.body.message).toEqual("invalid_argument");
        resolve();
      };
      worker.addEventListener("message", handler);
    });
  });
});
