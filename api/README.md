CRUD "stream" API REST HTTP

| http verb | path | status codes | purpose |
| GET | /api/v1/streams | 200, | list |
| POST | /api/v1/streams | 201, 400 | create |
| GET | /api/v1/streams/<id> | 200, 404 | detail |
| PATCH | /api/v1/streams/<id> | 200, 400, 404 | update |
| DELETE | /api/v1/streams/<id> | 204, 404 | delete |

// list

```js
Stream.find()
  .then((books) => {
    res.json(books);
  })
  .catch(next);
```

// create

```js
const data = {
  title: req.body.title,
  // ...
};

Stream.create(data)
  .then((book) => {
    res.status(WHAT).json(book);
  })
  .catch(next);
```

// detail

```js
Stream.findById(req.params.id).then((book) => {
  if (book) {
    res.status(WHAT).json(book);
  } else {
    res.status(WHAT).json({ message: "book not found" });
  }
});
```

// update

```js
const data = {
  title: req.body.title,
  //...
};

Stream.findByIdAndUpdate(req.params.id, data, {
  new: true,
  runValidators: true,
})
  .then((book) => {
    if (book) {
      res.status(WHAT).json(book);
    } else {
      res.status(WHAT).json({ message: "book not found" });
    }
  })
  .catch(next);
```

// delete

```js
Stream.findByIdAndDelete(req.params.id)
  .then((book) => {
    if (book) {
      res.status(WHAT).send();
    } else {
      res.status(WHAT).json({ message: "book not found" });
    }
  })
  .catch(next);
```
