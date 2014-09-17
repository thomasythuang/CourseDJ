$(document).ready(function(){
    scheduler.config.first_hour = 7;
    scheduler.config.last_hour = 24;
    scheduler.config.start_on_monday = false;
    scheduler.config.dblclick_create = false;
    scheduler.config.mark_now = true;
    scheduler.init('scheduler_here', new Date('4/20/2014'), "week"); //Set for 1st week of qtr here

});