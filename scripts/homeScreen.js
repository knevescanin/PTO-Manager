// Get elements from DOM
const popContainer = document.querySelector(".pop-container");
const logOutButton = document.getElementById("log-out")

// Get elements from DOM for dropdown menu
const selectMenu = document.querySelector(".select-user");
const Button = selectMenu.querySelector(".select-btn");
const employeeOptions = selectMenu.querySelector(".employee-options");

// Event listener on logout button to display logout pop container
logOutButton.addEventListener("click", () => {
    popContainer.classList.toggle("show");

})

// Get yes button from DOM
const yesButton = document.querySelector(".pop-yes")
// When yes button (user wants to logout) is pressed, delete the cookie and replace home screen back with sign in screen
yesButton.addEventListener("click", () => {
    cookieDelete();
    window.location.replace('Sign.html');
})
// If user pressed no button, remove logout pop container from screen
const noButton = document.querySelector(".pop-no")
noButton.addEventListener("click", () => {
    popContainer.classList.remove("show");
})
// Delete "isLoggedIn" cookie by setting cookie's expiry date to "Thu, 01 Jan 1970 00:00:00 UTC"
function cookieDelete() {
    const expire = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
    
    document.cookie = 'isLoggedIn' + '=' + '' + "; " + expire + "; path=/"; 
}


// Fetch data from "https://jsonplaceholder.typicode.com/users"
async function fetchEmployees(URL) {
    try {
        // Fetch data using GET request
        const response = await fetch(URL);
        const data = await response.json();
        // Had to use "Object.keys(data).length" instead of data.length because it didn't work. 
        console.log(Object.keys(data).length);
        addLocalStorageEmployees(data);
        addEmployeesToDropdownMenu(data);
        return data;

        // Catch error
    } catch (error) {
        console.error(error)
    }
}

// If local storage is empty, fetch data from "https://jsonplaceholder.typicode.com/users"
if(!localStorage.getItem("employees"))
{   // Await data before using
    const data = await fetchEmployees("https://jsonplaceholder.typicode.com/users")
}

// Load employees from local storage if page was refreshed
else {
    // Get employees from local storage
    const employees = JSON.parse(localStorage.getItem("employees"));

    // Add them to dropdown menu
    addEmployeesToDropdownMenu(employees);

    // For each employee load stored PTOs
    employees.forEach((employee) =>{
            employee.employeePTO.forEach((pto) => {
                const PTOstartDate = new Date(pto.start)
                const PTOendDate = new Date(pto.end)
                addNewPTOtoEmployee(employee.id, PTOstartDate, PTOendDate)
    })
    // For each employee show stored PTOs
        showEmployeeContainer(employee.id)
    })
}



// Dropdown menu - this tutorial: "https://www.youtube.com/watch?v=59bhXBQL5m0" helped me with making dropdown menu :)))
// Event listener which makes menu drop-down when pressed on dropdown menu
Button.addEventListener("click", () =>{
    selectMenu.classList.toggle("active");
} 
)


// Putting employees in dropdown menu
function addEmployeesToDropdownMenu(data) {
    for(let i=0; i < Object.keys(data).length; i++) {
        // Create list item for each employee and attach attributes(for CSS)
        const listItem = document.createElement("li");
        listItem.setAttribute("class", "option");

        // For each list item create span element which holds employee name which will be displayed in dropdown menu
        const spanItem = document.createElement("span");
        spanItem.setAttribute("class", "option-text");
        spanItem.textContent = data[i].name;
        createEmployeeContainer(data[i].id);

    
        // Add event listener to each lisItem (represents each employee) to call function listItemClicked 
    listItem.addEventListener("click", ((index) => {
        
        return () => {
            // If any employee was selected before this new employee, remove its id element
            const before = document.getElementById("selectedEmployee")
            if(before){
                before.removeAttribute("id", "selectedEmployee");
            }
            
            // Add attribute id with value "selectedEmployee" to the selected employee
            listItem.setAttribute("id", "selectedEmployee");
                listItemClicked(index, data);
        }
    }) (i))
    // When user selects employee hide dropdown menu
    listItem.addEventListener("click", () => {
        selectMenu.classList.remove("active");
    })
    
    // Append to dropdown menu 
    employeeOptions.appendChild(listItem);
    listItem.appendChild(spanItem);
    }

}


 // Display selected employee info into employee-info container
