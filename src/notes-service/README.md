# Notes Service

## Start

1. Build `docker build -t notes-service .`
2. Run `docker run -p 8080:8080 -t notes-service`
3. Check `curl http://localhost:8080/notes`, you should see next output:
```shell
[
    {
        "id": "...",
        "text": "..."
    },
    ...
]
```
4. Great!