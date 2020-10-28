var socket = io();

myStorage = window.localStorage;

otp = myStorage.getItem("voter_otp").split(" ")[0];
otp_count = parseInt(myStorage.getItem("voter_otp").split(" ")[1]);

console.log(otp, otp_count);

// dom elements
mainContainer = document.getElementsByClassName("mainContainer")[0];

if (otp_count > 1) {
    mainContainer.innerHTML = `<center><h1 style="color: red; padding-top: 10%">You Have Already Polled!</h1></center>`;
    window.location.href = "/otp.html";
}
else {
    myStorage.setItem('voter_otp', `${otp} 2`)
}

var data;
var settings = {
    url: `/events/questions/${otp}`,
    method: "GET",
    timeout: 0,
};

$.ajax(settings).done(function (response) {
    console.log(response);
    data = response;

    // When user clicks on any option then send that option statement
    // with the question number to the server which then forwards to the
    // user and their graph is rendered. Also save votes in db.
    count = 0;
    for (let key of Object.keys(response)) {
        // 1, 2, ...
        count += 1;
        var question_statement = "";
        option_prep = "";
        for (let key2 of Object.keys(response[key])) {
            // question, options
            // htmlPrepare = `<div class="container"></div>`

            if (key2 == "question") {
                question_statement = response[key][key2]["statement"];
                console.log(question_statement);
            }

            if (key2 == "options") {
                for (let key3 of Object.keys(response[key][key2])) {
                    // id is options id, we can find all other info from this
                    option_prep += `<button class="ui segment option_statement button" style="width:100%; margin:5px" id="${response[key][key2][key3]['_id']}">
                    ${response[key][key2][key3]["statement"]}
                    </button>`;
                }
            }
        }
        html_prep = `<div class="container"><br>
            <div class="ui raised segment" style="margin-top: 2px">
                <div class="ui label">Q ${count}</div>
                <h3>${question_statement}</h3>
            </div>
                ${option_prep}<br>`;
        mainContainer.insertAdjacentHTML("beforeend", html_prep);
    }
    containers = document.getElementsByClassName('container')
for (let i=0; i<containers.length; i++) {
    // container = containers[i]
    for (let j=0; j<containers[i].childNodes.length; j++) {
        if (containers[i].childNodes[j].classList != undefined && containers[i].childNodes[j].classList.contains('option_statement')) {
            // console.log(containers[i].childNodes[j].innerHTML)
            containers[i].childNodes[j].addEventListener('click', () => {
                console.log(containers[i].childNodes[j].innerHTML)
                containers[i].childNodes[j].classList.add("label");
                containers[i].childNodes[j].classList.add("green");
                socket.emit('vote', {
                    'option_id': containers[i].childNodes[j].id,
                    'otp': otp
                })
                containers[i].outerHTML = containers[i].outerHTML;
            })
        }
        // console.log(container.childNodes[j].classList)
    }
}
});

// containers = document.getElementsByClassName('container')
// for (let i=0; i<containers.length; i++) {
//     container = containers[i]
//     for (let j=0; j<container.childNodes.length; j++) {
//         // if (container.childNodes[j].classList != undefined && container.childNodes[j].classList.contains('option_statement')) {
//         //     container.childNodes[j].addEventListener('click', () => {
//         //         console.log(container.childNodes[j])
//         //     })
//         // }
//         console.log(container.childNodes[j].classList)
//     }
// }

socket.on("poll_result", (json_data) => {
    status_code = json_data["status_code"];
    if (status_code == "200") {
        console.log("Polled Successfully");
    } else {
        console.log(`Fail ${status_code}`);
    }
});
