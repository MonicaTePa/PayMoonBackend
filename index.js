try {
	const cors = require('cors');
	const express = require('express');
	const properties = require('./config/properties');
	const DB = require('./config/db');
	const router = express.Router();
	const routerApi = require('./routes/index');
	
	const app = express();
	DB();

	const bodyParser = require('body-parser');
	const bodyParserJSON = bodyParser.json();
	const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

	app.use(bodyParserJSON);
	app.use(bodyParserURLEncoded);

	app.use(cors());
	
	
	
	router.get('/', (req, res) => {
		res.send('Hello form home')
	});
	routerApi(app);
	app.use(router);
	app.listen(properties.PORT, () => console.log('server runing on port 3000'));
	
	
} catch (error) {
	console.log(error);
}