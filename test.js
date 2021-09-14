
end station location.coordinates.0
:n
:




0
:
-73.98808416
1
:
40.74854862



end station location.coordinates.0



db.companies.find({ "relationships.0.person.first_name": "Mark", "relationships.0.title": { "$regex": "CEO"} },{ "name":1}).pretty()