function listItemClicked(index, data) {
    const employeeInfo = document.querySelector(".employee-info")
    employeeInfo.innerHTML = `<p><span class="info id="employee-id">ID: </span><span id="span-id-value">${data[index].id}</span></p>
                        <p><span class="info" id="employee-name">Name: </span><span>${data[index].name}</span></p>
                        <p><span class="info id="employee-username">Username: </span><span>${data[index].username}</span></p>
                        <p><span class="info" id ="employee-email">Email: </span><span>${data[index].email}</span></p>
                        <p><span class="info" id="employee-city">City: </span><span>${data[index].address.city}</span></p>
                        <p><span class="info" id="employee-zipcode">Zipcode: </span><span>${data[index].address.zipcode}</span></p>
                        <p><span class="info" id="employee-street">Street: </span><span>${data[index].address.street}</span></p>
                        <p><span class="info" id="employee-phone">Phone: </span><span>${data[index].phone}</span></p>
                        <p><span class="info" id="employee-website">Website: </span><span>${data[index].website}</span></p>
                        <p><span class="info" id="employee-company">Company: </span><span>${data[index].company.name}</span></p>`

}



// Function for storing employees to the local storage
function addLocalStorageEmployees(data) {
    const employeesArray = [];
    // Make object for each employee
    data.forEach(employee => {
        const employeeObj = {
            // Employee's info
            id: employee.id,
            name: employee.name,
            username: employee.username,
            email: employee.email,
            address: employee.address,
            phone: employee.phone,
            website: employee.website,
            company: employee.company,
            // Here will be stored start and end date of each newly created PTO for each employee
            employeePTO: []
        };
        // Store it to the array
        employeesArray.push(employeeObj);
    });
    // Store arary to the local storage
    localStorage.setItem("employees", JSON.stringify(employeesArray));

}

