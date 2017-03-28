var config = require('../config')
var port = config.port

var entities = [
  {
    "title": "v1-bbod-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-bbod-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-bbod-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "BBOD Availability Monitoring and Alerting",
      "path": "v1-bbod-availability.json",
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
    "title": "v1-bbod-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-bbod-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-bbod-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "BBOD Decrease Traffic Spike",
      "path": "v1-bbod-decrease-traffic-sprike.json",
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
    "title": "v1-ciscoctg-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ciscoctg-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ciscoctg-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "CISCOCTG Availability Monitoring and Alerting",
      "path": "v1-ciscoctg-availability.json",
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
    "title": "v1-ciscoctg-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ciscoctg-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ciscoctg-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "CISCOCTG Decrease Traffic Spike",
      "path": "v1-ciscoctg-decrease-traffic-sprike.json",
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
    "title": "dispatch-errors-watch.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/dispatch-errors-watch.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/dispatch-errors-watch.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "Dispatch Errors Watch.",
      "path": "dispatch-errors-watch.json",
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
    "title": "dispatch-hosts-watch.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/dispatch-hosts-watch.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/dispatch-hosts-watch.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "Dispatch Hosts Watch",
      "path": "dispatch-hosts-watch.json",
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
    "title": "dispatch-hosts-watch.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/dispatch-hosts-watch.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/dispatch-hosts-watch.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "Dispatch Hosts Watch",
      "path": "dispatch-hosts-watch.json",
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
    "title": "v1-electrol-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-electrol-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-electrol-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "ELECTROL Availability Monitoring and Alerting",
      "path": "v1-electrol-availability.json",
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
    "title": "v1-electrol-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-electrol-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-electrol-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "ELECTROL Decrease Traffic Spike",
      "path": "v1-electrol-decrease-traffic-sprike.json",
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
    "title": "v1-furlaeu-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlaeu-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlaeu-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "FURLAEU Availability Monitoring and Alerting",
      "path": "v1-furlaeu-availability.json",
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
    "title": "v1-furlaeu-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlaeu-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlaeu-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "FURLAEU Decrease Traffic Spike",
      "path": "v1-furlaeu-decrease-traffic-sprike.json",
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
    "title": "v1-furlajp-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlajp-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlajp-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "FURLAJP Availability Monitoring and Alerting",
      "path": "v1-furlajp-availability.json",
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
    "title": "v1-furlajp-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlajp-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlajp-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "FURLAJP Decrease Traffic Spike",
      "path": "v1-furlajp-decrease-traffic-sprike.json",
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
  },
  {
    "title": "v1-furlau-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlau-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlau-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "FURLAU Availability Monitoring and Alerting",
      "path": "v1-furlau-availability.json",
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
                "subject": "FURLAU Service Availability Alert",
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
              "f4fc174d4733428e86fc38fc7f7bb748",
              "4eeb5d540ff54cf6b077ec469f2dd806"
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
    "title": "v1-furlau-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlau-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlau-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "FURLAU Decrease Traffic Spike",
      "path": "v1-furlau-decrease-traffic-sprike.json",
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
                "subject": "FURLAU Decrease Traffic Alert",
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
              "f4fc174d4733428e86fc38fc7f7bb748",
              "4eeb5d540ff54cf6b077ec469f2dd806"
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
    "title": "v1-furlaus-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlaus-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-furlaus-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "FURLAUS Decrease Traffic Spike",
      "path": "v1-furlaus-decrease-traffic-sprike.json",
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
                "subject": "FURLAUS Decrease Traffic Alert",
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
              "f4fc174d4733428e86fc38fc7f7bb748"
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
    "title": "v1-htcemea-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-htcemea-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-htcemea-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "HTC-EMEA Availability Monitoring and Alerting",
      "path": "v1-htcemea-availability.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines the availability of htc within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "HTC-EMEA Service Availability Alert",
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
              "864d71cdaffb4e03a43a535c23d3292a",
              "18ba5cb2b70d4093a20a362078f0958c",
              "b38695ad77ef4d31b11192f8d80d9a8d"
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
    "title": "v1-htcemea-decrease-traffic-spike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-htcemea-decrease-traffic-spike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-htcemea-decrease-traffic-spike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "HTC-EMEA Decrease Traffic Spike",
      "path": "v1-htcemea-decrease-traffic-spike.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines a decrease in traffic between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "HTC-EMEA Decrease Traffic Alert",
                "from": "DRConnectAPIS@digitalriver.com",
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
          "queryTemplateName": "terms_count",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "30m",
              "to": "now"
            },
            "apiKeys": [
              "864d71cdaffb4e03a43a535c23d3292a",
              "18ba5cb2b70d4093a20a362078f0958c",
              "b38695ad77ef4d31b11192f8d80d9a8d"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "15m"
            }
          }
        },
        "name": "Checks for a decrease in traffic between two time periods.",
        "policyType": "DecreaseTrafficSpikePolicy",
        "properties": {
          "previousMinimumEventsCount": "200",
          "threshold": "-99.00"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-htcemea-error-spike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-htcemea-error-spike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-htcemea-error-spike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "HTC-EMEA Error Spike",
      "path": "v1-htcemea-error-spike.json",
      "trigger": "0 0/10 * * * *",
      "description": "determines a spike in error codes between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "HTC-EMEA Error Spike Alert",
                "from": "DRConnectAPIS@digitalriver.com",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "error_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "responseStatus",
          "queryTemplateName": "date_range_terms_count",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "10m",
              "to": "now"
            },
            "apiKeys": [
              "864d71cdaffb4e03a43a535c23d3292a",
              "18ba5cb2b70d4093a20a362078f0958c",
              "b38695ad77ef4d31b11192f8d80d9a8d"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "5m"
            }
          }
        },
        "name": "Determines the percentage increase in response times over a period of time.",
        "policyType": "IncreaseErrorSpikePolicy",
        "properties": {
          "errorCountThreshold": "20",
          "percentageChangeThreshold": "200.00",
          "eventsCountThreshold": "100"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "htc-emea-increase-average-response-time.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/htc-emea-increase-average-response-time.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/htc-emea-increase-average-response-time.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "HTC-EMEA Increase Average Response Time",
      "path": "htc-emea-increase-average-response-time.json",
      "trigger": "0 0/10 * * * *",
      "description": "determines an increase in the average response time between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "HTC-EMEA Increase Average Response Time Alert",
                "from": "DRConnectAPIS@digitalriver.com",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "avg_response_time_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "totalTimeInMilliseconds",
          "queryTemplateName": "term_avg_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "10m",
              "to": "now"
            },
            "apiKeys": [
              "864d71cdaffb4e03a43a535c23d3292a",
              "18ba5cb2b70d4093a20a362078f0958c",
              "b38695ad77ef4d31b11192f8d80d9a8d"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "5m"
            }
          }
        },
        "name": "Determines the percentage increase in response times over a period of time.",
        "policyType": "AverageResponseTimeSpikePolicy",
        "properties": {
          "percentageChangeThreshold": "200",
          "eventsCountThreshold": "100",
          "avgResponseTimeThreshold": "700"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-htcus-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-htcus-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-htcus-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "HTC-US Availability Monitoring and Alerting",
      "path": "v1-htcus-availability.json",
      "trigger": "0 0/5 * * * *",
      "description": "determines the availability of htc within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "Dispatch Alert - HTC-US Availability below 98%",
                "timeZone": "America/Chicago",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com"
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
              "d79960cf15db4422a34d52785e088262",
              "UnZqOVp4laTfF1l71GqnzXR5e34MUG3M",
              "2c8792edf77a4bfa86f442bbf79da4e0",
              "6ac66961851f424f87aa7992a5cea5ca"
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
          "threshold": "98"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-htcemea-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-htcemea-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-htcemea-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "HTCEMEA Decrease Traffic Spike",
      "path": "v1-htcemea-decrease-traffic-sprike.json",
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
                "subject": "HTCEMEA Decrease Traffic Alert",
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
              "864d71cdaffb4e03a43a535c23d3292a",
              "18ba5cb2b70d4093a20a362078f0958c",
              "b38695ad77ef4d31b11192f8d80d9a8d"
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
    "title": "v1-jabra-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-jabra-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-jabra-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "Jabra Availability Monitoring and Alerting",
      "path": "v1-jabra-availability.json",
      "trigger": "0 0/10 * * * *",
      "description": "determines the availability of jabra within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "Dispatch Alert - Jabra Availability below 99%",
                "to": "amazon@digitalriver.com"
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
              "WZWxsKIlLOuwUxyn43usGMl2mBFJuczV"
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
    "title": "v1-kasb2bgl-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-kasb2bgl-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-kasb2bgl-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "KASB2BGL Availability Monitoring and Alerting",
      "path": "v1-kasb2bgl-availability.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines the availability of htc within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "KASB2BGL Service Availability Alert",
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
              "m2ff39ba49a5498b8c7093c677016b87"
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
          "threshold": "99.0"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-kasb2bgl-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-kasb2bgl-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-kasb2bgl-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "KASB2BGL Decrease Traffic Spike",
      "path": "v1-kasb2bgl-decrease-traffic-sprike.json",
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
                "subject": "KASB2BGL Decrease Traffic Alert",
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
              "m2ff39ba49a5498b8c7093c677016b87"
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
    "title": "v1-kasb2bgl-increase-average-response-time.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-kasb2bgl-increase-average-response-time.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-kasb2bgl-increase-average-response-time.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "KASB2BGL Increase Average Response Time",
      "path": "v1-kasb2bgl-increase-average-response-time.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines an increase in the average response time between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "KASB2BGL Increase Average Response Time Alert",
                "from": "DRConnectAPIS@digitalriver.com",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "avg_response_time_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "totalTimeInMilliseconds",
          "queryTemplateName": "term_avg_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "30m",
              "to": "now"
            },
            "apiKeys": [
              "m2ff39ba49a5498b8c7093c677016b87"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "15m"
            }
          }
        },
        "name": "Determines the percentage increase in response times over a period of time.",
        "policyType": "AverageResponseTimeSpikePolicy",
        "properties": {
          "percentageChangeThreshold": "200",
          "eventsCountThreshold": "100",
          "avgResponseTimeThreshold": "700"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-lacie-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-lacie-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-lacie-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "LACIE Availability Monitoring and Alerting",
      "path": "v1-lacie-availability.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines the availability of htc within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "LACIE Service Availability Alert",
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
              "dd05220dbc214907a081a449982f3d26"
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
          "threshold": "99.0"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-lacie-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-lacie-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-lacie-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "LACIE Decrease Traffic Spike",
      "path": "v1-lacie-decrease-traffic-sprike.json",
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
                "subject": "LACIE Decrease Traffic Alert",
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
              "dd05220dbc214907a081a449982f3d26"
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
    "title": "v1-lacie-increase-average-response-time.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-lacie-increase-average-response-time.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-lacie-increase-average-response-time.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "LACIE Increase Average Response Time",
      "path": "v1-lacie-increase-average-response-time.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines an increase in the average response time between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "LACIE Increase Average Response Time Alert",
                "from": "DRConnectAPIS@digitalriver.com",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "avg_response_time_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "totalTimeInMilliseconds",
          "queryTemplateName": "term_avg_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "30m",
              "to": "now"
            },
            "apiKeys": [
              "dd05220dbc214907a081a449982f3d26"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "15m"
            }
          }
        },
        "name": "Determines the percentage increase in response times over a period of time.",
        "policyType": "AverageResponseTimeSpikePolicy",
        "properties": {
          "percentageChangeThreshold": "200",
          "eventsCountThreshold": "100",
          "avgResponseTimeThreshold": "3000"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-logiaunz-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logiaunz-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logiaunz-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "LOGIAUNZ Availability Monitoring and Alerting",
      "path": "v1-logiaunz-availability.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines the availability of htc within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "LOGIAUNZ Service Availability Alert",
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
              "6d9cc52eadd14cd7847b588468863592"
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
          "threshold": "99.0"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-logiaunz-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logiaunz-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logiaunz-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "LOGIAUNZ Decrease Traffic Spike",
      "path": "v1-logiaunz-decrease-traffic-sprike.json",
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
                "subject": "LOGIAUNZ Decrease Traffic Alert",
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
              "6d9cc52eadd14cd7847b588468863592"
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
    "title": "v1-logiaunz-increase-average-response-time.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logiaunz-increase-average-response-time.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logiaunz-increase-average-response-time.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "LOGIAUNZ Increase Average Response Time",
      "path": "v1-logiaunz-increase-average-response-time.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines an increase in the average response time between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "LOGIAUNZ Increase Average Response Time Alert",
                "from": "DRConnectAPIS@digitalriver.com",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "avg_response_time_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "totalTimeInMilliseconds",
          "queryTemplateName": "term_avg_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "30m",
              "to": "now"
            },
            "apiKeys": [
              "6d9cc52eadd14cd7847b588468863592"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "15m"
            }
          }
        },
        "name": "Determines the percentage increase in response times over a period of time.",
        "policyType": "AverageResponseTimeSpikePolicy",
        "properties": {
          "percentageChangeThreshold": "200",
          "eventsCountThreshold": "100",
          "avgResponseTimeThreshold": "700"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-logib2c-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logib2c-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logib2c-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "LOGIB2C Availability Monitoring and Alerting",
      "path": "v1-logib2c-availability.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines the availability of htc within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "LOGIB2C Service Availability Alert",
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
              "11aa0d2e8f55487e99e67a15a9ff6168"
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
          "threshold": "99.0"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-logib2c-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logib2c-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logib2c-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "LOGIB2C Decrease Traffic Spike",
      "path": "v1-logib2c-decrease-traffic-sprike.json",
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
                "subject": "LOGIB2C Decrease Traffic Alert",
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
              "11aa0d2e8f55487e99e67a15a9ff6168"
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
    "title": "v1-logieu-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logieu-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logieu-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "LOGIEU Availability Monitoring and Alerting",
      "path": "v1-logieu-availability.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines the availability of htc within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "LOGIEU Service Availability Alert",
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
              "6809b4l0G127438bb773d2d6ec18c394"
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
          "threshold": "99.0"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-logieu-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logieu-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logieu-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "LOGIEU Decrease Traffic Spike",
      "path": "v1-logieu-decrease-traffic-sprike.json",
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
                "subject": "LOGIEU Decrease Traffic Alert",
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
              "6809b4l0G127438bb773d2d6ec18c394"
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
    "title": "v1-logieu-increase-average-response-time.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logieu-increase-average-response-time.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logieu-increase-average-response-time.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "LOGIEU Increase Average Response Time",
      "path": "v1-logieu-increase-average-response-time.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines an increase in the average response time between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "LOGIEU Increase Average Response Time Alert",
                "from": "DRConnectAPIS@digitalriver.com",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "avg_response_time_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "totalTimeInMilliseconds",
          "queryTemplateName": "term_avg_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "30m",
              "to": "now"
            },
            "apiKeys": [
              "6809b4l0G127438bb773d2d6ec18c394"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "15m"
            }
          }
        },
        "name": "Determines the percentage increase in response times over a period of time.",
        "policyType": "AverageResponseTimeSpikePolicy",
        "properties": {
          "percentageChangeThreshold": "200",
          "eventsCountThreshold": "100",
          "avgResponseTimeThreshold": "700"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-logib2c-increase-average-response-time.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logib2c-increase-average-response-time.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-logib2c-increase-average-response-time.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "LOGIb2C Increase Average Response Time",
      "path": "v1-logib2c-increase-average-response-time.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines an increase in the average response time between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "LOGIb2C Increase Average Response Time Alert",
                "from": "DRConnectAPIS@digitalriver.com",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "avg_response_time_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "totalTimeInMilliseconds",
          "queryTemplateName": "term_avg_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "30m",
              "to": "now"
            },
            "apiKeys": [
              "11aa0d2e8f55487e99e67a15a9ff6168"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "15m"
            }
          }
        },
        "name": "Determines the percentage increase in response times over a period of time.",
        "policyType": "AverageResponseTimeSpikePolicy",
        "properties": {
          "percentageChangeThreshold": "200",
          "eventsCountThreshold": "100",
          "avgResponseTimeThreshold": "700"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-mfesmb-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-mfesmb-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-mfesmb-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "MFESMB Availability Monitoring and Alerting",
      "path": "v1-mfesmb-availability.json",
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
                "subject": "MFESMB Service Availability Alert",
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
              "a5a154df5b7840588172fc85ebe71e87"
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
    "title": "v1-mfesmb-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-mfesmb-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-mfesmb-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "MFESMB Decrease Traffic Spike",
      "path": "v1-mfesmb-decrease-traffic-sprike.json",
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
                "subject": "MFESMB Decrease Traffic Alert",
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
              "a5a154df5b7840588172fc85ebe71e87"
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
    "title": "ms-admin-product-service-error-count.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/ms-admin-product-service-error-count.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/ms-admin-product-service-error-count.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "MS Admin Product Service Error Count",
      "path": "ms-admin-product-service-error-count.json",
      "trigger": "0 0/10 * * * *",
      "description": "Return the number of error responses within a time period.",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "Error Spike for MS Admin Product",
                "to": "amazon@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "error_count"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "responseStatus",
          "queryTemplateName": "terms_count",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "10m",
              "to": "now"
            },
            "apiKeys": [
              "61972e2ace5b43caad61136ee9ad9254"
            ],
            "serviceIds": [
              "admin"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "count": 10
            }
          }
        },
        "name": "Counts the number of events found in ES.",
        "policyType": "PatternMatchingCountPolicy",
        "properties": {
          "matchingPattern": "SERVER_ERROR_RESPONSE",
          "condition": "GREATER_THAN",
          "threshold": 9
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "uhf-non-200-response.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/uhf-non-200-response.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/uhf-non-200-response.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "MS Universal Header Non-200 Response Status Alert",
      "path": "uhf-non-200-response.json",
      "trigger": "0 0/10 * * * *",
      "description": "determines the percentage of 200 responses for the service within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "Dispatch Alert - MS Universal Header Footer API Availability below 90%",
                "to": "drconnectalerts@digitalriver.com,MSTOM@digitalriver.com,MSStoreTeamDev@digitalriver.com,msdevsupport@digitalriver.com"
              },
              "firingPolicy": "CONTINUOUS",
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
              "from": "10m",
              "to": "now"
            },
            "apiKeys": [
              "21ea08fb07aa419aba9c4b4f077562d1"
            ],
            "serviceIds": [
              "msuni"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "count": "10"
            }
          }
        },
        "name": "Matches the percentage of responses with a defined response code.",
        "policyType": "ServiceAvailabilityPolicy",
        "properties": {
          "matchingPattern": "ONLY_200_RESPONSE",
          "eventsCountThreshold": "100",
          "threshold": "90.0"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-msca-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-msca-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-msca-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "MSCA Availability Monitoring and Alerting",
      "path": "v1-msca-availability.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines the availability of htc within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "MSCA Service Availability Alert",
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
              "f9a80526573b495fb75b518b2b89354e",
              "b838ddb2e2814523a79accc70ae46417",
              "bd4ba131e94a49c48fc4621e4e208391",
              "b646a118ccf140508b0253c9a44d3e12"
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
          "threshold": "99.0"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-msca-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-msca-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-msca-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "MSCA Decrease Traffic Spike",
      "path": "v1-msca-decrease-traffic-sprike.json",
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
                "subject": "MSCA Decrease Traffic Alert",
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
              "f9a80526573b495fb75b518b2b89354e",
              "b838ddb2e2814523a79accc70ae46417",
              "bd4ba131e94a49c48fc4621e4e208391",
              "b646a118ccf140508b0253c9a44d3e12"
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
    "title": "v1-msca-increase-average-response-time.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-msca-increase-average-response-time.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-msca-increase-average-response-time.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "MSCA Increase Average Response Time",
      "path": "v1-msca-increase-average-response-time.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines an increase in the average response time between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "MSCA Increase Average Response Time Alert",
                "from": "DRConnectAPIS@digitalriver.com",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "avg_response_time_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "totalTimeInMilliseconds",
          "queryTemplateName": "term_avg_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "30m",
              "to": "now"
            },
            "apiKeys": [
              "f9a80526573b495fb75b518b2b89354e",
              "b838ddb2e2814523a79accc70ae46417",
              "bd4ba131e94a49c48fc4621e4e208391",
              "b646a118ccf140508b0253c9a44d3e12"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "15m"
            }
          }
        },
        "name": "Determines the percentage increase in response times over a period of time.",
        "policyType": "AverageResponseTimeSpikePolicy",
        "properties": {
          "percentageChangeThreshold": "200",
          "eventsCountThreshold": "100",
          "avgResponseTimeThreshold": "2000"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-mslatam-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-mslatam-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-mslatam-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "MSLATAM Availability Monitoring and Alerting",
      "path": "v1-mslatam-availability.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines the availability of htc within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "MSLATAM Service Availability Alert",
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
              "968adfad396c41b1b8c2ed54dd2ee471",
              "270a9538f6f44736bb8834f8f14d61a6",
              "eb1f15d7a9234614bb1c459055ddd29e",
              "03a5370a46014fe0a4da4241682e6079"
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
          "threshold": "99.0"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-mslatam-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-mslatam-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-mslatam-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "MSLATAM Decrease Traffic Spike",
      "path": "v1-mslatam-decrease-traffic-sprike.json",
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
                "subject": "MSLATAM Decrease Traffic Alert",
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
              "968adfad396c41b1b8c2ed54dd2ee471",
              "270a9538f6f44736bb8834f8f14d61a6",
              "eb1f15d7a9234614bb1c459055ddd29e",
              "03a5370a46014fe0a4da4241682e6079"
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
          "threshold": "-99.9"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-mslatam-increase-average-response-time.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-mslatam-increase-average-response-time.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-mslatam-increase-average-response-time.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "MSLATAM Increase Average Response Time",
      "path": "v1-mslatam-increase-average-response-time.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines an increase in the average response time between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "MSLATAM Increase Average Response Time Alert",
                "from": "DRConnectAPIS@digitalriver.com",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "avg_response_time_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "totalTimeInMilliseconds",
          "queryTemplateName": "term_avg_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "30m",
              "to": "now"
            },
            "apiKeys": [
              "968adfad396c41b1b8c2ed54dd2ee471",
              "270a9538f6f44736bb8834f8f14d61a6",
              "eb1f15d7a9234614bb1c459055ddd29e",
              "03a5370a46014fe0a4da4241682e6079"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "15m"
            }
          }
        },
        "name": "Determines the percentage increase in response times over a period of time.",
        "policyType": "AverageResponseTimeSpikePolicy",
        "properties": {
          "percentageChangeThreshold": "200",
          "eventsCountThreshold": "100",
          "avgResponseTimeThreshold": "2000"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-msusa-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-msusa-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-msusa-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "MSUSA Decrease Traffic Spike",
      "path": "v1-msusa-decrease-traffic-sprike.json",
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
                "subject": "MSUSA Decrease Traffic Alert",
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
              "6345e570f5d04a80a26e0916a654c974",
              "4e2672ea3d2d4d69b8dda44a00806e34",
              "839ceead92404cbdb4419ac6ef7f6d05",
              "5fd2a624e71746c981f58d7ac79e9fc4"
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
    "title": "v1-ncsoft-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ncsoft-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ncsoft-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "NCSOFT Availability Monitoring and Alerting",
      "path": "v1-ncsoft-availability.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines the availability of htc within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "NCSOFT Service Availability Alert",
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
              "lv1kDTOXvnNQvuFpkM5Af1NIFtK9TOAD"
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
          "threshold": "99.0"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-ncsoft-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ncsoft-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ncsoft-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "NCSOFT Decrease Traffic Spike",
      "path": "v1-ncsoft-decrease-traffic-sprike.json",
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
                "subject": "NCSOFT Decrease Traffic Alert",
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
              "lv1kDTOXvnNQvuFpkM5Af1NIFtK9TOAD",
              "EwUZtJiOJIlnkLq2k46V5txKR3bjJWq8"
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
          "threshold": "-95.0"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-ncsoft-increase-average-response-time.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ncsoft-increase-average-response-time.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ncsoft-increase-average-response-time.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "NCSOFT Increase Average Response Time",
      "path": "v1-ncsoft-increase-average-response-time.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines an increase in the average response time between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "NCSOFT Increase Average Response Time Alert",
                "from": "DRConnectAPIS@digitalriver.com",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "avg_response_time_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "totalTimeInMilliseconds",
          "queryTemplateName": "term_avg_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "30m",
              "to": "now"
            },
            "apiKeys": [
              "lv1kDTOXvnNQvuFpkM5Af1NIFtK9TOAD"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "15m"
            }
          }
        },
        "name": "Determines the percentage increase in response times over a period of time.",
        "policyType": "AverageResponseTimeSpikePolicy",
        "properties": {
          "percentageChangeThreshold": "200",
          "eventsCountThreshold": "100",
          "avgResponseTimeThreshold": "700"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-ncsoft2-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ncsoft2-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ncsoft2-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "NCSOFT2 Availability Monitoring and Alerting",
      "path": "v1-ncsoft2-availability.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines the availability of htc within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "NCSOFT2 Service Availability Alert",
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
              "EwUZtJiOJIlnkLq2k46V5txKR3bjJWq8"
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
          "threshold": "99.0"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-ncsoft2-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ncsoft2-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ncsoft2-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "NCSOFT2 Decrease Traffic Spike",
      "path": "v1-ncsoft2-decrease-traffic-sprike.json",
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
                "subject": "NCSOFT2 Decrease Traffic Alert",
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
              "EwUZtJiOJIlnkLq2k46V5txKR3bjJWq8"
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
          "threshold": "-95.0"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-ncsoft2-increase-average-response-time.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ncsoft2-increase-average-response-time.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-ncsoft2-increase-average-response-time.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "NCSOFT2 Increase Average Response Time",
      "path": "v1-ncsoft2-increase-average-response-time.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines an increase in the average response time between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "NCSOFT2 Increase Average Response Time Alert",
                "from": "DRConnectAPIS@digitalriver.com",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "avg_response_time_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "totalTimeInMilliseconds",
          "queryTemplateName": "term_avg_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "30m",
              "to": "now"
            },
            "apiKeys": [
              "EwUZtJiOJIlnkLq2k46V5txKR3bjJWq8"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "15m"
            }
          }
        },
        "name": "Determines the percentage increase in response times over a period of time.",
        "policyType": "AverageResponseTimeSpikePolicy",
        "properties": {
          "percentageChangeThreshold": "200",
          "eventsCountThreshold": "100",
          "avgResponseTimeThreshold": "700"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-nvidia-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-nvidia-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-nvidia-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "NVIDIA Availability Monitoring and Alerting",
      "path": "v1-nvidia-availability.json",
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
                "subject": "NVIDIA Service Availability Alert",
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
              "9485fa7b159e42edb08a83bde0d83dia"
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
    "title": "v1-nvsubs-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-nvsubs-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-nvsubs-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "NVSUBS Availability Monitoring and Alerting",
      "path": "v1-nvsubs-availability.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines the availability of htc within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "NVSUBS Service Availability Alert",
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
              "x4Uo2cwIaUr1GSVHEPY82EQ15MWOuHUa"
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
          "threshold": "98.0"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-nvsubs-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-nvsubs-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-nvsubs-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "NVSUBS Decrease Traffic Spike",
      "path": "v1-nvsubs-decrease-traffic-sprike.json",
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
                "subject": "NVSUBS Decrease Traffic Alert",
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
              "x4Uo2cwIaUr1GSVHEPY82EQ15MWOuHUa"
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
    "title": "v1-nvsubs-increase-average-response-time.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-nvsubs-increase-average-response-time.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-nvsubs-increase-average-response-time.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "NVSUBS Increase Average Response Time",
      "path": "v1-nvsubs-increase-average-response-time.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines an increase in the average response time between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "NVSUBS Increase Average Response Time Alert",
                "from": "DRConnectAPIS@digitalriver.com",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "avg_response_time_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "totalTimeInMilliseconds",
          "queryTemplateName": "term_avg_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "30m",
              "to": "now"
            },
            "apiKeys": [
              "x4Uo2cwIaUr1GSVHEPY82EQ15MWOuHUa"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "15m"
            }
          }
        },
        "name": "Determines the percentage increase in response times over a period of time.",
        "policyType": "AverageResponseTimeSpikePolicy",
        "properties": {
          "percentageChangeThreshold": "200",
          "eventsCountThreshold": "100",
          "avgResponseTimeThreshold": "2500"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-samsung-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-samsung-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-samsung-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "SAMSUNG Availability Monitoring and Alerting",
      "path": "v1-samsung-availability.json",
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
                "subject": "SAMSUNG Service Availability Alert",
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
              "5de150dc29228095f9811cdf15ea5938",
              "0fffa5a070a3409c9fec8211f35ca945"
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
    "title": "v1-samsung-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-samsung-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-samsung-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "SAMSUNG Decrease Traffic Spike",
      "path": "v1-samsung-decrease-traffic-sprike.json",
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
                "subject": "SAMSUNG Decrease Traffic Alert",
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
              "5de150dc29228095f9811cdf15ea5938",
              "0fffa5a070a3409c9fec8211f35ca945"
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
    "title": "v1-sgateus-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-sgateus-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-sgateus-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "SGATEUS Availability Monitoring and Alerting",
      "path": "v1-sgateus-availability.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines the availability of htc within a time period",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "SGATEUS Service Availability Alert",
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
              "780e6221a2ee627b0ae1cffcdf31f9aa"
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
          "threshold": "99.0"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-sgateus-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-sgateus-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-sgateus-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "SGATEUS Decrease Traffic Spike",
      "path": "v1-sgateus-decrease-traffic-sprike.json",
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
                "subject": "SGATEUS Decrease Traffic Alert",
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
              "780e6221a2ee627b0ae1cffcdf31f9aa"
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
    "title": "v1-sgateus-increase-average-response-time.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-sgateus-increase-average-response-time.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-sgateus-increase-average-response-time.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "SGATEUS Increase Average Response Time",
      "path": "v1-sgateus-increase-average-response-time.json",
      "trigger": "0 0/15 * * * *",
      "description": "determines an increase in the average response time between two time periods",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "SGATEUS Increase Average Response Time Alert",
                "from": "DRConnectAPIS@digitalriver.com",
                "to": "amazon@digitalriver.com,JSwanson@DigitalRiver.com,kkester@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "avg_response_time_spike"
          }
        ],
        "queryDefinition": {
          "queryKeyField": "totalTimeInMilliseconds",
          "queryTemplateName": "term_avg_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "30m",
              "to": "now"
            },
            "apiKeys": [
              "780e6221a2ee627b0ae1cffcdf31f9aa"
            ],
            "serviceIds": [
              "v1"
            ],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "interval": "15m"
            }
          }
        },
        "name": "Determines the percentage increase in response times over a period of time.",
        "policyType": "AverageResponseTimeSpikePolicy",
        "properties": {
          "percentageChangeThreshold": "200",
          "eventsCountThreshold": "100",
          "avgResponseTimeThreshold": "3000"
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "averageresponsetimespikepolicy-taiwan-hey.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/averageresponsetimespikepolicy-taiwan-hey.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/averageresponsetimespikepolicy-taiwan-hey.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "Taiwan-Hey",
      "path": "averageresponsetimespikepolicy-taiwan-hey.json",
      "trigger": "0 0/5 * * * *",
      "description": "Taiwan-Hey",
      "active": false,
      "policyDefinition": {
        "queryDefinition": {
          "queryKeyField": "totalTimeInMilliseconds",
          "queryTemplateName": "term_avg_spike",
          "queryType": "SEARCH_WITH_COUNT",
          "definition": {
            "timeInterval": {
              "from": "",
              "to": ""
            },
            "apiKeys": [],
            "serviceIds": [],
            "clusters": [],
            "documentTypes": [],
            "properties": {
              "count": "",
              "siteId": "",
              "interval": "",
              "responseStatus": "",
              "responseSource": ""
            }
          }
        },
        "name": "",
        "policyType": "AverageResponseTimeSpikePolicy",
        "properties": {
          "percentageChangeThreshold": "",
          "eventsCountThreshold": "",
          "avgResponseTimeThreshold": ""
        }
      }
    },
    "$ref": "#/definitions/WatchDefinition"
  },
  {
    "title": "v1-wdus-availability.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-wdus-availability.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-wdus-availability.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "WDUS Availability Monitoring and Alerting",
      "path": "v1-wdus-availability.json",
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
                "subject": "WDUS Service Availability Alert",
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
              "b88f4c94a4774dcea2e9ab54fa595ce9"
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
    "title": "v1-wdus-decrease-traffic-sprike.json",
    "links": {
      "item": {
        "rel": "item",
        "href": "http://localhost:" + port + "/watch-definitions/v1-wdus-decrease-traffic-sprike.json.drive"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:" + port + "/watch-definitions/v1-wdus-decrease-traffic-sprike.json.drive",
        "title": "Delete",
        "method": "DELETE"
      }
    },
    "data": {
      "name": "WDUS Decrease Traffic Spike",
      "path": "v1-wdus-decrease-traffic-sprike.json",
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
                "subject": "WDUS Decrease Traffic Alert",
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
              "b88f4c94a4774dcea2e9ab54fa595ce9"
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
  }
]

module.exports = entities