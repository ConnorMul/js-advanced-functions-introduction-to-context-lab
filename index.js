// Your code here
function createEmployeeRecord(empInfo) {
    let empRecord = {
        firstName: empInfo[0],
        familyName: empInfo[1],
        title: empInfo[2],
        payPerHour: empInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    
    return empRecord
}

function createEmployeeRecords(empArrays) {
    return empArrays.map((emp) => createEmployeeRecord(emp))
}

function createTimeInEvent(empRecord, dateStamp) {
    let dateAndTime = dateStamp.split(" ")
    
    empRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateAndTime[1], 10),
        date: dateAndTime[0]
    })
    
    
    return empRecord
}

function createTimeOutEvent(empRecord, dateStamp) {
    let dateAndTime = dateStamp.split(" ")
    
    empRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateAndTime[1], 10),
        date: dateAndTime[0]
    })

    return empRecord
}

function hoursWorkedOnDate(empRecord, formDate) {
    
   let timeOut = empRecord.timeOutEvents.find(event => event.date === formDate)
    
   let timeIn = empRecord.timeInEvents.find(event => event.date === formDate)
    
   const hoursWorked = timeOut.hour - timeIn.hour
    
   return hoursWorked / 100
}

function wagesEarnedOnDate(empRecord, formDate) {
    
    let payOwed = hoursWorkedOnDate(empRecord, formDate) * empRecord.payPerHour
    
    return payOwed
}

function allWagesFor(empRecord) {
    let datesWorked = empRecord.timeInEvents.map((event) => event.date)
    
    let payable = datesWorked.reduce((memo, date) => memo + wagesEarnedOnDate(empRecord, date), 0)

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((emp) => emp.firstName === firstName)
}

function calculatePayroll(empRecordsArray) {
   return empRecordsArray.reduce((memo, record) => memo + allWagesFor(record), 0)
}