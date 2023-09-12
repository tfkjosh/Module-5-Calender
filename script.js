// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
 // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var currentDayEl = $('#currentDay');
  var containerEl = $('.container');
  var currentHourEL = $('currentHour')
 

  var workDayHours = [
    currentHour(7).format('hA'),
    currentHour(8).format('hA'),
    currentHour(9).format('hA'),
    currentHour(10).format('hA'),
    currentHour(11).format('hA'),
    currentHour(12).format('hA'),
    currentHour(1).format('hA'),
    currentHour(2).format('hA'),
    currentHour(3).format('hA'),
    currentHour(4).format('hA'),
    currentHour(5).format('hA'),

   
];
 //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  var timeBlockHour = $('col-1 hour')
  var task = $('.description')

  var currentDay = moment().format('dddd, MMMM Do');
  currentDayEl.text(currentDay);
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  function auditTimeBlock(timeBlockEventSpace) {
    var currentTimeBlockHour = moment($(timeBlockHour).text().trim(), 'hA').hour();
    $(timeBlockEventSpace).removeClass('past present future');
    if (currentTimeBlockHour > currentHour) {
      $(timeBlockEventSpace).addClass('future');
  }
  else if (currentTimeBlockHour === currentHour) {
      $(timeBlockEventSpace).addClass('present');
  }
  else {
      $(timeBlockEventSpace).addClass('past');
  }
}

function loadTask() {
  for (var i = 0; i < workDayHours.length; i++) {
    let task = localStorage.getItem(workDayHours[i])
    if (task) {
      $('#' + (i + 9)).siblings().first().children().text(task);
    }
    }
  }
  function saveTask(hour, task) {
    localStorage.setItem(hour, task);
}

for (var i =0; i < workDayHours.length; i++) {
  var timeBlockRow = $('<div>')
    .addClass('row time-block')
    .attr({
      id: 'row-' + (i +9)
    })

    var timeBlockHour = $('<div>')
        .addClass('col-1 hour')
        .text(workDayHours[i])
        .attr({
            id: i + 9
        })
        
        var timeBlockEventSpace = $('<div>')
        .addClass('col-10')
        .attr({
            id: 'time-block-' + (i + 9)
        })
        
        var userInput = $('<p>')
        .addClass('description')
        .text(' ')
        .attr({
            id: 'Hour-' + (i + 9)
        });

        auditTimeBlock(timeBlockEventSpace);

        var saveBtn = $('<button>')
        .addclass('col-1 saveBtn')
        .attr({
          id: 'save-button-' + (i + 9),
          type: 'button',
        })

        .on('click', function () {
          var hour = $(this).siblings().first().text();
          var task = $(this).siblings().last().text();
          saveTask(hour, task)
        })

        var saveIcn = $('<i>')
        .addClass('fas fa-save');
        $(containerEl).append(timeBlockRow);
        $(timeBlockRow).append(timeBlockHour);
        $(timeBlockRow).append(timeBlockEventSpace);
        $(timeBlockEventSpace).append(userInput);
        $(timeBlockRow).append(saveBtn);
        $(saveBtn).append(saveIcon);
}

  $('.col-10').on('blur', 'textarea', function () {
    var text = $(this)
      .val()
      .trim();

    var userTextp = $('<p>')
      .addClass('description')
      .text(text);

      $(this).replaceWith(userTextp);

  })

  loadTask();






  
  // TODO: Add code to display the current date in the header of the page.

