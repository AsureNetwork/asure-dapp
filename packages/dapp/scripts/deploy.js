const path = require('path');
const IPFS = require('ipfs-api');

function createIpfs() {
  // return IPFS('ipfs.infura.io', 5001, {
  //   protocol: 'https'
  // });

  return IPFS('localhost', 5001, {
    protocol: 'http'
  });
}

function uploadFolder(ipfs, pathToFolder) {
  console.log(`Uploading "${pathToFolder}" to ipfs ...`);
  ipfs.util.addFromFs(pathToFolder, { recursive: true }, (err, result) => {
    if (err) {
      throw err;
    }

    const hash = result[result.length - 1].hash;
    console.log(`Uploaded ${result.length} file(s) to ipfs.`);

    console.log(`Publishing "${hash}" to ipns ...`);
    ipfs.name.publish(`${hash}`, (err, name) => {
      if (err) {
        throw err;
      }

      console.log(
        `Published to ipns. See "https://gateway.ipfs.io/ipns/${
          name.name
        }" and "https://ipfs.io/ipns/dapp.asure.io"`
      );
    });
  });
}

const buildDir = path.resolve(__dirname, '../build');
try {
  const ipfs = createIpfs();
  uploadFolder(ipfs, buildDir);
} catch (err) {
  console.error(`Failed to upload "${buildDir}"`, err);
}
