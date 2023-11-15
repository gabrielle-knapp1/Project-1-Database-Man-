use ProjectPhase03StringDemo;

select * from Example;
select myChar, myVarchar, myBinary, myVarbinary, BINARY(myBlob), myText, myEnum, mySet from Example;

select concat(	myChar, ", ",
				myVarchar, ", ",
                myBinary, ", ",
                myVarbinary, ", ",
                cast(myBlob as char(45) CHARACTER SET utf8), ", ",
                cast(myText as char(45) CHARACTER SET utf8), ", ",
                myEnum, ", (",
                mySet, ")")
as concatenation from Example;