# Unit4 Advanced Queries  MQL

## Query Operators:

  $
  - precedes MQL operators
  - precedes Aggregation pipeline stages
  - Allows Access to Field Values

  **Comapirison**

  $eq = EQual to  ||  $ne = NotEqual to
  $gt > Greater Than  ||  $lt < Less Than
  $gte >= Greater Than or Equal to  || $lte <= Less Than or Equal to

  Comparison Operators specifically allow finding data within a certain range

    { <field>: { <operator>: <value> } }
    $eq is default 


mongo mongo "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/admin"


**login**

mongo "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.tbzlc.mongodb.net/firstCert"

use sample_training

db.trips.find({ "tripduration": { "$lte" :100 },
                "usertype": { "$ne": "Subscriber" } }).pretty()


db.trips.find({ "tripduration": { "$lte" : 70 },
                "usertype": { "$eq": "Customer" }}).pretty()

db.trips.find({ "tripduration": { "$lte" : 70 },
                "usertype": "Customer" }).pretty()               

### Lab 1: Comparison Operators
How many documents in the sample_training.zips collection have fewer than 1000 people listed in the pop field?
db.zips.find({"pop":{"$lt":1000}}).count()
How many documents in the sample_training.zips collection have fewer than 1000 people listed in the pop field?

### Lab 2: Comparison Operators

What is the difference between the number of people born in 1998 and the number of people born after 1998 in the sample_training.trips collection?
Expression 1 born in 1998:
      db.trips.find({"birth year": 1998}).count()

Expression 2 Born after 1998:
      db.trips.find({"birth year": {$gt: 1998} }).count()

db.trips.find({"birth year":{"$gt":1998}}).count() - db.trips.find({"birth year":1998}).count()

  

  Query Operators - Logic

  $and  meet all specifications (is implicit if not specified)
  $or   at least one spec
  $nor  returns only those that fail to match  (use as filter)
  $not  negates the query specification returna all that do not match

use sample_training
db.routes.find({ "$and": [ { "$or" :[ { "dst_airport": "KZN" },
                                    { "src_airport": "KZN" }
                                  ] },
                          { "$or" :[ { "airplane": "CR2" },
                                     { "airplane": "A81" } ] }
                         ]}).pretty()


Atlas command:
{$nor: [{result: "No Violation Issued"}, {result: "Violation Issued"}]}
{$nor: [{result: "No Violation Issued"}, {result: "Violation Issued"}, {result:"Pass"}, {result:"Fail"}]}


1. How many businesses in the sample_training.inspections dataset have the
   inspection result "Out of Business" and belong to the Home Improvement
   Contractor - 100 sector?
sector:"Home Improvement Contractor - 100"

db.inspections.find({"result":"Out of Business", "sector":"Home Improvement Contractor - 100"}).count()

db.inspections.find({$and : [{"result":"Out of Business"}, {"sector":"Home Improvement Contractor - 100"}]}).count()

Quiz 2: Logic Operators
Which is the most succinct query to return all documents from the sample_training.inspections collection where the inspection date is either "Feb 20 2015", or "Feb 21 2015" and the company is not part of the "Cigarette Retail Dealer - 127" sector?


db.inspections.find({ "$or": [ { "date": "Feb 20 2015" },{ "date": "Feb 21 2015" } ],"sector": { "$ne": "Cigarette Retail Dealer - 127" }}).pretty()




### Chapter 4: Advanced CRUD Operations

Lab 1: Logic Operators
db.zips.updateMany({ "city": "HUDSON" }, { "$inc": { "pop": -10 } })

How many zips in the sample_training.zips dataset are neither over-populated nor under-populated?

In this case, we consider population of more than 1,000,000 to be over- populated and less than 5,000 to be under-populated.

Copy/paste the exact numeric value (without double quotes) of the result that you get into the response field.

Atlas: {"pop": {$lte:1000000}}
        {"pop":{$gte:5000}}

db.zips.find({"pop":{$gte:5000, $lte:1000000}}).count()

Problem:
How many companies in the sample_training.companies dataset were

either founded in 2004
  [and] either have the social category_code [or] web category_code,
      db.companies.find({$and:[{"founded_year":2004},{$or:[{"catagory_code": "social"},{"category_code": "web"} ]} ]}).count()

[or] 
founded in the month of October

  [and] also either have the social category_code [or] web category_code?
   db.companies.find({$and:[{"founded_month":10},{$or:[{"catagory_code": "social"},{"category_code": "web"} ]} ]}).count()
**put them together:

