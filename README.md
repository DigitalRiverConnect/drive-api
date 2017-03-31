# drive-api
drive-api use drive media type to demonstrate how Application Centric API system can be built.


## Installation steps
* Install Node 6.9.0 or higher, together with NPM 3 or higher. (Install as Administrator on Windows platform
  otherwise error may occurred in next step)
* npm install
* node server.js (application running on the port 3456)

## API endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /watch-definitions.drive | Lists all the Watch Definitions |
| GET | /watch-definitions/{name} | Get the details for a specific definition |
| GET | /watch-definitions/creation.drive | Get data for page of creating new watch definition |
| POST | /watch-definitions.drive | Create a new definition |
| PUT | /watch-definitions.drive | Update an existing definition |
| DELETE | /watch-definitions/:name | Delete a specific definition |

## References
* [drive](https://github.com/DigitalRiverConnect/drive)
* [drive-ui](https://github.com/DigitalRiverConnect/drive-ui)