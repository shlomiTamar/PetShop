const fs = require("fs");
var schedulerModule = require('./scheduler');
var connectionModule = require('./connectionService');

exports.file = {

    dataFileFullName: './data.json',

    init: function(){
        //start watching data file for changes
        var self = this;
        this.watchFile(this.dataFileFullName, function(){
            console.log("success - file changed");
            //need to kill all crons and start over
            schedulerModule.scheduler.clearAllTasks();
            connectionModule.data.deliverFood(connectionModule.data.axiosInstance, self.dataFileFullName);

        });

    },
    //watching the data file for updates
    watchFile: function(fileName, successCallback){
        fs.watch(fileName, (event, filename) => {
            if (filename) {
              console.log(`${filename} file Changed`);
              if(successCallback){
                successCallback();
              }
            }
          });
    },
    getFile: function(fileName, options){

        return fs.readFileSync(fileName, options);

    }


}