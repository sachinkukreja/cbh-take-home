const { deterministicPartitionKey, encode } = require("./dpk");
const crypto = require("crypto");

const TEST_STRING_SMALL = "Less then max limit";
const TEST_STRING_LARGE =
  "Greater then max limit,Greater then max limit,Greater then max limit,Greater then max limit,Greater then max limit,Greater then max limit,Greater then max limit,Greater then max limit,Greater then max limit,Greater then max limit,Greater then max limit,Greater then max limit,Greater then max limit,Greater then max limit,Greater then max limit,Greater then max limit,Greater then max limit,Greater then max limit";
const TEST_INT = Math.floor(Math.random() * 11);
const TEST_OBJECT = { key: "value" };
const TEST_OBJECT_LARGE = {
  largeString: TEST_STRING_LARGE,
  smallString: TEST_STRING_SMALL,
  int: TEST_INT,
};

describe("encode", () => {
  it("Returns the encoded string on valid Input", () => {
    const result = encode(TEST_STRING_SMALL);
    expect(result).toBe(
      crypto.createHash("sha3-512").update(TEST_STRING_SMALL).digest("hex")
    );
  });

  it("Returns empty string on no input", () => {
    const result = encode();
    expect(result).toBe("");
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns encoded string if input is a string ", () => {
    const result = deterministicPartitionKey(TEST_STRING_SMALL);
    let resultHash = encode(JSON.stringify(TEST_STRING_SMALL));
    expect(result).toBe(resultHash);
  });

  it("Returns encoded stringified JSON when input is a string greater than max limit ", () => {
    const result = deterministicPartitionKey(TEST_STRING_LARGE);
    let resultHash = encode(JSON.stringify(TEST_STRING_LARGE));
    expect(result).toBe(resultHash);
  });

  it("Returns encoded stringified JSON when input is an int ", () => {
    const result = deterministicPartitionKey(TEST_INT);
    let resultHash = encode(JSON.stringify(TEST_INT));
    expect(result).toBe(resultHash);
  });

  it("Returns encoded stringified JSON when input is an object ", () => {
    const result = deterministicPartitionKey(TEST_OBJECT);
    let resultHash = encode(JSON.stringify(TEST_OBJECT));
    expect(result).toBe(resultHash);
  });

  it("Returns encoded stringified JSON when input is an object greater than max limit ", () => {
    const result = deterministicPartitionKey(TEST_OBJECT_LARGE);
    let resultHash = encode(JSON.stringify(TEST_OBJECT_LARGE));
    expect(result).toBe(resultHash);
  });

  it("Returns partitionKey from event when partitionKey is a string and input is an event object", () => {
    let event = { partitionKey: TEST_STRING_SMALL };
    const candidate = deterministicPartitionKey(event);
    expect(candidate).toBe(TEST_STRING_SMALL);
  });

  it("Returns partitionKey as a string from event when partitionKey is not a string and input is an event object", () => {
    let event = { partitionKey: TEST_INT };
    const candidate = deterministicPartitionKey(event);
    expect(candidate).toBe(TEST_INT.toString());
  });

  it("Returns partitionKey as a stringified JSON from event when partitionKey is not a string and input is an event object", () => {
    let event = { partitionKey: TEST_OBJECT };
    const candidate = deterministicPartitionKey(event);
    expect(candidate).toBe(JSON.stringify(TEST_OBJECT));
  });

  it("Returns encoded string when partitionKey's length is greater than Max(256) and partition key is a string ", () => {
    let event = { partitionKey: TEST_STRING_LARGE };
    const result = deterministicPartitionKey(event);
    let resultHash = encode(TEST_STRING_LARGE);
    expect(result).toBe(resultHash);
  });

  it("Returns encoded stringified object when partitionKey's length is greater than Max(256) and partition key is NOT a string ", () => {
    let event = { partitionKey: TEST_OBJECT_LARGE };
    const result = deterministicPartitionKey(event);
    let resultHash = encode(JSON.stringify(TEST_OBJECT_LARGE));
    expect(result).toBe(resultHash);
  });
});
