# Study Sentry

## Requirements

## How to

Start a Redis container

```sh
docker run -d --name sentry-redis redis
```

Start a Postgres container

```sh
docker run -d --name sentry-postgres -e POSTGRES_PASSWORD=secret -e POSTGRES_USER=sentry postgres
```

Generate a new secret key to be shared by all sentry containers. This value will then be used as the SENTRY_SECRET_KEY environment variable.

```sh
docker run --rm sentry config generate-secret-key

# Generated value: b@7vy*r@*otg!el*_%3-5*o=@lmia9h#x%kgfi!1vw+%f4hbg_
```

If this is a new database, you'll need to run upgrade

```sh
docker run -it --rm -e SENTRY_SECRET_KEY='<secret-key>' --link sentry-postgres:postgres --link sentry-redis:redis sentry upgrade
#docker run -it --rm -e SENTRY_SECRET_KEY='b@7vy*r@*otg!el*_%3-5*o=@lmia9h#x%kgfi!1vw+%f4hbg_' --link sentry-postgres:postgres --link sentry-redis:redis sentry upgrade

# user: viniciusfesil@gmail.com
# pass: 123456
```

Note: the -it is important as the initial upgrade will prompt to create an initial user and will fail without it

Now start up Sentry server

```sh
docker run -d --name my-sentry -p 8080:9000 -e SENTRY_SECRET_KEY='<secret-key>' --link sentry-redis:redis --link sentry-postgres:postgres sentry
#docker run -d --name my-sentry -p 8080:9000 -e SENTRY_SECRET_KEY='b@7vy*r@*otg!el*_%3-5*o=@lmia9h#x%kgfi!1vw+%f4hbg_' --link sentry-redis:redis --link sentry-postgres:postgres sentry
```

The default config needs a celery beat and celery workers, start as many workers as you need (each with a unique name)

```sh
docker run -d --name sentry-cron -e SENTRY_SECRET_KEY='<secret-key>' --link sentry-postgres:postgres --link sentry-redis:redis sentry run cron
docker run -d --name sentry-worker-1 -e SENTRY_SECRET_KEY='<secret-key>' --link sentry-postgres:postgres --link sentry-redis:redis sentry run worker
# docker run -d --name sentry-cron -e SENTRY_SECRET_KEY='b@7vy*r@*otg!el*_%3-5*o=@lmia9h#x%kgfi!1vw+%f4hbg_' --link sentry-postgres:postgres --link sentry-redis:redis sentry run cron
# docker run -d --name sentry-worker-1 -e SENTRY_SECRET_KEY='b@7vy*r@*otg!el*_%3-5*o=@lmia9h#x%kgfi!1vw+%f4hbg_' --link sentry-postgres:postgres --link sentry-redis:redis sentry run worker
```

## Configuring the initial user

If you did not create a superuser during upgrade, use the following to create one:

```sh
docker run -it --rm -e SENTRY_SECRET_KEY='<secret-key>' --link sentry-redis:redis --link sentry-postgres:postgres sentry createuser
# docker run -it --rm -e SENTRY_SECRET_KEY='b@7vy*r@*otg!el*_%3-5*o=@lmia9h#x%kgfi!1vw+%f4hbg_' --link sentry-redis:redis --link sentry-postgres:postgres sentry createuser
```

## References

- [Docker - Sentry](https://hub.docker.com/_/sentry)