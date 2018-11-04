# Pet Shop Scheduler

This is a scheduler for a pet shop App

## Getting Started

    First, run 
        npm install
    then run 
        npm start
    open the browser at 
        http://localhost:8080/        

## Running the tests

    npm test

## Description

    The app simulates Pet shop scheduling for feeding animals.
    The animals described in the data.json file.
    There is a server that runs in the background and sending data to the ui client 
    through socket.io.

    server.js : starter file, initiate the ui and other modules.
    modules: 
        connectionService.js - Handle the connectivity issues, the socket, sending messages to the UI client
        file.js - initiate the file functions and taking care of the file watch
        scheduler.js - Taking care of all the scheduling issues, time and cron tasks.

## Authors

Shlomi Tamar

