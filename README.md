# API för Bond Filmer

Det här projektet innehåller ett enkelt REST API för att hantera Bond filmer. Det är skrivet i Node.js och använder Express.js som webbserver.

## Installation

1. Installera Node.js om du inte redan har det installerat.
2. Kör `npm install` för att installera projektets beroenden.
3. Kör `npm run dev` för att starta servern.

## API-slutpunkter

### Hämta alla karaktärer

Metod: `GET`
URL: `/characters`

### Hämta en specifik karaktär baserat på ID

Metod: `GET`
URL: `/characters/:id`

### Skapa en ny karaktär

Metod: `POST`
URL: `/characters`
Body: `{ "name": "Nytt namn", "powers": ["Kraft 1", "Kraft 2"], "weaknesses": ["Svaghet"], "image": "ny_bild.png" }`

### Uppdatera en befintlig karaktär baserat på ID

Metod: `PUT`
URL: `/characters/:id`
Body: `{ "name": "Uppdaterat namn", "powers": ["Uppdaterad kraft"], "weaknesses": ["Uppdaterad svaghet"], "image": "uppdaterad_bild.png" }`

### Ta bort en karaktär baserat på ID

Metod: `DELETE`
URL: `/characters/:id`

## Använda API:et med Postman

1. Ladda ner och installera [Postman](https://www.postman.com/downloads/) om du inte redan har det installerat.
2. Skapa en ny "Collection" i Postman.
3. För varje API-slutpunkt, skapa en ny "Request" i din collection och konfigurera den med rätt metod och URL (enligt beskrivningen ovan).
4. För POST och PUT-anrop, gå till fliken "Body" i din request och välj "raw" och "JSON" som format. Skriv sedan in JSON-data för din karaktär enligt exempel ovan.
5. Skicka dina requests och utforska API:et!