db.companies.find({
    $or: [
      {
        founded_year: 2004,
        $or: [{ category_code: 'social' }, { category_code: 'web' }],
      },
      {
        founded_month: 10,
        $or: [{ category_code: 'social' }, { category_code: 'web' }],
      },
    ],
  })
  .count();


#### Expresive Querry Operator  $expr
$ expr allows the use of aggregation expressions within the querry language
{ $expr: { <expression> } }

$ expr allows for variables and conditional statements


What trips start and end at the same station?
Atlas:{"$expr" : {"$eq": ["start station name", "$end station name"]}}
{
  "$expr": {
    "$eq": [
     "$start station name",
     "$end station name"
    ]
  }
}

MongoCLI
  db.trips.find(
    {
      "$expr": {
        "$eq": [
          "$start station name",
          "$end station name"
        ]
      }
    }).count()


db.trips.find({ "$expr": { "$eq": [ "$end station id", "$start station id"] }
              }).count()

  db.trips.find(
    {
      "$expr": {
        "$eq": [
          "$start station id",
          "$end station id"
        ]
      }
    }).count()


Now--How many of these trips lasted more than a few minutes?(use 1200 sec or 20 minutes)

db.trips.find({ "$expr": { "$and": [ { "$gt": [ "$tripduration", 1200 ]},
                         { "$eq": [ "$end station id", "$start station id" ]}
                       ]}}).count()


Quiz 2: $expr
Qiz does not make sense becasue therer is no #of employees listed for the founding year

Problem:
o complete this exercise connect to your Atlas cluster using the in-browser IDE space at the end of this chapter.

How many companies in the sample_training.companies collection have the same permalink as their twitter_username?

db.companies.find({"$expr": { "$eq":["$permalink", "$twitter_username"]}}).count()


Array Operators:
$all:  returns all

  returns a cursor with all documents where the spcefied array filed is exactly the given length

$size: limits/restricts array length

  will return all documents wehre the specified arrayfield is axactly a given length

querring an array fieldusing:

  an array returns only exact array matches

  a single element will return all documents where the specified array field contains this given element.

use sample_airbnb
db.listingsAndReviews.find({ "amenities": {
                                  "$size": 20,
                                  "$all": [ "Internet", "Wifi",  "Kitchen",
                                           "Heating", "Family/kid friendly",
                                           "Washer", "Dryer", "Essentials",
                                           "Shampoo", "Hangers",
                                           "Hair dryer", "Iron",
                                           "Laptop friendly workspace" ]
                                         }
                            }).pretty()



#### Lab1 Array operators:

What is the name of the listing in the sample_airbnb.listingsAndReviews dataset that accommodates more than 6 people and has exactly 50 reviews?
  "accommodates":2,
  "reviews.length" 50

db.listingsAndReviews.find({"accommodates": {"$gt": 6}, "reviews": {"$size": 50}}).pretty()


Lab 2: Array Operators
Problem
Using the sample_airbnb.listingsAndReviews collection find out how many documents have the "property_type" "House", and include "Changing table" as one of the "amenities"?

db.listingsAndReviews.find({"property_type":"House","amenities":"Changing table" }).count()


Quiz: Array Operators
Which of the following queries will return all listings that have "Free parking on premises", "Air conditioning", and "Wifi" as part of their amenities, and have at least 2 bedrooms in the sample_airbnb.listingsAndReviews collection?

  db.listingsAndReviews.find(
    { "amenities":
      { "$all":["Free parking on premises","Air conditioning","Wifi"]},"bedrooms":{"$gte":2} }).pretty()


#### Array Operators and Projection

use sample_airbnb

mongo "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.tbzlc.mongodb.net/firstCert"

db.<collection>.find({ <query> }, { <projection> })

1 includes the filed
0 excludes the field






db.listingsAndReviews.find({ "amenities":
        { "$size": 20, "$all": [ "Internet", "Wifi",  "Kitchen", "Heating",
                                 "Family/kid friendly", "Washer", "Dryer",
                                 "Essentials", "Shampoo", "Hangers",
                                 "Hair dryer", "Iron",
                                 "Laptop friendly workspace" ] } },
                            {"price": 1, "address": 1}).pretty()

db.listingsAndReviews.find({ "amenities": "Wifi" },
                           { "price": 1, "address": 1, "_id": 0 }).pretty()


db.listingsAndReviews.find({ "amenities": "Wifi" },
                           { "price": 1, "address": 1,
                             "_id": 0, "maximum_nights":0 }).pretty()

 use sample_training
 db.grades.findOne()   

 db.grades.find({ "class_id": 431 },
               { "scores": { "$elemMatch": { "score": { "$gt": 85 } } }
             }).pretty()


db.grades.find({ "scores": { "$elemMatch": { "type": "extra credit" } }
               }).pretty()


