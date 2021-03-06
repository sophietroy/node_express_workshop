// Convert the previous solution to use promises


var express    = require('express');
var formidable = require('express-formidable');
var fs         = require('fs');

var app = express();

function readFromFile() {
	return new Promise( function(resolve, reject) {
		fs.readFile(__dirname + '/data/posts.json', function (error, file) {
			if (error) {
				console.error('sophie ' + error);
				reject(Error('Failed to read from file'));
			} else {
				console.log('About to parse JSON from file');
				var parsedFile = JSON.parse(file);
				resolve(parsedFile);
			}
		});
	});
};

function writeToFile(blog_data) {
	var blog_json = JSON.stringify(blog_data);
	console.log('Attempting to write to file');
	fs.writeFile(__dirname + '/data/posts.json', blog_json, function(error) {
		if (error) {
			console.log('Error writing to file');
		} else {
			console.log('success writing to file');
		}
	});

};

function saveBlogPost(new_post) {
	readFromFile().then(function(result) {
		result[Date.now()] = new_post;
		writeToFile(result);
	}, function (error) {
		console.error('Sophie Error reading from file: ' + error);
	});
}

app.use(express.static("public"));
app.use(formidable());

app.get("/get-posts", function (req, res) {
	res.sendFile(__dirname + '/data/posts.json');
});

app.get("/posts/:postId", function(req, res) {
	res.send('post id: ' + req.params.postId);
});

app.post("/create-post", function (req, res) {
	var fields = req.fields;
	var new_post = fields["blogpost"];
	saveBlogPost(new_post);
});

app.listen(3000, function() {
	console.log('Server is listening on port 3000. Ready to accept requests!');
});
