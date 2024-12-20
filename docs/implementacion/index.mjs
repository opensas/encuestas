import http from 'http';

const port = parseInt(process.env.PORT) || 3000;

http
	.createServer((req, res) => {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Hello, World!' }));
	})
	.listen(port, () => {
		console.log(`Server running on port http://localhost:${port}`);
	});
