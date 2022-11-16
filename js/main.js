import artilhdb, {
  bulkcreate,
  createEle,
  getData,
  SortObj
} from "./module.js";


let db = artilhdb("Artilheirodb", {
  artilheiro: `++id, name, gol`
});

// input tags
const userid = document.getElementById("userid");
const proname = document.getElementById("proname");
const gol = document.getElementById("gol");

// create button
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

btncreate.onclick = event => {
  // insert values
  let flag = bulkcreate(db.artilheiro, {
    name: proname.value,
    gol: gol.value
  });
  proname.value = gol.value = "";

  // definir o valor da caixa de texto do id
  getData(db.artilheiro, data => {
    userid.value = data.id + 1 || 1;
  });
  table();

  let insertmsg = document.querySelector(".insertmsg");
  getMsg(flag, insertmsg);
};

// btnread.onclick = table;

btnupdate.onclick = () => {
  const id = parseInt(userid.value || 0);
  if (id) {
    db.artilheiro.update(id, {
      name: proname.value,
      gol: gol.value
    }).then((updated) => {
      let get = updated ? true : false;

      let updatemsg = document.querySelector(".updatemsg");
      getMsg(get, updatemsg);

      proname.value = gol.value = "";
      table();
    })
  } else {
    console.log(`Selecione o ID: ${id}`);
  }
}

btndelete.onclick = () => {
  db.delete();
  db = artilhdb("Artilheirodb", {
    products: `++id, name, gol`
  });
  db.open();
  table();
  textID(userid);
  let deletemsg = document.querySelector(".deletemsg");
  getMsg(true, deletemsg);
}

window.onload = event => {
  textID(userid);
  table();
};

function table() {
  const tbody = document.getElementById("tbody");
  const notfound = document.getElementById("notfound");
  notfound.textContent = "";
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }

  getData(db.artilheiro, (data, index) => {
    if (data) {
      createEle("tr", tbody, tr => {
        for (const value in data) {
          createEle("td", tr, td => {
            td.textContent = data.gol === data[value] ? `${data[value]}` : data[value];
          });
        }
        createEle("td", tr, td => {
          createEle("i", td, i => {
            i.className += "fas fa-edit btnedit";
            i.setAttribute(`data-id`, data.id);
            i.onclick = editbtn;
          });
        })
        createEle("td", tr, td => {
          createEle("i", td, i => {
            i.className += "fas fa-trash-alt btndelete";
            i.setAttribute(`data-id`, data.id);
            i.onclick = deletebtn;
          });
        })
      });
    } else {
      notfound.textContent = "Nenhum registro encontrado no banco de dados...!";
    }

  });
}

const editbtn = (event) => {
  let id = parseInt(event.target.dataset.id);
  db.artilheiro.get(id, function (data) {
    let newdata = SortObj(data);
    userid.value = newdata.id || 0;
    proname.value = newdata.name || "";
    gol.value = newdata.gol || "";
  });
}

const deletebtn = event => {
  let id = parseInt(event.target.dataset.id);
  db.artilheiro.delete(id);
  table();
}

function textID(textboxid) {
  getData(db.artilheiro, data => {
    textboxid.value = data.id + 1 || 1;
  });
}

function getMsg(flag, element) {
  if (flag) {
    element.className += " movedown";

    setTimeout(() => {
      element.classList.forEach(classname => {
        classname == "movedown" ? undefined : element.classList.remove('movedown');
      })
    }, 4000);
  }
}