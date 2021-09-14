# Unit4 Advanced Queries  MQL

**login**

mongo mongo "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/admin"

    mongo "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.tbzlc.mongodb.net/firstCert"

  ## Query Operators

*Provide additional ways to locate data within the db*
  
  1. [Comapirison](#comapirison)

      *allows for finding data within a specified range*
  2. [Logic](#logic) 
  3. [Expressive](#expressive)
  4. [Array](#array)
  5. [Projection](#projection)
  6. [Arrays](#arrays )


Provide additional ways to locate data within the db


syntax: ***$***
  - precedes MQL operators
  - precedes Aggregation pipeline stages
  - Allows Access to Field Values

## Comapirison

    $eq = Equal to  ||  $ne = NotEqual to

    $gt > Greater Than  ||  $lt < Less Than

    $gte >= Greater Than or Equal to  || $lte <= Less Than or Equal to

  Comparison Operators specifically allow finding data within a certain range

    { <field>: { <operator>: <value> } }

*$eq is default*


For these exercises:

    use sample_training

Find all documents where the tripduration was less than or equal to 70 seconds and the usertype was not Subscriber:

    db.trips.find({ "tripduration": { "$lte" :100 },
                "usertype": { "$ne": "Subscriber" } }).pretty()

Find all documents where the tripduration was less than or equal to 70 seconds and the usertype was Customer using a redundant equality operator:

    db.trips.find({ "tripduration": { "$lte" : 70 },
                "usertype": { "$eq": "Customer" }}).pretty()

Find all documents where the tripduration was less than or equal to 70 seconds and the usertype was Customer using the implicit equality operator:

    db.trips.find({ "tripduration": { "$lte" : 70 },
                "usertype": "Customer" }).pretty()               

### Lab 1: Comparison Operators
How many documents in the sample_training.zips collection have fewer than 1000 people listed in the pop field?

8065

    db.zips.find({"pop":{"$lt":1000}}).count()

<br>

### Lab 2: Comparison Operators

What is the difference between the number of people born in 1998 and the number of people born after 1998 in the sample_training.trips collection?
Expression 1 born in 1998:

6

    1998

    db.trips.find({"birth year": 1998}).count()

    Expression 2 Born after 1998:

    db.trips.find({"birth year": {$gt: 1998} }).count()

    find the difference:

    db.trips.find({"birth year":{"$gt":1998}}).count() - db.trips.find({"birth year":1998}).count()
  
Lab 3: Comparison Operators

which of the following statements will return all routes that have at least one stop in them?

    db.routes.find({"stops{"$ne":0}).pretty()

    db.routes.find({"stops":{"$gt":0}})

    two incorrect:

    db.routes.find({ "stops": { "gte": 0}).pretty() //  includes 0 stops

    db.routes.find({ "stops": { "lt": 0}}).pretty() // excludes all + stops


 ##  Logic

 *Allows granular search*

 Syntax

      { "$<operator>": [{ <clause1> },{ <clause2> },{ <clause3> }, ... ]}

      //Not is special case
      {$not: {<clause>}}

  ***$and***  meet all specifications (is implicit if not specified)
  
  ***$or*** at least one spec

      {<operator>} : [{statement1}, {statement2}, ...]}
  
  ***$nor***  returns only those that fail to match  (use as filter)

***$not***  negates the query specification returns all that do not match

      {$not: {statement}}

<br>

For these exercises:

    use sample_training

*Atlas command:*

    {$nor: [{result: "No Violation Issued"}, {result: "Violation Issued"}]}

    {$nor: [{result: "No Violation Issued"}, {result: "Violation Issued"}, {result:"Pass"}, {result:"Fail"}]}

*$and*  default operator

    {sector: "Mobile Food Vendor - 881", result: "Warning"}
    //  AND by default -- same as
    { "$and": [{sector: "Mobile Food Vendor - 881"},{result: "Warning"} ]}

<br>

ATLAS Implicit $and

Find which student ids are >25 and <100 in sample_training.grades collection>

      {"student_id": {"$gt": 25,"$lt": 100}}
      //preferred over
      {"$and": [{"student_id": {"$gt": 25}},{"student_id": {"$lt": 100}} ]}

Expicit $and Rules:

- when you need to include the same operator more than once in a query

Mongo Shell *$and*

Find all documents where airplanes CR2 or A81 left or landed in the KZN airport:

    db.routes.find({ "$and": [ { "$or" :[ { "dst_airport": "KZN" },
                                    { "src_airport": "KZN" }
                                  ] },
                          { "$or" :[ { "airplane": "CR2" },
                                     { "airplane": "A81" } ] }
                         ]}).pretty()

<br>

Quiz 1: Logic Operators

Problem:

How many businesses in the sample_training.inspections dataset have the inspection result "Out of Business" and belong to the "Home Improvement Contractor - 100" sector?

4

    db.inspections.find({result: "Out of Business", sector: "Home Improvement Contractor - 100" }).count()

<br>

Quiz 2: Logic Operators
Problem:

Which is the most succinct query to return all documents from the sample_training.inspections collection where the inspection date is either "Feb 20 2015", or "Feb 21 2015" and the company is not part of the "Cigarette Retail Dealer - 127" sector?

    db.inspections.find({"$or":[ { "date": "Feb 20 2015" },{ "date":  "Feb 21 2015" } ], "sector": {"$ne": "Cigarette Retail Dealer - 127"} }).pretty()

<br>

Lab 1: Logic Operators

Problem:

*Before solving this exercise, make sure to undo some of the changes that we made to the zips collection earlier in the course by running the following command:*

    db.zips.updateMany({ "city": "HUDSON" }, { "$inc": { "pop": -10 } })

How many zips in the sample_training.zips dataset are neither over-populated nor under-populated?  (Over = over 1M under = less than 5K)

11193






Quiz 1: Logic Operators

 How many businesses in the sample_training.inspections dataset have the
   inspection result "Out of Business" and belong to the Home Improvement
   Contractor - 100 sector?

   4

    db.inspections.find({"result":"Out of Business", "sector":"Home Improvement Contractor - 100"}).count()


Quiz 2: Logic Operators

Which is the most succinct query to return all documents from the sample_training.inspections collection where the inspection date is either "Feb 20 2015", or "Feb 21 2015" and the company is not part of the "Cigarette Retail Dealer - 127" sector?

    db.inspections.find(
      { "$or": [ { "date": "Feb 20 2015" },
                { "date": "Feb 21 2015" } ],
        "sector": { "$ne": "Cigarette Retail Dealer - 127" }
      }).pretty()

Lab 1: Logic Operators

Before solving this exercise, make sure to undo some of the changes that we made to the zips collection earlier in the course by running the following command:

    db.zips.updateMany({ "city": "HUDSON" }, { "$inc": { "pop": -10 } })

How many zips in the sample_training.zips dataset are neither over-populated nor under-populated?

11193

      db.zips.find({"pop": {"$lt":1000000, "$gt":5000}} ).count()


     Atlas: {"pop": {"$lt":1000000, "$gt":5000}}}

<br>


Lab 2: Logic Operators

Problem:

How many companies in the sample_training.companies dataset were either--   founded in 2004 *and* either have the social category_code *or* web category_code,-- *OR* were founded in the month of October *and* also either have the social category_code *or* web category_code?

149

    Atlas: 
    { $and: [ { $or: [ { founded_year: 2004 }, { founded_month: 10 } ] }, { $or: [ { category_code: 'social'}, { category_code: 'web' }  ] } ] }


  //Mongo Shell
  db.companies.find({ $and: [ { $or: [ { founded_year: 2004 }, { founded_month: 10 } ] }, { $or: [ { category_code: 'social'}, { category_code: 'web' }  ] } ] }).count()


## Expressive 

$ expr allows the use of aggregation expressions within the query language

    { $expr: { <expression> } }

$ expr allows for variables and conditional statements

What trips start and end at the same station?

    Atlas:
    {"$expr" : {"$eq": ["start station name", "$end station name"]}}

    {
    "$expr": {
    "$eq": [
     "$start station name",
     "$end station name"
     ]}
    }

  MongoCLI

    db.trips.find(
    {
      "$expr": {
        "$eq": [
          "$start station id",
          "$end station name"
        ]
      }
    }).count()

Find all documents where the trip lasted longer than 1200 seconds, and started and ended at the same station:

    db.trips.find({ "$expr": { "$and": [ { "$gt": [ "$tripduration", 1200 ]},
                         { "$eq": [ "$end station id", "$start station id" ]}
                       ]}}).count()

Quiz 1: $expr

What are some of the uses for the $ sign in MQL?

    $ denotes an operator
    $ signifies value rather than name  (like string literal)

Quiz 2: $expr

Which of the following statements will find all the companies that have more employees than the year in which they were founded?

*this is a very confusing question.  there is no number of employees listed at the date of the origin, so I think I am answering "how many companines have more employees than the values of the year in which they were founded? e.g: founded in 2010, they have more than 2010 employees.*

    db.companies.find(
      { "expr": { "$gte" ["$founded_year", "$number_of_employees"]}}
    ).count()

    db.companies.find(
      {"expr": { "$lte:[ "$founded_year", "$number_of_employees" ]}}
    ).count()

### Lab: $expr

How many companies in the sample_training.companies collection have the same permalink as their twitter_username? 

1299

    db.companies.find({"$expr": { "$eq":["$permalink", "$twitter_username"]}}).count()

<br>

## Array 

For this exercise use: use sample_airbnb

Operators

$all:  returns all

    {<array field> : {"$all": <array>}}

    returns a cursor with all documents where the specified array filed is exactly the given length

$size: limits/restricts array length

    {<array field> : {"$size": <number>}}

$size will return all documents where the specified array field is exactly a given length

Querying an array field using 

  - an array returns only **exact array matches**

  - a single element will return all documents where the specified array field contains this element 

example

    db.listingsAndReviews.find(
        { "amenities":
          {
           "$size": 20,
           "$all": [
            "Internet",
            "Wifi",
            "Kitchen",
            "Heating",
            "Family/kid friendly",
            "Washer",
            "Dryer",
            "Essentials",
            "Shampoo",
            "Hangers",
            "Hair dryer",
            "Iron",
            "Laptop friendly workspace" ]
        }}).pretty()

### Lab1 Array operators:

What is the name of the listing in the sample_airbnb.listingsAndReviews dataset that accommodates more than 6 people and has exactly 50 reviews?

Sunset Beach Lodge Retreat

    db.listingsAndReviews.find({"accommodates": {"$gt": 6}, "reviews": {"$size": 50}}).pretty()

### Lab 2: Array Operators

Problem

Using the sample_airbnb.listingsAndReviews collection find out how many documents have the "property_type" "House", and include "Changing table" as one of the "amenities"?

11

    db.listingsAndReviews.find({"property_type":"House","amenities":"Changing table" }).count()


Quiz: Array Operators

Which of the following queries will return all listings that have "Free parking on premises", "Air conditioning", and "Wifi" as part of their amenities, and have at least 2 bedrooms in the sample_airbnb.listingsAndReviews collection?

  db.listingsAndReviews.find(
    { "amenities":
      { "$all":["Free parking on premises","Air conditioning","Wifi"]},"bedrooms":{"$gte":2} }).pretty()

<br>

## Projection



Projections:
db.<collection>.find({ <query> }, { <projection> })

1 includes the field
0 excludes the field

  - you must choose to either use 1 and include fileds or 2 and exclude; cannot be combined in the same query

example

    db.listingAndReviews.find(
      {"amenities": {"size":20,
      "$all: [
        "Internet",
        "Wifi",
        "Kitchen",
        "Heating",
        ...]}},
      {"price":1, "address":1}).pretty.()


*For the next section we will be using sample_training.grades*

"$elemMatch"  

    { <field>: { $elemMatch: { <query1>, <query2>, ... } } }

*elemMatch* matches documents that contain an array field with at least one element that matches all the specified query criteria

Find any student that has extra credit

    db.grades.find({"scores": {"$elemMatch": {"type":"extra credit"}}}).pretty()

Since  *$elemMatch* is being used in the query it returns the full document that matches the criteria for at least one of the elements

Find all documents where the student in class 431 received a grade higher than 85 for any type of assignment:

    db.grades.find({ "class_id": 431 },
               { "scores": { "$elemMatch": { "score": { "$gt": 85 } } }
             }).pretty()

<br>

Lab: Array Operators and Projection

How many companies in the sample_training.companies collection have offices in the city of Seattle?

117

    db.companies.find({"offices.city": "Seattle"}).count()

<br>

Quiz: Array Operators and Projection

Problem:

Which of the following queries will return only the names of companies from the sample_training.companies collection that had exactly 8 funding rounds?

    db.companies.find({ "funding_rounds": { "$size": 8}}, {"name": 1, "_id":0})

<br>

## Arrays 

And Sub-Documents

    use sample_training

**.notation and nested arrays**   

  - Dot-Notation specifies the address of the nested element in a document (path)

  - In arrays-- specify the position of the element in the array

  - ***.notation*** allows you to go as deep as needed into nested  documents

        db.companies.find({  "relationships.0.person.last_name": "Zuckerberg"}, { "name":1}).pretty()

Altered Query for first name + CEO

      db.companies.find({ "relationships.0.person.first_name": "Mark", "relationships.0.title": { "$regex": "CEO"} },{ "name":1}).pretty()

Now look for all senior execs, first name: Mark, no longer work there company  in every array element in every document we will look for : 

    {"is_past: true"}

To do this use ***$elemMatch*** operator 

    db.companies.find({ "relationships": { "$elemMatch": { "is_past": true, "person.first_name": "Mark" } } }, { "name": 1 }).pretty()

    db.companies.find({ "relationships": { "$elemMatch": { "is_past": true, "person.first_name": "Mark" } } }, { "name": 1 }).count()

<br>

Lab 1: Querying Arrays and Sub-Documents

How many trips in the sample_training.trips collection started at stations that are to the west of the -74 longitude coordinate?

Longitude decreases in value as you move west.

Note: We always list the longitude first and then latitude in the coordinate pairs; i.e.

<field_name>: [ <longitude>, <latitude> ]
