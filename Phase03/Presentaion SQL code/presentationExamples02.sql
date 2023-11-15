use ProjectPhase04NumberDemo;

select * from Example;
select myInt, myTinyInt, mySmallInt, myMediumInt, myDecimal, myFloat from Example;

select concat(
myInt, ' ',
myTinyInt, ' ', 
mySmallInt, ' ', 
myMediumInt, ' ', 
myDecimal, ' ',
myFloat)
 as concatenation from Example;