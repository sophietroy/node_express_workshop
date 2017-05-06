// Original solution to node girls express workshop

var express    = require('express');
var formidable = require('express-formidable');
var fs         = require('fs');

var app = express();


//app.get("/chocolate", function (req, res) {
//	res.send("Mm chocolate :O");
//});


function readFromFile(new_post, callback) {
	fs.readFile(__dirname + '/data/posts.json', function (error, file) {
		if (error) {
			console.log('error ' + error);
		}
		var parsedFile = JSON.parse(file);
		parsedFile[Date.now()] = new_post;
		callback(parsedFile);
	});
};


function writeToFile(blog_data) {
	var blog_json = JSON.stringify(blog_data);
	fs.writeFile(__dirname + '/data/posts.json', blog_json, function(error) {
		if (error) {
			console.log('Error writing to file');
		} else {
			console.log('success writing to file');
		}
	});

};

app.use(express.static("public"));
app.use(formidable());

app.get("/get-posts", function (req, res) {
	res.sendFile(__dirname + '/data/posts.json');
	//fs.readFile(__dirname + '/data/posts.json', function(error, file){
	//	if (error) throw err;
		//res.sendFile(file);
	//});
});

app.post("/create-post", function (req, res) {
	var fields = req.fields;
	var new_post = fields["blogpost"];
	console.log(new_post);
	readFromFile(new_post, writeToFile);
});

app.listen(3000, function() {
	console.log('Server is listening on port 3000. Ready to accept requests!');
});
