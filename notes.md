# this is a guide to all the classes and id's in the html that KIL did for the convinesnce of the JS coders

ids - mondate, tuesdate, wendsdate, thrusdate, fridate, saturdate, sundate (rows 21 to 27)
 * these id's are for displaying the dates *once* at the top of the calender. use moment.js or something similar to set the id of "mondate" to have the contents of the day/month of the monday of that week

id - calender (row 30)
 * this is the actual calender that the user fills out. I thought about making it a table but it wouldn't be as customizable

ids - monday, tuesday, wednesday, thursday, friday, saturday, sunday (very speaced out but the first is on line 32) 
 * this is the id for the column of the day itself that the user interacts with. I have the idea that people can add a new "block" (keep reading) to an individual day

class - block (friken everywhere man)
 * this is the class for a block that a user uses for a simgle entry. use javascript to create new blocks.a

class - breakfast (a lot)
 * this is the class for the first of 3 default blocks. didn't want to give it a number in case they add a block before or inbetween blocks

class - lunch (a lot)
 * class for second defalut block

class - dinner (a lot)
 * third and final default block

class - timearea (a lot)
 * name is a combo of "time" and "textarea". this is where the user fills in the time they want for each block. contained withing "block"

class - mealarea (a lot)
 * name is a combo of "meal" and "textarea". this is where the user fills in their meal (and maybe notes). contained within "block"

class - redipearea (a lot)
 * name is a combo of "recipe" and "textarea". this is there the user enters a link to their recipe or interacts with one of ours. contained within "block"