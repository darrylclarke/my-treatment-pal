import shuffle from './shuffle';
import pages from './pages.json';
import find from 'lodash/find';

let dataBase = {
  purpose: [],
  personalize: [],
  recognition: []
};

const dataEntryPanels = [
  'personalize',
  'purpose',
  'recognition',
  'unification',
  'realization',
  'thanksgiving',
  'release'
];
const treatmentPanels = dataEntryPanels.slice(1); // 'not personalize'

function setRandomSelected(data) {
  let index = Math.floor(Math.random() * 3);
  data[index].selected = true;
  return data;
}

function customSetData(key, data) {
  setData(key, setRandomSelected(shuffle(data)));
}

function forceSelected(item) {
  let data = getData(item);
  const STAR_AT_FRONT = /^\^(.*)/;

  let selectedObject = find(data, item => item.text.match(STAR_AT_FRONT));
  if (selectedObject) {
    let match = selectedObject.text.match(STAR_AT_FRONT);
    selectedObject.text = match[1];
    setSelected(data, selectedObject, data => {
      setData(item, data);
    });
  }
}

const load = function() {
  dataEntryPanels.forEach(item => {
    let data = pages[item + '_list'];
    if (data) {
      let result = data.map((item, index) => {
        return { id: index, text: item, selected: false };
      });
      customSetData(item, result);
      forceSelected(item);
    }
  });
};

const getData = function(type) {
  if (dataBase[type]) {
    return dataBase[type];
  }
  return [];
};

const setData = function(type, data, callback) {
  dataBase[type] = [];
  data.map(item => dataBase[type].push(item));
  if (callback) {
    callback(type, data);
  }
};

const getSelectedData = function(type) {
  let data = getData(type);
  if (!data) {
    return '';
  }
  let selected = find(data, item => item.selected === true);
  return selected.text;
};

const setSelected = function(data, selectedObject, callback) {
  data.forEach((current, index) => {
    current.selected = current.id === selectedObject.id;
  });
  if (callback) {
    callback(data, selectedObject);
  }
};

const getRandomData = function(type) {
  let data = getData(type);
  let index = Math.floor(Math.random() * data.length);
  return data[index].text;
};

export {
  getData,
  setData,
  load,
  getSelectedData,
  getRandomData,
  treatmentPanels,
  setSelected
};
