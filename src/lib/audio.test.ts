import { describe, expect, it } from "vitest";
import { mixAudioChannels, resampleAudio } from "./audio";

describe("mixAudioChannels", () => {
  it("averages stereo channels without clipping", () => {
    const left = new Float32Array([1, 0.5, -1]);
    const right = new Float32Array([1, -0.5, -1]);

    expect(Array.from(mixAudioChannels([left, right]))).toEqual([1, 0, -1]);
  });

  it("copies mono input and handles no channels", () => {
    const mono = new Float32Array([0.25, -0.25]);
    const result = mixAudioChannels([mono]);

    expect(result).not.toBe(mono);
    expect(Array.from(result)).toEqual([0.25, -0.25]);
    expect(mixAudioChannels([])).toHaveLength(0);
  });
});

describe("resampleAudio", () => {
  it("preserves 16 kHz audio by value", () => {
    const input = new Float32Array([0, 0.5, -0.5]);
    const result = resampleAudio(input, 16_000);

    expect(result).not.toBe(input);
    expect(Array.from(result)).toEqual(Array.from(input));
  });

  it("resamples 48 kHz audio to the Whisper 16 kHz rate", () => {
    const input = new Float32Array(48_000);
    for (let index = 0; index < input.length; index += 1) {
      input[index] = Math.sin((2 * Math.PI * 440 * index) / 48_000);
    }

    const result = resampleAudio(input, 48_000);

    expect(result).toHaveLength(16_000);
    expect(Math.max(...result)).toBeLessThanOrEqual(1);
    expect(Math.min(...result)).toBeGreaterThanOrEqual(-1);
  });

  it("handles empty input and rejects invalid rates", () => {
    expect(resampleAudio(new Float32Array(), 48_000)).toHaveLength(0);
    expect(() => resampleAudio(new Float32Array([1]), 0)).toThrow(RangeError);
  });
});
