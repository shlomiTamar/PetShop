const moment = require('moment');

exports.scheduler = {

    cronTasks: [],
    addTask: function(task){
        this.cronTasks.push(task);
    },
    clearAllTasks: function(){
        for (var i = 0; i < this.cronTasks.length; i++){
            console.log("destroy cron");
            this.cronTasks[i].destroy();
        }
        this.cronTasks = [];
    },
    getCurrentTime: function(){
        return moment().calendar();
    },
    getNextTime: function(timeExp){
        var next = "";
        var arr = timeExp.split(" ");
        var timeConstant = arr[1][arr[1].length-1];
        var time = arr[1].slice(0, arr[1].length - 1);

        switch(timeConstant){
            case "M":
                next = moment().add(time, 'm').calendar();
            break;
            case "H":
                next = moment().add(time, 'h').calendar();
            break;
            case "D":
            {
                if(arr.length == 2){   //if Type 2
                    next = moment().add(time, 'd').calendar();
                }
                else{
                    // var splitted = arr[3].split(":");
                    // exp = splitted[1] + " " + splitted[0] + " */" + time + " * *"
                    next = moment().add(time, 'd').calendar();
                }
            }
            break;
        }

        return next;
    },
    parseTime: function(timeExp){

        var exp = "";
        var arr = timeExp.split(" ");
        var timeConstant = arr[1][arr[1].length-1];
        var time = arr[1].slice(0, arr[1].length - 1);
    
        switch(timeConstant){
            case "M":
                exp = "*/" + time +" * * * *"
            break;
            case "H":
                exp = "0 " + " */" + time + " * * *"
            break;
            case "D":
            {
                if(arr.length == 2){   //if Type 2
                    exp = "0 8 */" + time + " * *"
                }
                else{
                    var splitted = arr[3].split(":");
                    exp = splitted[1] + " " + splitted[0] + " */" + time + " * *"
                }
            }
            break;
        }
        return exp;
    }


}