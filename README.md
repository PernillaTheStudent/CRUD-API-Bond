# API för Bond Filmer

Det här projektet innehåller ett REST API för att hantera Bond filmer. Det är skrivet i Node.js och använder Express.js som webbserver.

## Installation

1. Installera Node.js om du inte redan har det installerat.
2. Kör `npm install` för att installera projektets beroenden.
3. Kör `npm run dev` för att starta servern.

## API-slutpunkter

Alla slutpunkter för filmer kräver en apiKey. Se nedan för användning och skapande.

### Generella responser

##### 401 Unauthorized
- Om apikey saknas

##### 403 Forbidden
- Om apikey inte är giltig

##### 404 Not found
- `Content-Type: text/html`: Om slutpunkt saknas
- `Content-Type: application/json`: Om resurs (t.ex. film) saknas

##### 500 Internal server error
- Om servern får ett internt fel


### Skapa API-nyckel

Alla slutpunkter för /movies kräver autentisering med API-nyckel. Endast administratörer kan skapa api-nycklar som de sedan kan dela ut till användare.

Metod: `POST`  
URL: `/apikeys/?apiKey=[adminKey]`  
Body:
```json
{ 
  "name": "string",
  "canWrite": "boolean" 
}
```
- `adminKey`: Speciell API-nyckel för administratör
- `name`: Namnet på API-nyckeln
- `canWrite`: Om API-nyckeln har skrivrättigheter

#### Responser

##### 201 Created
```json
{ 
  "name": "string",
  "key": "string",
  "canWrite": "boolean" 
}
```
- `key`: unik nyckel för att komma åt Bond filmer

##### 400 Bad Request
- Om namn saknas

#### POST request exempel: 
`http://localhost:3005/apikeys/?apiKey=[adminKey]`

### Ta bort API-nyckel

Metod: `POST`  
URL: `/apikeys/?apiKey=[adminKey]`  
- `adminKey`: Speciell API-nyckel för administratör

#### Responser

##### 200 OK
- Om API-nyckeln togs bort

#### DELETE request exempel: 
`http://localhost:3005/apikeys/[yourKey]?apiKey=[adminKey]`

### Hämta alla filmer

Metod: `GET`  
URL: `/movies?apiKey=[yourkey]`  

#### Responser
##### 200 OK
```json
[
  { "Title": "string", ... },
  ...
]
```

#### GET request exempel: 
`http://localhost:3005/movies?apiKey=[yourkey]`

### Hämta en specifik film baserat på imdbID

Metod: `GET`  
URL: `/movies/:id`

- `id`: imdbID för filmen

#### Responser
##### 200 OK
```json
{ "Title": "string", ... }
```

#### GET request exempel 
`http://localhost:3005/movies/[imdbID]?apiKey=[yourkey]`

### Skapa en ny Bond film

Metod: `POST`  
URL: `/movies`  
Body (obligatoriska fält):
```json
{ 
  "Title": "string", 
  "Year": "integer", 
  "Released": "string",
  "Genre": "string"
}
```
- `Title`: Namnet på Bond-filmen.
- `Year`: Året då filmen skapades. Måste vara ett årtal med fyra siffror.
- `Released`: Datumet då filmen släpptes. T.ex. "20 May 2017"
- `Genre`: Kommaseparerad lista på genrer som filmen tillhör

#### Responser
##### 201 Created
```json
{ "Title": "string", ... }
```
##### 400 Bad request
- Om Title saknas
- Om Year inte uppfyller "yyyy"
- Om Released saknas
- Om Genre saknas

#### POST request exempel: 
`http://localhost:3005/movies?apiKey=[yourkey]`

### Uppdatera en befintlig film baserat på imdbID

Metod: `PUT`  
URL: `/movies/:id`  
Body (valfria fält):
```json
{ 
  "Title": "string", 
  "Year": "integer", 
  "Released": "string",
  "Genre": "string",
  ...
}
```
Alla fält kan uppdateras.

#### Responser
##### 200 OK
```json
{ "Title": "string", ... }
```
##### 400 Bad request
- Om ett fält inte uppfyller kriterierna

#### PUT request exempel: 
`http://localhost:3005/movies/[imdbID]?apiKey=[yourkey]`

### Ta bort en film baserat på imdbID

Metod: `DELETE`  
URL: `/movies/:id`  
- `id`: imdbID för filmen som ska tas bort

#### Responser

##### 200 OK
- Om filmen togs bort

#### DELETE request exempel: 
`http://localhost:3005/movies/[imdbID]?apiKey=[yourkey]`

## Använda API:et med Postman

1. Ladda ner och installera [Postman](https://www.postman.com/downloads/) om du inte redan har det installerat.
1. Skapa en ny "Collection" i Postman.
1. För varje API-slutpunkt, skapa en ny "Request" i din collection och konfigurera den med rätt metod och URL (enligt beskrivningen ovan).
1. För POST och PUT-anrop, gå till fliken "Body" i din request och välj "raw" och "JSON" som format. Skriv sedan in JSON-data för din karaktär enligt exempel ovan.
1. Skicka dina requests och utforska API:et!
