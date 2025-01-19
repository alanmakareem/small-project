const busNum = 136//parseInt(prompt(`Type bus number:`));
const inputTime = `6:22`//prompt(`When do you want to go? (use H:MM format)`);
const tt = `time`//prompt(`Type 'TIME' to show the next 10 schedule for bus no.${busNum}. Skip to see the next bus arrival time.`).toLowerCase();

let startHour = null;
let startMinute = null;
let interval = null;

if (typeof busNum === `string`) {
    console.log(`*** INVALID BUS NUMBER ***`);
} else if (busNum === 125) {
    startHour = 8
    startMinute = 13
    interval = 8
} else if (busNum === 136) {
    startHour = 7
    startMinute = 56
    interval = 7
} else {
    console.log(`Bus no.${busNum} is not available.`);
} 

//for showing timetable after user time input:
function timeSchedule(inputTime) {
    const [inputHour, inputMinute] = inputTime.split(`:`).map(Number);
    const inputTimeInMinutes = inputHour * 60 + inputMinute;
    let startTimeInMinutes = startHour * 60 + startMinute;

    const minutesSinceStart = inputTimeInMinutes - startTimeInMinutes;
    const minutesLeft = interval - (minutesSinceStart % interval);

    let nextTimeInMinutes = inputTimeInMinutes + minutesLeft;

    if (inputTimeInMinutes < startTimeInMinutes) {
        console.log(`Here is the timetable for bus no.${busNum}:`);
        for (let i = 0; i < 10; i++) {
            const earlyHour = Math.floor(startTimeInMinutes / 60);
            const earlyMinute = startTimeInMinutes % 60;
            console.log(`${i + 1}. ${earlyHour}:${earlyMinute < 10 ? `0${earlyMinute}` : earlyMinute}`);
            startTimeInMinutes += 8;
        }

        console.log(`***** END *****`);
    } else {
        console.log(`The next 10 schedules for bus no.${busNum} are:`);

        for (let i = 0; i < 10; i++) {
            const scheduleHour = Math.floor(nextTimeInMinutes / 60);
            const scheduleMinute = nextTimeInMinutes % 60;
            console.log(`${i + 1}. ${scheduleHour}:${scheduleMinute < 10 ? `0${scheduleMinute}` : scheduleMinute}`);
            nextTimeInMinutes += interval;
        }

        console.log(`***** END *****`);
    }
}

//for showing how many minutes left until the next bus
function busSchedule(startHour, startMinute, interval, inputTime) {
    const startTimeInMinute = startHour * 60 + startMinute;
    const [inputHour, inputMinute] = inputTime.split(`:`).map(Number);
    const inputTimeInMinute = inputHour * 60 + inputMinute;

    if (inputTimeInMinute < startTimeInMinute) {
        console.log(`No buses yet`);
        console.log(`The first bus no.${busNum} starts at ${startHour}:${startMinute < 10 ? `0${startMinute}` : startMinute}.`);
        return;
    }

    const minuteSinceStart = inputTimeInMinute - startTimeInMinute;
    const minutesLeft = interval - (minuteSinceStart % interval);

    return minutesLeft === interval ? 0 : minutesLeft;
}

const minutesLeft = busSchedule(startHour, startMinute, interval, inputTime);

if (typeof minutesLeft === `string`) {
    console.log(minutesLeft);
} else if (tt === `time`) {
    timeSchedule(inputTime);
} else if (minutesLeft === 0) {
    console.log(`Bus no.${busNum} is arriving now!`);
} else {
    console.log(`The next bus no.${busNum} will be in ${minutesLeft} minute(s).`);
}