// For each employee create employee container
function createEmployeeContainer(employeeID){
    const employees = JSON.parse(localStorage.getItem("employees"));
    
    // Employee container
    const employeeContainer = document.createElement("div");
    employeeContainer.classList.add("employee-container")
    employeeContainer.setAttribute("id",'employee-container-' + employeeID);

    // Employee info container
    const employeeInfoContainer = document.createElement("div");
    employeeInfoContainer.classList.add("employee-info-container");

    // Employee's information (name, username, email, id) which will be displayeed in employee info container
    // Name
    const employeeName = document.createElement("p");
    employeeName.textContent = employees[employeeID - 1].name;
    employeeName.classList.add("PTO-name"); 

    // Username
    const employeeUsername = document.createElement("p");
    employeeUsername.textContent = employees[employeeID - 1].username;
    employeeUsername.classList.add("PTO-usernmae");

    // Email
    const employeeEmail = document.createElement("p");
    employeeEmail.textContent = employees[employeeID - 1].email;
    employeeEmail.classList.add("PTO-email")

    // Id
    const employeeId = document.createElement("p");
    employeeId.classList.add("PTO-Id");
    employeeId.textContent = "Id: " + employeeID;

    // Container for displaying created PTO's (consists of past, current, future PTO container)
    const PTOsContainer = document.createElement("div");
    PTOsContainer.classList.add("PTOs-container")

    // past, current, future PTO container
    // Past
    const pastPTOContainer = document.createElement("div");
    pastPTOContainer.classList.add("past-PTO-container");
    pastPTOContainer.setAttribute("id", 'past-PTO-container-'+ employeeID);

    // Current
    const currentPTOContainer = document.createElement("div");
    currentPTOContainer.classList.add("current-PTO-container");
    currentPTOContainer.setAttribute("id", 'current-PTO-container-' + employeeID);

    // Future
    const futurePTOContainer = document.createElement("div");
    futurePTOContainer.classList.add("future-PTO-container");
    futurePTOContainer.setAttribute("id", 'future-PTO-container-' + employeeID); 
    
    // Text for past, current, future PTO container
    const pastPTO_text = document.createElement("p");
    pastPTO_text.setAttribute("class", 'heading');
    // Add text "Past PTO:"
    pastPTO_text.textContent = "Past PTO: ";
    // Append it to past PTO container
    pastPTOContainer.appendChild(pastPTO_text);

    const currentPTO_text = document.createElement("p");
    currentPTO_text.setAttribute("class", 'heading');
    // Add text "Current PTO:"
    currentPTO_text.textContent = "Current PTO: ";
    // Append it to current PTO container
    currentPTOContainer.appendChild(currentPTO_text);

    const futurePTO_text = document.createElement("p");
    futurePTO_text.setAttribute("class", 'heading');
    // Add text "Future PTO:"
    futurePTO_text.textContent = "Future PTO: ";
    // Append it to current PTO container
    futurePTOContainer.appendChild(futurePTO_text);


    // Add information to the HTML, as a child of employeeInfoContainer 
    employeeInfoContainer.appendChild(employeeName);
    employeeInfoContainer.appendChild(employeeUsername);
    employeeInfoContainer.appendChild(employeeEmail);
    employeeInfoContainer.appendChild(employeeId);


    // Make past, current, future PTO container child of PTOsContainer
    PTOsContainer.appendChild(pastPTOContainer);
    PTOsContainer.appendChild(currentPTOContainer);
    PTOsContainer.appendChild(futurePTOContainer);
    
    // Make PTOsContainer and employeeInfoContainer child of employeeContainer
    employeeContainer.appendChild(employeeInfoContainer);
    employeeContainer.appendChild(PTOsContainer);

    // Hide it since there is nothing to display
    employeeContainer.style.display = "none";

    // Add EmployeeContainer as a child of PTOView in HTML 
    const PTOView = document.querySelector(".PTO")
    PTOView.appendChild(employeeContainer);
    
}


// Add event listener for add PTO button which creates PTO and attaches it to employee 
const addPTOButton = document.querySelector(".PTO-btn");
addPTOButton.addEventListener("click", () => 
{
    // Get selected employee by id
    const selectedEmployee = document.getElementById("selectedEmployee");

    // Get start and end date from local storage
    const PTOstartDate = new Date(localStorage.getItem("PTOstartDate"));
    const PTOendDate = new Date(localStorage.getItem("PTOendDate"));
    const start = PTOstartDate.toDateString()
    const end = PTOendDate.toDateString()

    // Check if user selected an employee
    if(selectedEmployee == null)
    {   
        // If not, alert user
        alert('Please select an employee!');
    }

    // Check if user selected start date
    else if(localStorage.getItem("PTOstartDate") == '')
    {
        // If not, alert user
        alert('Please select start date on the first calendar!');
    }

    // Check if user selected end date
    else if(localStorage.getItem("PTOendDate") == '')
    {
        // If not, alert user
        alert('Please select end date on the second calendar!');
    }

    // Check if selected end date comes before start date
    else if(PTOstartDate > PTOendDate)
    {
        // If yes, alert user
        alert('Start date must be before end date. Please try again!');
    }

    // If the user has met all the conditions, call function to add PTO and to show PTOs 
    else {
        const employees = JSON.parse(localStorage.getItem("employees"));
        // Get id for selected employee
        const selectedEmployeeId = document.getElementById("span-id-value").innerHTML;
        
        // Push start and end date of PTO in employeePTO[]
        employees[selectedEmployeeId - 1].employeePTO.push({
            start,
            end
        });
        // Call function to add PTO for employee
        addNewPTOtoEmployee(selectedEmployeeId, PTOstartDate, PTOendDate);

        localStorage.setItem("employees", JSON.stringify(employees));
        // Call function to show all employee's PTOs
        showEmployeeContainer(selectedEmployeeId);
    }
    
})

    // Function which appends PTO as a child of past / current / future container based on values of start and end date
