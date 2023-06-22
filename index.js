

const Model = {
	name: '',
	struct: {},

}

const Config = {
	app_name: '',
	app_version: '',
	app_environment: '',
	app_descripiton: '',
	external_links: '',

	baseURL: '',
	localURL: '',

	models: {
		src: '',
		database: {
			type: "mongodb",
			url: "mongodb://mqsdcbn",
			auth: {
				username: "admin",
				password: "admin"
			},
		}
	},

	mail_client: {},
	
	auth_flow: {
		current_flow: 'M-CSS',
		flows: [ {} ],
		auth_servers: [
			{
				name: 'my-authbackend1',
				method: "OAuth2",
				clientId: "xyz",
				clientSecret: "",
				scope: 'toto',
			}
		],

		jwt_options: [
			{
				name: 'my-idserver1',
				baseURL: 'http://localhost:5301',
				jwks_path: '/.well-known/jwks.json'
			},
			{
				name: 'my-idserver2',
				secret: 'random secret'
			}
		]
	},

	schemas: {} | '',

	settings: {}
}

class App{
	// 
}