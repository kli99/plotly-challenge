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
        buildBubble(listnames)
        buildGauge(listnames)
    });
};


init()

d3.select("#selDataset").on("change", function() {
    var newID = d3.select("#selDataset").property("value")

    console.log(newID)

    buildDemo(newID)
    buildPlot(newID)
    buildBubble(newID)
    buildGauge(newID)

});

// build demo chart corresponding to the test id
function buildDemo(testID) {

    d3.json(samplefile).then(function(thedata) {
        //console.log(thedata);

        // list metadata array
        var tableData = thedata.metadata.filter(row => { return row["id"] == testID });
        var tableData1 = tableData[0];
        //var tableData1 = tableData1.toUpperCase();
        // console.log(tableData1[0]);
        console.log(tableData1);

        // select each td id to call the dict value in each row
        var tid = d3.select("#tid").text("ID: " + tableData1["id"]);
        var eth = d3.select("#eth").text("Ethinicity: " + tableData1["ethnicity"]);
        var gender = d3.select("#gender").text("Gender: " + tableData1["gender"]);
        var age = d3.select("#age").text("Age: " + tableData1["age"]);
        var loc = d3.select("#loc").text("Location: " + tableData1["location"]);
        var type = d3.select("#type").text("BBType: " + tableData1["bbtype"]);
        var wf = d3.select("#wf").text("Wfreq: " + tableData1["wfreq"]);
        //console.log(eth);
    });
};


// build gauge corresponding to wfreq in metadata
function buildGauge(testID) {
    d3.json(samplefile).then(function(thedata) {
        //console.log(data)
        var tableData = thedata.metadata.filter(row => { return row["id"] == testID });
        var tableData1 = tableData[0];
        var wf = tableData1["wfreq"];
        console.log(wf);

        var data = [{
            domain: { x: [0, 9], y: [0, 1] },
            value: wf,
            title: { text: "Belly Button Washing Frequency", font: { size: 24, color: "#FD7526" } },
            legend: { text: "Scrubs per week", font: { size: 18, color: "#FD7526" } },
            type: "indicator",
            mode: "gauge+number",
            delta: { reference: 10 },
            gauge: {
                axis: { range: [null, 10], tickwidth: 1, tickcolor: "#FD7526" },
                bar: { color: "#FD7526" },
                needleBase: {
                    size: "6%",

                    border: {
                        width: 3,
                        color: "#FD7526",
                        dash: "1 1"
                    }
                },

                bgcolor: 'whitesmoke',
                borderwidth: 1,
                bordercolor: 'white',
                steps: [
                    { range: [0, 1], text: "0-1", color: "#FFF6F0" },
                    { range: [1, 2], text: "1-2", color: "#FDEADE" },
                    { range: [2, 3], text: "2-3", color: "#F2D8C9" },
                    { range: [3, 4], text: "3-4", color: "#F2C4A9" },
                    { range: [4, 5], text: "4-5", color: "#EFB99A" },
                    { range: [5, 6], text: "5-6", color: "#ECAB86" },
                    { range: [6, 7], text: "6-7", color: "#E6A077" },
                    { range: [7, 8], text: "7-8", color: "#E49364" },
                    { range: [8, 9], text: "8-9", color: "#E48752" },
                    { range: [9, 10], text: "9-10", color: "#E47B3F" }
                ],
            },
        }];

        var layout = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            font: { color: "#FD7526" },
            paper_bgcolor: "whitesmomke"
        };
        Plotly.newPlot('gauge', data, layout);

    });
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
        console.log(idname);

        var yticks = id.map(id => `OTU ${id}`);
        console.log(yticks);

        // create trace 1 to enter data and format
        var trace1 = {
            type: "bar",
            orientation: "h",
            x: testsample,
            y: yticks,
            text: idname,
            boxpoints: "all"
        };

        var data = [trace1];

        var layout = {
            // set the canvas scale
            height: 480,
            width: 300,
            margin: {
                l: 90,
                r: 50,
                t: 50,
                b: 50
            },
            hovermode: "closest",

        };
        Plotly.newPlot("bar", data, layout)
    });

};

build plot
for pie chart

function buildBubble(testID) {
    d3.json(samplefile).then(function(thedata) {
        //console.log(data)



    });
};