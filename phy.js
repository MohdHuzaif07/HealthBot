import { API_KEYS } from "./config.js";
const typebox = document.querySelector(".inputbox");
let url = "https://api.groq.com/openai/v1/chat/completions";

const messages = [{ role: "system", content: "you are physical fitness health chatbotonly about workout and diet plan you will talk" }];
const messageConsole = document.querySelector(".message");
const histories = document.querySelector(".histories1");
const chathistory = {};
chathistory.conversation = [];
const searchbox = document.querySelector(".searchbar");
const listitems = document.querySelectorAll(".items li");

let list = [];
window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        if (typebox.value !== "") {
            sendToBot(typebox.value);
            createMessageBox(typebox.value, "usermessage");
            list.push(typebox.value)
            typebox.value = ""
        }






    }

});
function createMessageBox(datas, classname) {

    const messagebox = document.createElement("div");
    messagebox.classList.add(classname);
    messagebox.innerHTML = datas;
    messageConsole.prepend(messagebox);


}
async function sendToBot(data) {
    messages.push({ role: "user", content: data });
    const request = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEYS}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: messages
        })

    }
    try {
        const send = await fetch(url, request);
        const response = await send.json();
        console.log(response.choices[0].message.content);
        list.push(response.choices[0].message.content);
        createMessageBox(response.choices[0].message.content, "botmessage")
    }
    catch (Err) {
        console.log(Err)
    }
}
function disappear() {
    messageConsole.innerHTML = "";
    chathistory.conversation.push([{ subject: list[0], convo: list }]);

    list = [];

    let source = (JSON.parse(localStorage.getItem("chatHistory")) || []);
    source.push(chathistory);
    localStorage.setItem("chatHistory", JSON.stringify(source))
    messages.splice(1);
}
window.disappear = disappear
let histiry = JSON.parse(localStorage.getItem
    ("chatHistory"));
let memory = (histiry);
function searching() {
    const searchvalue = searchbox.value.toLowerCase();
    listitems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (searchvalue && text.includes(searchvalue)) {
            item.style.background = "darkgreen";
        }
        else {
            item.style.background = "inherit";
        }
    })

}
window.searching = searching



for (let i = 0; i < memory.length; i++) {

    const memorylist = document.createElement("li");
    memorylist.classList.add("historylist");
    if (histiry[i].conversation[0][0].subject != undefined) {

        memorylist.innerHTML = histiry[i].conversation[0][0].subject;
        histories.appendChild(memorylist);
    }
}
const showhistory = document.querySelectorAll(".historylist");
showhistory.forEach(function (showhistory) {
    showhistory.addEventListener("click", function (event) {
        const clicked = event.target.innerHTML;

        diisplay(clicked);
    })
})

console.log(JSON.parse(localStorage.getItem("chatHistory")));
console.log(memory[2].conversation[0][0].convo)
function diisplay(subj) {

    let historyData = JSON.parse(localStorage.getItem
        ("chatHistory"));

    messageConsole.innerHTML = "";
    for (let i = 0; i < historyData.length; i++) {
        let memory = (historyData[i].conversation[0]
        [0]);
        if ((memory.subject) == subj) {
            const convoes = memory.convo;
            for (let j = 0; j < convoes.length; j++) {
                if (j % 2 == 0) {
                    createMessageBox(memory.convo[j], "usermessage");
                }
                else {
                    createMessageBox(memory.convo[j], "botmessage");
                }

            }
            break;
        }
    }
}


// memorylist.innerHTML = ;
//memorylist.onclick = displaymessages(memorylist.innerHTML);

// memorylist.onclick =
function displaystorage() {
    if (histories.style.display == "none") {
        histories.style.display = "block";

    }
    else {
        histories.style.display = "none";

    }


}
window.displaystorage = displaystorage
function showoption() {
    let displays = document.querySelector(".option");
    if (displays.style.display == "none") {
        displays.style.display = "block";
    }
    else {
        displays.style.display = "none";
    }
}
window.showoption = showoption
function displaymessages(values) {
    let array = JSON.parse(localStorage.getItem("chatHistory"));
    console.log(values)

    console.log(array[0].conversation[0][0].convo);
    for (let i = 0; i < array[0].conversation[0][0].convo.length; i++) {
        console.log(array[0].conversation[0][0].convo[i])
    }
    console.log("done");
}
window.displaymessages = displaymessages





