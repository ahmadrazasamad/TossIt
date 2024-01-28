const seBtn = document.getElementById("se-btn");
const bOf3Btn = document.getElementById("bo3-btn");

const p1NameInput = document.getElementById("player1-name");
const p2NameInput = document.getElementById("player2-name");

const p1Choice = document.querySelectorAll(`input[name="player1-choice"]`);
const p2Choice = document.querySelectorAll(`input[name="player2-choice"]`);

const winStatus = document.getElementById("status");

const checkTxt = element => {
    const elemValue = element.value.trim();
    const elemNamInpEM = element.parentElement.querySelector(".error-msg");
    if (elemValue === "") {
        element.parentElement.classList.add("error");

        elemNamInpEM.classList.add("error-msg-show");
    } else {
        element.parentElement.classList.remove("error");
        elemNamInpEM.classList.remove("error-msg-show");
    }
}

const chckChoices = () => {
    let flag = false;
    for (let i = 0; i < p1Choice.length; i++) {
        if (p1Choice[i].checked) {
            flag = true;
            const p1C = p1Choice[i].value;
            const p2C = p1C === "Heads" ? "Tails" : "Heads";
            return `P1 Choice: ${p1C}; P2 Choice: ${p2C}`;
        }
    }

    if (!flag) {
        const p1ChoiceEM = p1Choice[0].parentElement.querySelector(".error-msg");
        p1ChoiceEM.classList.add("error-msg-show");

        const p2ChoiceEM = p2Choice[0].parentElement.querySelector(".error-msg");
        p2ChoiceEM.classList.add("error-msg-show");
        return "Error in choice";
    }
}

const chckPlayersData = () => {
    const p1Name = p1NameInput.value.trim();
    const p2Name = p2NameInput.value.trim();
    if (p1Name !== "" && p2Name !== "") {
        const result = chckChoices();
        if (!result.includes("Error")) {
            const p1Choice = result.includes("P1 Choice: Tails") ? "Tails" : "Heads";;
            const p2Choice = p1Choice === "Heads" ? "Tails" : "Heads";
            return { p1Name, p1Choice, p2Name, p2Choice };
        } else {
            return result;
        }
    } else {
        if (p1Name === "" && p2Name === "") { // checkText used here for addition of error message classes
            checkTxt(p1NameInput);
            checkTxt(p2NameInput);

            return "Error in player 1 and player 2's name.";
        } else if (p1Name === "") {
            checkTxt(p1NameInput);

            return "Error in player 1's name.";
        } else {
            checkTxt(p2NameInput);

            return "Error in player 2's name.";
        }
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
    
    const elme1EM = element.parentElement.querySelector(".error-msg");
    elme1EM.classList.remove("error-msg-show");

    let element2;
    if (element.name === "player1-choice") {
        element2 = document.querySelector(`input[name="player2-choice"]`);
    } else {
        element2 = document.querySelector(`input[name="player1-choice"]`);
    }
    const elme2EM = element2.parentElement.querySelector(".error-msg");
    elme2EM.classList.remove("error-msg-show");
}

const resetInputValues = () => {
    p1NameInput.value = "";
    p2NameInput.value = "";

    p1Choice.forEach(p1C => {
        p1C.checked = false;
    });

    p2Choice.forEach(p1C => {
        p1C.checked = false;
    });
}

const flipCoin = () => {
    const toss = Math.floor(Math.random() * 2) + 1; // 1 === Heads; 2 === Tails
    return toss === 1 ? "Heads" : "Tails";
}

const singleToss = () => {
    const res = chckPlayersData();
    if (typeof (res) !== "object" && res.includes("Error")) {
        return;
    } else {
        const tossResult = flipCoin();
        winStatus.classList.remove("status-h");
        winStatus.classList.add("status-v");
        if (tossResult === res.p1Choice) {
            winStatus.innerHTML = `${res.p1Name} Wins`;
        } else {
            winStatus.innerHTML = `${res.p2Name} Wins`;
        }
        resetInputValues();
        return res;
    }
}

seBtn.addEventListener("click", () => {
    singleToss();
});

bOf3Btn.addEventListener("click", () => {
    const res = singleToss(); // since for multiple times toss will be done once atleast, also collecting players data of players here from 1st toss

    const p1SelDiv = document.getElementById("p1");
    const p2SelDiv = document.getElementById("p2");
});