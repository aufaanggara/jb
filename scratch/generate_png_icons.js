const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPNG(width, height, r, g, b) {
  // Simple uncompressed/deflated raw PNG generator
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth
  ihdrData[9] = 2; // Color type 2 (RGB)
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace
  
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // IDAT chunk (RGB image data with row filter byte 0)
  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(height * rowSize);
  
  for (let y = 0; y < height; y++) {
    const rowStart = y * rowSize;
    rawData[rowStart] = 0; // Filter type None
    
    for (let x = 0; x < width; x++) {
      const idx = rowStart + 1 + x * 3;
      // Draw blue shield with rounded corner background
      const distFromCenter = Math.hypot(x - width / 2, y - height / 2);
      const isInner = distFromCenter < width * 0.38;
      
      if (isInner) {
        // Inner shield highlight (White)
        rawData[idx] = 255;
        rawData[idx + 1] = 255;
        rawData[idx + 2] = 255;
      } else {
        // Outer Rekberin Blue (#2563eb)
        rawData[idx] = r;
        rawData[idx + 1] = g;
        rawData[idx + 2] = b;
      }
    }
  }
  
  const compressed = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(4 + 4 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  
  const crc = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

// Standard CRC32 table
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[i] = c;
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate 192x192 and 512x512 PNGs (Rekberin Blue #2563eb = RGB 37, 99, 235)
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), createPNG(192, 192, 37, 99, 235));
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), createPNG(512, 512, 37, 99, 235));
fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), createPNG(180, 180, 37, 99, 235));
console.log('PWA Icon PNGs created successfully!');
