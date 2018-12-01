const parser = require('csv-parse');
const stringify = require('csv-stringify');
const transform = require('stream-transform');
const generate = require('csv-generate');

const inputFields = [
    "firstName", "lastName", "address"
];

//const extractFields = [
//    // List field names to extract from input
//];

const outputFields = [
    "ST", "lastName", "address", "ID", "city"
]

  var CSV_OPTIONS = {
        trim: true,
        skip_empty_lines: false,
        relax_column_count: true,
      relax: true,
      header:true,
      columns: true 

}; 



var fs = require('fs');
var rstream = fs.createReadStream("Test1kAddresses.csv");
//var csvWriteStream = csv.createWriteStream({ headers: ["firstName", "lastName", "address", "ID", "city"] })
var wstream = fs.createWriteStream("output.csv")
var recordTime = fs.createWriteStream("timestamps.txt")
//var csvData=[]
rstream
    .pipe(parser(CSV_OPTIONS))
    //.pipe(transform(function (data) {
    //    // This sample transformation selects out fields
    //    // that will make it through to the output.  Simply
    //    // list the field names in the array above.
    //    return extractFields
    //        .map(nm => { return data[nm]; });
    //}))
    .on('data', function (csvrow) {
        console.log("line")
        console.log(csvrow);
        //do something with csvrow
        // csvData.push(csvrow);
        csvrow.ID = "id";
        csvrow.city = "TORONTO"
        console.log("line")
        console.log(csvrow)
        //Save the timestamps
        var timestamp = Date.now()
recordTime.write(timestamp.toString().slice(-5)+"\n")
    })
    //.on('end', function () {
    //    //do something wiht csvData
    //    console.log(csvData);
    //})

    .pipe(stringify({
        delimiter: ',',
        relax_column_count: true,
        skip_empty_lines: false,
        header: true,
        // This names the resulting columns for the output file.
        columns: outputFields
    }))
    .pipe(wstream);


    //.on("end", function () {
    //    console.log("done");
    //});
    
//wstream.on("finish", function () {
//    console.log("DONE!");
//});