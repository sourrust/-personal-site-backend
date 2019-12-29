# Personal Site Back-End

The application layer for my personal site [jeremy-hull.com][1], and the
presentation layer is [located here][2].

### Using Docker

I only included the `Dockerfile` and for this to run you need redis for
development mode. Here is an example, using docker compose, to run the
application:

```yml
version: "3"
services:
    redis:
        image: redis:4.0.14-alpine
        container_name: personal-site.redis
        ports:
            - 3306:3306
    backend:
        build: .
        container_name: personal-site.backend
        environment:
            - DATABASE_NAME=personal_site
            - DATABASE_PORT=3306
            - DATABASE_PASSWORD=database_password
            - REDIS_HOST=personal-site.redis
            - REDIS_DB_INDEX=0
            - REDIS_PASSWORD=redis_password
        depends_on:
            - redis
        ports:
            - 1337:1337
        volumes:
            - ./backend:/opt/backend
            - /opt/backend/node_modules
```

[1]: https://jeremy-hull.com/
[2]: https://github.com/sourrust/personal-site-frontend
