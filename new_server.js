var express    = require('express');
var formidable = require('express-formidable');
var fs         = require('fs');

var app = express();

function readFromFile(new_post) {
	fs.readFile(__dirname + '/data/posts.json', function (error, file) {
		if (error) {
			console.log('error ' + error);
		}
		var parsedFile = JSON.parse(file);
		parsedFile[Date.now()] = new_post;
		return(parsedFile);
	}).then(function (res) {
		writeToFile(res);
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
});

app.post("/create-post", function (req, res) {
	var fields = req.fields;
	var new_post = fields["blogpost"];
	readFromFile(new_post);
});

app.listen(3000, function() {
	console.log('Server is listening on port 3000. Ready to accept requests!');
});
