
// Reset local storage "PTOstartDate" and "PTOendDate" every time page is refreshed
localStorage.setItem("PTOstartDate", "");
localStorage.setItem("PTOendDate", "");


// Calendar view - this tutorial: "https://www.youtube.com/watch?v=OcncrLyddAs" helped me with making calendar. :)))
const previousButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");
const monthYear = document.querySelector(".month-year");
const dates = document.querySelector(".dates");

// New date() is used to create date object with current date and time.
let currentDate = new Date();

const calendarUpdate = () => {
    // Get current month and current year
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Set variables to the first and last day of the current month. 
    const firstDay = new Date(currentYear, currentMonth, 0);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    // Set variable so we know how many days does each month have, using method getDate() which returns the day of the month for specified date (value between 1 and 31, which depends on the month).
    const totalDays = lastDay.getDate();

    // Method getDay() is used to specify day in the week of the date (0 represents Sunday and 6 represents Saturday).
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    // Method toLocaleString() returns Date object as a string
    const monthYearToString = currentDate.toLocaleString
    ('default', {month: 'long', year: 'numeric'});
    monthYear.textContent = monthYearToString;

    let HTMLDates = '';
    
    // Adds dates of previous month that can fit, to variable HTMLDates, for example if current month starts at Thursday, calendar will also display first Monday, Tuesday, Wednesday dates of previous month.
    for(let i = firstDayIndex; i > 0; i--) {
        const previousDate = new Date(currentYear, currentMonth, 0 - i + 1);
        HTMLDates += `<div class="date inactive">${previousDate.getDate()}</div>`;
    }


    // Adds all dates of current month to variable HTMLDates which calendar will display.
    for(let i = 1; i<= totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
        HTMLDates += `<div class="date ${activeClass}">${i}</div>`;
    }

    // Adds dates of next month that can fit, to variable HTMLDates, for example if current month ends at Friday, calendar also has to display first Saturday and Sunday dates of next month.
    for(let i = 1; i<= 7 - lastDayIndex; i++){
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        HTMLDates += `<div class="date inactive">${nextDate.getDate()}</div>`;
    }
    // Take all added dates which should be displayed for each month ( held in variable HTMLdates) and add them to HTML
    dates.innerHTML = HTMLDates;
    
    // Get all dates
    const date = document.querySelectorAll(".date")

    // Make dates selectable
    date.forEach(day => {
        day.addEventListener("click", () => {
            // If you want to select another date, remove attribute id from date that was selected before
           const before = document.getElementById("selectedDateStart");

           if(before)
           {
                before.removeAttribute("id", "selectedDateStart")
           }

            // Set attribute id with value "selectedDateStart" to the newly selected date 
            day.setAttribute("id", "selectedDateStart");

            // Store date in variable which will be stored formatted in local storage
            const selDate = new Date(currentYear, currentMonth, day.textContent);
            const selectedDate = selDate.toDateString();
            // Store newly selected date to local storage 
            localStorage.setItem("PTOstartDate", selectedDate);
        })
    })

}

// Change month to previous using previous button
previousButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    calendarUpdate();
})

// Change month to next using next button
nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    calendarUpdate();
})
// Function to update the calendar display
calendarUpdate();



// Duplicating calendar (everything explained above for the first calendar)
const previousButton2 = document.querySelector(".prev-btn2");
const nextButton2 = document.querySelector(".next-btn2");
const monthYear2 = document.querySelector(".month-year2");
const dates2 = document.querySelector(".dates2");

let currentDate2 = new Date();


const calendarUpdate2 = () => {
    const currentMonth2 = currentDate2.getMonth();
    const currentYear2 = currentDate2.getFullYear();
    const firstDay2 = new Date(currentYear2, currentMonth2, 0);
    const lastDay2 = new Date(currentYear2, currentMonth2 + 1, 0);
    const totalDays2 = lastDay2.getDate();

    const firstDayIndex2 = firstDay2.getDay();
    const lastDayIndex2 = lastDay2.getDay();

    const monthYearToString2 = currentDate2.toLocaleString
    ('default', {month: 'long', year: 'numeric'});
    monthYear2.textContent = monthYearToString2;

    let HTMLDates2 = '';
    
    for(let i = firstDayIndex2; i > 0; i--) {
        const previousDate2 = new Date(currentYear2, currentMonth2, 0 - i + 1);
        HTMLDates2 += `<div class="date2 inactive">${previousDate2.getDate()}</div>`;
    }

    for(let i = 1; i<= totalDays2; i++) {
        const date2 = new Date(currentYear2, currentMonth2, i);
        const activeClass = date2.toDateString() === new Date().toDateString() ? 'active' : '';
        HTMLDates2 += `<div class="date2 ${activeClass}">${i}</div>`;
    }

    for(let i = 1; i<= 7 - lastDayIndex2; i++){
        const nextDate2 = new Date(currentYear2, currentMonth2 + 1, i);
        HTMLDates2 += `<div class="date2 inactive">${nextDate2.getDate()}</div>`;
    }

    dates2.innerHTML = HTMLDates2;

    const date2 = document.querySelectorAll(".date2")

    date2.forEach(day => {
        day.addEventListener("click", () => {

            const before2 = document.getElementById("selectedDateEnd");

           if(before2)
           {
                before2.removeAttribute("id", "selectedDateEnd")
           }

            day.setAttribute("id", "selectedDateEnd");

            const selDate2 = new Date(currentYear2, currentMonth2, day.textContent);
            const selectedDate2 = selDate2.toDateString();

            
            localStorage.setItem("PTOendDate", selectedDate2);
        })
    })

}

previousButton2.addEventListener('click', () => {
    currentDate2.setMonth(currentDate2.getMonth() - 1);
    calendarUpdate2();
})

nextButton2.addEventListener('click', () => {
    currentDate2.setMonth(currentDate2.getMonth() + 1);
    calendarUpdate2();
})

calendarUpdate2();