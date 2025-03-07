const artilheirodb = (dbname, table) => {
  const db = new Dexie(dbname);
  db.version(1).stores(table);
  db.open();

  return db;
};

const bulkcreate = (dbtable, data) => {
  let flag = empty(data);
  if (flag) {
    dbtable.bulkAdd([data]);
    console.log("dados inseridos com sucesso...!");
  } else {
    console.log("Por favor, forneça dados...!");
  }
  return flag;
};

const createEle = (tagname, appendTo, fn) => {
  const element = document.createElement(tagname);
  if (appendTo) appendTo.appendChild(element);
  if (fn) fn(element);
};

const empty = object => {
  let flag = false;
  for (const value in object) {
    if (object[value] != "" && object.hasOwnProperty(value)) {
      flag = true;
    } else {
      flag = false;
    }
  }
  return flag;
};

const getData = (dbname, fn) => {
  let index = 0;
  let obj = {};
  dbname.count(count => {
    if (count) {
      dbname.each(table => {
        obj = SortObj(table);
        fn(obj, index++);
      });
    } else {
      fn(0);
    }
  });
};

const SortObj = (sortobj) => {
  let obj = {};
  obj = {
    id: sortobj.id,
    name: sortobj.name,
    gol: sortobj.gol
  };
  return obj;
}


export default artilheirodb;
export {
  bulkcreate,
  createEle,
  getData,
  SortObj
};