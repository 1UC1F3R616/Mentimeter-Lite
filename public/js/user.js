// Here Results will be shown to the user

var socket = io();

myStorage = window.localStorage;

// from local storage
const token = myStorage.getItem("token");
const event_id = myStorage.getItem("event_id");
const event_name = myStorage.getItem("event_name");
const event_description = myStorage.getItem("event_description");
const otp = myStorage.getItem("otp"); "G6B8X9";
const user_id = myStorage.getItem("user_id");

socket.on("vote_result", (json_data) => {
    console.log(json_data);

    var settings = {
        url: `/events/questions/${otp}`,
        method: "GET",
        timeout: 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        count = 0;
        for (let [key, value] of Object.entries(response)) {
            count += 1;
            old_graph = document.getElementById(`chartjs-${count}`)
            old_graph.parentNode.remove()
            question_statement = value["question"]["statement"];
            options = [];
            votes = [];

            for (let i = 0; i < value["options"].length; i++) {
                options.push(value["options"][i]["statement"]);
                votes.push(value["options"][i]["votes"]);
            }
            // console.log(options)

            document.getElementById("result").insertAdjacentHTML(
                "afterend",
                `<div class="container">
            <canvas id="chartjs-${count}" class="chartjs"></canvas>
        </div>`
            );

            new Chart(document.getElementById(`chartjs-${count}`), {
                type: "bar",
                data: {
                    labels: options,
                    datasets: [
                        {
                            label: question_statement,
                            data: votes,
                            fill: false,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
                },
            });
        }
    });
});


var settings = {
    url: `/events/questions/${otp}`,
    method: "GET",
    timeout: 0,
};

$.ajax(settings).done(function (response) {
    console.log(response);
    count = 0;
    for (let [key, value] of Object.entries(response)) {
        count += 1;
        question_statement = value["question"]["statement"];
        options = [];

        for (let i = 0; i < value["options"].length; i++) {
            options.push(value["options"][i]["statement"]);
        }
        // console.log(options)
        var empty_array = new Array(options.length).fill(0);

        document.getElementById("result").insertAdjacentHTML(
            "afterend",
            `<div class="container">
        <canvas id="chartjs-${count}" class="chartjs"></canvas>
    </div>`
        );

        new Chart(document.getElementById(`chartjs-${count}`), {
            type: "bar",
            data: {
                labels: options,
                datasets: [
                    {
                        label: question_statement,
                        data: empty_array,
                        fill: false,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } },
        });
    }
});

// new Chart(document.getElementById("chartjs-1"), {
//     type: "bar",
//     data: {
//         labels: ["Tokens", "Session Ids", "f", "fg"],
//         datasets: [
//             {
//                 label: "Leaks",
//                 data: [0, 0, 0, 0],
//                 fill: false,
//                 backgroundColor: [
//                     "rgba(255, 99, 132, 0.2)",
//                     "rgba(54, 162, 235, 0.2)",
//                     "rgba(255, 206, 86, 0.2)",
//                     "rgba(75, 192, 192, 0.2)",
//                     "rgba(153, 102, 255, 0.2)",
//                     "rgba(255, 159, 64, 0.2)",
//                 ],
//                 borderColor: [
//                     "rgba(255, 99, 132, 1)",
//                     "rgba(54, 162, 235, 1)",
//                     "rgba(255, 206, 86, 1)",
//                     "rgba(75, 192, 192, 1)",
//                     "rgba(153, 102, 255, 1)",
//                     "rgba(255, 159, 64, 1)",
//                 ],
//                 borderWidth: 1,
//             },
//         ],
//     },
//     options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } },
// });
