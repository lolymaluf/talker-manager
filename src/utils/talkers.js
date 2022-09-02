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

const createNewTalker = async (req, res) => {
  const requestTalker = req.body;
  const getTalkers = await readTalkers();
  const addTalker = { id: requestTalker.length + 1, ...requestTalker };
  getTalkers.push(addTalker);
  fs.writeFile(fileNameJson, JSON.stringify(getTalkers));
  return res.status(201).json(addTalker);
};

module.exports = {
  getAllTalkers,
  createNewTalker,
};
