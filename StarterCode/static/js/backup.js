// Fetch the JSON data and console log it
var sampleData = d3.json("data/samples.json")

function init() {
    sampleData.then(function(data) {
        sampleNames = data.names
            // console.log(sampleNames)
        selOptions = d3.select("#selDataset");
        sampleNames.forEach(sampleid => {
            selOptions.append("option")
                .text(sampleid)
                .property("value", sampleid);
        });

        // //Set the text and value for your options data binding method
        // selOptions.selectAll("options")
        //   .data(sampleNames)
        //   .enter()
        //   .append("option")
        //   .text(function(d) {
        //       return d;
        //   })
        //   .property("value", function(d) {
        //       return d;
        //   });

        initial_id = sampleNames[0]
        console.log(initial_id)

        buildDemo(initial_id)
        buildBar(initial_id)
        buildBubble(initial_id)
        buildGauge(initial_id)
    });
}

init()

d3.select("#selDataset").on("change", function() {
    var newID = d3.select("#selDataset").property("value")
    console.log(newID)
    buildDemo(newID)
    buildBar(newID)
    buildBubble(newID)
    buildGauge(newID)
})

function buildDemo(id) {
    sampleData.then(data => {

    })
}

function buildBar(id) {

};

function buildBubble(id) {

};

function buildGauge(id) {

};




-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- - my code


// const url = " https://raw.githubusercontent.com/kli99/plotly-challenge/master/data/samples.json";
// const url = http://localhost:8000/data/samples.json
const samplefile = "../data/samples.json"

function init() {
    // fetch d3 file by initializing locahost server 8000 in python
    d3.json(samplefile).then(function(thedata) {
        console.log(thedata)

        // Dropdown Setting in between - build the options
        var names = thedata.names;
        console.log(names);
        //Append options to your select element based on data

        var options = d3.select("#selDataset");


        // names.forEach(names => options.append("option").text(names))

        // options.append("option")
        //     .text(names)
        //     .property("value", names);

        //OR BELOW
        //Set the text and value for your options
        options.selectAll("option")
            .data(names)
            .enter()
            .append("option")
            .text(function(d) {
                return d;
            })
            .attr("value", function(d) {
                return d;
            });

        listnames = names[0]
        console.log(listnames)

        buildDemo(listnames)
        buildPlot(listnames)
            // buildBubble(listnames)
            // buildGauge(listnames)
    });
};


init()

d3.select("#selDataset").on("change", function() {
    var newID = d3.select("#selDataset").property("value")

    console.log(newID)

    buildDemo(newID)
    buildPlot(newID)
        // buildBubble(newID)
        // buildGauge(newID)

});

function buildDemo(testDemo) {

    d3.json(samplefile).then(function(thedata) {
        //console.log(thedata);

        // list metadata array
        var tableData = thedata.metadata;
        console.log(tableData);




        // get a reference to the table body
        var table = d3.select("body").append("table");
        //var tbody = table.select("tbody");
        var thead = table.select("thead");


        var columns = ["ID", "Ethinicity", "Gender", "Age", "Location", "Bbtype", "Wfreq"];

        thead.append("tr")
            .selectAll("th")
            .data(columns)
            .enter()
            .append("th")
            .text(function(e) {
                return e;
            });

        var row = thead.selectAll("tr")
            .data(tableData)
            .enter()
            .append("td");


        var cell = row.selectAll("td")
            .data(function(row) {
                return columns.map(function(column) {
                    return {
                        column: column,
                        value: row[column]
                    }
                })
            })
            .enter()
            .append("td")
            .text(function(e, i) {
                return e.value;
                // })
                // .attr("value", function(e) {
                //     return e;
            });





        // // Use d3 to append one table row `tr` for each ufo report object & appending the `tr` elements.
        // tableData.forEach(function(report) {
        //     var row = tbody.append("tr");

        //     Object.entries(report).forEach(function([key, value]) {
        //         console.log(key, value);
        //         // Append a cell to the row for each value
        //         var cell = row.append("td");
        //         cell.text(value);
        //     });
        // });




    });
    /**
     * @param {array} rows
     * @param {integer} index
     * index 0 - id
     * index 1 - ethnicity
     * index 2 - gender
     * index 3 - age
     * index 4 - location
     * index 5 - bbtype
     * index 6 - wfreq
     */

    // var id = data.dataset.id;
    // var ethnicity = data.metadata.ethnicity;
    // var gender = data.metadata.gender;
    // var age = data.metadata.age;
    // var gender = data.metadata.gender;
    // var location = data.metadata.location;
    // var bbtype = data.metadata.bbtype;
    // var wfreq = data.metadata.wfreq;
};
/**
 * @param {array} rows
 * @param {integer} index
 * index 0 - id
 * index 1 - otu_ids
 * index 2 - sample_values
 * index 3 - otu_labels
 */

// build plot for barchart
function buildPlot(testID) {
    d3.json(samplefile).then(function(thedata) {
        //console.log(data)

        // Grab values from the data json object to build the plots
        // use filter to extract each ID's personal info of values, otuids etcs to plot each graph
        var testIDsample = thedata.samples.filter(row => { return row["id"] == testID });
        // listing all data in index 0; calling index 0 to list only the keys and values

        var testIDsample1 = testIDsample[0]
            //console.log(testIDsample[0]);

        // top 10 values and ids
        var test = testIDsample1.sample_values.slice(0, 10);
        var id = testIDsample1.otu_ids.slice(0, 10);
        console.log(id);

        var testsample = test.reverse();
        var idname = id.reverse();

        // create trace 1 to enter data and format
        var trace1 = {
            type: "bar",
            orientation: "h",
            x: testsample,
            y: idname[0],


            text: idname

        };

        var data = [trace1];

        var layout = {
            // set the canvas scale
            height: 450,
            width: 300,
            margin: {
                l: 50,
                r: 50,
                t: 50,
                b: 50
            },
            hovermode: "closet",
            yaxis: {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: idname[0]
                },
                zerobar: false,
                text: idname[0],
            }
            //     // xaxis: {
            //     //     //     range: [startDate, endDate],
            //     //     //     type: "date"
            //     //     text: (`$OTU {rid}`)
            //     // },

            //     // yaxis: {
            //     //     //     autorange: true,
            //     //     //     type: "linear"
            //     //     text: (`OTU` { resverseData })
            //     // },
        };

        Plotly.newPlot("bar", data, layout);
    });

}