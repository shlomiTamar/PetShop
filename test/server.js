const config = require('./../config');
var fileModule = require('./../modules/file');
var expect  = require('chai').expect;

describe("base url is working", function() {
   
    it("returns valid Base URL", function() {
        expect(config.baseUrl).to.not.be.null;
    });
    
});

describe("Feedind data is valid", function() {

    var dataFileFullName = './data.json';
    var dataFile = fileModule.file.getFile(dataFileFullName, 'utf8');
    var pets = [];
    pets = JSON.parse(dataFile);

    it("has data file", function() {
        expect(dataFile).to.not.be.null;
    });

    it("has feeding data", function() {
        expect(pets.data.length).to.be.above(0);
    });
    
});
