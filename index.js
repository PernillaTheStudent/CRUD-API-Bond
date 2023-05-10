const express = require("express");
const mockData = require("./mockData");
const app = express();
const port = 3008;

//const characters = mockData;
let characters = mockData;

app.use(express.json());   // middleware för att express ska kunna förstå json-data som skickas in

app.get("/", (req, res) => {
  res.send("Hello World! How are you doing?");
  console.log("hello world"); // visible in terminal
});

app.get("/characters", (req, res) => {
  res.json(characters);
});

//app.get("/characters/:id/:id2", (req, res) => {
app.get("/characters/:id", (req, res) => {
  const id = req.params.id;
  console.log(typeof id);
  //const numberId = parseInt(id);
  const numberId = Number(id);
  console.log(typeof numberId);
  const query = req.query;
  //console.log(req);
  console.log(id);
  console.log(query); // http://localhost:3008/characters/2?apiKey=123&search=bond&type=movie

  const character = characters.find((char) => char.id === numberId);

  if (!character) {
    return res // with return, så avslutas denna get-request
      .status(404)
      .json({ message: "Ingen karaktär med det idt kunde hittas!" });
  }
  res.json(character);
});

app.delete("/characters/:id", (req, res) => {
  // hämta ID från parametern
  // använda oss av node CDRUD:DET vi skapada igår för att ta bort en karaktär i vår characters constant.
  // OM det inte finns en karaktär med det IDt som skickats in => returna en 404
  // OM det finns, returnera ett svar i json format som säger att karaktärern blivit borttagen

  console.log(req);
  const id = req.params.id;
  const numberId = parseInt(id);
  console.log("numberId", numberId);

  const character = characters.find((char) => char.id === numberId);
  console.log("character", character);

  if (!character) {
    return res
      .status(404)
      .json({ message: "Karatär med det ID:et finns ej!" });
  }

  const newData = characters.filter((char) => char.id !== numberId);
  console.log("remove character", newData);
  characters = newData; // tar bort karaktären ur mockData

  //res.json(character),
  //res.json(newData)
  res.json({ message: `Karaktären ${character.name} är borttagen.` });
});

// POST: http://localhost:3008/characters/
// BODY: raw & JSON
// {
//   "character": {
//       "id": 123,
//       "name": "Birk Borkason",
//       "powers": ["Svärdskunskap", "Mod", "Äventyrlig"],
//       "weaknesses": ["Stolthet", "Konflikter med Mattis-klanen"],
//       "image": "birk.png"
//   }
// }
app.post("/characters", (req, res) => {
  // const id = Date.now().toString();  // ett sätt att skapa ett id
  let nextId = 28457;

  //console.log(id);
  const newCharacter = req.body.character;
  console.log(req.body);     // { character: { id: 123, ...} }
  console.log(newCharacter); // { id: 123, ...}

  const newCharacterId = {
    ...newCharacter,
    id: nextId
  };

  nextId++;

  // Lägg till den nya karaktären i vår let characters
  //characters = [...characters, newCharacterId];
  characters.push(newCharacterId);
  console.log(characters);

  // returnera ett json objekt till klienten med den nyligen tillagda karaktären
  res.json(newCharacterId);

});

app.put("/characters/:id", (req, res) => {
  console.log("req body", req.body)
  // ta ut parameters från req
  const id = req.params.id;
  const numbId = parseInt(id);
  //console.log("id");
  
  // hämta vår uppdaterade karaktär från body
  const characterEdit = req.body.character;  // vår uppdatering, hämta input data från body
  //console.log("character", updatedCharacter)
  console.log("id & character", { numbId, characterEdit })
  //const newCharacterBody = updatedCharacter.body;
  //console.log("character body", newCharacterBody);

  // kolla om id:t finns i vår lista av karaktärer
  const index = characters.findIndex((char) => char.id === numbId);
  console.log("index", index)


  // om den inte finns, returnera 404
  //if (!character) {
  if (index === -1) {
    return res.status(404).json({ message: "Karaktären med det id:t finns ej!" })
  }

  // om den finns, uppdatera objektet
  const character = characters.find((char) => char.id === numbId);
  console.log("find character", character);
  console.log("characters[index]", characters[index])
  const updatedCharacter = { ...characters[index], ...characterEdit };
  console.log("updatedCharacter", updatedCharacter);
  characters[index] = updatedCharacter;

  // returnera den uppdaterade karaktären
  res.json(characters);

})

// Starta servern på angiven port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
