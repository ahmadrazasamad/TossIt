const seBtn = document.getElementById("se-btn");
const bOf3Btn = document.getElementById("bo3-btn");
const fABtn = document.getElementById("fa-btn");

const p1SelName = document.getElementById("p1-name");
const p2SelName = document.getElementById("p2-name");

const p1NameInput = document.getElementById("player1-name");
const p2NameInput = document.getElementById("player2-name");

const p1Choice = document.querySelectorAll(`input[name="player1-choice"]`);
const p2Choice = document.querySelectorAll(`input[name="player2-choice"]`);

const winStatus = document.getElementById("status");
const bo3Table = document.getElementById("bo3-result");

const goback = document.getElementById("arrow-goback");

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
    if (typeof (res) !== "object") {
        return;
    } else {
        const tossResult = flipCoin();
        winStatus.style.display = "block";
        if (tossResult === res.p1Choice) {
            winStatus.innerHTML = `${res.p1Name} Wins`;
        } else {
            winStatus.innerHTML = `${res.p2Name} Wins`;
        }
        res.winStatus = winStatus.innerText; // for 1st toss
        return res;
    }
}

seBtn.addEventListener("click", () => {
    singleToss();
    resetInputValues();
});

let tossCount = 1;
let bo3TossResult = [];
bOf3Btn.addEventListener("click", () => {
    const res = singleToss(); // since for multiple times toss will be done once atleast, also collecting players data of players here from 1st toss
    if (typeof (res) === "object") {
        p1NameInput.parentElement.style.display = "none";
        p1SelName.innerText = res.p1Name;

        p2NameInput.parentElement.style.display = "none";
        p2SelName.innerText = res.p2Name;

        seBtn.style.display = "none";
        bOf3Btn.style.display = "none";
        fABtn.style.display = "inline";
        bo3Table.style.display = "block";

        bo3TossResult.push(res);
        bo3Table.innerHTML += `
            <tr>
                <td>Toss ${tossCount}</td>
                <td>${bo3TossResult[tossCount - 1].winStatus}</td>
            </tr>
        `;
    }
});

const backToOrignalState = () => {
    tossCount = 1;
    p1NameInput.parentElement.style.display = "block";
    p2NameInput.parentElement.style.display = "block";
    seBtn.style.display = "inline";
    bo3TossResult = [];
    bOf3Btn.style.display = "inline";
    bo3Table.innerHTML = "";
    bo3Table.style.display = "none";
    winStatus.style.display = "none";
    p1SelName.style.display = "none";
    p2SelName.style.display = "none";
    goback.style.display = "none";
    resetInputValues();
};

fABtn.addEventListener("click", () => {
    if (tossCount < 3) {
        const nextToss = singleToss();
        if (typeof (nextToss) === "object") {
            tossCount++;
            bo3TossResult.push(nextToss);
            bo3Table.innerHTML += `
            <tr>
                <td>Toss ${tossCount}</td>
                <td>${bo3TossResult[tossCount - 1].winStatus}</td>
            </tr>
            `;
        }
    }
    if (bo3TossResult.length > 1) {
        for (let i = 0; i < bo3TossResult.length; i++) {
            for (let j = i + 1; j < bo3TossResult.length; j++) {
                if (bo3TossResult[j] && (bo3TossResult[i].winStatus === bo3TossResult[j].winStatus)) {
                    winStatus.innerText = bo3TossResult[i].winStatus;
                    fABtn.style.display = "none";
                    goback.style.display = "block";
                    setTimeout(() => {
                        backToOrignalState();
                    }, 3000);
                }
            }
        }
    }
    if (bo3TossResult.length === 3) {
        fABtn.style.display = "none";
        goback.style.display = "block";
        setTimeout(() => {
            backToOrignalState();
        }, 3000);
    }
});

goback.addEventListener("click", () => backToOrignalState());