<p align="center"><img src="https://www.veams.org/img/svg/icons/veams-std.svg"></p>
<p align="center">Head to the <a href="http://veams.org/">site</a> for detailed instructions.
<br><br>
<a href="https://gitter.im/Sebastian-Fitzner/Veams?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge"><img src="https://badges.gitter.im/Sebastian-Fitzner/Veams.svg" alt="Gitter Chat" /></a></p>


# Veams Services

Simple services provided for and by Veams. 

## Usage

Install the package: 

```bash
npm install veams-services --save 
```
Just import the service you need: 

```js
import VeamsHttp from 'veams-services/lib/http';
```


### Http Service

You can simple use the http service and modify it for your needs, for example:

```js 
import VeamsHttp from 'veams-services/lib/http';

let httpService = new VeamsHttp({
	type: 'json'
});

/** 
 * Override the default parser,
 * which only returns `responseText`
 */
httpService.parser = ({ request }) => {
	return {
		status: request.status,
		statusText: request.statusText,
		body: JSON.parse(request.responseText)
	};
};

class MyPagesService {
	url = 'http://localhost:3000/api/pages';
	http = httpService;

	/**
	 * Static id checker.
	 *
	 * @param {String} id - Id of the endpoint.
	 */
	static checkId(id) {
		if (!id || typeof id !== 'string') {
			throw new Error(`PagesService :: You have to provide an "id" and this "id" needs to be a string!`);
		}
	}

	/**
	 * Fetch data items from the endpoint.
	 */
	read() {
		return this.http.get(`${this.url}`);
	}

	/**
	 * Fetch data item by provided id from the endpoint.
	 *
	 * @param {String} id - Id of the endpoint.
	 */
	readById(id) {
		this.constructor.checkId(id);

		return this.http.get(`${this.url}/${id}`);
	}
}

const myPagesService = new MyPagesService();

export default myPagesService;
```


That's it!