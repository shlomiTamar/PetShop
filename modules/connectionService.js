var fileModule = require('./file');
const axios = require('axios');
const config = require('./../config');
const cron = require("node-cron");
var connectionModule = require('./connectionService');
var schedulerModule = require('./scheduler');

exports.data = {
    io: {},
    socket: {},
    axiosInstance: {},
    init: function(app){

        var self = this;
        //create axios instance
        this.axiosInstance = axios.create({
            baseURL: config.baseUrl,
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });

        this.socket = require('socket.io');
        this.io = this.socket.listen(app.listen(8080));
        this.io.sockets.on("connection",function(socket){
            socket.emit("StartDeliverData");
            self.deliverFood(self.axiosInstance, fileModule.file.dataFileFullName);
        });
    },
    //Feeding the animals and send data to the client
    deliverFood: function(axiosInstance, dataFileName){

        //reading the data file to get feeding times
        var dataFile = fileModule.file.getFile(dataFileName, 'utf8');
        var pets = [];
        pets = JSON.parse(dataFile);

        //sending the animals data to the UI
        connectionModule.data.io.sockets.emit("UpdateAnimals", {data: pets.data});

        for (var i = 0; i < pets.data.length; i++){

            //create cron expression
            var cronExp = schedulerModule.scheduler.parseTime(pets.data[i].time);

            var eat = function() {
                var self = this;
                //http request
                axiosInstance.get('/' + this.name) //concat animal name to base URL
                .then(function (response) {
                    // handle success
                    var next = schedulerModule.scheduler.getNextTime(self.time);
                    connectionModule.data.io.sockets.emit("StartEating", 
                        {
                            name: self.name, 
                            time: schedulerModule.scheduler.getCurrentTime(), 
                            nextTime: next,
                            msg: response.data.msg
                        });
                })
                .catch(function (error) {
                // handle error
                    connectionModule.data.io.sockets.emit("DidntEat", {name: self.name});
                });
            }
            var bound = eat.bind(pets.data[i]);
            var task = cron.schedule(cronExp, bound); //schedule cron task
            schedulerModule.scheduler.addTask(task); //keep all cron tasks so we can destroy them later(incase data file has changed)

            var nextTime = schedulerModule.scheduler.getNextTime(pets.data[i].time);
            connectionModule.data.io.sockets.emit("StartEating", 
                {
                    name: pets.data[i].name, 
                    nextTime: nextTime,
                });


        }
    }

}