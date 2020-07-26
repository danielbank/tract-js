import fs from 'fs';

function loadWorker() {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/worker.ts', function (err, buffer) {
      if (err) {
        reject(err);
      }
      const arrayBuffer = Uint8Array.from(buffer).buffer;
      const worker = new Worker(URL.createObjectURL(new Blob([arrayBuffer])));
      resolve(worker);
    });
  });
}

it('loads the worker without errors', async () => {
  const worker: Worker = (await loadWorker()) as Worker;
  expect(1).toEqual(2);
});
