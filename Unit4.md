# Unit4 Advanced Queries  MQL

**login**

mongo mongo "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/admin"

    mongo "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.tbzlc.mongodb.net/firstCert"

  ## Query Operators
  
  1. [Comapirison](##comapirison)
  2. [Logic](##logic)
  3. [Expressive](##expressive)
  4. [Array](##array)
  5. [Projection](##projection)
  6. [Questions:(###qusetions)]

## Query Operators:

syntax: $
  - precedes MQL operators
  - precedes Aggregation pipeline stages
  - Allows Access to Field Values

## Comapirison

    $eq = EQual to  ||  $ne = NotEqual to

    $gt > Greater Than  ||  $lt < Less Than

    $gte >= Greater Than or Equal to  || $lte <= Less Than or Equal to

  Comparison Operators specifically allow finding data within a certain range

    { <field>: { <operator>: <value> } }
    $eq is default 


For these exercises:

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
  
Lab 3: Comparison Operators

which of the following statements will return all routes that have at least one stop in them?

    db.routes.find({"stops{"$ne":0}).pretty()

    db.routes.find({"stops":{"$gt":0}})


 ##  Logic

  $and  meet all specifications (is implicit if not specified)
  
  $or   at least one spec
  
  $nor  returns only those that fail to match  (use as filter)
  
  $not  negates the query specification returns all that do not match

For these exercises:

    use sample_training

    db.routes.find({ "$and": [ { "$or" :[ { "dst_airport": "KZN" },
                                    { "src_airport": "KZN" }
                                  ] },
                          { "$or" :[ { "airplane": "CR2" },
                                     { "airplane": "A81" } ] }
                         ]}).pretty()

*Atlas command:*

    {$nor: [{result: "No Violation Issued"}, {result: "Violation Issued"}]}

    {$nor: [{result: "No Violation Issued"}, {result: "Violation Issued"}, {result:"Pass"}, {result:"Fail"}]}

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

Quiz 1: Logic Operators

 How many businesses in the sample_training.inspections dataset have the
   inspection result "Out of Business" and belong to the Home Improvement
   Contractor - 100 sector?

   4

    db.inspections.find({"result":"Out of Business", "sector":"Home Improvement Contractor - 100"}).count()

     db.inspections.find({$and : [{"result":"Out of Business"}, {"sector":"Home Improvement Contractor - 100"}]}).count()

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

     Atlas: {"pop": {"$lte":1000000}}
           {"pop":{"$gt"e:5000}}

    db.zips.find({"pop":{"$gte":5000,"$lte":1000000}}).count(

## Expressive 

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
     ]}
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

Find all documents where the trip lasted longer than 1200 seconds, and started and ended at the same station:

    db.trips.find({ "$expr": { "$and": [ { "$gt": [ "$tripduration", 1200 ]},
                         { "$eq": [ "$end station id", "$start station id" ]}
                       ]}}).count()

Quiz 1: $expr

What are some of the uses for the $ sign in MQL?

    $ denotes an operator
    $ singifies value rather than name  (like string literal)

Quiz 2: $expr

Which of the following statements will find all the companies that have more employees than the year in which they were founded?

*this is a very confusing question.  there is no number of employiees listed at the date of the origin, so I think I am answering "how many companines have more employees than the values of the year in which they were founded? e.g: founded in 2010, they have more than 2010 employees.  I think was done to use the $ as string literal for $founded_year*

    db.companis.find(
      { "expr": { "$gte" ["$founded_year", "$number_of_employees"]}}
    ).count()

    db.companies.find(
      {"expr": { "$lte:[ "$founded_year", "$number_of_employees" ]}}
    ).count()

### Lab: $expr

How many companies in the sample_training.companies collection have the same permalink as their twitter_username? 

1299

    db.companies.find({"$expr": { "$eq":["$permalink", "$twitter_username"]}}).count()



## Array 

For this exercise use: use sample_airbnb

Operators

  $all:  returns all

    {<array field> : {"$all": <array>}}

    returns a cursor with all documents where the spcefied array filed is exactly the given length

  $size: limits/restricts array length

    {<array field> : {"$size": <number>}}

    will return all documents wehre the specified arrayfield is axactly a given length

Quering an array field using 

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
  "accommodates":2,
  "reviews.length" 50

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


## Projection

**just a reminder**

    mongo "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.tbzlc.mongodb.net/firstCert
use sample_airbnb


Projections:
db.<collection>.find({ <query> }, { <projection> })

1 includes the filed
0 excludes the field

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




