import React from 'react';
import PropTypes from 'prop-types';

const Bitmap = (width, height) => {
  const littleEndian = (bitmap, index, length, number) => {
    while (length) {
      bitmap[index + (length - 1)] = (number >> ((length - 1) * 8)) & 0xff;
      length -= 1;
    }
  };

  const headerSize = 14;
  const imageHeaderSize = 40;
  const imageStart = headerSize + imageHeaderSize;
  const imageSize = width * height * 4;
  const bitmapSize = imageStart + imageSize;
  const buffer = new ArrayBuffer(bitmapSize);
  const header = new Uint8Array(buffer, 0, imageStart);
  const data = new Uint8Array(buffer, imageStart);

  // header
  littleEndian(header, 0, 2, 19778);
  littleEndian(header, 2, 4, bitmapSize);
  littleEndian(header, 10, 4, imageStart);

  // image header
  littleEndian(header, 14, 4, imageHeaderSize);
  littleEndian(header, 18, 4, width);
  littleEndian(header, 22, 4, -height);
  littleEndian(header, 26, 2, 1);
  littleEndian(header, 28, 2, 32);

  return { buffer, data };
};

function* RandomGenerator(input) {
  const generateSeed = seedInput => {
    const ret = new Array(4);

    for (let i = 0; i < ret.length; i += 1) {
      ret[i] = 0;
    }

    for (let i = 0; i < seedInput.length; i += 1) {
      ret[i % 4] = (ret[i % 4] << 5) - ret[i % 4] + seedInput.charCodeAt(i);
    }

    return ret;
  };

  const seed = generateSeed(input);

  while (true) {
    const t = seed[0] ^ (seed[0] << 11);
    seed[0] = seed[1];
    seed[1] = seed[2];
    seed[2] = seed[3];
    seed[3] = seed[3] ^ (seed[3] >> 19) ^ t ^ (t >> 8);
    yield (seed[3] >>> 0) / ((1 << 31) >>> 0);
  }
}

const createColor = gen => {
  const hue2rgb = (p, q, t) => {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  };

  const res = {
    r: 0,
    g: 0,
    b: 0
  };

  const h = gen.next().value;
  const s = gen.next().value * 0.6 + 0.4;
  const l =
    (gen.next().value +
      gen.next().value +
      gen.next().value +
      gen.next().value) *
    0.25;

  if (s === 0) {
    res.r = Math.round(l * 255);
    res.g = res.r;
    res.b = res.r;
    return res;
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  res.r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  res.g = Math.round(hue2rgb(p, q, h) * 255);
  res.b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

  return res;
};

const drawIcon = (data, scale, input) => {
  const repeat = (buffer, n, start, length) => {
    let target = start + length;

    if (n < 1) {
      return;
    }

    buffer.copyWithin(target, start, target);

    if (n === 1) {
      return;
    }

    while (n > 1) {
      if (n & 1) {
        buffer.copyWithin(target, start, target);
      }
      n >>>= 1;
      length *= 2;
      target = start + length;
      buffer.copyWithin(target, start, target);
    }

    buffer.copyWithin(target, start, target);
  };

  const size = 8;
  const generator = RandomGenerator(String(input).toLowerCase());
  const color = createColor(generator);
  const bgColor = createColor(generator);
  const spotColor = createColor(generator);
  const pixelWidth = size * scale;

  for (let i = 0; i < size; i += 1) {
    const iPos = i * scale * pixelWidth;

    for (let j = 0; j < size / 2; j += 1) {
      const c = Math.floor(generator.next().value * 2.3);
      const paint = [bgColor, color, spotColor][c];
      const jPos = j * scale;
      const pos = (iPos + jPos) * 4;
      const pixel = [paint.b, paint.g, paint.r, 255];
      const mirror = (iPos + pixelWidth - jPos - scale) * 4;

      data.set(pixel, pos);
      data.set(pixel, mirror);

      repeat(data, scale - 1, pos, 4);
      repeat(data, scale - 1, mirror, 4);
    }

    repeat(data, scale - 1, iPos * 4, pixelWidth * 4);
  }
};

export default class EthIcon extends React.PureComponent {
  constructor(props) {
    super(props);
    this.objectUrl = null;
    this.bitmap = Bitmap(props.scale * 8, props.scale * 8);
    if (props.address) {
      drawIcon(this.bitmap.data, props.scale, props.address);
      this.objectUrl = URL.createObjectURL(
        new Blob([this.bitmap.buffer], { type: 'image/bmp' })
      );
    }
  }
  componentWillReceiveProps(props) {
    if (this.props.scale !== props.scale) {
      this.bitmap = Bitmap(props.scale * 8, props.scale * 8);
    }
    if (
      this.props.scale !== props.scale ||
      this.props.address !== props.address
    ) {
      const prevObjectURL = this.objectUrl || null;
      this.objectUrl = null;
      if (props.address) {
        drawIcon(this.bitmap.data, props.scale, props.address);
        this.objectUrl = URL.createObjectURL(
          new Blob([this.bitmap.buffer], { type: 'image/bmp' })
        );
      }
      URL.revokeObjectURL(prevObjectURL);
    }
  }
  render() {
    const { address, scale, ...props } = this.props;

    return (
      <img
        {...props}
        style={{
          display: 'inline-block',
          width: '32px',
          height: '32px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          ...props.style
        }}
        src={props.src || this.objectUrl}
        alt={props.alt || address}
      />
    );
  }
}

EthIcon.defaultProps = {
  address: null,
  scale: 16
};

EthIcon.propTypes = {
  address: PropTypes.string,
  scale: PropTypes.number
};
