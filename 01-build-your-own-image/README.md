# 1 Build your own Image

In the previous lesson we use the prebuild image from the Docker Hub
which is not enough for our use case.

Now we need those image to includes nodejs, pnpm and graphicsmagick but how ?

what you need is the instruction for the docker to know what its need to do in order to build your image

and that instruction should be in a file called Dockerfile

the syntax you will always use is `FROM`

FROM tell docker that this image is based from what image

```
FROM node:18
```

then `RUN`

this tell docker to run a command or a program.
in this case we need to install pnpm and praphicsmagick so we add

```
FROM node:18

RUN corepack enable
RUN corepack prepare pnpm@7.2.1 --activate 
RUN apt-get update
RUN apt-get install graphicsmagick -y
```

then tell docker to build an image from this instruction

```
docker build CONTEXT -t NAME:TAG
```

context is what to send to the engine to prepare for the build
option -t is to tag this image with a name or tag
REPOSITORY or NAME is interchangable
default TAG is latest

so if you want to send current folder to build an image with a name watermarker-dev-env with a tag 1
you can

```
docker build . -t watermarker-dev-env:1
```

the first time you run will takes about ~minutes

add you will see each command in Dockerfile is the step to build an image

then run its again you will see the result is much faster
because docker will cache each layer and reuse them if nothing change in that layer

now if you run this image the pnpm and graphicsmagick will be ready for you to use

```
docker run -it --rm watermarker-dev-env:1 pnpm version
docker run -it --rm watermarker-dev-env:1 gm
```

it's best practice to group related command into one single RUN command

```
FROM node:18

RUN corepack enable && \
  corepack prepare pnpm@7.2.1 --activate && \
  apt-get update && \
  apt-get install graphicsmagick -y
```

then build
```
docker build . -t watermarker-dev-env:2
```

now lets see if your watermarker project will work in this image

we will run the watermarker-dev-env:2 

```
docker run -it --rm -v watermarker:/home/node watermarker-dev-env:2 /bin/bash
```