const date_picker_element = document.querySelector('.date-picker');
const selecte_date = document.querySelector('.selected-date');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const week_element = document.querySelector('.date-picker .dates .weekDays');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');
const times_element = document.querySelector('.times');
const timeInput = document.getElementById('date_time');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const times = [{ time: '09:00:00', title: '9 am' }, { time: '11:00:00', title: '11 am' }, { time: '13:00:00', title: '1 pm' }, { time: '15:00:00', title: '3 pm' }, { time: '17:00:00', title: '5 pm' }];


let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let weekD = date.getDay();


let offDayArray = []
let weekNo = 1;

let selectedWeekDay = weekD;
let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;
let selectedTime = '00:00:00';

let fullSelectedDateAndTime = ''

mth_element.textContent = months[month] + ' ' + year;


// CREATING WEEK ROW 
const getAllWeekDays = (startIndex) => {

    for (let i = startIndex; i < startIndex + wd.length; i++) {
        const index = i % wd.length;
        if (wd[index] === 'Sun') {
            offDayArray.push(false)
        } else {
            offDayArray.push(true)
        }

        const Wday_element = document.createElement('span');
        Wday_element.classList.add(`weekDay-${index}`);
        Wday_element.classList.add(`weekDay`);
        Wday_element.textContent = wd[index];
        week_element.appendChild(Wday_element);
    }

}

getAllWeekDays(weekD)

const selectADate = () => {
    fullSelectedDateAndTime = `${selectedDay}/${selectedMonth}/${selectedYear} ${selectedTime}`
    console.log('selected time', fullSelectedDateAndTime);
    timeInput.value = fullSelectedDateAndTime
}
const changeSelectionDate = (day_elements) => {
    const elements = days_element.querySelectorAll('.day');
    elements.forEach(sibling => {

        if (sibling.classList.contains('selected')) {
            sibling.classList.remove('selected');
        }
    });
    day_elements.classList.add('selected');
}
const changeSelectionTime = (time_element) => {
    const elements = times_element.querySelectorAll('.time');
    elements.forEach(sibling => {

        if (sibling.classList.contains('selected')) {
            sibling.classList.remove('selected');
        }
    });
    time_element.classList.add('selected');
}

// CREATING DAY ROW 
const getWeekDates = (day) => {
    days_element.innerHTML = ''
    let ind = 0;
    for (let i = day; i < day + 7; i++) {
        const futureDate = new Date();
        futureDate.setDate(i);
        const fDate = futureDate.getDate()
        const day_elements = document.createElement('span');
        day_elements.classList.add(`day-${fDate}`);
        day_elements.classList.add(`day`);
        day_elements.textContent = fDate;
        days_element.appendChild(day_elements);
        if (!offDayArray[ind]) {
            day_elements.setAttribute('disabled', true);
            day_elements.style.color = "#aaa";
            day_elements.style.cursor = "auto";
        } else {

            day_elements.addEventListener('click', function () {
                changeSelectionDate(day_elements)

                selectedDay = futureDate.getDate()
                selectedYear = futureDate.getFullYear()
                selectedMonth = futureDate.getMonth()

                times_element.innerHTML = ''
                for (let i = 0; i < 5; i++) {
                    const time_element = document.createElement('span');
                    time_element.classList.add(`time-${i}`);
                    time_element.classList.add(`time`);
                    time_element.setAttribute(`data-time`, times[i].time);
                    time_element.textContent = times[i].title;
                    times_element.appendChild(time_element);
                    time_element.addEventListener('click', function () {
                        selectedTime = this.getAttribute('data-time');
                        changeSelectionTime(time_element)
                        selectADate(futureDate)
                    })
                }
            });
        }

        month = futureDate.getMonth()
        year = futureDate.getFullYear()

        mth_element.textContent = months[month] + ' ' + year;
        ind++
    }

}

getWeekDates(day);

next_mth_element.addEventListener('click', () => {
    weekNo = weekNo + 1;
    getWeekDates(day + (7 * (weekNo - 1)));
});

prev_mth_element.addEventListener('click', () => {
    if (weekNo > 1) {
        console.log('clickede')
        weekNo = weekNo - 1;
        getWeekDates(day + (7 * (weekNo - 1)));
    } else if (weekNo === 1) {
        getWeekDates(day);
    }
});
