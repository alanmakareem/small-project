const busNum = 125;
const inputTime = `9:12`;

let startHour = null;
let startMinute = null;
let interval = null;

if (typeof busNum === `string`) {
    console.log(`*** INVALID BUS NUMBER ***`);
} else if (busNum === 125) {
    startHour = 8
    startMinute = 3
    interval = 8
} else if (busNum === 136) {
    startHour = 7
    startMinute = 56
    interval = 6
} else {
    console.log(`Bus no.${busNum} is not available.`);
};

console.log(busNum);
console.log(startHour);
console.log(startMinute);
console.log(interval);

function busSchedule(startHour, startMinute, interval, inputTime) {
    const startTimeInMinute = startHour * 60 + startMinute;
    const [inputHour, inputMinute] = inputTime.split(`:`).map(Number);
    const inputTimeInMinute = inputHour * 60 + inputMinute;

    if (inputTimeInMinute < startTimeInMinute) {
        console.log(`No buses yet`);
        if (startMinute < 10) {
            console.log(`The first bus no.${busNum} will start at ${startHour}:0${startMinute}`);
        } else {
            console.log(`The first bus no.${busNum} will start at ${startHour}:${startMinute}`);
        }
    }

    const minuteSinceStart = inputTimeInMinute - startTimeInMinute;
    const minutesLeft = interval - (minuteSinceStart % interval);

    return minutesLeft === interval ? 0 : minutesLeft;
}

const minutesLeft = busSchedule(startHour, startMinute, interval, inputTime);

if (typeof minutesLeft === `string`) {
    console.log(minutesLeft);
} else if (minutesLeft === 0) {
    console.log(`Bus no.${busNum} is arriving now!`);
} else {
    console.log(`Bus no.${busNum} will arrive in ${minutesLeft} minute(s)`);
}