# Vagos-software-backend

# Setup

## .env file

First of all you will need to create a .env file in the root directory of the project. You can follow the template defined in the `env_example` file.

If it is your first time running the app you can define whatever username, password and database name and a new database will be created.

## Docker

### Updating docker-compose

The repository of Ubuntu have an outdated version of docker-compose which doesn't allows the execution of modern Dockerfiles.

In order to update your docker-compose version you must follow this steps:

Update the index of packages with the following command:

```bash
sudo apt update
```

Download the last version of docker-compose available for your system:

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Give execution permissions:

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

Be sure you have the updated version:

```bash
docker-compose --version
```

Export the path so your system can find executables in it:

```bash
export PATH="$PATH:/usr/local/bin"
```

Finally update your session by executing:

```bash
source ~/.bashrc
```

### Docker project setup

This project uses docker-compose. In order to run the project you must first create the image by using the following command:

```bash
docker-compose build
```

Once the image has been created you can just use the following command to start the project:

```bash
npm run dev
```

## Testing

This projects uses the library 'jest' to implement tests. In order to run tests you must first have a postgresql DB running with the following credentials:

- DB_NAME: vagos_test_db
- DB_USER: postgres
- DB_PASSWORD: postgres
- DB_HOST: localhost

If you are using docker you can execute the following command to create a container which match these credentials:

```bash
docker run --name vagos-software-test-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vagos_software_test_db -p 5432:5432 -d postgres
```

If you have this container already created you can start it by using:

```bash
docker start vagos-software-test-db
```

Finally to run all the tests use the command:

```bash
npm jest
```

This project also uses github actions so all the test cases will be executed when you open a merge request to dev or main. Execute the test locally before open a merge request to ensure all it's working as intendeed.
