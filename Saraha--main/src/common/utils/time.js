const UNIT_IN_SECONDS = {
  s: 1,
  m: 60,
  h: 60 * 60,
  d: 60 * 60 * 24,
};

// toSeconds(1, "h") >> 3600
export function toSeconds(time, unit = "s") {
  const factor = UNIT_IN_SECONDS[unit];
  if (!factor) {
    throw new Error(`Unsupported time unit: ${unit}`);
  }
  return time * factor;
}

// toMS(5, "m") >> 300000
export function toMS(time, unit = "s") {
  return toSeconds(time, unit) * 1000;
}
