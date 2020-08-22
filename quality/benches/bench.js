import * as onnx from "onnxjs";
import * as tf from "@tensorflow/tfjs";
import * as tractjs from "tractjs";
import { saveAs } from "file-saver";

class TractjsModel {
  constructor(url, options) {
    this.model = tractjs.load(url, options);
  }

  async run(data, shape) {
    return await (await this.model).predict([new tractjs.Tensor(data, shape)]);
  }
}

class ONNXJSModel {
  constructor(url, options) {
    this.session = new onnx.InferenceSession(options);
    this.modelLoaded = this.session.loadModel(url);
  }

  async run(data, shape) {
    await this.modelLoaded;

    const inputs = [new onnx.Tensor(data, "float32", shape)];

    return await this.session.run(inputs);
  }
}

class TFJSModel {
  constructor(url, options) {
    this.model = tf.loadLayersModel(url, options).catch(console.error);
  }

  async run(data, shape) {
    let model = await this.model;
    return model.predict(tf.tensor(data, shape));
  }
}

async function bench(model, data, shape, n) {
  // warmup
  for (let i = 0; i < 4; i++) {
    await model.run(data, shape);
  }

  // bench
  const times = [];

  for (let i = 0; i < n; i++) {
    let startTime = performance.now();
    await model.run(data, shape);
    const endTime = performance.now();
    times.push(endTime - startTime);
  }

  return times;
}

async function bench_byte_sb_lstm(batchSize) {
  const length = 100;
  const data = new Uint8Array(batchSize * length).map(
    () => Math.random() * 256
  );
  const shape = [batchSize, length];
  const n = 10;
  const results = {};

  results["tractjs"] = await bench(
    new TractjsModel("/quality/models/data/byte_sb_lstm/model.onnx", {
      inputFacts: { 0: ["uint8", shape] },
    }),
    data,
    shape,
    n
  );

  tf.setBackend("cpu");
  results["Tensorflow.js (CPU)"] = await bench(
    new TFJSModel("/quality/models/data/byte_sb_lstm/tfjs_model/model.json"),
    data,
    shape,
    n
  );

  tf.setBackend("webgl");
  results["Tensorflow.js (WebGL)"] = await bench(
    new TFJSModel("/quality/models/data/byte_sb_lstm/tfjs_model/model.json"),
    data,
    shape,
    n
  );

  // ONNX.js does not support LSTMs
  results["O̶N̶N̶X̶.̶j̶s̶ ̶(̶C̶P̶U̶)̶"] = new Array(n).fill(NaN);
  results["O̶N̶N̶X̶.̶j̶s̶ ̶(̶W̶A̶S̶M̶)̶"] = new Array(n).fill(NaN);
  results["O̶N̶N̶X̶.̶j̶s̶ ̶(̶W̶e̶b̶G̶L̶)̶"] = new Array(n).fill(NaN);
  return results;
}

async function bench_squeezenet(batchSize) {
  let data = new Float32Array(batchSize * 3 * 224 * 224).map(() =>
    Math.random()
  );
  let shape = [batchSize, 3, 224, 224];
  const n = 10;
  const results = {};

  results["tractjs"] = await bench(
    new TractjsModel("/quality/models/data/squeezenet_1_1/model.onnx"),
    data,
    shape,
    n
  );

  // TFJS squeezenet needs slightly different input shape
  // should hopefully have negligible impact on performance though
  data = new Float32Array(batchSize * 3 * 227 * 227).map(() => Math.random());
  shape = [batchSize, 227, 227, 3];

  tf.setBackend("cpu");
  results["Tensorflow.js (CPU)"] = await bench(
    new TFJSModel("/quality/models/data/squeezenet_1_1/tfjs_model/model.json"),
    data,
    shape,
    n
  );

  tf.setBackend("webgl");
  results["Tensorflow.js (WebGL)"] = await bench(
    new TFJSModel("/quality/models/data/squeezenet_1_1/tfjs_model/model.json"),
    data,
    shape,
    n
  );

  data = new Float32Array(batchSize * 3 * 224 * 224).map(() => Math.random());
  shape = [batchSize, 3, 224, 224];

  results["ONNX.js (CPU)"] = await bench(
    new ONNXJSModel("/quality/models/data/squeezenet_1_1/model.onnx", {
      backendHint: "cpu",
    }),
    data,
    shape,
    n
  );

  results["ONNX.js (WASM)"] = await bench(
    new ONNXJSModel("/quality/models/data/squeezenet_1_1/model.onnx", {
      backendHint: "wasm",
    }),
    data,
    shape,
    n
  );

  results["ONNX.js (WebGL)"] = await bench(
    new ONNXJSModel("/quality/models/data/squeezenet_1_1/model.onnx", {
      backendHint: "webgl",
    }),
    data,
    shape,
    n
  );

  return results;
}

async function run() {
  const benches = {};
  benches.userAgent = navigator.userAgent;
  benches.date = new Date().toString();
  benches.results = [];

  const bench1 = {};
  bench1["title"] =
    "Sentence boundary detection LSTM<br>(bidirectional) (batch size 1)";
  bench1["results"] = await bench_byte_sb_lstm(1);
  benches.results.push(bench1);

  const bench2 = {};
  bench2["title"] =
    "Sentence boundary detection LSTM<br>(bidirectional) (batch size 16)";
  bench2["results"] = await bench_byte_sb_lstm(16);
  benches.results.push(bench2);

  const bench3 = {};
  bench3["title"] = "Squeezenet v1.1<br>(batch size 1)";
  bench3["results"] = await bench_squeezenet(1);
  benches.results.push(bench3);

  return benches;
}

run().then((data) => {
  var file = new File([JSON.stringify(data)], "benches.json", {
    type: "application/json;charset=utf-8",
  });
  saveAs(file);
});
