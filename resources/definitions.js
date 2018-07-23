var schema = require('./definition.schema')

var definitions = {
  'service1-abcde-availability': {
    "links": {},
    "data": {
      "name": "ABCDE Availability Monitoring and Alerting",
      "path": "service1-abcde-availability",
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
                "subject": "ABCDE Service Availability Alert",
                "to": "user1@digitalriver.com,user2@DigitalRiver.com,user3@digitalriver.com"
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
              "testkey-AbcDEfTGI1730430132874"
            ],
            "serviceIds": [
              "service1"
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
    "schema": schema
  },
  'service1-abcde-decrease-traffic-sprike': {
    "links": {},
    "data": {
      "name": "ABCDE Decrease Traffic Spike",
      "path": "service1-abcde-decrease-traffic-sprike",
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
                "subject": "ABCDE Decrease Traffic Alert",
                "to": "user1@digitalriver.com,user2@DigitalRiver.com,user3@digitalriver.com"
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
              "testkey-AbcDEfTGI1730430132874"
            ],
            "serviceIds": [
              "service1"
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
    "schema": schema
  },
  'service1-chocolate-availability': {
    "links": {},
    "data": {
      "name": "CHOCOLATE Availability Monitoring and Alerting",
      "path": "service1-chocolate-availability",
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
                "subject": "CHOCOLATE Service Availability Alert",
                "to": "user1@digitalriver.com,user2@DigitalRiver.com,user3@digitalriver.com"
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
              "testkey-1343KBIEJW2355abedaDef"
            ],
            "serviceIds": [
              "service1"
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
    "schema": schema
  },
  'service1-chocolate-decrease-traffic-sprike': {
    "links": {},
    "data": {
      "name": "CHOCOLATE Decrease Traffic Spike",
      "path": "service1-chocolate-decrease-traffic-sprike",
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
                "subject": "CHOCOLATE Decrease Traffic Alert",
                "to": "user1@digitalriver.com,user2@DigitalRiver.com,user3@digitalriver.com"
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
              "testkey-1343KBIEJW2355abedaDef"
            ],
            "serviceIds": [
              "service1"
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
    "schema": schema
  },
  'doughnut-errors-watch': {
    "links": {},
    "data": {
      "name": "DOUGHNUT Errors Watch.",
      "path": "doughnut-errors-watch",
      "trigger": "0 0/5 * * * *",
      "description": "Finds errors that originated in Doughnut.",
      "active": true,
      "policyDefinition": {
        "alertDefinitions": [
          {
            "alertDefinition": {
              "alertText": null,
              "alertType": {
                "type": "EMAIL",
                "subject": "Doughnut Alert - Doughnut Errors Found",
                "to": "user1@digitalriver.com,user2@DigitalRiver.com"
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
              "responseSource": "doughnut, DOUGHNUT"
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
    "schema": schema
  },
  'doughnut-hosts-watch': {
    "links": {},
    "data": {
      "name": "Doughnut Hosts Watch",
      "path": "doughnut-hosts-watch",
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
                "subject": "Missing Doughnut Hosts",
                "timeZone": "America/Chicago",
                "to": "user1@digitalriver.com"
              },
              "firingPolicy": "ONCE_WITH_FOLLOW_UP",
              "active": true
            },
            "alertTemplate": "missing_doughnut_hosts"
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
    "schema": schema
  },
  'service1-custardtart-availability': {
    "links": {},
    "data": {
      "name": "CUSTARDTART Availability Monitoring and Alerting",
      "path": "service1-custardtart-availability",
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
                "subject": "CUSTARDTART Service Availability Alert",
                "to": "user1@digitalriver.com,user2@DigitalRiver.com,user3@digitalriver.com"
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
              "testkey-XGwewef40298IELSLIGe32"
            ],
            "serviceIds": [
              "service1"
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
    "schema": schema
  },
  'service1-custardtart-decrease-traffic-sprike': {
    "links": {},
    "data": {
      "name": "CUSTARDTART Decrease Traffic Spike",
      "path": "service1-custardtart-decrease-traffic-sprike",
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
                "subject": "CUSTARDTART Decrease Traffic Alert",
                "to": "user1@digitalriver.com,user2@DigitalRiver.com,user3@digitalriver.com"
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
              "testkey-XGwewef40298IELSLIGe32"
            ],
            "serviceIds": [
              "service1"
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
    "schema": schema
  },
  'service1-frenchfries-availability': {
    "links": {},
    "data": {
      "name": "FRENCHFRIES Availability Monitoring and Alerting",
      "path": "service1-frenchfries-availability",
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
                "subject": "FRENCHFRIES Service Availability Alert",
                "to": "user1@digitalriver.com,user2@DigitalRiver.com,user3@digitalriver.com"
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
              "testkey-fe1ABDewe3234Jioqqej33"
            ],
            "serviceIds": [
              "service1"
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
    "schema": schema
  },
  'service1-frenchfries-decrease-traffic-sprike': {
    "links": {},
    "data": {
      "name": "FRENCHFRIES Decrease Traffic Spike",
      "path": "service1-frenchfires-decrease-traffic-sprike",
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
                "subject": "FRENCHFRIES Decrease Traffic Alert",
                "to": "user1@digitalriver.com,user2@DigitalRiver.com,user3@digitalriver.com"
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
              "testkey-fe1ABDewe3234Jioqqej33"
            ],
            "serviceIds": [
              "service1"
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
    "schema": schema
  },
  'service1-firedrice-availability': {
    "links": {},
    "data": {
      "name": "FRIEDRICE Availability Monitoring and Alerting",
      "path": "service1-firedrice-availability",
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
                "subject": "FRIEDRICE Service Availability Alert",
                "to": "user1@digitalriver.com,user2@DigitalRiver.com,user3@digitalriver.com"
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
              "testkey-EI4716nfjdiDe93Lo9d3es"
            ],
            "serviceIds": [
              "service1"
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
    "schema": schema
  },
  'service1-firedrice-decrease-traffic-sprike': {
    "links": {},
    "data": {
      "name": "FRIEDRICE Decrease Traffic Spike",
      "path": "service1-firedrice-decrease-traffic-sprike",
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
                "subject": "FRIEDRICE Decrease Traffic Alert",
                "to": "user1@digitalriver.com,user2@DigitalRiver.com,user3@digitalriver.com"
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
              "testkey-EI4716nfjdiDe93Lo9d3es"
            ],
            "serviceIds": [
              "service1"
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
    "schema": schema
  }
}

module.exports = definitions