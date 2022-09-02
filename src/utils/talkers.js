const fs = require('fs').promises;
const { join } = require('path');

const fileNameJson = '../talker.json';

const readTalkers = async () => {
  try {
    const res = await fs.readFile(join(__dirname, fileNameJson), 'utf-8');
    return JSON.parse(res);
  } catch (error) {
    return [];
  }
};

const getAllTalkers = async () => {
  const allTalkers = await readTalkers();
  return allTalkers;
};

module.exports = {
  getAllTalkers,
};
