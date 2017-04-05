var config = require('../config')
var port = config.port

var entities = [
  {
    "title": "v1-bbod-availability",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-bbod-availability",
        "title": "BBOD Availability Monitoring and Alerting"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-bbod-availability",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "description": "determines the service availability within a time period",
      "active": true
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-bbod-decrease-traffic-sprike",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-bbod-decrease-traffic-sprike",
        "title": "BBOD Decrease Traffic Spike"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-bbod-decrease-traffic-sprike",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "description": "determines the decrease in traffic between two time periods",
      "active": true
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-ciscoctg-availability",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ciscoctg-availability",
        "title": "CISCOCTG Availability Monitoring and Alerting"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ciscoctg-availability",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "description": "determines the service availability within a time period",
      "active": true
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-ciscoctg-decrease-traffic-sprike",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ciscoctg-decrease-traffic-sprike",
        "title": "CISCOCTG Decrease Traffic Spike"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ciscoctg-decrease-traffic-sprike",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "description": "determines the decrease in traffic between two time periods",
      "active": true
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "dispatch-errors-watch",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/dispatch-errors-watch",
        "title": "Dispatch Errors Watch."
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/dispatch-errors-watch",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "description": "Finds errors that originated in Dispatch.",
      "active": true
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "dispatch-hosts-watch",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/dispatch-hosts-watch",
        "title": "Dispatch Hosts Watch"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/dispatch-hosts-watch",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "description": "Watches the number of hosts being reported by elastic search.",
      "active": true
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-electrol-availability",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-electrol-availability",
        "title": "ELECTROL Availability Monitoring and Alerting"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-electrol-availability",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
     "description": "determines the service availability within a time period",
      "active": true
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-electrol-decrease-traffic-sprike",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-electrol-decrease-traffic-sprike",
        "title": "ELECTROL Decrease Traffic Spike"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-electrol-decrease-traffic-sprike",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "description": "determines the decrease in traffic between two time periods",
      "active": true
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-furlaeu-availability",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlaeu-availability",
        "title": "FURLAEU Availability Monitoring and Alerting"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlaeu-availability",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "description": "determines the service availability within a time period",
      "active": true
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-furlaeu-decrease-traffic-sprike",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlaeu-decrease-traffic-sprike",
        "title": "FURLAEU Decrease Traffic Spike"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlaeu-decrease-traffic-sprike",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "description": "determines the decrease in traffic between two time periods",
      "active": true
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-furlajp-availability",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlajp-availability",
        "title": "FURLAJP Availability Monitoring and Alerting"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlajp-availability",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "description": "determines the service availability within a time period",
      "active": true
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-furlajp-decrease-traffic-sprike",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlajp-decrease-traffic-sprike",
        "title": "FURLAJP Decrease Traffic Spike"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlajp-decrease-traffic-sprike",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "description": "determines the decrease in traffic between two time periods",
      "active": true
    },
    "$ref": "#/definitions/WatchDefinition"
  }
]

module.exports = entities