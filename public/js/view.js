//Connecting To socket.io
var socket = io.connect(window.location.host);
socket.on("StartDeliverData",function(){
    //alert("Ready!");
})
socket.on("UpdateAnimals",function(animals){
    
    //Create a HTML Table element.
    var table = document.createElement("TABLE");
    table.border = "1";

    var columns = [];
    columns.push({name: "Animal Name", width: 20});
    columns.push({name: "Ate at",  width: 20});
    columns.push({name: "Says",  width: 30});
    columns.push({name: "Next Feeding", width: 30});
    //Add the header row.
    var row = table.insertRow(-1);
    for (var i = 0; i < columns.length; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = columns[i].name;
        headerCell.style["width"] = columns[i].width + "%";
        row.appendChild(headerCell);
    }
    //Add the data rows.
    for (var i = 0; i < animals.data.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columns.length; j++) {
            var cell = row.insertCell(-1);
            if(j == 0){
                cell.innerHTML = animals.data[i].name;
                cell.setAttribute('class', 'bold animal');                  
            }
            cell.setAttribute('id', animals.data[i].name + "_" + j);
        }
    }

    var dvTable = document.getElementById("list");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
})

var setElementData = function(element, text, classText){

    if(element){
        element.textContent = text;  
        if(classText){
            element.setAttribute('class', classText);                  
        }
    }
}

socket.on("StartEating",function(data){

    var element = document.getElementById(data.name + "_" + 0);
    setElementData(element, data.name, 'bold animal');

    element = document.getElementById(data.name + "_" + 1);
    setElementData(element, data.time, "transparentBg");

    element = document.getElementById(data.name + "_" + 2);
    if(data.msg){
        setElementData(element, data.name + ' says "' + data.msg + '"', "");
    }

    element = document.getElementById(data.name + "_" + 3);
    setElementData(element, data.nextTime, "");

})
socket.on("DidntEat",function(data){
    var element = document.getElementById(data.name + "_" + 0);
    setElementData(element, data.name, 'bold animal');

    element = document.getElementById(data.name + "_" + 1);
    setElementData(element, data.name + " did not eat, can die ", 'alert');

    element = document.getElementById(data.name + "_" + 2);
    setElementData(element, "", "");

    element = document.getElementById(data.name + "_" + 3);
    setElementData(element, data.nextTime, "");
})