// https://www.techiediaries.com/fake-api-jwt-json-server/

const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const session = require("express-session");
const { randomUUID } = require("crypto");
var _ = require('lodash');

const server = jsonServer.create();

const router = jsonServer.router("./db.json");
const users = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));
const userdata = JSON.parse(fs.readFileSync("./user-data.db.json", "UTF-8"));
const userdb = jsonServer.router("./users.json");
const userdatadb = jsonServer.router("./user-data.db.json");

server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const SECRET_KEY = "aFuhVas87asd62kjsDf";
server.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false /*, cookie: {maxAge: 5000}*/,
  })
);

function findUser({ email, password }) {
  return users.users.find(
    (user) => user.email === email && user.password === password
  );
}
function findUserPlaylists(userId) {
  return users.users.find(
    (user) => user.id === userId
  );
}
function findUserData(userId) {
  return userdata.data.find(
    (user) => user.userId === userId
  );
}
function findUserDataIndex(userId) {
  return userdata.data.findIndex(
    (user) => user.userId === userId
  );
}

function createUser({ name, email, password }) {
  return {
    "userId": randomUUID(),
    "name": name,
    "email": email,
    "password": password,
    "playlists": []
  }
}

function createUserData(id) {
  return {
    "id": id,
    "lastVelocityUsed": 60,
    "velocities": [
      60
    ]
  }
}

server.post("/session/create-session", (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;
  const user = findUser({ email, password });
  if (!user) {
    const status = 401;
    res
      .status(status)
      .json({ status, message: "E-mail não encontrado ou password incorreta" });
  } else {
    req.session.user = { name: user.name, email: user.email, id: user.id };
    res.status(200).json(req.session.user);
  }
});

server.post("/playlists", (req, res) => {
  const { userId } = req.body;
  const playlists = findUserPlaylists(userId);
  if (!playlists) {
    const status = 404;
    res
      .status(status)
      .json({ status, message: "Usuário não possui playlists" });
  } else {
    res.status(200).json(playlists.playlists);
  }
})

server.post("/user-data", (req, res) => {
  const { userId } = req.body;
  const playlists = findUserData(userId);
  if (!playlists) {
    const status = 404;
    res
      .status(status)
      .json({ status, message: "Usuário não possui dados" });
  } else {
    res.status(200).json(playlists);
  }
})


server.post('/session/create-user', (req, res) => {
  const db = userdb.db; // Assign the lowdb instance
  const userdataDb = userdatadb.db; // Assign the lowdb instance
  const newUser = createUser(req.body)
  insert(db, 'users', newUser);
  insert(userdataDb, 'data', createUserData(newUser.id));

  res.sendStatus(200)

  /**
   * Checks whether the id of the new data already exists in the DB
   * @param {*} db - DB object
   * @param {String} collection - Name of the array / collection in the DB / JSON file
   * @param {*} data - New record
   */
  function insert(db, collection, data) {
    const table = db.get(collection);
    console.log(table)
    if (_.isEmpty(table.find(data).value())) {
      table.push(data).write();
    }
  }
});

server.put('/user-data', (req, res) => {
  const db = userdb.db; // Assign the lowdb instance
  const userdataDb = userdatadb.db; // Assign the lowdb instance
  const newUser = createUser(req.body)
  edit(userdataDb, 'data', req.body);

  res.sendStatus(200)

  /**
   * Checks whether the id of the new data already exists in the DB
   * @param {*} db - DB object
   * @param {String} collection - Name of the array / collection in the DB / JSON file
   * @param {*} data - New record
   */
  function edit(db, collection, data) {
    const table = db.get(collection);
    console.log(data)
    const index = findUserDataIndex(data.userId)
    console.log(index)
    console.log(table.find(data.id).value(), "id")
    
    if (index === -1) {
      res.status(400)
      .json({ status: 404, message: "Id não pertence a esse usuário" });
    }else{
      table[index] = data;
      
    }
  }
});

server.get("/session/user", (req, res) => {
  if (req.session) {
    res.status(200).json(req.session);
  } else {
    res.status(401).json({ status: 401, message: "Não autenticado" });
  }
});



server.get("/health", (req, res) => {
  res.status(200).json({ up: true });
});

server.post("/session/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy(function (err) {
      res.status(200).json({ message: "Você saiu do sistema" });
    });
  } else {
    res.status(401).json({ status: 401, message: "Não autenticado" });
  }
});

server.use(/^(?!\/session).*$/, (req, res, next) => {
  if (!req.session.user) {
    const status = 401;
    res.status(status).json({ status, message: "Não autenticado" });
    return;
  } else {
    next();
  }
});

server.use(router);

server.listen(3001, () => {
  console.log(`Servidor inicializado`);
});
