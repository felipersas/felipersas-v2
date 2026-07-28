const WHISPER_SAMPLE_RATE = 16_000;

export function mixAudioChannels(channels: readonly Float32Array[]): Float32Array {
  if (channels.length === 0) return new Float32Array();
  if (channels.length === 1) return channels[0].slice();

  const frameCount = Math.min(...channels.map((channel) => channel.length));
  const mono = new Float32Array(frameCount);

  for (let frame = 0; frame < frameCount; frame += 1) {
    let sum = 0;
    for (const channel of channels) sum += channel[frame];
    mono[frame] = Math.max(-1, Math.min(1, sum / channels.length));
  }

  return mono;
}

export function resampleAudio(
  input: Float32Array,
  sourceSampleRate: number,
  targetSampleRate = WHISPER_SAMPLE_RATE
): Float32Array {
  if (input.length === 0) return new Float32Array();
  if (sourceSampleRate <= 0 || targetSampleRate <= 0) {
    throw new RangeError("Sample rates must be positive.");
  }
  if (sourceSampleRate === targetSampleRate) return input.slice();

  const outputLength = Math.max(
    1,
    Math.round((input.length * targetSampleRate) / sourceSampleRate)
  );
  const output = new Float32Array(outputLength);
  const ratio = sourceSampleRate / targetSampleRate;

  for (let index = 0; index < outputLength; index += 1) {
    const sourcePosition = index * ratio;
    const leftIndex = Math.floor(sourcePosition);
    const rightIndex = Math.min(leftIndex + 1, input.length - 1);
    const fraction = sourcePosition - leftIndex;
    output[index] =
      input[leftIndex] * (1 - fraction) + input[rightIndex] * fraction;
  }

  return output;
}

export async function decodeAudioForWhisper(
  blob: Blob
): Promise<Float32Array> {
  const context = new AudioContext();

  try {
    const decoded = await context.decodeAudioData(await blob.arrayBuffer());
    const channels = Array.from(
      { length: decoded.numberOfChannels },
      (_, index) => decoded.getChannelData(index)
    );

    return resampleAudio(
      mixAudioChannels(channels),
      decoded.sampleRate,
      WHISPER_SAMPLE_RATE
    );
  } finally {
    await context.close();
  }
}
