CRUD "stream" API REST HTTP

| http verb | path                 | status codes  | purpose |
| --------- | -------------------- | ------------- | ------- |
| GET       | /api/v1/streams      | 200,          | list    |
| POST      | /api/v1/streams      | 201, 400      | create  |
| GET       | /api/v1/streams/<id> | 200, 404      | detail  |
| PATCH     | /api/v1/streams/<id> | 200, 400, 404 | update  |
| DELETE    | /api/v1/streams/<id> | 204, 404      | delete  |

### list

```js
Stream.find()
  .then((streams) => {
    res.json(streams);
  })
  .catch(next);
```

### create

```js
const data = {
  title: req.body.title,
  // ...
};

Stream.create(data)
  .then((stream) => {
    res.status(WHAT).json(stream);
  })
  .catch(next);
```

### detail

```js
Stream.findById(req.params.id).then((stream) => {
  if (stream) {
    res.status(WHAT).json(stream);
  } else {
    res.status(WHAT).json({ message: "stream not found" });
  }
});
```

### update

```js
const data = {
  title: req.body.title,
  //...
};

Stream.findByIdAndUpdate(req.params.id, data, {
  new: true,
  runValidators: true,
})
  .then((stream) => {
    if (stream) {
      res.status(WHAT).json(stream);
    } else {
      res.status(WHAT).json({ message: "stream not found" });
    }
  })
  .catch(next);
```

### delete

```js
Stream.findByIdAndDelete(req.params.id)
  .then((stream) => {
    if (stream) {
      res.status(WHAT).send();
    } else {
      res.status(WHAT).json({ message: "stream not found" });
    }
  })
  .catch(next);
```
