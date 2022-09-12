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

const deleteTalker = async (id) => {
  const waitForTalkers = await readTalkers();
  const choseTalkerToDelete = waitForTalkers.filter((tk) => tk.id !== Number(id));
  await fs.writeFile(fileNameJson, JSON.stringify(choseTalkerToDelete));
};

/* const searchTalker = async (req, res) => {
  const { q } = req.query;
  const waitTalker = await getAllTalkers();
  const searchTk = waitTalker.filter((tk) => tk.name.includes(q));
  
  if (!q || q === ' ') {
    return res.status(200).json(waitTalker);
  }
  if (!searchTk) {
    return res.status(200).json([]);
  }
  return res.status(200).json(searchTk);
}; */

const searchTalker = async (search) => {
  try {
    const waitTalkers = await readTalkers();
    const searchFilter = waitTalkers.filter((talker) => talker.name.includes(search));
    return searchFilter;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getAllTalkers,
  createNewTalker,
  editTalker,
  deleteTalker,
  searchTalker,
};
