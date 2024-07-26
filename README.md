# Vagos-software-backend

# Setup

## .env file

First of all you will need to create a .env file in the root directory of the project. You can follow the template defined in the `env_example` file.

If it is your first time running the app you can define whatever username, password and database name and a new database will be created.

## Docker

This project uses docker-compose. In order to run the project you must first create the image by using the following command:

```bash
docker-compose build
```

Once the image has been created you can just use the following command to start the project:

```bash
npm run dev
```
