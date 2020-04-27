const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.get()
// app.post()
// app.put()
// app.delete()

const courses =[
    { id : 1, name : 'course 1'},
    { id : 2, name : 'course 2'},
    { id : 3, name : 'course 3'},
    { id : 4, name : 'course 4'},
    { id : 5, name : 'course 5'}
];


app.get('/api/courses/:id', function(req,res){
    //res.send('You have requested to the course id :' + req.params.id);
    const course = courses.find(( c => c.id === parseInt(req.params.id)));
    if(!course) res.status(404).send('The course with the given id was not found');
    res.send(course);
});
app.get('/api/courses', function(req,res){
    res.send(courses);
});


app.post('/api/courses/:id', function(req,res){
    const id  = parseInt(req.body.id);
    const name = req.body.name;
    const course = {'id':id,'name':name};
    courses.push(course);
    res.send("Added");
});


app.put('/api/courses/:id', function(req,res){
    //Look up the course
    //if not exist, return 404-Not found
    const course = courses.find((c => c.id === parseInt(req.params.id)));
    if(!course) return res.status(404).send('The course with the given id was not found');
    
    //update course
    //return the updated course to the client
    course.name = req.body.name;
    res.send(course);
});


app.delete('/api/courses/:id', function(req,res){
    //look up the course
    //if not exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given id was not found');

    //delete
    const index = courses.indexOf(course);
    courses.splice(index,1);

    //return the same course
    res.send(course);
});

//PORT
//const port = process.env.PORT || 8080;
app.listen(8080, function(req,res) { 
    console.log('Listening on port : 8080')
});