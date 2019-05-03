var jsonString = '{"product":"Live JSON generator","version":3.1,"releaseDate":"2014-06-25T00:00:00.000Z","demo":true,"person":{"id":12345,"name":"John Doe","phones":{"home":"800-123-4567","mobile":"877-123-1234"},"email":["jd@example.com","jd@example.org"],"dateOfBirth":"1980-01-02T00:00:00.000Z","registered":true,"emergencyContacts":[{"name":"Jane Doe","phone":"888-555-1212","relationship":"spouse"},{"name":"Justin Doe","phone":"877-123-1212","relationship":"parent"}]}}';
//console.log(jsonString);
//console.log(JSON.parse(jsonString));
var jsonObject = JSON.parse(jsonString);
var contacts = jsonObject['person']['emergencyContacts'];
for(var key in contacts) {
    var contact = contacts[key];
    console.log('Name : '+ contact['name'] );
    console.log('phone : '+ contact['phone']);
    console.log('relationship : '+ contact['relationship']);
    
}