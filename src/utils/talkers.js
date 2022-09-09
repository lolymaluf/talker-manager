const fs = require('fs').promises;
// const { join } = require('path');

const fileNameJson = './src/talker.json';

const readTalkers = async () => {
  try {
    const allTalkers = await fs.readFile(fileNameJson, 'utf8');
    return JSON.parse(allTalkers);
  } catch (error) {
    return [];
  }
};

const getAllTalkers = async () => {
  const allTalkers = await readTalkers();
  return allTalkers;
};

const createNewTalker = async (talker) => {
  const requestTalker = talker;
  const getTalkers = await readTalkers();
  console.log('getTalkers antes', getTalkers);
  const addTalker = { id: getTalkers.length + 1, ...requestTalker };
  getTalkers.push(addTalker);
  console.log('getTalkers depois', getTalkers);
  await fs.writeFile(fileNameJson, JSON.stringify(getTalkers));
  return addTalker;
};

const editTalker = async (talkerID, talker) => {
  const waitForTalkers = await readTalkers();
  const chooseTalker = waitForTalkers.find((tk) => tk.id === Number(talkerID));
  chooseTalker.name = talker.name;
  chooseTalker.age = talker.age;
  chooseTalker.talk = talker.talk;
  await fs.writeFile(fileNameJson, JSON.stringify(waitForTalkers));
return chooseTalker;
};

module.exports = {
  getAllTalkers,
  createNewTalker,
  editTalker,
};
