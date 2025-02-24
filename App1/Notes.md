# Notes

```json
{
  "name": "node.js-and-express.js",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^4.21.2",
    "nodemon": "^3.1.9"
  }
}
```

here in this the version is lets say for express

4.21.2

1st part -> 4
2nd part -> 21
3rd part -> 2

3rd part (Last part) -> Minor Fixes (optional)
2nd part -> Recommended Bug Fixes (security fix)
1st part -> Major Changes

```js
 users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.status(201).json({ status: 'success', id: users.length });
    });
```
