# 🏖️ _PTO Manager_
_PTO Manager_ is a web application, which simulates an administrator's platform within a company, providing an overview of employee information and the ability to manage Paid Time Off (PTO) for employees, including vacation days, sick leave, and other types of paid absences.

&nbsp;

## 💡Idea
This web application was created as a project for my _Programming for the Internet class at FESB_. The goal of this project was to apply all the skills learned through lab exercises by developing a web application.

&nbsp;

## 🛠️ Features
* **User Authentication:**
  * Users can sign in, with form validation using email and password requirements.
  * Passwords must include a minimum of 8 characters, at least one number, one uppercase letter, one lowercase letter, and one special character.
  * Successfully validated users are "logged in" by saving their session data in cookies.
  * A logout option is also provided, which clears session data and hides employee/PTO details.

&nbsp;

* **Employee Data:**
  * Employee data is fetched from an external API.
  * Logged-in users can view the list of employees and add PTO entries for each employee.

&nbsp;

* **PTO Management:**
  * Users can assign PTO for employees by specifying a start and end date. The start date must not be later than the end date, and the PTO can span a single day if the start and end date are the same.
  * Custom calendar widgets are implemented for date selection.
  * PTO entries are categorized into three sections: past, ongoing, and upcoming PTOs, with seasonal images used as background based on the PTO period.
  * PTO data is stored in localStorage.
  * Users can also delete PTO entries as needed.
 
  &nbsp;

## 💻 Technologies Used
* HTML
* CSS
* JavaScript
* localStorage for data persistence
* JSON Placeholder API for fetching employee data

&nbsp;

## ▶️ Application Preview


https://github.com/user-attachments/assets/10919691-224f-4ffc-a7df-aff1d9103a27


&nbsp;
 
## 🤝 Contributing

If you'd like to contribute to this project, please feel free to submit a pull request or file an issue on GitHub.

&nbsp;

## 📜 License

This project is licensed under the MIT License.

  
