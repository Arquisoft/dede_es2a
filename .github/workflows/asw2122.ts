/*
name: CI for ASW2122
on:
  push:
    branch: 'develop'
jobs:
  docker-push-webapp:
    name: Push webapp Docker Image to GitHub Packages
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Publish to Registry
      uses: elgohr/Publish-Docker-Github-Action@3.04
      with:
          name: arquisoft/dede_es2a/webapp
          username: ${{ github.actor }}
          password: ${{ secrets.DOCKER_PUSH_TOKEN }}
          registry: ghcr.io
          workdir: webapp
  docker-push-restapi:
    name: Push restapi Docker Image to GitHub Packages
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Publish to Registry
      uses: elgohr/Publish-Docker-Github-Action@3.04
      with:
          name: arquisoft/dede_es2a/restapi
          username: ${{ github.actor }}
          password: ${{ secrets.DOCKER_PUSH_TOKEN }}
          registry: ghcr.io
          workdir: restapi
  deploy:
    name: Deploy over SSH
    runs-on: ubuntu-latest
    needs: [docker-push-restapi,docker-push-webapp]
    steps:
    - name: Deploy over SSH
      uses: fifsky/ssh-action@master
      with:
        host: ${{ secrets.DEPLOY_HOST }}
        user: ${{ secrets.DEPLOY_USER }}
        key: ${{ secrets.DEPLOY_KEY }}
        command: |
          wget https://raw.githubusercontent.com/Arquisoft/dede_es2a/developer/docker-compose-deploy.yml -O docker-compose.yml
          docker-compose stop
          docker-compose rm -f
          docker-compose pull   
          docker-compose up -d        
*/