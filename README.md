# mongodb-microservice

We have to set replica mongo for using transaction in our system, let get this settle using docker.
We are going to have 3 containers from the mongo image, all inside their own docker container network. Let’s name them mongo1, mongo2, and mongo3. These will be the three mongo instances of our replica set. We are also going to expose each of them to our local machine, so that we can access any of them using the mongo shell interface from our local machine if we need to Each of the three mongo container should be able to communicate with all other containers in the network.

## Setting up the network

### To see all networks currently on your system, run the command

`$ docker network ls`

### We will be adding a new network called `mongo-cluster`

`$ docker network create mongo-cluster`

### The new network should now be added to your list of networks

`$ docker network ls`

## Create keyfiles for MongoDB nodes to authenticate themselves

`$ cd <path-to-project>./docker/mongodb`

`$ openssl rand -base64 700 > file.key`

`$ chmod 400 file.key`

`$ chown 999:999 file.key`

## Update hostnames

Once the replica set is up, you will need to update hostnames in local`/etc/hosts` file.

NOTE: In windows, the hosts file is located at `C:\Windows\System32\drivers\etc\hosts`

Sample: `127.0.0.1 localhost mongo1 mongo2 mongo3`

## Setting up our containers

#### Windows:

`$ docker run -it --name mongo-1 --net mongo-cluster -d -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD="password" -p 27017:27017 -v C:\\ProgramData\\MongoDB-1\\data:/data/db mongo mongod --keyFile ./mongo-keyfile.key --replSet mongo-set`

#### Linux:

`$ docker run -it --name mongo-1 --net mongo-cluster -d -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD="password" -p 27017:27017 -v /var/lib/docker-db/mongodb-1/data:/data/db mongo mongod --replSet mongo-set`

### Set up the other container by running

#### Windows:

`$ docker run -it --name mongo-2 --net mongo-cluster -d -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD="password" -p 27018:27017 -v C:\\ProgramData\\MongoDB-2\\data:/data/db mongo mongod --replSet mongo-set`

#### Linux:

`$ docker run -it --name mongo-2 --net mongo-cluster -d -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD="password" -p 27018:27017 -v /var/lib/docker-db/mongodb-2/data:/data/db mongo mongod --replSet mongo-set`

### Set up the 3rd container by running

#### Windows:

`$ docker run -it --name mongo-3 --net mongo-cluster -d -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD="password" -p 27019:27017 -v C:\\ProgramData\\MongoDB-3\\data:/data/db mongo mongod --replSet mongo-set`

#### Linux:

`$ docker run -it --name mongo-3 --net mongo-cluster -d -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD="password" -p 27019:27017 -v /var/lib/docker-db/mongodb-3/data:/data/db mongo mongod --replSet mongo-set`
