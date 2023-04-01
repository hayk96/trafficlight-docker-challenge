[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Medium][medium-shield]][medium-url]
[![Stackoverflow][stackoverflow-shield]][stackoverflow-url]

# :vertical_traffic_light: Traffic Light Docker Challenge

> A set of practice tasks for people who new to Docker

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#requirements">Requirements</a></li>
    <li><a href="#what-you-will-learn">What you will learn</a></li>    
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#author-and-maintainer">Author and maintainer</a></li>
  </ol>
</details>


## About The Project
In this project are included a set of tasks designed for beginner Programmers, Systems Administrators, DevOps Engineers, etc. who want to learn or get more familiar with Docker.

## Project structure
This project consists of folders appropriately by the color names of a traffic light: red, yellow, and green. Each of them contains the source code of the appropriate web application.
```
.
├── _config.yml
├── CODEOWNERS
├── LICENSE
├── README.md
├── red
│   ├── app.js
│   ├── Dockerfile
│   ├── favicon.ico
│   ├── package.json
│   └── index.pug
├── yellow
│   ├── app.js
│   ├── Dockerfile
│   ├── favicon.ico
│   ├── package.json
│   └── index.pug
└── green
    ├── app.js
    ├── Dockerfile
    ├── favicon.ico
    ├── package.json
    └── index.pug
```   

## Requirements
- [Docker engine](https://docs.docker.com/engine/install/)
- [Docker compose](https://docs.docker.com/compose/install/)

## What you will learn
By completing all the instructions of this project, at the end of it, you will have knowledge of:
- the basic commands of the Docker
- networking of the Docker
- container management with Docker compose
- data management by using Docker volumes
- experience with Nginx reverse proxy

## Getting started
#### Clone [this](https://github.com/hayk96/trafficlight-docker-challenge) repository, then do the required instructions of the tasks.

### :one: Task1: Writing Dockerfiles and building Docker images
1.1 Write a Dockerfile for all applications by following the instructions (from 1.1.1 to 1.1.8) presented below. The created sampler of Dockerfile should be the same for all applications.  
- 1.1.1 Docker images must be based on this <ins>base image</ins> `node:17.0-alpine3.14`  
- 1.1.2 The <ins>working directory</ins> inside the containers should be the `/app` directory  
- 1.1.3 Copy the `package*.json` files to the working directory `/app` before installation of the `npm` package manager
- 1.1.4 Install the `npm` package manager via `apk` (APK stands for Alpine Linux package keeper/manager). The required version of the npm is `npm=7.17.0-r0`. [See how to install packages in Alpine](https://wiki.alpinelinux.org/wiki/Alpine_Package_Keeper#Add_a_Package). After the <ins>apk</ins> instruction install dependency packages with the `nmp install` command
- 1.1.5 Copy the `app.js` file to the working directory  
- 1.1.6 Copy the `index.pug` and `favicon.ico` files to the `/app/views/` directory  
- 1.1.7 All containers must expose the port `80`
- 1.1.8 All containers should execute the following command: `node app.js` in run time


1.2 Build Docker images for each web app, with following namings:
- trafficlight/red:v1.0
- trafficlight/yellow:v1.0
- trafficlight/green:v1.0

### :two: Task2: Running web apps behind Nginx reverse proxy
2.1 Create a docker network with name `traffic-light`, and assign the `172.20.0.1` as a gateway address with `/16` prefix length.

2.2 By using the created images, run containers with following requirements:
- assign the appropriate names: `red-app`, `yellow-app` and `green-app` to containers

- assign the network `traffic-light` to all containers

2.3 Pull the image `nginx:1.21` then run a container with the following requirements:
- assign the name `nginx-proxy` to the container

- assign the network `traffic-light` to the container `nginx-proxy`

- mount the path `~/nginx/conf.d/` of the host to the path `/etc/nginx/conf.d/` of the container - for managing configurations from your machine

- the `nginx-proxy` container must listen to the following ports: `3000`, `4000` and `5000`. The mentioned ports should map to the web apps as follows: (3000 -> red-app, 4000 -> yellow-app, 5000 -> green-app). ***:bulb: This point must be implemented via [nginx_proxy_pass](http://nginx.org/en/docs/http/ngx_http_proxy_module.html)***.

If you have done all points of the Task2 correctly, by opening e.g. the link http://127.0.0.1:3000 on your browser, you should see the `red-app` page. The rest web apps should work with the same logic.

### :three: Task3: Running web apps with Nginx load balancing
3.1 Run services via Docker Compose with the following requirements by using the web apps' images that you've built:
- define the following services: `red-app`, `yellow-app`, `green-app` and `nginx-load-balancer` in docker-compose.yml file
- all the services must share the `traffic-light` network

3.2 For the `nginx-load-balancer` service mount the paths from the host to the container as follows:

- `~/nginx/conf.d/ -> /etc/nginx/conf.d/` - by allowing configuration management to be done from the host

- `/var/log/nginx/ -> /var/log/nginx/` - by making the Nginx logs accessible on the host

- expose the port `80` for the `nginx-load-balancer` service

3.3 Make load balancing of request for the all services. ***:bulb: This point must be implemented via [Nginx HTTP Load Balancing](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/).***

3.4 Restrict access of all web apps with the [Nginx HTTP Basic Authentication](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/).

If you have done all points of the Task3 correctly, by visiting with this link: http://127.0.0.1 first time you will see e.g. the `red-app`, visiting second time (or refreshing the page) you will see e.g. the `yellow-app`, and for the third time you will see the `green-app`.

## License
Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Author and maintainer
**Hayk Davtyan | [@hayk96](https://github.com/hayk96)**

[contributors-shield]: https://img.shields.io/github/contributors/hayk96/trafficlight-docker-challenge.svg?style=for-the-badge
[contributors-url]: https://github.com/hayk96/trafficlight-docker-challenge/contributors
[forks-shield]: https://img.shields.io/github/forks/hayk96/trafficlight-docker-challenge.svg?style=for-the-badge
[forks-url]: https://github.com/hayk96/trafficlight-docker-challenge/network/members
[stars-shield]: https://img.shields.io/github/stars/hayk96/trafficlight-docker-challenge?style=for-the-badge
[stars-url]: https://github.com/hayk96/trafficlight-docker-challenge/stargazers
[issues-shield]: https://img.shields.io/github/issues/hayk96/trafficlight-docker-challenge.svg?style=for-the-badge
[issues-url]: https://github.com/hayk96/trafficlight-docker-challenge/issues
[license-shield]: https://img.shields.io/github/license/hayk96/trafficlight-docker-challenge.svg?style=for-the-badge
[license-url]: https://github.com/hayk96/trafficlight-docker-challenge/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/hayk96
[medium-shield]: https://img.shields.io/badge/-Medium-black.svg?style=for-the-badge&logo=medium&colorB=555
[medium-url]: https://hayk96.medium.com
[stackoverflow-shield]: https://img.shields.io/badge/-Stackoverflow-black.svg?style=for-the-badge&logo=stackoverflow&colorB=555
[stackoverflow-url]: https://stackoverflow.com/users/16454242/hayk-davtyan?tab=profile