function addNewPTOtoEmployee(employeeID, PTOstartDate, PTOendDate){
   // Get today's date
    const currDate = new Date();
    // Create PTO
    const newPTO = createEmployeePTO(employeeID, PTOstartDate, PTOendDate);

    if(newPTO)
    {
        // Get each container from DOM
    const pastContainer = document.getElementById("past-PTO-container-" + employeeID);
    const currentContainer = document.getElementById("current-PTO-container-" + employeeID);
    const futureContainer = document.getElementById("future-PTO-container-" + employeeID);

        // If end date comes before current date, add PTO to past container
        if(currDate > PTOendDate)
        {

            pastContainer.appendChild(newPTO);
        }
        
        // If PTO started before current date and finishes after today's date, add PTO to current container
        else if((PTOstartDate <= currDate) && (PTOendDate >= currDate))
        {
            currentContainer.appendChild(newPTO);
        }

        // If start date comes after current date, add PTO to future container
        else if(PTOstartDate > currDate){
            futureContainer.appendChild(newPTO);
        }
    }
}

// Fucntion creates new PTO for employee
function createEmployeePTO(employeeID, PTOstartDate, PTOendDate){

    // Create new div element for newly created PTO. It must contain image of season that date belongs, start and end date of PTO, and button for deleting that PTO.
    const ptoContainer = document.createElement("div");
    ptoContainer.classList.add("pto-container");

    // Format date for better display
    const startDateArray = PTOstartDate.toString().split(" ");
    const endDateArray = PTOendDate.toString().split(" ");
    const dateFormat = document.createElement("p");
    dateFormat.textContent = `${startDateArray[2]} ${startDateArray[1]} ${startDateArray[3]} - ${endDateArray[2]} ${endDateArray[1]} ${endDateArray[3]}`;
    // Append formatted date as child of PTO
    ptoContainer.appendChild(dateFormat);

    // Determine season of PTO
    let season = determineSeason(PTOstartDate);
    
    if(season == "winter")
    {                                                       // Relative URL 
        ptoContainer.style.cssText = "background-image: url('../images/winter.jpeg')"
    }
    else if(season == "summer")
    {                                                       // Relative URL
        ptoContainer.style.cssText = "background-image: url('../images/summer.jpeg')"
    }
    else if(season == "autumn")
    {                                                       // Absolute URL
        ptoContainer.style.cssText = "background-image: url('https://images.unsplash.com/photo-1613985212734-166ffb5a513d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXV0dW1uJTIwZm9yZXN0fGVufDB8fDB8fHww')"
    }
    else if(season == "spring")
    {                                                       // Absolute URL
        ptoContainer.style.cssText = "background-image: url('https://a-z-animals.com/media/2023/05/shutterstock-2288520945-huge-licensed-scaled-1024x683.jpg')"
    }

    

    // Create delete button
    const deleteButton = document.createElement("i");
    deleteButton.classList.add("bx");
    deleteButton.classList.add("bx-x");
    // Append delete button as child of PTO
    ptoContainer.appendChild(deleteButton);

    // Add event listener to delete button, which calls function to delete PTO
    deleteButton.addEventListener("click", () => {
        deletePTO(deleteButton, PTOstartDate, PTOendDate, employeeID)
    })

    return ptoContainer;
}

    // Function which determines season of PTO 
function determineSeason(PTOstartDate){
    //  Months in Date objects go from 0 to 11, where 0 represents January and 11 represents December
    const startDateMonth = new Date(PTOstartDate).getMonth();


    // If PTO starts at March(2), April(3), May(4), return "spring" 
    if(startDateMonth == 2 || startDateMonth == 3 || startDateMonth == 4)
    {
        return "spring"
    }

    // If PTO starts at June(5), July(6), August(7), return "summer" 
    else if(startDateMonth == 5 || startDateMonth == 6 || startDateMonth == 7)
    {
        return "summer"
    }

    // If PTO starts at September(8), October(9), November(10), return "autumn" 
    else if(startDateMonth == 8 || startDateMonth == 9 || startDateMonth == 10){
        return "autumn"
    }

    // If PTO starts at December(11), January(0), February(1), return "winter" 
    else if(startDateMonth == 11 || startDateMonth == 0 || startDateMonth == 1)
    {
        return "winter"
    }
}


