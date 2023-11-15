create database if not exists ProjectPhase03StringDemo;
use ProjectPhase03StringDemo;
#drop table Example;

create table Example (
	myChar CHAR(45),
    myVarchar VARCHAR(45),
    myBinary BINARY(15),
    myVarbinary VARBINARY(20),
    myBlob BLOB,
    myText TEXT,
    myEnum ENUM('word0','word1','word2','word3','word4'),
    mySet SET('word0','word1','word2','word3','word4')
);

insert into Example	(myChar,	myVarchar,		myBinary,	myVarbinary,	myBlob,		myText,		myEnum,		mySet						)
values				("char0",	"varchar0",		"binary0",	"varbinary0",	"blob0",	"text0",	1,			1							),
					("char1    ","varchar1    ","binary1    ","varbinary1    ","blob1    ","text1    ",2,		"word1    "					),
                    ("char2",	"varchar2",		"binary2",	"varbinary2",	"blob2",	"text2",	"word2",	"word2,word1"				),
                    ("char3",	"varchar3",		"binary3",	"varbinary3",	"blob3",	"text3",	"word3",	"word3,word2,word4,word3"	),
                    ("char4",	"varchar4",		"binary4",	"varbinary4",	"blob4",	"text4",	5,			"word4,word4"				);