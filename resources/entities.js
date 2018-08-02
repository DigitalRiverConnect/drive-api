var config = require('../config')
var port = config.port

var entities = [
  {
    "title": "service1-abcde-availability",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/service1-abcde-availability",
        "title": "ABCDE Availability Monitoring and Alerting"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/service1-abcde-availability",
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
    "title": "service1-abcde-decrease-traffic-sprike",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/service1-abcde-decrease-traffic-sprike",
        "title": "ABCDE Decrease Traffic Spike"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/service1-abcde-decrease-traffic-sprike",
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
    "title": "service1-chocolate-availability",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/service1-chocolate-availability",
        "title": "CHOCOLATE Availability Monitoring and Alerting"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/service1-chocolate-availability",
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
    "title": "service1-chocolate-decrease-traffic-sprike",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/service1-chocolate-decrease-traffic-sprike",
        "title": "CHOCOLATE Decrease Traffic Spike"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/service1-chocolate-decrease-traffic-sprike",
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
    "title": "doughnut-errors-watch",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/doughnut-errors-watch",
        "title": "Doughnut Errors Watch."
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/doughnut-errors-watch",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "description": "Finds errors that originated in Doughnut.",
      "active": true
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "doughnut-hosts-watch",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/doughnut-hosts-watch",
        "title": "Doughnut Hosts Watch"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/doughnut-hosts-watch",
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
    "title": "service1-custardtart-availability",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/service1-custardtart-availability",
        "title": "CUSTARDTART Availability Monitoring and Alerting"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/service1-custardtart-availability",
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
    "title": "service1-custardtart-decrease-traffic-sprike",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/service1-custardtart-decrease-traffic-sprike",
        "title": "CUSTARDTART Decrease Traffic Spike"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/service1-custardtart-decrease-traffic-sprike",
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
    "title": "service1-frenchfries-availability",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/service1-frenchfries-availability",
        "title": "FRENCHFRIES Availability Monitoring and Alerting"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/service1-frenchfries-availability",
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
    "title": "service1-frenchfries-decrease-traffic-sprike",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/service1-frenchfries-decrease-traffic-sprike",
        "title": "FRENCHFRIES Decrease Traffic Spike"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/service1-frenchfries-decrease-traffic-sprike",
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
    "title": "service1-firedrice-availability",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/service1-firedrice-availability",
        "title": "FRIEDRICE Availability Monitoring and Alerting"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/service1-firedrice-availability",
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
    "title": "service1-firedrice-decrease-traffic-sprike",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/service1-firedrice-decrease-traffic-sprike",
        "title": "FRIEDRICE Decrease Traffic Spike"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/service1-firedrice-decrease-traffic-sprike",
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