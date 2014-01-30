/*

datewait.js
30/01/2014

No warranty expressed or implied. Use at your own risk
@author: bhupendraparihar
@twitterID: pariharb

This utility provides the methods to find the difference between two dates in terms of number of years, months and days.

This file provides the following methods

function datediff
	parameters : eventDate and newDate
	Object returned by the function is having years, months and days as property

*/

var datewait = {

		//Difference between two dates in MM/DD/YYYY format
		datediff: function(date1,date2){ //date2 can be today's date
			
			var _eventDate,
					_newDate,
					daysDiff = 0,
					monthDiff = 0,
					yearDiff = 0,
					dateSwaped = false;

			//creating a local copy of date1 as Date type object
			if(date1 == undefined || date1 ==="" || date1 == null){

				//If date1 is undefined or blank or null assign _eventDate as today's date
				_eventDate = new Date();

			}else{

				//Create _eventDate using the valid parameter passed to function
				_eventDate = new Date(date1);	

			}			
			
			//creating a local copy of date2 as Date type object
			if(date2 == undefined || date2 === "" || date2 == null){
				
				_newDate = new Date();

			}else{
				
				_newDate = new Date(date2);

			}


			//Swap the date if _newDate is older than _eventDate
			if(_eventDate>_newDate){
				
				var tempDate = _eventDate;
				_eventDate = _newDate;
				_newDate = tempDate;
				
				//Setting the dateSwaped as true if the _newDate is older than _eventDate
				dateSwaped = true;
			}

			//Get Year, Month and Date from eventDate and newDate
			var	_eventYear = _eventDate.getFullYear(),
					_eventMonth = _eventDate.getMonth() + 1,
					_eventDate = _eventDate.getDate();

			var _currentYear = _newDate.getFullYear(),
			    _currentMonth = _newDate.getMonth() + 1,
			    _currentDate = _newDate.getDate();

			//daysDiff calcuations
			//find the difference between current 
			if(_currentDate>=_eventDate){
				
				daysDiff = _currentDate - _eventDate;

			}else{

				_currentDate = _currentDate + datewait.getDaysInMonth(_currentMonth,_currentYear);
				daysDiff = _currentDate - _eventDate;
				_currentMonth--;
	
			}

			//monthsDiff calculations
			if(_currentMonth>=_eventMonth){
				
				monthDiff = _currentMonth - _eventMonth;

			}else{
				
				_currentYear--;
				_currentMonth = _currentMonth + 12;
				monthDiff = _currentMonth - _eventMonth;

			}

			//yearDiff calculations
			yearDiff = _currentYear - _eventYear

			//DateDiff Object
			return {
				"years":yearDiff,
				"months":monthDiff,
				"days":daysDiff,
				"date1":_eventDate,
				"date2":_newDate,
				"dateSwaped": dateSwaped
			}
		},

		//gets the number of days in a particular month of a particular year
		getDaysInMonth: function(m, y) {
   			
   			return /8|3|5|10/.test(--m)?30:m==1?(!(y%4)&&y%100)||!(y%400)?29:28:31;

		},

		//Age of event in years , months and days
		getEventAge: function(eventDate){
		
			return datewait.datediff(eventDate,"");
			
		}
};
