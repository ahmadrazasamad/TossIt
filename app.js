const seBtn = document.getElementById("se-btn");
const bOf3Btn = document.getElementById("bo3-btn");

const p1NameInput = document.getElementById("player1-name");
const p2NameInput = document.getElementById("player2-name");

const chckChoices = () => {
    const p1Choice = document.querySelectorAll(`input[name="player1-choice"]`);
    const p2Choice = document.querySelector(`input[name="player2-choice"]`);

    let flag = false;
    for (let i = 0; i < p1Choice.length; i++) {
        if (p1Choice[i].checked) {
            flag = true;
            const p1C = p1Choice[i].value;
            const p2C = p1C === "Heads" ? "Tails" : "Heads";
            return `P1 Choice: ${p1C}, P2 Choice: ${p2C}`;
        }
    }

    if (!flag) {
        p1Choice[0].parentElement.childNodes[9].classList.add("error-msg-show");
        p2Choice.parentElement.childNodes[9].classList.add("error-msg-show");
        return "Error in choice";
    }
}

const chckPlayersNames = () => {
    const p1Name = p1NameInput.value;
    const p2Name = p2NameInput.value;
    if (p1Name.trim() !== "" && p2Name.trim() !== "") {
        const result = chckChoices();
        if (!result.includes("Error")) {
            return ``;
        } else {
            return result;
        }
    } else {
        if (p1Name.trim() === "" && p2Name.trim() === "") {
            p1NameInput.parentElement.classList.add("error");
            p2NameInput.parentElement.classList.add("error");
            const targetElements = [p1NameInput.parentElement.childNodes[5], p2NameInput.parentElement.childNodes[5]];
            targetElements.forEach(element => {
                element.classList.add("error-msg-show");
            });
            return "Error in player 1 and player 2's name.";
        } else if (p1Name.trim() === "") {
            p1NameInput.parentElement.classList.add("error");
            p1NameInput.parentElement.childNodes[5].classList.add("error-msg-show");
            return "Error in player 1's name.";
        } else {
            p2NameInput.parentElement.classList.add("error");
            p2NameInput.parentElement.childNodes[5].classList.add("error-msg-show");
            return "Error in player 2's name.";
        }
    }
}

const checkTxt = (element) => {
    const elemValue = element.value;
    if (elemValue.trim() === "") {
        element.parentElement.classList.add("error");
        element.parentElement.childNodes[5].classList.add("error-msg-show");
    } else {
        element.parentElement.classList.remove("error");
        element.parentElement.childNodes[5].classList.remove("error-msg-show");
    }
}

const toggleChck = (element) => {
    if (element.name === "player1-choice" && element.value === "Heads") {
        const tails = document.querySelector(`input[name="player2-choice"][value="Tails"]`);
        tails.checked = true;
    } else if (element.name === "player1-choice" && element.value === "Tails") {
        const heads = document.querySelector(`input[name="player2-choice"][value="Heads"]`);
        heads.checked = true;
    } else if (element.name === "player2-choice" && element.value === "Heads") {
        const tails = document.querySelector(`input[name="player1-choice"][value="Tails"]`);
        tails.checked = true;
    } else {
        const heads = document.querySelector(`input[name="player1-choice"][value="Heads"]`);
        heads.checked = true;
    }

    element.parentElement.childNodes[9].classList.remove("error-msg-show");
    if (element.name === "player1-choice") {
        const element2 = document.querySelector(`input[name="player2-choice"]`);
        element2.parentElement.childNodes[9].classList.remove("error-msg-show");
    } else {
        const element2 = document.querySelector(`input[name="player1-choice"]`);
        element2.parentElement.childNodes[9].classList.remove("error-msg-show");
    }
}

seBtn.addEventListener("click", () => {
    const res = chckPlayersNames();
    if (res.includes("Error")) {
        return;
    } else {
        console.log(res);
    }
});