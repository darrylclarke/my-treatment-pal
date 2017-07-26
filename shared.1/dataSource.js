let dataBase = {
  purpose: [],
  personalize: [],
  recognition: []
};

const load = function() {
  setData('purpose', [
    {
      id: 1,
      text: 'Write a cool JS library'
    },
    {
      id: 2,
      text: 'Make it generic enough'
    },
    {
      id: 3,
      text: 'Write README'
    },
    {
      id: 4,
      text: 'Create some examples'
    },
    {
      id: 5,
      text:
        'Spam in Twitter and IRC to promote it (note that this element is taller than the others)'
    },
    {
      id: 6,
      text: '???'
    },
    {
      id: 7,
      text: 'PROFIT'
    }
  ]);
  setData('recognition', [
    {
      id: 1,
      text: 'How is this?'
    },
    {
      id: 2,
      text: 'It is fun.'
    }
  ]);
  setData('personalize', [
    {
      id: 1,
      text: 'How is this #K#K#K#K ?'
    },
    {
      id: 2,
      text: 'It is short fun.'
    }
  ]);
};

const getData = function(type) {
  if (dataBase[type]) {
    return dataBase[type];
  }
  return [];
};

const setData = function(type, data) {
  console.log(JSON.stringify(data));

  dataBase[type] = [];
  data.map(item => dataBase[type].push(item));
};

export { getData, setData, load };