// Function for deleting selected PTO
function deletePTO(deleteButton, start, end, employeeID){

    // Get PTO container which is parent of pressed delete button
    const parentPTOcontainer =  deleteButton.parentNode;
    // Remove all children of PTO container("div")
    parentPTOcontainer.replaceChildren();
    // Remove PTO container("div")
    parentPTOcontainer.remove();

    const employees = JSON.parse(localStorage.getItem("employees"));

    // Slice employee PTO
    const slicedArray = employees[employeeID - 1].employeePTO.slice()

    // Variable which is declared in case we have two or more PTOs with same start and end date, so we don't delete all PTOs that have start and end date same as the PTO we want to delete. Helps delete selected PTO. 
    let count = 0;

    // Search every element in order to find PTO with wanted start and end date
   slicedArray.forEach((element, index) => {
        if((element.start == start.toDateString()) && (element.end == end.toDateString()) && (count == 0))
        {
            // Once we enter "if", we can't enter it again
            count++;
            // Splice is method which removes one("1") element (second parameter) from array at index
            slicedArray.splice(index, 1);

        }
    
   })
   // Slice(0) creates new array which is identical to original array
   employees[employeeID - 1].employeePTO = slicedArray.slice(0);

   // Store changes to local storage
   localStorage.setItem("employees", JSON.stringify(employees));

   // Show modifyed PTOs of employee
   showEmployeeContainer(employeeID)
   
}


// Function that shows all PTOs of employee
function showEmployeeContainer(employeeID){
    const employees = JSON.parse(localStorage.getItem("employees"));

    // Get employee's PTO container
    const employeeContainer = document.getElementById("employee-container-" + employeeID);

    // Past, current, future containers aswell
    const pastContainer = document.getElementById("past-PTO-container-" + employeeID);
    const currentContainer = document.getElementById("current-PTO-container-" + employeeID);
    const futureContainer = document.getElementById("future-PTO-container-" + employeeID);
    
    // Check if employee has any PTOs, if yes, enter if
    if(employees[employeeID - 1].employeePTO.length) {

        // Show employee's container
        employeeContainer.style.display = "";


        // Check if past container has any PTOs. Checking number of children of past container by using childNodes. If it has more then 1 (1 child is text added at 230th line of code). So it must have at least one PTO to show(at least 2 children). 
        if(pastContainer.childNodes.length > 1)
        {
            // Show past container if it has at least one PTO
            pastContainer.style.display = "";
        }
        else 
        {
            // Don't show if it doesn't have at least one PTO
            pastContainer.style.display = "none";
        }

        // Check if current container has any PTOs. Checking number of children of current container by using childNodes. If it has more then 1 (1 child is text added at 237th line of code). So it must have at least one PTO to show(at least 2 children). 
        if(currentContainer.childNodes.length > 1)
        {
            // Show current container if it has at least one PTO
            currentContainer.style.display = "";
        }
        else
        {
            // Don't show if it doesn't have at least one PTO
            currentContainer.style.display = "none";
        }

        // Check if future container has any PTOs. Checking number of children of future container by using childNodes. If it has more then 1 (1 child is text added at 244th line of code). So it must have at least one PTO to show(at least 2 children). 
        if(futureContainer.childNodes.length > 1)
        {
            // Show future container if it has at least one PTO
            futureContainer.style.display = "";
        }
        else{
            // Don't show if it doesn't have at least one PTO 
            futureContainer.style.display = "none";
        }
    }


    // If employee doesn't have any PTOs, don't show it's container
    else 
    {
        employeeContainer.style.display = "none";
    }
    
}