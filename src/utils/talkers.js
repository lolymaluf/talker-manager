const fs = require('fs').promises;
const { join } = require('path');

const fileNameJson = '../talker.json';

const readTalkers = async () => {
  try {
    const allTalkers = await fs.readFile(join(__dirname, fileNameJson), 'utf-8');
    return JSON.parse(allTalkers);
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
