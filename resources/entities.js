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
      "name": "BBOD Availability Monitoring and Alerting",
      "path": "v1-bbod-availability",
      "trigger": "0 0/15 * * * *",
      "description": "determines the service availability within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "BBOD Service Availability Alert",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "service_availability"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "responseStatus",
          "queryTemplateName": "terms_count",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "15m",
              "to": "now"
            },
            "apiKeys": [
              "183e4c1b72294c60ac2fcc5de3bc2bfd"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "count": "10"
            }
          }
        },
        "name": "Determines the availability for a service.",
        "policyType": "ServiceAvailabilityPolicy",
        "properties": {
          "eventsCountThreshold": "1000",
          "threshold": "99"
        }
      }
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
      "name": "BBOD Decrease Traffic Spike",
      "path": "v1-bbod-decrease-traffic-sprike",
      "trigger": "0 0/15 * * * *",
      "description": "determines the decrease in traffic between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "BBOD Decrease Traffic Alert",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "traffic_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "requestId",
          "queryTemplateName": "term_count_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "60m",
              "to": "now"
            },
            "apiKeys": [
              "183e4c1b72294c60ac2fcc5de3bc2bfd"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "30m"
            }
          }
        },
        "name": "Verifies if there is a decrease in traffic between two time periods.",
        "policyType": "DecreaseTrafficSpikePolicy",
        "properties": {
          "previousMinimumEventsCount": "200",
          "threshold": "-99.99"
        }
      }
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
      "name": "CISCOCTG Availability Monitoring and Alerting",
      "path": "v1-ciscoctg-availability",
      "trigger": "0 0/15 * * * *",
      "description": "determines the service availability within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "CISCOCTG Service Availability Alert",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "service_availability"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "responseStatus",
          "queryTemplateName": "terms_count",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "15m",
              "to": "now"
            },
            "apiKeys": [
              "235104cf93754fa0b4b4c7983693842f"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "count": "10"
            }
          }
        },
        "name": "Determines the availability for a service.",
        "policyType": "ServiceAvailabilityPolicy",
        "properties": {
          "threshold": "99"
        }
      }
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
      "name": "CISCOCTG Decrease Traffic Spike",
      "path": "v1-ciscoctg-decrease-traffic-sprike",
      "trigger": "0 0/15 * * * *",
      "description": "determines the decrease in traffic between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "CISCOCTG Decrease Traffic Alert",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "traffic_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "requestId",
          "queryTemplateName": "term_count_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "60m",
              "to": "now"
            },
            "apiKeys": [
              "235104cf93754fa0b4b4c7983693842f"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "30m"
            }
          }
        },
        "name": "Verifies if there is a decrease in traffic between two time periods.",
        "policyType": "DecreaseTrafficSpikePolicy",
        "properties": {
          "previousMinimumEventsCount": "200",
          "threshold": "-99.0"
        }
      }
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
      "name": "Dispatch Errors Watch.",
      "path": "dispatch-errors-watch",
      "trigger": "0 0/5 * * * *",
      "description": "Finds errors that originated in Dispatch.",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "Dispatch Alert - Dispatch Errors Found",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "generic"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "responseStatus",
          "queryTemplateName": "response_status_source",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "5m",
              "to": "now"
            },
            "apiKeys": [],
            "serviceIds": [],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "responseStatus": "500, 502",
              "responseSource": "dispatch, DISPATCH"
            }
          }
        },
        "name": "Counts the number buckets.",
        "policyType": "BucketsCountPolicy",
        "properties": {
          "condition": "GREATER_THAN",
          "threshold": 0
        }
      }
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
      "name": "Dispatch Hosts Watch",
      "path": "dispatch-hosts-watch",
      "trigger": "0 0/5 * * * *",
      "description": "Watches the number of hosts being reported by elastic search.",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "Missing Dispatch Hosts",
                "timeZone": "America/Chicago",
                "to": "drconnectalerts@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "missing_dispatch_hosts"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "host.raw",
          "queryTemplateName": "terms_count",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "5m",
              "to": "now"
            },
            "apiKeys": [],
            "serviceIds": [],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "count": 60
            }
          }
        },
        "name": "Matches the number of events against a threshold.",
        "policyType": "BucketsCountPolicy",
        "properties": {
          "condition": "LESS_THAN",
          "threshold": 60
        }
      }
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
      "name": "ELECTROL Availability Monitoring and Alerting",
      "path": "v1-electrol-availability",
      "trigger": "0 0/15 * * * *",
      "description": "determines the service availability within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "ELECTROL Service Availability Alert",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "service_availability"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "responseStatus",
          "queryTemplateName": "terms_count",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "15m",
              "to": "now"
            },
            "apiKeys": [
              "x7vQOMYuj1sZ6zeTNFeqL83qadqFT0Zm"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "count": "10"
            }
          }
        },
        "name": "Determines the availability for a service.",
        "policyType": "ServiceAvailabilityPolicy",
        "properties": {
          "threshold": "99"
        }
      }
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
      "name": "ELECTROL Decrease Traffic Spike",
      "path": "v1-electrol-decrease-traffic-sprike",
      "trigger": "0 0/15 * * * *",
      "description": "determines the decrease in traffic between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "ELECTROL Decrease Traffic Alert",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "traffic_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "requestId",
          "queryTemplateName": "term_count_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "60m",
              "to": "now"
            },
            "apiKeys": [
              "x7vQOMYuj1sZ6zeTNFeqL83qadqFT0Zm"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "30m"
            }
          }
        },
        "name": "Verifies if there is a decrease in traffic between two time periods.",
        "policyType": "DecreaseTrafficSpikePolicy",
        "properties": {
          "previousMinimumEventsCount": "200",
          "threshold": "-90.0"
        }
      }
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
      "name": "FURLAEU Availability Monitoring and Alerting",
      "path": "v1-furlaeu-availability",
      "trigger": "0 0/15 * * * *",
      "description": "determines the service availability within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "FURLAEU Service Availability Alert",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "service_availability"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "responseStatus",
          "queryTemplateName": "terms_count",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "15m",
              "to": "now"
            },
            "apiKeys": [
              "fe1a806e420a45179b88e3689ca63446"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "count": "10"
            }
          }
        },
        "name": "Determines the availability for a service.",
        "policyType": "ServiceAvailabilityPolicy",
        "properties": {
          "threshold": "99"
        }
      }
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
      "name": "FURLAEU Decrease Traffic Spike",
      "path": "v1-furlaeu-decrease-traffic-sprike",
      "trigger": "0 0/15 * * * *",
      "description": "determines the decrease in traffic between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "FURLAEU Decrease Traffic Alert",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "traffic_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "requestId",
          "queryTemplateName": "term_count_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "60m",
              "to": "now"
            },
            "apiKeys": [
              "fe1a806e420a45179b88e3689ca63446"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "30m"
            }
          }
        },
        "name": "Verifies if there is a decrease in traffic between two time periods.",
        "policyType": "DecreaseTrafficSpikePolicy",
        "properties": {
          "previousMinimumEventsCount": "200",
          "threshold": "-99.0"
        }
      }
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
      "name": "FURLAJP Availability Monitoring and Alerting",
      "path": "v1-furlajp-availability",
      "trigger": "0 0/15 * * * *",
      "description": "determines the service availability within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "FURLAJP Service Availability Alert",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "service_availability"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "responseStatus",
          "queryTemplateName": "terms_count",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "15m",
              "to": "now"
            },
            "apiKeys": [
              "e476082cf7af49b1b817e34c91d3486e"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "count": "10"
            }
          }
        },
        "name": "Determines the availability for a service.",
        "policyType": "ServiceAvailabilityPolicy",
        "properties": {
          "threshold": "99"
        }
      }
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
      "name": "FURLAJP Decrease Traffic Spike",
      "path": "v1-furlajp-decrease-traffic-sprike",
      "trigger": "0 0/15 * * * *",
      "description": "determines the decrease in traffic between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "FURLAJP Decrease Traffic Alert",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "traffic_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "requestId",
          "queryTemplateName": "term_count_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "60m",
              "to": "now"
            },
            "apiKeys": [
              "e476082cf7af49b1b817e34c91d3486e"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "30m"
            }
          }
        },
        "name": "Verifies if there is a decrease in traffic between two time periods.",
        "policyType": "DecreaseTrafficSpikePolicy",
        "properties": {
          "previousMinimumEventsCount": "200",
          "threshold": "-99.0"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  }
]

module.exports = entities