# Reborn Server

## Endpoints

Liste des différents endpoints exposé par le socket du serveur
Les endpoints sont préfixé par leurs catégories respectives : 
- room
- entity
- skill       // TODO
- infos       // TODO
- timeline

### Room
- [ ] ***room:list*** :token, :limit
- [ ] ***room:detail*** :token
- [x] ***room:join*** :playerId, :roomId
- [x] ***room:connect*** :playerId, :roomId

### Entity
- ***entity:add***
- ***entity:delete***
- ***entity:stateUpdate***

### Timeline & History
- ***timeline:tick***
- ***history:list***

#### room:list
Input:
```javascript
{
  token: String,
  limit: Number 
}
```

Output: 
```javascript
[
  {
    "id": Number,
    "name": String,
    "createdAt": Date,
    "players": [String], 
    "game": {
      "status": Number,
      "startedAt": Date,
    }
  }
]
```

#### room:detail
Input:
```javascript
{
  token: String
}
```

Output: 
```javascript
{
  "id": Number,
  "name": String,
  "createdAt": Date,
  "players": [String],
  "game": {
    "status": Number,
    "startedAt": Date,
    "entities": [
      {
        "uuid": Number, 
        "position": Number,
      }
    ]
  }
}
```
