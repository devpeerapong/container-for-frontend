# 0 Docker as Container Engine

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Start Docker Desktop
3. verify that Docker CLI is install by running

```
docker --version
```

Use `run` command to tell Docker to run an image.

```
docker run IMAGE
```

Docker will search in local repository then [Docker Hub](https://hub.docker.com/)

```
docker run node:18
```

Nothing happens, but if we run

```
docker image ls
```

you will see that docker has download node image into your computer
the REPOSITORY is the name of the image and 18 is the TAG
and then run

```
docker container ls --all
```

with its ID and generated name

we will see the container with the image node:18 was created and now exited

this is because docker treat container like a program
when we run a containing and its job is done then the container exit

now run

```
docker run node:18 --version
```

the output will be

```
v18.3.0
```

this is because whatever it's after the IMAGE is consider a command

and the node image is passing that command to the node binary

so it just like we run `node --version` in our local computer

so let's try running our `cli.js` script to see if it works

```
docker run node:18 cli.js 1995
```

now we get an Error: cannot find module

this is because the container is like another machine with its own fs, network, env and etc.

so your file in the host will not be automatically share in the container

but we can solve this with the same level as plug the thumb drive into the computer, except that your computer is the thumb drive to plug into the container or officially mount


```
docker run -v (pwd)/cli.js:/home/node/cli.js node:18 /home/node/cli.js 1995
```

now it's error but different message because we only mount the cli.js but not the package.json so node does not know that we use ESM

so we can mount the folder instead of a file

```
docker run -v (pwd):/home/node node:18 /home/node/cli.js 1995
```

but what if we don't want to `docker run` every time i want to test if the code I see works

not only node image provide us a way to use node without having to install it

it comes with a full blown os

try running

```
docker run node:18 cat /etc/os-release
```

yes, you just run a cat program to see the content of a file

and it is the os of node that node is based on

but the os with node is not good enough if you cannot do work with it

so with the knowledge acquire above we will now run a bash shell inside a container and treat it as a linux env

now run

```
docker run -it -v (pwd):/home/node node:18 /bin/bash
```

the option i = interactive
the option t = psuedo-tty

and you will successfully access the bash shell inside the container

now you can continue your work


```
cd /home/node
```

you will see your folder show up in the container and you can edit with the editor of your choice

try and fix the bug where the age is below 0

---

but cli is simple what about web server

try running server.js

it will server on port 3000

but if you connect to localhost:3000 from host it wil not work

because again, the container has its own network so when we run the container we need to tell docker to forward port to our
and how to do that is

```
docker run -it -v (pwd):/home/node -p 5000:3000 node:18 /bin/bash
```

now you can access your api via port 5000

now when you run
```
docker container ls
```
you will be flood with container because everytime you `docker run` a container is created
and after you finish doing your work the container is stopped

so if you want to remove the container after you are done just add `--rm` options

```
docker run -it --rm -v (pwd):/home/node -p 5000:3000 node:18 /bin/bash
```

