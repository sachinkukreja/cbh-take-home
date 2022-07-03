const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    candidate = event.partitionKey
      ? event.partitionKey
      : this.encode(JSON.stringify(event));
  }

  candidate =
    typeof candidate !== "string" ? JSON.stringify(candidate) : candidate;

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = this.encode(candidate);
  }

  return candidate;
};

exports.encode = (data) =>
  data ? crypto.createHash("sha3-512").update(data).digest("hex") : "";
