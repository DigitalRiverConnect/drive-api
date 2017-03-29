var config = require('../config')
var port = config.port

var definitions = {
  'v1-bbod-availability': {
    "links": {
      "up": {
        "rel": "up",
        "href": "http://localhost:8082/watch-definitions.drive?offset=0&max=10",
        "title": "Back to list"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:8082/watch-definitions/v1-bbod-availability.drive",
        "title": "Delete",
        "method": "DELETE"
      },
      "edit": {
        "rel": "edit",
        "href": "http://localhost:8082/watch-definitions.drive",
        "title": "Save",
        "method": "PUT",
        "type": "application/json",
        "$ref": "#/definitions/CreateWatchDefinition"
      },
      "self": {
        "rel": "self",
        "href": "http://localhost:8082/watch-definitions/v1-bbod-availability.drive"
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
    "schema": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "WatchDefinition",
      "description": "An explanation about the purpose of this instance.",
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "path": {
          "type": "string",
          "title": "Path",
          "readOnly": true
        },
        "description": {
          "type": "string",
          "title": "Description"
        },
        "active": {
          "type": "boolean",
          "title": "Active"
        },
        "trigger": {
          "title": "Trigger",
          "type": "string"
        },
        "policyDefinition": {
          "title": "Policy Definition Type",
          "oneOf": [
            {
              "title": "Average Response Time Spike",
              "type": "object",
              "name": "AverageResponseTimeSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "AverageResponseTimeSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_avg_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "avg_response_time_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Decrease Traffic Spike",
              "type": "object",
              "name": "DecreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "DecreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Flatline",
              "type": "object",
              "name": "FlatlinePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "FlatlinePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "predefinedMatchingPattern": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "flatline"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Error Spike",
              "type": "object",
              "name": "IncreaseErrorSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseErrorSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "eventsCountThreshold": {
                      "type": "string"
                    },
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "errorCountThreshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "SERVER_ERROR_RESPONSE",
                        "ERROR_RESPONSE",
                        "CLIENT_ERROR_RESPONSE"
                      ]
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "date_range_terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "error_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Traffic Spike",
              "type": "object",
              "name": "IncreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Service Availability",
              "type": "object",
              "name": "ServiceAvailabilityPolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "ServiceAvailabilityPolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "NON_5XX_RESPONSE",
                        "OK_RESPONSE",
                        "ONLY_200_RESPONSE"
                      ]
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "service_availability"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Slow Average Response Time",
              "type": "object",
              "name": "SlowAverageResponseTimePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "SlowAverageResponseTimePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string",
                      "default": 100
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "metrics_avg"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "slow_avg_response_time"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            }
          ]
        }
      },
      "required": [
        "name",
        "path",
        "active",
        "trigger",
        "policyDefinition"
      ],
      "definitions": {
        "alertDefinitions": {
          "type": "object",
          "title": "Alert Definition",
          "properties": {
            "alertType": {
              "title": "Alert Type",
              "oneOf": [
                {
                  "title": "EMAIL",
                  "type": "object",
                  "name": "EMAIL",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "EMAIL"
                      ]
                    },
                    "subject": {
                      "type": "string"
                    },
                    "from": {
                      "type": "string"
                    },
                    "to": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type",
                    "subject",
                    "to"
                  ]
                },
                {
                  "title": "CONSOLE_TEXT",
                  "type": "object",
                  "name": "CONSOLE_TEXT",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "CONSOLE_TEXT"
                      ]
                    }
                  },
                  "required": [
                    "type"
                  ]
                },
                {
                  "title": "SLACK",
                  "type": "object",
                  "name": "SLACK",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "SLACK"
                      ]
                    },
                    "webhook": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "channel": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type"
                  ]
                }
              ]
            },
            "firingPolicy": {
              "type": "string",
              "title": "Firing Policy",
              "enum": [
                "CONTINUOUS",
                "ONCE_WITH_FOLLOW_UP"
              ]
            }
          }
        },
        "queryType_SEARCH_WITH_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH_WITH_COUNT"
        },
        "queryType_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "COUNT"
        },
        "queryType_SEARCH": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH"
        },
        "queryDefinition": {
          "title": "Query Definition Details",
          "properties": {
            "timeInterval": {
              "type": "object",
              "title": "Time Interval",
              "properties": {
                "from": {
                  "type": "string",
                  "title": "From"
                },
                "to": {
                  "type": "string",
                  "title": "To"
                }
              },
              "required": [
                "from",
                "to"
              ]
            },
            "apiKeys": {
              "type": "array",
              "title": "Api Keys",
              "items": {
                "type": "string",
                "title": "Api Key",
                "enum": [
                  "a52e39b2e85f44518c9557bef07cefb7",
                  "c379d9cfb0dd490a8399734afa7e28c4",
                  "63ef06b39d47413989f52fbd5be19761",
                  "3daaa577d3084251b2f22bb5bcfb092c",
                  "ce5679c23cd648e19896ce11c9183acf",
                  "71c9782424b64dbbb2e3b1b5ed7b9357",
                  "bd8bba27f49a45f69296a8f57715887a",
                  "722aacea2683463e965c0992d0a1fed6",
                  "d503c0c1e0774c33b6906f5379a114ab",
                  "a59de855c96448acb6f303edc6e26fe7",
                  "f621bcb5b7d44c238631e5e2cea96ac6",
                  "09a8a9e5c81b48f69fd43c0c3defddb0",
                  "d9b0f8ea7f7a4622999c8e1c15933a1e",
                  "dec38ad6b095403e8a1535585b2e9078",
                  "29f94443bbe74b49a9c67fa7a27fac84",
                  "7508fdb7357a4420b1d09271fe682905",
                  "bc81f22c34e84caa96e1d42e8c6df284",
                  "785336eafbea4c1d9c8c47f8cc07bf20",
                  "4a0d6a3658874b6c84e24424f73d5b34",
                  "c9933ce47b76448eaa8dd834a6edb588",
                  "d71730a87ca84a59a2ce94b9bbcc066f",
                  "1e4533bef3f74093b9ddcf727c32ecbd",
                  "6fc4f795c08846368f2ebcf942c38257",
                  "2584ca43d8c34818b409d70813725d06",
                  "75cd2758726d471abb499ba4a83cd43d",
                  "ffe9924c2c0a42fc97ffd80e85d37bc2",
                  "9791ea76c17a41b7b19e0c5de66cd595",
                  "aa51af2df7c3427faf9d8590fe464bc2",
                  "909009c5214249d18054565e6c57886f",
                  "c3609dd96eac4376b20890494e882a38",
                  "d7366e9c1f7a4c3f97cbc340c757d55b",
                  "42e71d5576964354b51688a983caa52c",
                  "1ac2152179c3469e8c9bd1b9b62de1f6",
                  "2f0c928b61654c36ade08c8c23bed62b",
                  "639e54158b254306ae68867995b70ee9",
                  "f5fbf33974794e859696defe6fc9818a",
                  "dfee9ead4fc245d59f7968c87e40709c",
                  "2d58cd1208f34a7886f8ab0760055ab3",
                  "45e8b0e39aba4eebb15ddf134e9b0bd9",
                  "0971189a1331474abbb8633f2c11bba1",
                  "b400399bbf444710af162ee1668aa47d",
                  "37429d6b9e304fafa37c64358921f565",
                  "26ceda9f2a694254979100a8455f0e73",
                  "2aa724b75a684e6c98bdfe9b00d94a08",
                  "ed7401c749404258a4c264f6b0f1786b",
                  "eff377216fae4ac0bbf41864d115cb22",
                  "014d336197b94414910b7317b5d019d1",
                  "0f61671976abf7f85d1c98b207830f6b",
                  "2c84e84bb902457aad6cb73206db923f",
                  "3563c230c22945f1826644bdb9534d95",
                  "fbe2a04cb5144f4cb8ec2a13f326398c",
                  "66a15471554f4326bbe5c2eb73c49ee3",
                  "JJ9QFssRnxzms2GPPRCBnMDXHjKQNAMW",
                  "58b6ec9ece784e88a575663cbb69074a",
                  "fa40c38d914340fb89f0c63027833a9d",
                  "3e99952c2cc7f1f566126deaff432996",
                  "uFBV0VlouC8OfU38v0l6lG0oVQ0kDqvr",
                  "d4cd446bb89a43c28a15d8909ad58f3b",
                  "1125ee6b84fc4dce83b890763fd567c3",
                  "529ec2c526214e388f13bd7347342483",
                  "604df5ac990fbc67dab8fc098af271e6",
                  "8430105cfa7149bf9273e8046b9751e0",
                  "f84c1db8380944308a93e085b5b1af86",
                  "6c228c145bc04142b13dd7b2c429d62b",
                  "3eb1d5c4b4df444a81e41afaf7053cd1",
                  "60bd7f41a86549698ec9d36b1243a3b5",
                  "65c9d01e68d945d9a3629c6a67a96127",
                  "634720b45ec046a1a193810f87755674",
                  "e71db157a8724cafabd2c579602b10d6",
                  "fe43a8180b58471084a27afc8b781b67",
                  "2f75c16649c04335b666ace790f3631e",
                  "13b9e5d0b4d342dd9ed599d196dcb5ad",
                  "a393b43b8a4047018db5ddd28bea8bbb",
                  "183e4c1b72294c60ac2fcc5de3bc2bfd",
                  "b46b718c759a412aa7ab20c1626062d3",
                  "f06ec13a06cb4faba310c583fa4419ba",
                  "17b573bf92c64b4dad88d1d6d5a3eeef",
                  "83e130a304f2489385b6d267105ee40b",
                  "0fb1db8761ac4a85b4eac8ec49a16867",
                  "6801c617d31745499828eed4c696f4bc",
                  "AjYFBMpbQdCoAFomuHhhFNNjvP5LHCfo",
                  "3bf2a0a885f94f279b9d86568182d75d",
                  "3db6d8afe2d24a78a2e7b976457a40f5",
                  "c2a8ae12b885451b90b86beee0c6e374",
                  "235104cf93754fa0b4b4c7983693842f",
                  "4c4d6d5691fd4e7db73b20b6edd27fe2",
                  "3c93dabcea2147c48f142e1fad482c36",
                  "b3f9b26bdd8f60ef0e2c2c0be0b74260",
                  "GvHfSjHAScUuTAasglA81CmfCEtciNmt",
                  "9692a066e340d51cb0b19f27ea06b364",
                  "e66654556ca510d3487c647399a2caf2",
                  "8ee5d5e1e43b4a92835709f4c4a973c9",
                  "689175898efa478d96d0dfda038e4dad",
                  "3fbe6187e6904dae93606048e2ff003a",
                  "f046805b8ac1461ca76dcf2e3d3f4040",
                  "96562a9d820d441cbc480c7a3758df7b",
                  "6392fc87a33447529e12a454da6c339b",
                  "6fa08f482b4c473880aa0215b3c5de39",
                  "V2ztxK2rFe86jD7zYkRhDSAdrOrcY5qo",
                  "9b67e2693d374162be5e2b1b0c66f036",
                  "0973656604e444bcba03231584b74870",
                  "5c31057bc55c4963837049a6d384b567",
                  "d11ae88278b74a6c931176ca4b7b164f",
                  "b4357251c0574a5e98661bbd06c2ca11",
                  "97f3c5a6f2d945528977e86535b927dd",
                  "HipATLcFtfhaa4NGPzk1dcPsIweaGmLh",
                  "3cf82ad2309640b48d43953c661fca7f",
                  "1a79efcfbfb34ff2b704e4dcde4e8fe9",
                  "2db786407faf4d2fa01bbd07f9a93e79",
                  "2918d633d2fe458f89fff1c241b96e9a",
                  "x7vQOMYuj1sZ6zeTNFeqL83qadqFT0Zm",
                  "480dd90425224c2f8cc9a77a402df105",
                  "c3526ba3fa99454896e0e6a9f4c3c4cc",
                  "8b96563e98c2433585767cb2fe1bee21",
                  "6d0b3139a676431992558dda67b6ba65",
                  "OMA5xOj8iBFRAcHJRmJeenKm4lr8UYTT",
                  "c6YGngARruDia5MOwAKgaMxyQdGnJ60H",
                  "fV8NesDn4r3e02A3XeAAhcGGqEb72W90",
                  "fe69ca7dfd6149ec9a47b3dd521e7644",
                  "fb7295e9e6f1427ebe937023e9114228",
                  "7a809a5636e84d1bac1d6f644ce8b56a",
                  "a692b345717e4adb85879bcee227bca9",
                  "fe1a806e420a45179b88e3689ca63446",
                  "e476082cf7af49b1b817e34c91d3486e",
                  "4eeb5d540ff54cf6b077ec469f2dd806",
                  "f4fc174d4733428e86fc38fc7f7bb748",
                  "e0c1977f09a14a7f8ffc35249e740bd3",
                  "003d23de388a443a813d8c2aeee76418",
                  "a90f1203bd8b4f16bd942870c6e14fbd",
                  "6eabe1249ed14043ac393cb5248f4fb6",
                  "819a5f22f3964bbc99931139ee2eb538",
                  "864d71cdaffb4e03a43a535c23d3292a",
                  "18ba5cb2b70d4093a20a362078f0958c",
                  "UnZqOVp4laTfF1l71GqnzXR5e34MUG3M",
                  "2c8792edf77a4bfa86f442bbf79da4e0",
                  "d79960cf15db4422a34d52785e088262",
                  "0e393a6f3c9c4e08aab38db741953af0",
                  "cede30a1de9c44f6b9183ff9be9ae309",
                  "e1a0f189b4f44b998fc8e47d515ab418",
                  "2b0d95e5167742bfaa87b50141d327b9",
                  "b38695ad77ef4d31b11192f8d80d9a8d",
                  "37504a549ca94c2fbcff1cc7ebfd89e2",
                  "6ac66961851f424f87aa7992a5cea5ca",
                  "5310815a01e14e95bfedf1b655fdef03",
                  "3e33684992de4c85a09d565eca3c0591",
                  "1edd47e8e8424d728f648f9c679f1fae",
                  "e12b65ecd73848db87c5ee7eb3f439e5",
                  "WZWxsKIlLOuwUxyn43usGMl2mBFJuczV",
                  "j2S1P01uImUQum2LFGuO9z2Jin0iqak7",
                  "f5e0a094f420d987ae37ef31813f3e46",
                  "IOGl4gRimt6h9gpPCfABcMjfPNKPzQer",
                  "m2ff39ba49a5498b8c7093c677016b87",
                  "2e57292fec6b4c7e9f9d0ccf49358a74",
                  "b9bdf962b01f4d39a524da440c3a9a24",
                  "3241a555f3bb49e0abebce79e2d9c683",
                  "c67b808be97b4ed7b1de747a7597c6ae",
                  "131457365d7a4b868263b1408386a4e9",
                  "73cb362d47024acebac4a5d7811f16e8",
                  "8a9ba4f6a62142e79e31d95d0b320df5",
                  "98a16c977805f1614cc9017fc0ca027c",
                  "e4eb2861e24ff944d3aa0e16bcb91122",
                  "drLb",
                  "drMonitoring",
                  "slowpitchstats",
                  "T38IByPBQUvbLHxrI1x9kIuY3BTTQSIb",
                  "95204aa36c9e464d95a9f94166ce1df7",
                  "GrEaNYFccnbzjiaNdGjyG627SiWCmv3g",
                  "LFiVpk5qjj570GwT6w8eSaVek9dcyUyo",
                  "dd05220dbc214907a081a449982f3d26",
                  "393169b895e84e13ba6389c0e412d193",
                  "jPvJi1XNitsGyJ8AFDNAizCAdVLKXm2y",
                  "6d9cc52eadd14cd7847b588468863592",
                  "5825c528f47a4f45881a6753c57b3a7f",
                  "11aa0d2e8f55487e99e67a15a9ff6168",
                  "989529bd2f0e4238a3012263d3d48241",
                  "6809b4l0G127438bb773d2d6ec18c394",
                  "4b9a7d96ccad47e0846628ac504b1e1b",
                  "74ba26c4a9d049be86c7cdb092417d97",
                  "fa1eaa5b2242410c82ff92323fcf6d47",
                  "a5a154df5b7840588172fc85ebe71e87",
                  "17d0e59684b34c3aab2861d0248cc25b",
                  "0c546c8ae3874452a66e37d505bec29a",
                  "01815239b9bb48869dea0f48b08ad5b7",
                  "cfb3cb708ce14e069555f231933454b6",
                  "83768800514044c883c1761ae50bffb4",
                  "61972e2ace5b43caad61136ee9ad9254",
                  "dbb3a637c32a4af1ad2410f8d32a7c84",
                  "01186811f3224264b1e564fcf5b7fdb9",
                  "e375ca2119cf4c14aa18ac3722dd07fb",
                  "ec48db0385914ebe9200d9547cb27c5f",
                  "21ea08fb07aa419aba9c4b4f077562d1",
                  "14e24fa4909743038e494db6b4b85697",
                  "65168b875d2b4a2da0321d75834f2620",
                  "8ba21719b32a41bb85a83f70ee999ec4",
                  "bf3c4e727412474c9d105c8d5b6f61ad",
                  "fee22d69e94a472192b30c23b3ac6ac7",
                  "4d0164638250450499a5483fc886f476",
                  "d87c355242804c4db2b474b070c100b7",
                  "47c970d8fa144db28a4908766d3e552b",
                  "75c5079cc5c34a4daca144acb33f191f",
                  "405ccf3d4bc541b6bf95b9ac8f732db7",
                  "11b3ec91ec684ad5b2c2bbcf0e117028",
                  "d0f92bb7bc42475994985532676e4d29",
                  "2b07a6cc14ba46b0ae52bafef48b7272",
                  "875fa335caaa46089d1e27455ba6b46a",
                  "e14e408740894337b29667ff124c3747",
                  "bd4ba131e94a49c48fc4621e4e208391",
                  "77c8cb21f0ee4d1e917e976d40a0192c",
                  "5d6509415b35421eb4c592f7f97fd5f2",
                  "b838ddb2e2814523a79accc70ae46417",
                  "b646a118ccf140508b0253c9a44d3e12",
                  "f9a80526573b495fb75b518b2b89354e",
                  "6d240ae497f14063be4c690890a60f86",
                  "31d1063fb493428794cc6b9a24f0af82",
                  "5c8c0596d0204a48bcf982e75f7b0057",
                  "badf3f7d1a924ef5b32c732a0dc85b66",
                  "7c43df67376442a69005f5cae5c3b25b",
                  "9d7500dc9bdc4b6381e66015387823eb",
                  "2159d7e4c5c047e6bd3745c85e403756",
                  "0ab3d1d0b1dd46e4839966bcd1b415c0",
                  "02561c33bd18412a9502326922b83a02",
                  "2815b31e5dd54c0aabcb32bf84a79bd9",
                  "25d0b5c0ecda494faa55f76384567c75",
                  "e75e39d4e89042c094d4c1b1c6a5d86e",
                  "7c73cd5e8e8f45689235f51f70732f8e",
                  "9130902f881a44aeacc8f319419cc929",
                  "10a0d29e20a14fbb87749cc73f8efff3",
                  "00dddd556c33472ab7afb4ebc7843282",
                  "0d5bf93475ea4372a96ef75938239fa2",
                  "2011706e978d4653b536ea3ea85b3005",
                  "36025fe36a014fc8a8c2ba4b585ab58c",
                  "4011d0dbbd4742f0a31fc3dbcf0c4299",
                  "592b25979f1d4ba3bdef695a144d64c0",
                  "9e1d95dec9d543f7a1a28345c64a2b73",
                  "c337ae62486445f58609a83cf0446851",
                  "fe7384de29d0498d99fc169315ee63c9",
                  "434920cfddec4c318beccf809d919a94",
                  "4009d041afec4bbda55cfcb32eddf94d",
                  "09fc9b3ad0c6494294ee7e6adabdcaa9",
                  "dcc4505ad4644b428264f44922b12ee5",
                  "fec7126def664064840f03dfd693b524",
                  "47ec2875c3e74c8e965b918a0dd0b37f",
                  "0cf750d174b4421c948323ff0f150eb2",
                  "82b2bcac1a5e429bbc14b12f558ef1d2",
                  "52020246f6e94edb861d4b7c86cf1659",
                  "f2c6fcc010824c05989a44e69e588742",
                  "bf2136f4b1234b48bd94ddf1f97d4e67",
                  "36b3419fa81d434ebfddbe1415356e0b",
                  "c65d281d6d3941e49982bd634fbbec25",
                  "6fe5bb8863c24a3fb4a1515c26153da0",
                  "270a9538f6f44736bb8834f8f14d61a6",
                  "03a5370a46014fe0a4da4241682e6079",
                  "968adfad396c41b1b8c2ed54dd2ee471",
                  "7dd17e4290984c9fb39d421a565b7abb",
                  "bbddf0b2ae65413d91fa2ec54c352e51",
                  "47618a302887457783034cddee3cac73",
                  "ef029932ce20412a9e4dac1ea7fe83b3",
                  "46c4a16e6b3748f58f918cd7e20c06f1",
                  "a9a505bb3b6c4648b071f9e774d4e3f7",
                  "996d2558219840f3869d0feee75a4ba4",
                  "13626bbd97224522a159545a50c28383",
                  "de6c4779b8584f9fb1a1b880da974fc6",
                  "6163570332e746479d2052a10f1f4315",
                  "6b43a7c9ff634eef9d0a1d430b994609",
                  "0c6cb9bf180043458fbcd9a74f4ee5a3",
                  "b679d652d6704c9e8c5a812157552329",
                  "83fb8058737345aba941639128699cd7",
                  "5b026578210849e0a3435a95b95d0ea2",
                  "19e3ed05bf584df69be668709fafa954",
                  "360897d6b74b4d7a8f80bdff388e0ca1",
                  "3ce90c17b5e64559b9f198efb5418913",
                  "d487033298da4c4e8532f8da8d4bc2e4",
                  "49ea6136b8b94019897647eb6cb40b6d",
                  "289d7fecc9814fd7953223d7ef4c0350",
                  "de1c2c1beb49463b9cc01c8785d06051",
                  "a26cf34353044b78aa9e20a3efcf0abb",
                  "5ba8c5935f29425789687688a0bd778b",
                  "39af461e1a9249d0af8896fa8443979c",
                  "1d18eaea1bdd496d9d78589359a72bd5",
                  "30d9063c1cc641d88ea46b6058ebc38f",
                  "29698303f906482a906dca00f94f8d01",
                  "91017dfa6e484fa3b8da08db8a553905",
                  "e0a7add820724303872d7f6ccf24392a",
                  "aa631b2b61f44f9c8a2f50fa909007e7",
                  "e85ef23487124be5a3844dff4e15d318",
                  "5fd2a624e71746c981f58d7ac79e9fc4",
                  "6345e570f5d04a80a26e0916a654c974",
                  "839ceead92404cbdb4419ac6ef7f6d05",
                  "d8d5550c60f44055830fdd5c5a3d05bc",
                  "4e2672ea3d2d4d69b8dda44a00806e34",
                  "3ff138ba511b4ea19e03825a8565599f",
                  "183f5c47c9784caea04bb4bcfd160806",
                  "Mf9WXzGfr2B8UgF63ucNGLpmCNmuHJGe",
                  "84LfuDZFMzh4OkqAEqf9FwzzAm9a5m7z",
                  "4GEFGGGU8KltQGPpqClVXLusU7I9xDvw",
                  "3YGONLdp1Ze88sLyBDbPFN8DUR5oQI4p",
                  "EwUZtJiOJIlnkLq2k46V5txKR3bjJWq8",
                  "lv1kDTOXvnNQvuFpkM5Af1NIFtK9TOAD",
                  "mw8GrV3n5RjkoBCyYXmuApRf9bs5Y8Id",
                  "BIPVgoickzA3F3f6vDolpNdyyVIJqNu9",
                  "b97fd7152d804d429d706e1b8f82cb2a",
                  "27fb8aa9e9e94f4da269144fc92dbac7",
                  "9485fa7b159e42edb08a83bde0d83dia",
                  "x4Uo2cwIaUr1GSVHEPY82EQ15MWOuHUa",
                  "HBAgVRFqtU232A82hGGINxxXHDbHFi5q",
                  "Gr7UzxdwWXOTHbyPD2DGsFTMV7cAGt0f",
                  "ffde04838d9e4778a9295ba5f825fd84",
                  "29f2aa5dfbe21265da9df360e9c40f34",
                  "192a09e3f41571b5421dec528c76c846",
                  "21f64753cf014b9783a73e9645ee640d",
                  "817f2a161e624076b35219965b88a25d",
                  "7c80329a76e14e6e8fe252d5d67562de",
                  "f5a8d5cdf1a84a548ca7b3dd87d3f097",
                  "7eb58ac6d2b0437294159cce8d968995",
                  "c5017f3034ff48ce8bac77defcc27fff",
                  "e4e5b7be6f0343b4aa7530c104329b42",
                  "2ed1ec032d0a43c6b694d90166597ca2",
                  "1b3476bae4e94fa08f156ea59fdf51fe",
                  "99e21358c19c4ced9d1932a29f0623f1",
                  "5538a2fed2f94d038ec48cc41beb6a38",
                  "1fb4b501e1504cb49befc0adc661747d",
                  "8e3fd8a6b52e48a38170c9be9b29ffe1",
                  "OfEXe4Rr9ON0F0buy7GfwlMJTQztRCUk",
                  "P6CpVQdHrJD4AixO6zRZO1sd1aD0WmOi",
                  "O2k6McH9iN7UGAJoVWUDzFU5AKgkhNkK",
                  "deb09d9fce9b4cf2a1b6e0570227a6e5",
                  "74d07d5ecbd0466cb3e6016ce91aa466",
                  "5af30905f7874fb0962f153ec990e9f5",
                  "LjJiINSM8m6aLAZ5GzOXvABPiAgCaRmY",
                  "4af9b12fbb284f069a1887d67cda5a01",
                  "0fffa5a070a3409c9fec8211f35ca945",
                  "5f5105c7a96d40c3b02de118d7aea4e5",
                  "5954b627ade9405c9955687939ffab6a",
                  "5de150dc29228095f9811cdf15ea5938",
                  "b0dc30922cd14014857de1fc83208529",
                  "ea243ea946744e9d9cc7290a9dabf438",
                  "02fa6c6228f9df9bf445d28216705a97",
                  "77d378c27c11402285201cdf2dc0bccc",
                  "780e6221a2ee627b0ae1cffcdf31f9aa",
                  "36tnbk7frf5suyj5gby3j6yb",
                  "SNvVwAFtjoq0UOuAJ3Rj7lZl4BPjoENy",
                  "66759a8a36a3463c8523b31ecc5b65ef",
                  "5a7b5d42d95d418b9cf7f7410f7972f7",
                  "8ac42ccff20845f2be98ea157a5477ca",
                  "ffdd879d12a34305bb4d0dd5ac1dffaa",
                  "ef5462596d6b41b9be9d8c724e1906a3",
                  "f5a213b29d334070b40bd3e1f6fb6b6c",
                  "3c9b552c6fc64cfda6bccb86efb4c297",
                  "4210306424e546b78990dd9ea42bb5a9",
                  "W8p50dcae1884cd9a945472ad60b9afe",
                  "398fd4cd5b484aa1a47a10dee2a8fca3",
                  "84fc57c62fbd4dff8b8f29ec6c896dd3",
                  "SKqtQ0XopVO70r4k0okPGHDmAZxOACSR",
                  "eAmN9NUzzDdvAD1Xwvtf3L8UVq6MTycC",
                  "AhGyi9pPBPmRsA14rCGcvTlHT9cVDECe",
                  "4e1d0267e2b8406ebee074ef7b81867d",
                  "b0b53721112a43238a21907e6ddfbfa5",
                  "c37f4c6cf2d6416fbde31c5197a6747a",
                  "9a7b3aa0dd924a5bb5d0d6ee382cb0f1",
                  "b691279436264b0aa1c60b51c536383b",
                  "ca16fb2bc8b8467aa35a15f885565915",
                  "c1c7ce2f588248cbb35cc47e7749e024",
                  "40943e90d623415391d1677e91c10e4d",
                  "5ef7f2e4ea66403685823e72dcb2f50b",
                  "3931467461dc4c22b03bd23545a8b9e9",
                  "d4f5388ea0b040baaaeeeaf31a39bbfc",
                  "2d6c9790b3c74fa8b5bd40be56c944a0",
                  "ef251a886f594732a5ebde1cbb63318d",
                  "7bb58f576e1a4f0d9b0b05345e4fc00b",
                  "32ad5ead59b048b2a4784a748571aa7e",
                  "0e3080b2c3b745c2a4c25009fd3470af",
                  "2a2c8fb134624033b0e2b0295046296e",
                  "bcd1f840d68e4f86b49524ed7312b454",
                  "c9035ba3f06a41eea2015c17d7bb4c91",
                  "1ea8a8c2acac4307bb5a9a6950906516",
                  "4e3614e0fc8b4d75a074d0a12e0a863b",
                  "8370f74a7b6441aa8b34b4a8770b8753",
                  "b78be955d5b54f6198e6d61e7f8112c9",
                  "b662deb3a4024e90b94f491689d15eca",
                  "360b4801a0eb4321aa3d187855026cbe",
                  "a7e2af2a8976518a2e9d50abb0879417",
                  "R27RpTAwWXl9CEj0oam3ABhm6KfNXhAY",
                  "ffff826ce66ee941c47ae664eb1ea75e",
                  "fPFPi36zIGKmIX33D6FujlGTSuZeHUEb",
                  "e8801e97251c4f6298b1a3e8282ae169",
                  "e3e03a04bd704fc783f93410e41005fc",
                  "2d022a0bc7a14e788f74df5fb6c38e12",
                  "451402db08cd4b90ad538fca563359ac",
                  "b88f4c94a4774dcea2e9ab54fa595ce9",
                  "3e3411ccd49648e1a568521612eaf73c"
                ]
              }
            },
            "serviceIds": {
              "type": "array",
              "title": "Service IDs",
              "items": {
                "type": "string",
                "title": "Service ID",
                "enum": [
                  "CFSRFNotificationPush",
                  "absorb-sso",
                  "addresses",
                  "admin",
                  "admin-jobs",
                  "admin-products",
                  "api-directory-service",
                  "api-key-service",
                  "aqueduct",
                  "arctic-pricing-processor-web",
                  "arctic-usage-web",
                  "audit-service",
                  "bvseo-proxy",
                  "catalog-pdm-shopper",
                  "compliance-affirm",
                  "device-information",
                  "devprod",
                  "digital-rights-service",
                  "dispatch-metrics-service",
                  "display-management",
                  "fmis",
                  "forge-settings-service",
                  "fps",
                  "integration-provisioning",
                  "managed-inventory",
                  "merchandising-offer",
                  "merchandising-shopper",
                  "metered",
                  "mosaic",
                  "msuni",
                  "notification",
                  "oauth20",
                  "om",
                  "orca-admin",
                  "pricing-shopper",
                  "reporting-auth",
                  "riskified",
                  "shopatron-inv-orca",
                  "shopper-api-reporting",
                  "shoppers",
                  "ssr-ms-shipment-storage",
                  "ssr-user-management",
                  "swagger",
                  "testService",
                  "trace",
                  "v1",
                  "v1ods",
                  "watch-service"
                ]
              }
            },
            "clusters": {
              "type": "array",
              "title": "Clusters",
              "items": {
                "title": "Cluter",
                "type": "string"
              }
            },
            "documentTypes": {
              "type": "array",
              "title": "Document Types",
              "items": {
                "type": "string",
                "title": "Document Type"
              }
            },
            "properties": {
              "type": "object",
              "properties": {
                "count": {
                  "type": "string"
                },
                "interval": {
                  "type": "string"
                },
                "siteId": {
                  "type": "string"
                },
                "responseSource": {
                  "type": "string"
                },
                "responseStatus": {
                  "type": "string"
                }
              }
            }
          }
        },
        "CreateWatchDefinition": {
          "$ref": "#"
        }
      }
    }
  },
  'v1-bbod-decrease-traffic-sprike': {
    "links": {
      "up": {
        "rel": "up",
        "href": "http://localhost:8082/watch-definitions.drive?offset=0&max=10",
        "title": "Back to list"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:8082/watch-definitions/v1-bbod-decrease-traffic-sprike",
        "title": "Delete",
        "method": "DELETE"
      },
      "edit": {
        "rel": "edit",
        "href": "http://localhost:8082/watch-definitions.drive",
        "title": "Save",
        "method": "PUT",
        "type": "application/json",
        "$ref": "#/definitions/CreateWatchDefinition"
      },
      "self": {
        "rel": "self",
        "href": "http://localhost:8082/watch-definitions/v1-bbod-decrease-traffic-sprike"
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
    "schema": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "WatchDefinition",
      "description": "An explanation about the purpose of this instance.",
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "path": {
          "type": "string",
          "title": "Path",
          "readOnly": true
        },
        "description": {
          "type": "string",
          "title": "Description"
        },
        "active": {
          "type": "boolean",
          "title": "Active"
        },
        "trigger": {
          "title": "Trigger",
          "type": "string"
        },
        "policyDefinition": {
          "title": "Policy Definition Type",
          "oneOf": [
            {
              "title": "Average Response Time Spike",
              "type": "object",
              "name": "AverageResponseTimeSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "AverageResponseTimeSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_avg_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "avg_response_time_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Decrease Traffic Spike",
              "type": "object",
              "name": "DecreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "DecreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Flatline",
              "type": "object",
              "name": "FlatlinePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "FlatlinePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "predefinedMatchingPattern": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "flatline"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Error Spike",
              "type": "object",
              "name": "IncreaseErrorSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseErrorSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "eventsCountThreshold": {
                      "type": "string"
                    },
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "errorCountThreshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "SERVER_ERROR_RESPONSE",
                        "ERROR_RESPONSE",
                        "CLIENT_ERROR_RESPONSE"
                      ]
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "date_range_terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "error_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Traffic Spike",
              "type": "object",
              "name": "IncreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Service Availability",
              "type": "object",
              "name": "ServiceAvailabilityPolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "ServiceAvailabilityPolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "NON_5XX_RESPONSE",
                        "OK_RESPONSE",
                        "ONLY_200_RESPONSE"
                      ]
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "service_availability"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Slow Average Response Time",
              "type": "object",
              "name": "SlowAverageResponseTimePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "SlowAverageResponseTimePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string",
                      "default": 100
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "metrics_avg"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "slow_avg_response_time"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            }
          ]
        }
      },
      "required": [
        "name",
        "path",
        "active",
        "trigger",
        "policyDefinition"
      ],
      "definitions": {
        "alertDefinitions": {
          "type": "object",
          "title": "Alert Definition",
          "properties": {
            "alertType": {
              "title": "Alert Type",
              "oneOf": [
                {
                  "title": "EMAIL",
                  "type": "object",
                  "name": "EMAIL",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "EMAIL"
                      ]
                    },
                    "subject": {
                      "type": "string"
                    },
                    "from": {
                      "type": "string"
                    },
                    "to": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type",
                    "subject",
                    "to"
                  ]
                },
                {
                  "title": "CONSOLE_TEXT",
                  "type": "object",
                  "name": "CONSOLE_TEXT",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "CONSOLE_TEXT"
                      ]
                    }
                  },
                  "required": [
                    "type"
                  ]
                },
                {
                  "title": "SLACK",
                  "type": "object",
                  "name": "SLACK",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "SLACK"
                      ]
                    },
                    "webhook": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "channel": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type"
                  ]
                }
              ]
            },
            "firingPolicy": {
              "type": "string",
              "title": "Firing Policy",
              "enum": [
                "CONTINUOUS",
                "ONCE_WITH_FOLLOW_UP"
              ]
            }
          }
        },
        "queryType_SEARCH_WITH_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH_WITH_COUNT"
        },
        "queryType_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "COUNT"
        },
        "queryType_SEARCH": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH"
        },
        "queryDefinition": {
          "title": "Query Definition Details",
          "properties": {
            "timeInterval": {
              "type": "object",
              "title": "Time Interval",
              "properties": {
                "from": {
                  "type": "string",
                  "title": "From"
                },
                "to": {
                  "type": "string",
                  "title": "To"
                }
              },
              "required": [
                "from",
                "to"
              ]
            },
            "apiKeys": {
              "type": "array",
              "title": "Api Keys",
              "items": {
                "type": "string",
                "title": "Api Key",
                "enum": [
                  "a52e39b2e85f44518c9557bef07cefb7",
                  "c379d9cfb0dd490a8399734afa7e28c4",
                  "63ef06b39d47413989f52fbd5be19761",
                  "3daaa577d3084251b2f22bb5bcfb092c",
                  "ce5679c23cd648e19896ce11c9183acf",
                  "71c9782424b64dbbb2e3b1b5ed7b9357",
                  "bd8bba27f49a45f69296a8f57715887a",
                  "722aacea2683463e965c0992d0a1fed6",
                  "d503c0c1e0774c33b6906f5379a114ab",
                  "a59de855c96448acb6f303edc6e26fe7",
                  "f621bcb5b7d44c238631e5e2cea96ac6",
                  "09a8a9e5c81b48f69fd43c0c3defddb0",
                  "d9b0f8ea7f7a4622999c8e1c15933a1e",
                  "dec38ad6b095403e8a1535585b2e9078",
                  "29f94443bbe74b49a9c67fa7a27fac84",
                  "7508fdb7357a4420b1d09271fe682905",
                  "bc81f22c34e84caa96e1d42e8c6df284",
                  "785336eafbea4c1d9c8c47f8cc07bf20",
                  "4a0d6a3658874b6c84e24424f73d5b34",
                  "c9933ce47b76448eaa8dd834a6edb588",
                  "d71730a87ca84a59a2ce94b9bbcc066f",
                  "1e4533bef3f74093b9ddcf727c32ecbd",
                  "6fc4f795c08846368f2ebcf942c38257",
                  "2584ca43d8c34818b409d70813725d06",
                  "75cd2758726d471abb499ba4a83cd43d",
                  "ffe9924c2c0a42fc97ffd80e85d37bc2",
                  "9791ea76c17a41b7b19e0c5de66cd595",
                  "aa51af2df7c3427faf9d8590fe464bc2",
                  "909009c5214249d18054565e6c57886f",
                  "c3609dd96eac4376b20890494e882a38",
                  "d7366e9c1f7a4c3f97cbc340c757d55b",
                  "42e71d5576964354b51688a983caa52c",
                  "1ac2152179c3469e8c9bd1b9b62de1f6",
                  "2f0c928b61654c36ade08c8c23bed62b",
                  "639e54158b254306ae68867995b70ee9",
                  "f5fbf33974794e859696defe6fc9818a",
                  "dfee9ead4fc245d59f7968c87e40709c",
                  "2d58cd1208f34a7886f8ab0760055ab3",
                  "45e8b0e39aba4eebb15ddf134e9b0bd9",
                  "0971189a1331474abbb8633f2c11bba1",
                  "b400399bbf444710af162ee1668aa47d",
                  "37429d6b9e304fafa37c64358921f565",
                  "26ceda9f2a694254979100a8455f0e73",
                  "2aa724b75a684e6c98bdfe9b00d94a08",
                  "ed7401c749404258a4c264f6b0f1786b",
                  "eff377216fae4ac0bbf41864d115cb22",
                  "014d336197b94414910b7317b5d019d1",
                  "0f61671976abf7f85d1c98b207830f6b",
                  "2c84e84bb902457aad6cb73206db923f",
                  "3563c230c22945f1826644bdb9534d95",
                  "fbe2a04cb5144f4cb8ec2a13f326398c",
                  "66a15471554f4326bbe5c2eb73c49ee3",
                  "JJ9QFssRnxzms2GPPRCBnMDXHjKQNAMW",
                  "58b6ec9ece784e88a575663cbb69074a",
                  "fa40c38d914340fb89f0c63027833a9d",
                  "3e99952c2cc7f1f566126deaff432996",
                  "uFBV0VlouC8OfU38v0l6lG0oVQ0kDqvr",
                  "d4cd446bb89a43c28a15d8909ad58f3b",
                  "1125ee6b84fc4dce83b890763fd567c3",
                  "529ec2c526214e388f13bd7347342483",
                  "604df5ac990fbc67dab8fc098af271e6",
                  "8430105cfa7149bf9273e8046b9751e0",
                  "f84c1db8380944308a93e085b5b1af86",
                  "6c228c145bc04142b13dd7b2c429d62b",
                  "3eb1d5c4b4df444a81e41afaf7053cd1",
                  "60bd7f41a86549698ec9d36b1243a3b5",
                  "65c9d01e68d945d9a3629c6a67a96127",
                  "634720b45ec046a1a193810f87755674",
                  "e71db157a8724cafabd2c579602b10d6",
                  "fe43a8180b58471084a27afc8b781b67",
                  "2f75c16649c04335b666ace790f3631e",
                  "13b9e5d0b4d342dd9ed599d196dcb5ad",
                  "a393b43b8a4047018db5ddd28bea8bbb",
                  "183e4c1b72294c60ac2fcc5de3bc2bfd",
                  "b46b718c759a412aa7ab20c1626062d3",
                  "f06ec13a06cb4faba310c583fa4419ba",
                  "17b573bf92c64b4dad88d1d6d5a3eeef",
                  "83e130a304f2489385b6d267105ee40b",
                  "0fb1db8761ac4a85b4eac8ec49a16867",
                  "6801c617d31745499828eed4c696f4bc",
                  "AjYFBMpbQdCoAFomuHhhFNNjvP5LHCfo",
                  "3bf2a0a885f94f279b9d86568182d75d",
                  "3db6d8afe2d24a78a2e7b976457a40f5",
                  "c2a8ae12b885451b90b86beee0c6e374",
                  "235104cf93754fa0b4b4c7983693842f",
                  "4c4d6d5691fd4e7db73b20b6edd27fe2",
                  "3c93dabcea2147c48f142e1fad482c36",
                  "b3f9b26bdd8f60ef0e2c2c0be0b74260",
                  "GvHfSjHAScUuTAasglA81CmfCEtciNmt",
                  "9692a066e340d51cb0b19f27ea06b364",
                  "e66654556ca510d3487c647399a2caf2",
                  "8ee5d5e1e43b4a92835709f4c4a973c9",
                  "689175898efa478d96d0dfda038e4dad",
                  "3fbe6187e6904dae93606048e2ff003a",
                  "f046805b8ac1461ca76dcf2e3d3f4040",
                  "96562a9d820d441cbc480c7a3758df7b",
                  "6392fc87a33447529e12a454da6c339b",
                  "6fa08f482b4c473880aa0215b3c5de39",
                  "V2ztxK2rFe86jD7zYkRhDSAdrOrcY5qo",
                  "9b67e2693d374162be5e2b1b0c66f036",
                  "0973656604e444bcba03231584b74870",
                  "5c31057bc55c4963837049a6d384b567",
                  "d11ae88278b74a6c931176ca4b7b164f",
                  "b4357251c0574a5e98661bbd06c2ca11",
                  "97f3c5a6f2d945528977e86535b927dd",
                  "HipATLcFtfhaa4NGPzk1dcPsIweaGmLh",
                  "3cf82ad2309640b48d43953c661fca7f",
                  "1a79efcfbfb34ff2b704e4dcde4e8fe9",
                  "2db786407faf4d2fa01bbd07f9a93e79",
                  "2918d633d2fe458f89fff1c241b96e9a",
                  "x7vQOMYuj1sZ6zeTNFeqL83qadqFT0Zm",
                  "480dd90425224c2f8cc9a77a402df105",
                  "c3526ba3fa99454896e0e6a9f4c3c4cc",
                  "8b96563e98c2433585767cb2fe1bee21",
                  "6d0b3139a676431992558dda67b6ba65",
                  "OMA5xOj8iBFRAcHJRmJeenKm4lr8UYTT",
                  "c6YGngARruDia5MOwAKgaMxyQdGnJ60H",
                  "fV8NesDn4r3e02A3XeAAhcGGqEb72W90",
                  "fe69ca7dfd6149ec9a47b3dd521e7644",
                  "fb7295e9e6f1427ebe937023e9114228",
                  "7a809a5636e84d1bac1d6f644ce8b56a",
                  "a692b345717e4adb85879bcee227bca9",
                  "fe1a806e420a45179b88e3689ca63446",
                  "e476082cf7af49b1b817e34c91d3486e",
                  "4eeb5d540ff54cf6b077ec469f2dd806",
                  "f4fc174d4733428e86fc38fc7f7bb748",
                  "e0c1977f09a14a7f8ffc35249e740bd3",
                  "003d23de388a443a813d8c2aeee76418",
                  "a90f1203bd8b4f16bd942870c6e14fbd",
                  "6eabe1249ed14043ac393cb5248f4fb6",
                  "819a5f22f3964bbc99931139ee2eb538",
                  "864d71cdaffb4e03a43a535c23d3292a",
                  "18ba5cb2b70d4093a20a362078f0958c",
                  "UnZqOVp4laTfF1l71GqnzXR5e34MUG3M",
                  "2c8792edf77a4bfa86f442bbf79da4e0",
                  "d79960cf15db4422a34d52785e088262",
                  "0e393a6f3c9c4e08aab38db741953af0",
                  "cede30a1de9c44f6b9183ff9be9ae309",
                  "e1a0f189b4f44b998fc8e47d515ab418",
                  "2b0d95e5167742bfaa87b50141d327b9",
                  "b38695ad77ef4d31b11192f8d80d9a8d",
                  "37504a549ca94c2fbcff1cc7ebfd89e2",
                  "6ac66961851f424f87aa7992a5cea5ca",
                  "5310815a01e14e95bfedf1b655fdef03",
                  "3e33684992de4c85a09d565eca3c0591",
                  "1edd47e8e8424d728f648f9c679f1fae",
                  "e12b65ecd73848db87c5ee7eb3f439e5",
                  "WZWxsKIlLOuwUxyn43usGMl2mBFJuczV",
                  "j2S1P01uImUQum2LFGuO9z2Jin0iqak7",
                  "f5e0a094f420d987ae37ef31813f3e46",
                  "IOGl4gRimt6h9gpPCfABcMjfPNKPzQer",
                  "m2ff39ba49a5498b8c7093c677016b87",
                  "2e57292fec6b4c7e9f9d0ccf49358a74",
                  "b9bdf962b01f4d39a524da440c3a9a24",
                  "3241a555f3bb49e0abebce79e2d9c683",
                  "c67b808be97b4ed7b1de747a7597c6ae",
                  "131457365d7a4b868263b1408386a4e9",
                  "73cb362d47024acebac4a5d7811f16e8",
                  "8a9ba4f6a62142e79e31d95d0b320df5",
                  "98a16c977805f1614cc9017fc0ca027c",
                  "e4eb2861e24ff944d3aa0e16bcb91122",
                  "drLb",
                  "drMonitoring",
                  "slowpitchstats",
                  "T38IByPBQUvbLHxrI1x9kIuY3BTTQSIb",
                  "95204aa36c9e464d95a9f94166ce1df7",
                  "GrEaNYFccnbzjiaNdGjyG627SiWCmv3g",
                  "LFiVpk5qjj570GwT6w8eSaVek9dcyUyo",
                  "dd05220dbc214907a081a449982f3d26",
                  "393169b895e84e13ba6389c0e412d193",
                  "jPvJi1XNitsGyJ8AFDNAizCAdVLKXm2y",
                  "6d9cc52eadd14cd7847b588468863592",
                  "5825c528f47a4f45881a6753c57b3a7f",
                  "11aa0d2e8f55487e99e67a15a9ff6168",
                  "989529bd2f0e4238a3012263d3d48241",
                  "6809b4l0G127438bb773d2d6ec18c394",
                  "4b9a7d96ccad47e0846628ac504b1e1b",
                  "74ba26c4a9d049be86c7cdb092417d97",
                  "fa1eaa5b2242410c82ff92323fcf6d47",
                  "a5a154df5b7840588172fc85ebe71e87",
                  "17d0e59684b34c3aab2861d0248cc25b",
                  "0c546c8ae3874452a66e37d505bec29a",
                  "01815239b9bb48869dea0f48b08ad5b7",
                  "cfb3cb708ce14e069555f231933454b6",
                  "83768800514044c883c1761ae50bffb4",
                  "61972e2ace5b43caad61136ee9ad9254",
                  "dbb3a637c32a4af1ad2410f8d32a7c84",
                  "01186811f3224264b1e564fcf5b7fdb9",
                  "e375ca2119cf4c14aa18ac3722dd07fb",
                  "ec48db0385914ebe9200d9547cb27c5f",
                  "21ea08fb07aa419aba9c4b4f077562d1",
                  "14e24fa4909743038e494db6b4b85697",
                  "65168b875d2b4a2da0321d75834f2620",
                  "8ba21719b32a41bb85a83f70ee999ec4",
                  "bf3c4e727412474c9d105c8d5b6f61ad",
                  "fee22d69e94a472192b30c23b3ac6ac7",
                  "4d0164638250450499a5483fc886f476",
                  "d87c355242804c4db2b474b070c100b7",
                  "47c970d8fa144db28a4908766d3e552b",
                  "75c5079cc5c34a4daca144acb33f191f",
                  "405ccf3d4bc541b6bf95b9ac8f732db7",
                  "11b3ec91ec684ad5b2c2bbcf0e117028",
                  "d0f92bb7bc42475994985532676e4d29",
                  "2b07a6cc14ba46b0ae52bafef48b7272",
                  "875fa335caaa46089d1e27455ba6b46a",
                  "e14e408740894337b29667ff124c3747",
                  "bd4ba131e94a49c48fc4621e4e208391",
                  "77c8cb21f0ee4d1e917e976d40a0192c",
                  "5d6509415b35421eb4c592f7f97fd5f2",
                  "b838ddb2e2814523a79accc70ae46417",
                  "b646a118ccf140508b0253c9a44d3e12",
                  "f9a80526573b495fb75b518b2b89354e",
                  "6d240ae497f14063be4c690890a60f86",
                  "31d1063fb493428794cc6b9a24f0af82",
                  "5c8c0596d0204a48bcf982e75f7b0057",
                  "badf3f7d1a924ef5b32c732a0dc85b66",
                  "7c43df67376442a69005f5cae5c3b25b",
                  "9d7500dc9bdc4b6381e66015387823eb",
                  "2159d7e4c5c047e6bd3745c85e403756",
                  "0ab3d1d0b1dd46e4839966bcd1b415c0",
                  "02561c33bd18412a9502326922b83a02",
                  "2815b31e5dd54c0aabcb32bf84a79bd9",
                  "25d0b5c0ecda494faa55f76384567c75",
                  "e75e39d4e89042c094d4c1b1c6a5d86e",
                  "7c73cd5e8e8f45689235f51f70732f8e",
                  "9130902f881a44aeacc8f319419cc929",
                  "10a0d29e20a14fbb87749cc73f8efff3",
                  "00dddd556c33472ab7afb4ebc7843282",
                  "0d5bf93475ea4372a96ef75938239fa2",
                  "2011706e978d4653b536ea3ea85b3005",
                  "36025fe36a014fc8a8c2ba4b585ab58c",
                  "4011d0dbbd4742f0a31fc3dbcf0c4299",
                  "592b25979f1d4ba3bdef695a144d64c0",
                  "9e1d95dec9d543f7a1a28345c64a2b73",
                  "c337ae62486445f58609a83cf0446851",
                  "fe7384de29d0498d99fc169315ee63c9",
                  "434920cfddec4c318beccf809d919a94",
                  "4009d041afec4bbda55cfcb32eddf94d",
                  "09fc9b3ad0c6494294ee7e6adabdcaa9",
                  "dcc4505ad4644b428264f44922b12ee5",
                  "fec7126def664064840f03dfd693b524",
                  "47ec2875c3e74c8e965b918a0dd0b37f",
                  "0cf750d174b4421c948323ff0f150eb2",
                  "82b2bcac1a5e429bbc14b12f558ef1d2",
                  "52020246f6e94edb861d4b7c86cf1659",
                  "f2c6fcc010824c05989a44e69e588742",
                  "bf2136f4b1234b48bd94ddf1f97d4e67",
                  "36b3419fa81d434ebfddbe1415356e0b",
                  "c65d281d6d3941e49982bd634fbbec25",
                  "6fe5bb8863c24a3fb4a1515c26153da0",
                  "270a9538f6f44736bb8834f8f14d61a6",
                  "03a5370a46014fe0a4da4241682e6079",
                  "968adfad396c41b1b8c2ed54dd2ee471",
                  "7dd17e4290984c9fb39d421a565b7abb",
                  "bbddf0b2ae65413d91fa2ec54c352e51",
                  "47618a302887457783034cddee3cac73",
                  "ef029932ce20412a9e4dac1ea7fe83b3",
                  "46c4a16e6b3748f58f918cd7e20c06f1",
                  "a9a505bb3b6c4648b071f9e774d4e3f7",
                  "996d2558219840f3869d0feee75a4ba4",
                  "13626bbd97224522a159545a50c28383",
                  "de6c4779b8584f9fb1a1b880da974fc6",
                  "6163570332e746479d2052a10f1f4315",
                  "6b43a7c9ff634eef9d0a1d430b994609",
                  "0c6cb9bf180043458fbcd9a74f4ee5a3",
                  "b679d652d6704c9e8c5a812157552329",
                  "83fb8058737345aba941639128699cd7",
                  "5b026578210849e0a3435a95b95d0ea2",
                  "19e3ed05bf584df69be668709fafa954",
                  "360897d6b74b4d7a8f80bdff388e0ca1",
                  "3ce90c17b5e64559b9f198efb5418913",
                  "d487033298da4c4e8532f8da8d4bc2e4",
                  "49ea6136b8b94019897647eb6cb40b6d",
                  "289d7fecc9814fd7953223d7ef4c0350",
                  "de1c2c1beb49463b9cc01c8785d06051",
                  "a26cf34353044b78aa9e20a3efcf0abb",
                  "5ba8c5935f29425789687688a0bd778b",
                  "39af461e1a9249d0af8896fa8443979c",
                  "1d18eaea1bdd496d9d78589359a72bd5",
                  "30d9063c1cc641d88ea46b6058ebc38f",
                  "29698303f906482a906dca00f94f8d01",
                  "91017dfa6e484fa3b8da08db8a553905",
                  "e0a7add820724303872d7f6ccf24392a",
                  "aa631b2b61f44f9c8a2f50fa909007e7",
                  "e85ef23487124be5a3844dff4e15d318",
                  "5fd2a624e71746c981f58d7ac79e9fc4",
                  "6345e570f5d04a80a26e0916a654c974",
                  "839ceead92404cbdb4419ac6ef7f6d05",
                  "d8d5550c60f44055830fdd5c5a3d05bc",
                  "4e2672ea3d2d4d69b8dda44a00806e34",
                  "3ff138ba511b4ea19e03825a8565599f",
                  "183f5c47c9784caea04bb4bcfd160806",
                  "Mf9WXzGfr2B8UgF63ucNGLpmCNmuHJGe",
                  "84LfuDZFMzh4OkqAEqf9FwzzAm9a5m7z",
                  "4GEFGGGU8KltQGPpqClVXLusU7I9xDvw",
                  "3YGONLdp1Ze88sLyBDbPFN8DUR5oQI4p",
                  "EwUZtJiOJIlnkLq2k46V5txKR3bjJWq8",
                  "lv1kDTOXvnNQvuFpkM5Af1NIFtK9TOAD",
                  "mw8GrV3n5RjkoBCyYXmuApRf9bs5Y8Id",
                  "BIPVgoickzA3F3f6vDolpNdyyVIJqNu9",
                  "b97fd7152d804d429d706e1b8f82cb2a",
                  "27fb8aa9e9e94f4da269144fc92dbac7",
                  "9485fa7b159e42edb08a83bde0d83dia",
                  "x4Uo2cwIaUr1GSVHEPY82EQ15MWOuHUa",
                  "HBAgVRFqtU232A82hGGINxxXHDbHFi5q",
                  "Gr7UzxdwWXOTHbyPD2DGsFTMV7cAGt0f",
                  "ffde04838d9e4778a9295ba5f825fd84",
                  "29f2aa5dfbe21265da9df360e9c40f34",
                  "192a09e3f41571b5421dec528c76c846",
                  "21f64753cf014b9783a73e9645ee640d",
                  "817f2a161e624076b35219965b88a25d",
                  "7c80329a76e14e6e8fe252d5d67562de",
                  "f5a8d5cdf1a84a548ca7b3dd87d3f097",
                  "7eb58ac6d2b0437294159cce8d968995",
                  "c5017f3034ff48ce8bac77defcc27fff",
                  "e4e5b7be6f0343b4aa7530c104329b42",
                  "2ed1ec032d0a43c6b694d90166597ca2",
                  "1b3476bae4e94fa08f156ea59fdf51fe",
                  "99e21358c19c4ced9d1932a29f0623f1",
                  "5538a2fed2f94d038ec48cc41beb6a38",
                  "1fb4b501e1504cb49befc0adc661747d",
                  "8e3fd8a6b52e48a38170c9be9b29ffe1",
                  "OfEXe4Rr9ON0F0buy7GfwlMJTQztRCUk",
                  "P6CpVQdHrJD4AixO6zRZO1sd1aD0WmOi",
                  "O2k6McH9iN7UGAJoVWUDzFU5AKgkhNkK",
                  "deb09d9fce9b4cf2a1b6e0570227a6e5",
                  "74d07d5ecbd0466cb3e6016ce91aa466",
                  "5af30905f7874fb0962f153ec990e9f5",
                  "LjJiINSM8m6aLAZ5GzOXvABPiAgCaRmY",
                  "4af9b12fbb284f069a1887d67cda5a01",
                  "0fffa5a070a3409c9fec8211f35ca945",
                  "5f5105c7a96d40c3b02de118d7aea4e5",
                  "5954b627ade9405c9955687939ffab6a",
                  "5de150dc29228095f9811cdf15ea5938",
                  "b0dc30922cd14014857de1fc83208529",
                  "ea243ea946744e9d9cc7290a9dabf438",
                  "02fa6c6228f9df9bf445d28216705a97",
                  "77d378c27c11402285201cdf2dc0bccc",
                  "780e6221a2ee627b0ae1cffcdf31f9aa",
                  "36tnbk7frf5suyj5gby3j6yb",
                  "SNvVwAFtjoq0UOuAJ3Rj7lZl4BPjoENy",
                  "66759a8a36a3463c8523b31ecc5b65ef",
                  "5a7b5d42d95d418b9cf7f7410f7972f7",
                  "8ac42ccff20845f2be98ea157a5477ca",
                  "ffdd879d12a34305bb4d0dd5ac1dffaa",
                  "ef5462596d6b41b9be9d8c724e1906a3",
                  "f5a213b29d334070b40bd3e1f6fb6b6c",
                  "3c9b552c6fc64cfda6bccb86efb4c297",
                  "4210306424e546b78990dd9ea42bb5a9",
                  "W8p50dcae1884cd9a945472ad60b9afe",
                  "398fd4cd5b484aa1a47a10dee2a8fca3",
                  "84fc57c62fbd4dff8b8f29ec6c896dd3",
                  "SKqtQ0XopVO70r4k0okPGHDmAZxOACSR",
                  "eAmN9NUzzDdvAD1Xwvtf3L8UVq6MTycC",
                  "AhGyi9pPBPmRsA14rCGcvTlHT9cVDECe",
                  "4e1d0267e2b8406ebee074ef7b81867d",
                  "b0b53721112a43238a21907e6ddfbfa5",
                  "c37f4c6cf2d6416fbde31c5197a6747a",
                  "9a7b3aa0dd924a5bb5d0d6ee382cb0f1",
                  "b691279436264b0aa1c60b51c536383b",
                  "ca16fb2bc8b8467aa35a15f885565915",
                  "c1c7ce2f588248cbb35cc47e7749e024",
                  "40943e90d623415391d1677e91c10e4d",
                  "5ef7f2e4ea66403685823e72dcb2f50b",
                  "3931467461dc4c22b03bd23545a8b9e9",
                  "d4f5388ea0b040baaaeeeaf31a39bbfc",
                  "2d6c9790b3c74fa8b5bd40be56c944a0",
                  "ef251a886f594732a5ebde1cbb63318d",
                  "7bb58f576e1a4f0d9b0b05345e4fc00b",
                  "32ad5ead59b048b2a4784a748571aa7e",
                  "0e3080b2c3b745c2a4c25009fd3470af",
                  "2a2c8fb134624033b0e2b0295046296e",
                  "bcd1f840d68e4f86b49524ed7312b454",
                  "c9035ba3f06a41eea2015c17d7bb4c91",
                  "1ea8a8c2acac4307bb5a9a6950906516",
                  "4e3614e0fc8b4d75a074d0a12e0a863b",
                  "8370f74a7b6441aa8b34b4a8770b8753",
                  "b78be955d5b54f6198e6d61e7f8112c9",
                  "b662deb3a4024e90b94f491689d15eca",
                  "360b4801a0eb4321aa3d187855026cbe",
                  "a7e2af2a8976518a2e9d50abb0879417",
                  "R27RpTAwWXl9CEj0oam3ABhm6KfNXhAY",
                  "ffff826ce66ee941c47ae664eb1ea75e",
                  "fPFPi36zIGKmIX33D6FujlGTSuZeHUEb",
                  "e8801e97251c4f6298b1a3e8282ae169",
                  "e3e03a04bd704fc783f93410e41005fc",
                  "2d022a0bc7a14e788f74df5fb6c38e12",
                  "451402db08cd4b90ad538fca563359ac",
                  "b88f4c94a4774dcea2e9ab54fa595ce9",
                  "3e3411ccd49648e1a568521612eaf73c"
                ]
              }
            },
            "serviceIds": {
              "type": "array",
              "title": "Service IDs",
              "items": {
                "type": "string",
                "title": "Service ID",
                "enum": [
                  "CFSRFNotificationPush",
                  "absorb-sso",
                  "addresses",
                  "admin",
                  "admin-jobs",
                  "admin-products",
                  "api-directory-service",
                  "api-key-service",
                  "aqueduct",
                  "arctic-pricing-processor-web",
                  "arctic-usage-web",
                  "audit-service",
                  "bvseo-proxy",
                  "catalog-pdm-shopper",
                  "compliance-affirm",
                  "device-information",
                  "devprod",
                  "digital-rights-service",
                  "dispatch-metrics-service",
                  "display-management",
                  "fmis",
                  "forge-settings-service",
                  "fps",
                  "integration-provisioning",
                  "managed-inventory",
                  "merchandising-offer",
                  "merchandising-shopper",
                  "metered",
                  "mosaic",
                  "msuni",
                  "notification",
                  "oauth20",
                  "om",
                  "orca-admin",
                  "pricing-shopper",
                  "reporting-auth",
                  "riskified",
                  "shopatron-inv-orca",
                  "shopper-api-reporting",
                  "shoppers",
                  "ssr-ms-shipment-storage",
                  "ssr-user-management",
                  "swagger",
                  "testService",
                  "trace",
                  "v1",
                  "v1ods",
                  "watch-service"
                ]
              }
            },
            "clusters": {
              "type": "array",
              "title": "Clusters",
              "items": {
                "title": "Cluter",
                "type": "string"
              }
            },
            "documentTypes": {
              "type": "array",
              "title": "Document Types",
              "items": {
                "type": "string",
                "title": "Document Type"
              }
            },
            "properties": {
              "type": "object",
              "properties": {
                "count": {
                  "type": "string"
                },
                "interval": {
                  "type": "string"
                },
                "siteId": {
                  "type": "string"
                },
                "responseSource": {
                  "type": "string"
                },
                "responseStatus": {
                  "type": "string"
                }
              }
            }
          }
        },
        "CreateWatchDefinition": {
          "$ref": "#"
        }
      }
    }
  },
  'v1-ciscoctg-availability': {
    "links": {
      "up": {
        "rel": "up",
        "href": "http://localhost:8082/watch-definitions.drive?offset=0&max=10",
        "title": "Back to list"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:8082/watch-definitions/v1-ciscoctg-availability",
        "title": "Delete",
        "method": "DELETE"
      },
      "edit": {
        "rel": "edit",
        "href": "http://localhost:8082/watch-definitions.drive",
        "title": "Save",
        "method": "PUT",
        "type": "application/json",
        "$ref": "#/definitions/CreateWatchDefinition"
      },
      "self": {
        "rel": "self",
        "href": "http://localhost:8082/watch-definitions/v1-ciscoctg-availability"
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
    "schema": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "WatchDefinition",
      "description": "An explanation about the purpose of this instance.",
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "path": {
          "type": "string",
          "title": "Path",
          "readOnly": true
        },
        "description": {
          "type": "string",
          "title": "Description"
        },
        "active": {
          "type": "boolean",
          "title": "Active"
        },
        "trigger": {
          "title": "Trigger",
          "type": "string"
        },
        "policyDefinition": {
          "title": "Policy Definition Type",
          "oneOf": [
            {
              "title": "Average Response Time Spike",
              "type": "object",
              "name": "AverageResponseTimeSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "AverageResponseTimeSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_avg_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "avg_response_time_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Decrease Traffic Spike",
              "type": "object",
              "name": "DecreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "DecreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Flatline",
              "type": "object",
              "name": "FlatlinePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "FlatlinePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "predefinedMatchingPattern": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "flatline"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Error Spike",
              "type": "object",
              "name": "IncreaseErrorSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseErrorSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "eventsCountThreshold": {
                      "type": "string"
                    },
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "errorCountThreshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "SERVER_ERROR_RESPONSE",
                        "ERROR_RESPONSE",
                        "CLIENT_ERROR_RESPONSE"
                      ]
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "date_range_terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "error_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Traffic Spike",
              "type": "object",
              "name": "IncreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Service Availability",
              "type": "object",
              "name": "ServiceAvailabilityPolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "ServiceAvailabilityPolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "NON_5XX_RESPONSE",
                        "OK_RESPONSE",
                        "ONLY_200_RESPONSE"
                      ]
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "service_availability"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Slow Average Response Time",
              "type": "object",
              "name": "SlowAverageResponseTimePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "SlowAverageResponseTimePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string",
                      "default": 100
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "metrics_avg"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "slow_avg_response_time"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            }
          ]
        }
      },
      "required": [
        "name",
        "path",
        "active",
        "trigger",
        "policyDefinition"
      ],
      "definitions": {
        "alertDefinitions": {
          "type": "object",
          "title": "Alert Definition",
          "properties": {
            "alertType": {
              "title": "Alert Type",
              "oneOf": [
                {
                  "title": "EMAIL",
                  "type": "object",
                  "name": "EMAIL",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "EMAIL"
                      ]
                    },
                    "subject": {
                      "type": "string"
                    },
                    "from": {
                      "type": "string"
                    },
                    "to": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type",
                    "subject",
                    "to"
                  ]
                },
                {
                  "title": "CONSOLE_TEXT",
                  "type": "object",
                  "name": "CONSOLE_TEXT",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "CONSOLE_TEXT"
                      ]
                    }
                  },
                  "required": [
                    "type"
                  ]
                },
                {
                  "title": "SLACK",
                  "type": "object",
                  "name": "SLACK",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "SLACK"
                      ]
                    },
                    "webhook": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "channel": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type"
                  ]
                }
              ]
            },
            "firingPolicy": {
              "type": "string",
              "title": "Firing Policy",
              "enum": [
                "CONTINUOUS",
                "ONCE_WITH_FOLLOW_UP"
              ]
            }
          }
        },
        "queryType_SEARCH_WITH_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH_WITH_COUNT"
        },
        "queryType_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "COUNT"
        },
        "queryType_SEARCH": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH"
        },
        "queryDefinition": {
          "title": "Query Definition Details",
          "properties": {
            "timeInterval": {
              "type": "object",
              "title": "Time Interval",
              "properties": {
                "from": {
                  "type": "string",
                  "title": "From"
                },
                "to": {
                  "type": "string",
                  "title": "To"
                }
              },
              "required": [
                "from",
                "to"
              ]
            },
            "apiKeys": {
              "type": "array",
              "title": "Api Keys",
              "items": {
                "type": "string",
                "title": "Api Key",
                "enum": [
                  "a52e39b2e85f44518c9557bef07cefb7",
                  "c379d9cfb0dd490a8399734afa7e28c4",
                  "63ef06b39d47413989f52fbd5be19761",
                  "3daaa577d3084251b2f22bb5bcfb092c",
                  "ce5679c23cd648e19896ce11c9183acf",
                  "71c9782424b64dbbb2e3b1b5ed7b9357",
                  "bd8bba27f49a45f69296a8f57715887a",
                  "722aacea2683463e965c0992d0a1fed6",
                  "d503c0c1e0774c33b6906f5379a114ab",
                  "a59de855c96448acb6f303edc6e26fe7",
                  "f621bcb5b7d44c238631e5e2cea96ac6",
                  "09a8a9e5c81b48f69fd43c0c3defddb0",
                  "d9b0f8ea7f7a4622999c8e1c15933a1e",
                  "dec38ad6b095403e8a1535585b2e9078",
                  "29f94443bbe74b49a9c67fa7a27fac84",
                  "7508fdb7357a4420b1d09271fe682905",
                  "bc81f22c34e84caa96e1d42e8c6df284",
                  "785336eafbea4c1d9c8c47f8cc07bf20",
                  "4a0d6a3658874b6c84e24424f73d5b34",
                  "c9933ce47b76448eaa8dd834a6edb588",
                  "d71730a87ca84a59a2ce94b9bbcc066f",
                  "1e4533bef3f74093b9ddcf727c32ecbd",
                  "6fc4f795c08846368f2ebcf942c38257",
                  "2584ca43d8c34818b409d70813725d06",
                  "75cd2758726d471abb499ba4a83cd43d",
                  "ffe9924c2c0a42fc97ffd80e85d37bc2",
                  "9791ea76c17a41b7b19e0c5de66cd595",
                  "aa51af2df7c3427faf9d8590fe464bc2",
                  "909009c5214249d18054565e6c57886f",
                  "c3609dd96eac4376b20890494e882a38",
                  "d7366e9c1f7a4c3f97cbc340c757d55b",
                  "42e71d5576964354b51688a983caa52c",
                  "1ac2152179c3469e8c9bd1b9b62de1f6",
                  "2f0c928b61654c36ade08c8c23bed62b",
                  "639e54158b254306ae68867995b70ee9",
                  "f5fbf33974794e859696defe6fc9818a",
                  "dfee9ead4fc245d59f7968c87e40709c",
                  "2d58cd1208f34a7886f8ab0760055ab3",
                  "45e8b0e39aba4eebb15ddf134e9b0bd9",
                  "0971189a1331474abbb8633f2c11bba1",
                  "b400399bbf444710af162ee1668aa47d",
                  "37429d6b9e304fafa37c64358921f565",
                  "26ceda9f2a694254979100a8455f0e73",
                  "2aa724b75a684e6c98bdfe9b00d94a08",
                  "ed7401c749404258a4c264f6b0f1786b",
                  "eff377216fae4ac0bbf41864d115cb22",
                  "014d336197b94414910b7317b5d019d1",
                  "0f61671976abf7f85d1c98b207830f6b",
                  "2c84e84bb902457aad6cb73206db923f",
                  "3563c230c22945f1826644bdb9534d95",
                  "fbe2a04cb5144f4cb8ec2a13f326398c",
                  "66a15471554f4326bbe5c2eb73c49ee3",
                  "JJ9QFssRnxzms2GPPRCBnMDXHjKQNAMW",
                  "58b6ec9ece784e88a575663cbb69074a",
                  "fa40c38d914340fb89f0c63027833a9d",
                  "3e99952c2cc7f1f566126deaff432996",
                  "uFBV0VlouC8OfU38v0l6lG0oVQ0kDqvr",
                  "d4cd446bb89a43c28a15d8909ad58f3b",
                  "1125ee6b84fc4dce83b890763fd567c3",
                  "529ec2c526214e388f13bd7347342483",
                  "604df5ac990fbc67dab8fc098af271e6",
                  "8430105cfa7149bf9273e8046b9751e0",
                  "f84c1db8380944308a93e085b5b1af86",
                  "6c228c145bc04142b13dd7b2c429d62b",
                  "3eb1d5c4b4df444a81e41afaf7053cd1",
                  "60bd7f41a86549698ec9d36b1243a3b5",
                  "65c9d01e68d945d9a3629c6a67a96127",
                  "634720b45ec046a1a193810f87755674",
                  "e71db157a8724cafabd2c579602b10d6",
                  "fe43a8180b58471084a27afc8b781b67",
                  "2f75c16649c04335b666ace790f3631e",
                  "13b9e5d0b4d342dd9ed599d196dcb5ad",
                  "a393b43b8a4047018db5ddd28bea8bbb",
                  "183e4c1b72294c60ac2fcc5de3bc2bfd",
                  "b46b718c759a412aa7ab20c1626062d3",
                  "f06ec13a06cb4faba310c583fa4419ba",
                  "17b573bf92c64b4dad88d1d6d5a3eeef",
                  "83e130a304f2489385b6d267105ee40b",
                  "0fb1db8761ac4a85b4eac8ec49a16867",
                  "6801c617d31745499828eed4c696f4bc",
                  "AjYFBMpbQdCoAFomuHhhFNNjvP5LHCfo",
                  "3bf2a0a885f94f279b9d86568182d75d",
                  "3db6d8afe2d24a78a2e7b976457a40f5",
                  "c2a8ae12b885451b90b86beee0c6e374",
                  "235104cf93754fa0b4b4c7983693842f",
                  "4c4d6d5691fd4e7db73b20b6edd27fe2",
                  "3c93dabcea2147c48f142e1fad482c36",
                  "b3f9b26bdd8f60ef0e2c2c0be0b74260",
                  "GvHfSjHAScUuTAasglA81CmfCEtciNmt",
                  "9692a066e340d51cb0b19f27ea06b364",
                  "e66654556ca510d3487c647399a2caf2",
                  "8ee5d5e1e43b4a92835709f4c4a973c9",
                  "689175898efa478d96d0dfda038e4dad",
                  "3fbe6187e6904dae93606048e2ff003a",
                  "f046805b8ac1461ca76dcf2e3d3f4040",
                  "96562a9d820d441cbc480c7a3758df7b",
                  "6392fc87a33447529e12a454da6c339b",
                  "6fa08f482b4c473880aa0215b3c5de39",
                  "V2ztxK2rFe86jD7zYkRhDSAdrOrcY5qo",
                  "9b67e2693d374162be5e2b1b0c66f036",
                  "0973656604e444bcba03231584b74870",
                  "5c31057bc55c4963837049a6d384b567",
                  "d11ae88278b74a6c931176ca4b7b164f",
                  "b4357251c0574a5e98661bbd06c2ca11",
                  "97f3c5a6f2d945528977e86535b927dd",
                  "HipATLcFtfhaa4NGPzk1dcPsIweaGmLh",
                  "3cf82ad2309640b48d43953c661fca7f",
                  "1a79efcfbfb34ff2b704e4dcde4e8fe9",
                  "2db786407faf4d2fa01bbd07f9a93e79",
                  "2918d633d2fe458f89fff1c241b96e9a",
                  "x7vQOMYuj1sZ6zeTNFeqL83qadqFT0Zm",
                  "480dd90425224c2f8cc9a77a402df105",
                  "c3526ba3fa99454896e0e6a9f4c3c4cc",
                  "8b96563e98c2433585767cb2fe1bee21",
                  "6d0b3139a676431992558dda67b6ba65",
                  "OMA5xOj8iBFRAcHJRmJeenKm4lr8UYTT",
                  "c6YGngARruDia5MOwAKgaMxyQdGnJ60H",
                  "fV8NesDn4r3e02A3XeAAhcGGqEb72W90",
                  "fe69ca7dfd6149ec9a47b3dd521e7644",
                  "fb7295e9e6f1427ebe937023e9114228",
                  "7a809a5636e84d1bac1d6f644ce8b56a",
                  "a692b345717e4adb85879bcee227bca9",
                  "fe1a806e420a45179b88e3689ca63446",
                  "e476082cf7af49b1b817e34c91d3486e",
                  "4eeb5d540ff54cf6b077ec469f2dd806",
                  "f4fc174d4733428e86fc38fc7f7bb748",
                  "e0c1977f09a14a7f8ffc35249e740bd3",
                  "003d23de388a443a813d8c2aeee76418",
                  "a90f1203bd8b4f16bd942870c6e14fbd",
                  "6eabe1249ed14043ac393cb5248f4fb6",
                  "819a5f22f3964bbc99931139ee2eb538",
                  "864d71cdaffb4e03a43a535c23d3292a",
                  "18ba5cb2b70d4093a20a362078f0958c",
                  "UnZqOVp4laTfF1l71GqnzXR5e34MUG3M",
                  "2c8792edf77a4bfa86f442bbf79da4e0",
                  "d79960cf15db4422a34d52785e088262",
                  "0e393a6f3c9c4e08aab38db741953af0",
                  "cede30a1de9c44f6b9183ff9be9ae309",
                  "e1a0f189b4f44b998fc8e47d515ab418",
                  "2b0d95e5167742bfaa87b50141d327b9",
                  "b38695ad77ef4d31b11192f8d80d9a8d",
                  "37504a549ca94c2fbcff1cc7ebfd89e2",
                  "6ac66961851f424f87aa7992a5cea5ca",
                  "5310815a01e14e95bfedf1b655fdef03",
                  "3e33684992de4c85a09d565eca3c0591",
                  "1edd47e8e8424d728f648f9c679f1fae",
                  "e12b65ecd73848db87c5ee7eb3f439e5",
                  "WZWxsKIlLOuwUxyn43usGMl2mBFJuczV",
                  "j2S1P01uImUQum2LFGuO9z2Jin0iqak7",
                  "f5e0a094f420d987ae37ef31813f3e46",
                  "IOGl4gRimt6h9gpPCfABcMjfPNKPzQer",
                  "m2ff39ba49a5498b8c7093c677016b87",
                  "2e57292fec6b4c7e9f9d0ccf49358a74",
                  "b9bdf962b01f4d39a524da440c3a9a24",
                  "3241a555f3bb49e0abebce79e2d9c683",
                  "c67b808be97b4ed7b1de747a7597c6ae",
                  "131457365d7a4b868263b1408386a4e9",
                  "73cb362d47024acebac4a5d7811f16e8",
                  "8a9ba4f6a62142e79e31d95d0b320df5",
                  "98a16c977805f1614cc9017fc0ca027c",
                  "e4eb2861e24ff944d3aa0e16bcb91122",
                  "drLb",
                  "drMonitoring",
                  "slowpitchstats",
                  "T38IByPBQUvbLHxrI1x9kIuY3BTTQSIb",
                  "95204aa36c9e464d95a9f94166ce1df7",
                  "GrEaNYFccnbzjiaNdGjyG627SiWCmv3g",
                  "LFiVpk5qjj570GwT6w8eSaVek9dcyUyo",
                  "dd05220dbc214907a081a449982f3d26",
                  "393169b895e84e13ba6389c0e412d193",
                  "jPvJi1XNitsGyJ8AFDNAizCAdVLKXm2y",
                  "6d9cc52eadd14cd7847b588468863592",
                  "5825c528f47a4f45881a6753c57b3a7f",
                  "11aa0d2e8f55487e99e67a15a9ff6168",
                  "989529bd2f0e4238a3012263d3d48241",
                  "6809b4l0G127438bb773d2d6ec18c394",
                  "4b9a7d96ccad47e0846628ac504b1e1b",
                  "74ba26c4a9d049be86c7cdb092417d97",
                  "fa1eaa5b2242410c82ff92323fcf6d47",
                  "a5a154df5b7840588172fc85ebe71e87",
                  "17d0e59684b34c3aab2861d0248cc25b",
                  "0c546c8ae3874452a66e37d505bec29a",
                  "01815239b9bb48869dea0f48b08ad5b7",
                  "cfb3cb708ce14e069555f231933454b6",
                  "83768800514044c883c1761ae50bffb4",
                  "61972e2ace5b43caad61136ee9ad9254",
                  "dbb3a637c32a4af1ad2410f8d32a7c84",
                  "01186811f3224264b1e564fcf5b7fdb9",
                  "e375ca2119cf4c14aa18ac3722dd07fb",
                  "ec48db0385914ebe9200d9547cb27c5f",
                  "21ea08fb07aa419aba9c4b4f077562d1",
                  "14e24fa4909743038e494db6b4b85697",
                  "65168b875d2b4a2da0321d75834f2620",
                  "8ba21719b32a41bb85a83f70ee999ec4",
                  "bf3c4e727412474c9d105c8d5b6f61ad",
                  "fee22d69e94a472192b30c23b3ac6ac7",
                  "4d0164638250450499a5483fc886f476",
                  "d87c355242804c4db2b474b070c100b7",
                  "47c970d8fa144db28a4908766d3e552b",
                  "75c5079cc5c34a4daca144acb33f191f",
                  "405ccf3d4bc541b6bf95b9ac8f732db7",
                  "11b3ec91ec684ad5b2c2bbcf0e117028",
                  "d0f92bb7bc42475994985532676e4d29",
                  "2b07a6cc14ba46b0ae52bafef48b7272",
                  "875fa335caaa46089d1e27455ba6b46a",
                  "e14e408740894337b29667ff124c3747",
                  "bd4ba131e94a49c48fc4621e4e208391",
                  "77c8cb21f0ee4d1e917e976d40a0192c",
                  "5d6509415b35421eb4c592f7f97fd5f2",
                  "b838ddb2e2814523a79accc70ae46417",
                  "b646a118ccf140508b0253c9a44d3e12",
                  "f9a80526573b495fb75b518b2b89354e",
                  "6d240ae497f14063be4c690890a60f86",
                  "31d1063fb493428794cc6b9a24f0af82",
                  "5c8c0596d0204a48bcf982e75f7b0057",
                  "badf3f7d1a924ef5b32c732a0dc85b66",
                  "7c43df67376442a69005f5cae5c3b25b",
                  "9d7500dc9bdc4b6381e66015387823eb",
                  "2159d7e4c5c047e6bd3745c85e403756",
                  "0ab3d1d0b1dd46e4839966bcd1b415c0",
                  "02561c33bd18412a9502326922b83a02",
                  "2815b31e5dd54c0aabcb32bf84a79bd9",
                  "25d0b5c0ecda494faa55f76384567c75",
                  "e75e39d4e89042c094d4c1b1c6a5d86e",
                  "7c73cd5e8e8f45689235f51f70732f8e",
                  "9130902f881a44aeacc8f319419cc929",
                  "10a0d29e20a14fbb87749cc73f8efff3",
                  "00dddd556c33472ab7afb4ebc7843282",
                  "0d5bf93475ea4372a96ef75938239fa2",
                  "2011706e978d4653b536ea3ea85b3005",
                  "36025fe36a014fc8a8c2ba4b585ab58c",
                  "4011d0dbbd4742f0a31fc3dbcf0c4299",
                  "592b25979f1d4ba3bdef695a144d64c0",
                  "9e1d95dec9d543f7a1a28345c64a2b73",
                  "c337ae62486445f58609a83cf0446851",
                  "fe7384de29d0498d99fc169315ee63c9",
                  "434920cfddec4c318beccf809d919a94",
                  "4009d041afec4bbda55cfcb32eddf94d",
                  "09fc9b3ad0c6494294ee7e6adabdcaa9",
                  "dcc4505ad4644b428264f44922b12ee5",
                  "fec7126def664064840f03dfd693b524",
                  "47ec2875c3e74c8e965b918a0dd0b37f",
                  "0cf750d174b4421c948323ff0f150eb2",
                  "82b2bcac1a5e429bbc14b12f558ef1d2",
                  "52020246f6e94edb861d4b7c86cf1659",
                  "f2c6fcc010824c05989a44e69e588742",
                  "bf2136f4b1234b48bd94ddf1f97d4e67",
                  "36b3419fa81d434ebfddbe1415356e0b",
                  "c65d281d6d3941e49982bd634fbbec25",
                  "6fe5bb8863c24a3fb4a1515c26153da0",
                  "270a9538f6f44736bb8834f8f14d61a6",
                  "03a5370a46014fe0a4da4241682e6079",
                  "968adfad396c41b1b8c2ed54dd2ee471",
                  "7dd17e4290984c9fb39d421a565b7abb",
                  "bbddf0b2ae65413d91fa2ec54c352e51",
                  "47618a302887457783034cddee3cac73",
                  "ef029932ce20412a9e4dac1ea7fe83b3",
                  "46c4a16e6b3748f58f918cd7e20c06f1",
                  "a9a505bb3b6c4648b071f9e774d4e3f7",
                  "996d2558219840f3869d0feee75a4ba4",
                  "13626bbd97224522a159545a50c28383",
                  "de6c4779b8584f9fb1a1b880da974fc6",
                  "6163570332e746479d2052a10f1f4315",
                  "6b43a7c9ff634eef9d0a1d430b994609",
                  "0c6cb9bf180043458fbcd9a74f4ee5a3",
                  "b679d652d6704c9e8c5a812157552329",
                  "83fb8058737345aba941639128699cd7",
                  "5b026578210849e0a3435a95b95d0ea2",
                  "19e3ed05bf584df69be668709fafa954",
                  "360897d6b74b4d7a8f80bdff388e0ca1",
                  "3ce90c17b5e64559b9f198efb5418913",
                  "d487033298da4c4e8532f8da8d4bc2e4",
                  "49ea6136b8b94019897647eb6cb40b6d",
                  "289d7fecc9814fd7953223d7ef4c0350",
                  "de1c2c1beb49463b9cc01c8785d06051",
                  "a26cf34353044b78aa9e20a3efcf0abb",
                  "5ba8c5935f29425789687688a0bd778b",
                  "39af461e1a9249d0af8896fa8443979c",
                  "1d18eaea1bdd496d9d78589359a72bd5",
                  "30d9063c1cc641d88ea46b6058ebc38f",
                  "29698303f906482a906dca00f94f8d01",
                  "91017dfa6e484fa3b8da08db8a553905",
                  "e0a7add820724303872d7f6ccf24392a",
                  "aa631b2b61f44f9c8a2f50fa909007e7",
                  "e85ef23487124be5a3844dff4e15d318",
                  "5fd2a624e71746c981f58d7ac79e9fc4",
                  "6345e570f5d04a80a26e0916a654c974",
                  "839ceead92404cbdb4419ac6ef7f6d05",
                  "d8d5550c60f44055830fdd5c5a3d05bc",
                  "4e2672ea3d2d4d69b8dda44a00806e34",
                  "3ff138ba511b4ea19e03825a8565599f",
                  "183f5c47c9784caea04bb4bcfd160806",
                  "Mf9WXzGfr2B8UgF63ucNGLpmCNmuHJGe",
                  "84LfuDZFMzh4OkqAEqf9FwzzAm9a5m7z",
                  "4GEFGGGU8KltQGPpqClVXLusU7I9xDvw",
                  "3YGONLdp1Ze88sLyBDbPFN8DUR5oQI4p",
                  "EwUZtJiOJIlnkLq2k46V5txKR3bjJWq8",
                  "lv1kDTOXvnNQvuFpkM5Af1NIFtK9TOAD",
                  "mw8GrV3n5RjkoBCyYXmuApRf9bs5Y8Id",
                  "BIPVgoickzA3F3f6vDolpNdyyVIJqNu9",
                  "b97fd7152d804d429d706e1b8f82cb2a",
                  "27fb8aa9e9e94f4da269144fc92dbac7",
                  "9485fa7b159e42edb08a83bde0d83dia",
                  "x4Uo2cwIaUr1GSVHEPY82EQ15MWOuHUa",
                  "HBAgVRFqtU232A82hGGINxxXHDbHFi5q",
                  "Gr7UzxdwWXOTHbyPD2DGsFTMV7cAGt0f",
                  "ffde04838d9e4778a9295ba5f825fd84",
                  "29f2aa5dfbe21265da9df360e9c40f34",
                  "192a09e3f41571b5421dec528c76c846",
                  "21f64753cf014b9783a73e9645ee640d",
                  "817f2a161e624076b35219965b88a25d",
                  "7c80329a76e14e6e8fe252d5d67562de",
                  "f5a8d5cdf1a84a548ca7b3dd87d3f097",
                  "7eb58ac6d2b0437294159cce8d968995",
                  "c5017f3034ff48ce8bac77defcc27fff",
                  "e4e5b7be6f0343b4aa7530c104329b42",
                  "2ed1ec032d0a43c6b694d90166597ca2",
                  "1b3476bae4e94fa08f156ea59fdf51fe",
                  "99e21358c19c4ced9d1932a29f0623f1",
                  "5538a2fed2f94d038ec48cc41beb6a38",
                  "1fb4b501e1504cb49befc0adc661747d",
                  "8e3fd8a6b52e48a38170c9be9b29ffe1",
                  "OfEXe4Rr9ON0F0buy7GfwlMJTQztRCUk",
                  "P6CpVQdHrJD4AixO6zRZO1sd1aD0WmOi",
                  "O2k6McH9iN7UGAJoVWUDzFU5AKgkhNkK",
                  "deb09d9fce9b4cf2a1b6e0570227a6e5",
                  "74d07d5ecbd0466cb3e6016ce91aa466",
                  "5af30905f7874fb0962f153ec990e9f5",
                  "LjJiINSM8m6aLAZ5GzOXvABPiAgCaRmY",
                  "4af9b12fbb284f069a1887d67cda5a01",
                  "0fffa5a070a3409c9fec8211f35ca945",
                  "5f5105c7a96d40c3b02de118d7aea4e5",
                  "5954b627ade9405c9955687939ffab6a",
                  "5de150dc29228095f9811cdf15ea5938",
                  "b0dc30922cd14014857de1fc83208529",
                  "ea243ea946744e9d9cc7290a9dabf438",
                  "02fa6c6228f9df9bf445d28216705a97",
                  "77d378c27c11402285201cdf2dc0bccc",
                  "780e6221a2ee627b0ae1cffcdf31f9aa",
                  "36tnbk7frf5suyj5gby3j6yb",
                  "SNvVwAFtjoq0UOuAJ3Rj7lZl4BPjoENy",
                  "66759a8a36a3463c8523b31ecc5b65ef",
                  "5a7b5d42d95d418b9cf7f7410f7972f7",
                  "8ac42ccff20845f2be98ea157a5477ca",
                  "ffdd879d12a34305bb4d0dd5ac1dffaa",
                  "ef5462596d6b41b9be9d8c724e1906a3",
                  "f5a213b29d334070b40bd3e1f6fb6b6c",
                  "3c9b552c6fc64cfda6bccb86efb4c297",
                  "4210306424e546b78990dd9ea42bb5a9",
                  "W8p50dcae1884cd9a945472ad60b9afe",
                  "398fd4cd5b484aa1a47a10dee2a8fca3",
                  "84fc57c62fbd4dff8b8f29ec6c896dd3",
                  "SKqtQ0XopVO70r4k0okPGHDmAZxOACSR",
                  "eAmN9NUzzDdvAD1Xwvtf3L8UVq6MTycC",
                  "AhGyi9pPBPmRsA14rCGcvTlHT9cVDECe",
                  "4e1d0267e2b8406ebee074ef7b81867d",
                  "b0b53721112a43238a21907e6ddfbfa5",
                  "c37f4c6cf2d6416fbde31c5197a6747a",
                  "9a7b3aa0dd924a5bb5d0d6ee382cb0f1",
                  "b691279436264b0aa1c60b51c536383b",
                  "ca16fb2bc8b8467aa35a15f885565915",
                  "c1c7ce2f588248cbb35cc47e7749e024",
                  "40943e90d623415391d1677e91c10e4d",
                  "5ef7f2e4ea66403685823e72dcb2f50b",
                  "3931467461dc4c22b03bd23545a8b9e9",
                  "d4f5388ea0b040baaaeeeaf31a39bbfc",
                  "2d6c9790b3c74fa8b5bd40be56c944a0",
                  "ef251a886f594732a5ebde1cbb63318d",
                  "7bb58f576e1a4f0d9b0b05345e4fc00b",
                  "32ad5ead59b048b2a4784a748571aa7e",
                  "0e3080b2c3b745c2a4c25009fd3470af",
                  "2a2c8fb134624033b0e2b0295046296e",
                  "bcd1f840d68e4f86b49524ed7312b454",
                  "c9035ba3f06a41eea2015c17d7bb4c91",
                  "1ea8a8c2acac4307bb5a9a6950906516",
                  "4e3614e0fc8b4d75a074d0a12e0a863b",
                  "8370f74a7b6441aa8b34b4a8770b8753",
                  "b78be955d5b54f6198e6d61e7f8112c9",
                  "b662deb3a4024e90b94f491689d15eca",
                  "360b4801a0eb4321aa3d187855026cbe",
                  "a7e2af2a8976518a2e9d50abb0879417",
                  "R27RpTAwWXl9CEj0oam3ABhm6KfNXhAY",
                  "ffff826ce66ee941c47ae664eb1ea75e",
                  "fPFPi36zIGKmIX33D6FujlGTSuZeHUEb",
                  "e8801e97251c4f6298b1a3e8282ae169",
                  "e3e03a04bd704fc783f93410e41005fc",
                  "2d022a0bc7a14e788f74df5fb6c38e12",
                  "451402db08cd4b90ad538fca563359ac",
                  "b88f4c94a4774dcea2e9ab54fa595ce9",
                  "3e3411ccd49648e1a568521612eaf73c"
                ]
              }
            },
            "serviceIds": {
              "type": "array",
              "title": "Service IDs",
              "items": {
                "type": "string",
                "title": "Service ID",
                "enum": [
                  "CFSRFNotificationPush",
                  "absorb-sso",
                  "addresses",
                  "admin",
                  "admin-jobs",
                  "admin-products",
                  "api-directory-service",
                  "api-key-service",
                  "aqueduct",
                  "arctic-pricing-processor-web",
                  "arctic-usage-web",
                  "audit-service",
                  "bvseo-proxy",
                  "catalog-pdm-shopper",
                  "compliance-affirm",
                  "device-information",
                  "devprod",
                  "digital-rights-service",
                  "dispatch-metrics-service",
                  "display-management",
                  "fmis",
                  "forge-settings-service",
                  "fps",
                  "integration-provisioning",
                  "managed-inventory",
                  "merchandising-offer",
                  "merchandising-shopper",
                  "metered",
                  "mosaic",
                  "msuni",
                  "notification",
                  "oauth20",
                  "om",
                  "orca-admin",
                  "pricing-shopper",
                  "reporting-auth",
                  "riskified",
                  "shopatron-inv-orca",
                  "shopper-api-reporting",
                  "shoppers",
                  "ssr-ms-shipment-storage",
                  "ssr-user-management",
                  "swagger",
                  "testService",
                  "trace",
                  "v1",
                  "v1ods",
                  "watch-service"
                ]
              }
            },
            "clusters": {
              "type": "array",
              "title": "Clusters",
              "items": {
                "title": "Cluter",
                "type": "string"
              }
            },
            "documentTypes": {
              "type": "array",
              "title": "Document Types",
              "items": {
                "type": "string",
                "title": "Document Type"
              }
            },
            "properties": {
              "type": "object",
              "properties": {
                "count": {
                  "type": "string"
                },
                "interval": {
                  "type": "string"
                },
                "siteId": {
                  "type": "string"
                },
                "responseSource": {
                  "type": "string"
                },
                "responseStatus": {
                  "type": "string"
                }
              }
            }
          }
        },
        "CreateWatchDefinition": {
          "$ref": "#"
        }
      }
    }
  },
  'v1-ciscoctg-decrease-traffic-sprike': {
    "links": {
      "up": {
        "rel": "up",
        "href": "http://localhost:8082/watch-definitions.drive?offset=0&max=10",
        "title": "Back to list"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:8082/watch-definitions/v1-ciscoctg-decrease-traffic-sprike",
        "title": "Delete",
        "method": "DELETE"
      },
      "edit": {
        "rel": "edit",
        "href": "http://localhost:8082/watch-definitions.drive",
        "title": "Save",
        "method": "PUT",
        "type": "application/json",
        "$ref": "#/definitions/CreateWatchDefinition"
      },
      "self": {
        "rel": "self",
        "href": "http://localhost:8082/watch-definitions/v1-ciscoctg-decrease-traffic-sprike"
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
    "schema": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "WatchDefinition",
      "description": "An explanation about the purpose of this instance.",
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "path": {
          "type": "string",
          "title": "Path",
          "readOnly": true
        },
        "description": {
          "type": "string",
          "title": "Description"
        },
        "active": {
          "type": "boolean",
          "title": "Active"
        },
        "trigger": {
          "title": "Trigger",
          "type": "string"
        },
        "policyDefinition": {
          "title": "Policy Definition Type",
          "oneOf": [
            {
              "title": "Average Response Time Spike",
              "type": "object",
              "name": "AverageResponseTimeSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "AverageResponseTimeSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_avg_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "avg_response_time_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Decrease Traffic Spike",
              "type": "object",
              "name": "DecreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "DecreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Flatline",
              "type": "object",
              "name": "FlatlinePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "FlatlinePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "predefinedMatchingPattern": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "flatline"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Error Spike",
              "type": "object",
              "name": "IncreaseErrorSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseErrorSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "eventsCountThreshold": {
                      "type": "string"
                    },
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "errorCountThreshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "SERVER_ERROR_RESPONSE",
                        "ERROR_RESPONSE",
                        "CLIENT_ERROR_RESPONSE"
                      ]
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "date_range_terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "error_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Traffic Spike",
              "type": "object",
              "name": "IncreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Service Availability",
              "type": "object",
              "name": "ServiceAvailabilityPolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "ServiceAvailabilityPolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "NON_5XX_RESPONSE",
                        "OK_RESPONSE",
                        "ONLY_200_RESPONSE"
                      ]
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "service_availability"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Slow Average Response Time",
              "type": "object",
              "name": "SlowAverageResponseTimePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "SlowAverageResponseTimePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string",
                      "default": 100
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "metrics_avg"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "slow_avg_response_time"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            }
          ]
        }
      },
      "required": [
        "name",
        "path",
        "active",
        "trigger",
        "policyDefinition"
      ],
      "definitions": {
        "alertDefinitions": {
          "type": "object",
          "title": "Alert Definition",
          "properties": {
            "alertType": {
              "title": "Alert Type",
              "oneOf": [
                {
                  "title": "EMAIL",
                  "type": "object",
                  "name": "EMAIL",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "EMAIL"
                      ]
                    },
                    "subject": {
                      "type": "string"
                    },
                    "from": {
                      "type": "string"
                    },
                    "to": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type",
                    "subject",
                    "to"
                  ]
                },
                {
                  "title": "CONSOLE_TEXT",
                  "type": "object",
                  "name": "CONSOLE_TEXT",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "CONSOLE_TEXT"
                      ]
                    }
                  },
                  "required": [
                    "type"
                  ]
                },
                {
                  "title": "SLACK",
                  "type": "object",
                  "name": "SLACK",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "SLACK"
                      ]
                    },
                    "webhook": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "channel": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type"
                  ]
                }
              ]
            },
            "firingPolicy": {
              "type": "string",
              "title": "Firing Policy",
              "enum": [
                "CONTINUOUS",
                "ONCE_WITH_FOLLOW_UP"
              ]
            }
          }
        },
        "queryType_SEARCH_WITH_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH_WITH_COUNT"
        },
        "queryType_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "COUNT"
        },
        "queryType_SEARCH": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH"
        },
        "queryDefinition": {
          "title": "Query Definition Details",
          "properties": {
            "timeInterval": {
              "type": "object",
              "title": "Time Interval",
              "properties": {
                "from": {
                  "type": "string",
                  "title": "From"
                },
                "to": {
                  "type": "string",
                  "title": "To"
                }
              },
              "required": [
                "from",
                "to"
              ]
            },
            "apiKeys": {
              "type": "array",
              "title": "Api Keys",
              "items": {
                "type": "string",
                "title": "Api Key",
                "enum": [
                  "a52e39b2e85f44518c9557bef07cefb7",
                  "c379d9cfb0dd490a8399734afa7e28c4",
                  "63ef06b39d47413989f52fbd5be19761",
                  "3daaa577d3084251b2f22bb5bcfb092c",
                  "ce5679c23cd648e19896ce11c9183acf",
                  "71c9782424b64dbbb2e3b1b5ed7b9357",
                  "bd8bba27f49a45f69296a8f57715887a",
                  "722aacea2683463e965c0992d0a1fed6",
                  "d503c0c1e0774c33b6906f5379a114ab",
                  "a59de855c96448acb6f303edc6e26fe7",
                  "f621bcb5b7d44c238631e5e2cea96ac6",
                  "09a8a9e5c81b48f69fd43c0c3defddb0",
                  "d9b0f8ea7f7a4622999c8e1c15933a1e",
                  "dec38ad6b095403e8a1535585b2e9078",
                  "29f94443bbe74b49a9c67fa7a27fac84",
                  "7508fdb7357a4420b1d09271fe682905",
                  "bc81f22c34e84caa96e1d42e8c6df284",
                  "785336eafbea4c1d9c8c47f8cc07bf20",
                  "4a0d6a3658874b6c84e24424f73d5b34",
                  "c9933ce47b76448eaa8dd834a6edb588",
                  "d71730a87ca84a59a2ce94b9bbcc066f",
                  "1e4533bef3f74093b9ddcf727c32ecbd",
                  "6fc4f795c08846368f2ebcf942c38257",
                  "2584ca43d8c34818b409d70813725d06",
                  "75cd2758726d471abb499ba4a83cd43d",
                  "ffe9924c2c0a42fc97ffd80e85d37bc2",
                  "9791ea76c17a41b7b19e0c5de66cd595",
                  "aa51af2df7c3427faf9d8590fe464bc2",
                  "909009c5214249d18054565e6c57886f",
                  "c3609dd96eac4376b20890494e882a38",
                  "d7366e9c1f7a4c3f97cbc340c757d55b",
                  "42e71d5576964354b51688a983caa52c",
                  "1ac2152179c3469e8c9bd1b9b62de1f6",
                  "2f0c928b61654c36ade08c8c23bed62b",
                  "639e54158b254306ae68867995b70ee9",
                  "f5fbf33974794e859696defe6fc9818a",
                  "dfee9ead4fc245d59f7968c87e40709c",
                  "2d58cd1208f34a7886f8ab0760055ab3",
                  "45e8b0e39aba4eebb15ddf134e9b0bd9",
                  "0971189a1331474abbb8633f2c11bba1",
                  "b400399bbf444710af162ee1668aa47d",
                  "37429d6b9e304fafa37c64358921f565",
                  "26ceda9f2a694254979100a8455f0e73",
                  "2aa724b75a684e6c98bdfe9b00d94a08",
                  "ed7401c749404258a4c264f6b0f1786b",
                  "eff377216fae4ac0bbf41864d115cb22",
                  "014d336197b94414910b7317b5d019d1",
                  "0f61671976abf7f85d1c98b207830f6b",
                  "2c84e84bb902457aad6cb73206db923f",
                  "3563c230c22945f1826644bdb9534d95",
                  "fbe2a04cb5144f4cb8ec2a13f326398c",
                  "66a15471554f4326bbe5c2eb73c49ee3",
                  "JJ9QFssRnxzms2GPPRCBnMDXHjKQNAMW",
                  "58b6ec9ece784e88a575663cbb69074a",
                  "fa40c38d914340fb89f0c63027833a9d",
                  "3e99952c2cc7f1f566126deaff432996",
                  "uFBV0VlouC8OfU38v0l6lG0oVQ0kDqvr",
                  "d4cd446bb89a43c28a15d8909ad58f3b",
                  "1125ee6b84fc4dce83b890763fd567c3",
                  "529ec2c526214e388f13bd7347342483",
                  "604df5ac990fbc67dab8fc098af271e6",
                  "8430105cfa7149bf9273e8046b9751e0",
                  "f84c1db8380944308a93e085b5b1af86",
                  "6c228c145bc04142b13dd7b2c429d62b",
                  "3eb1d5c4b4df444a81e41afaf7053cd1",
                  "60bd7f41a86549698ec9d36b1243a3b5",
                  "65c9d01e68d945d9a3629c6a67a96127",
                  "634720b45ec046a1a193810f87755674",
                  "e71db157a8724cafabd2c579602b10d6",
                  "fe43a8180b58471084a27afc8b781b67",
                  "2f75c16649c04335b666ace790f3631e",
                  "13b9e5d0b4d342dd9ed599d196dcb5ad",
                  "a393b43b8a4047018db5ddd28bea8bbb",
                  "183e4c1b72294c60ac2fcc5de3bc2bfd",
                  "b46b718c759a412aa7ab20c1626062d3",
                  "f06ec13a06cb4faba310c583fa4419ba",
                  "17b573bf92c64b4dad88d1d6d5a3eeef",
                  "83e130a304f2489385b6d267105ee40b",
                  "0fb1db8761ac4a85b4eac8ec49a16867",
                  "6801c617d31745499828eed4c696f4bc",
                  "AjYFBMpbQdCoAFomuHhhFNNjvP5LHCfo",
                  "3bf2a0a885f94f279b9d86568182d75d",
                  "3db6d8afe2d24a78a2e7b976457a40f5",
                  "c2a8ae12b885451b90b86beee0c6e374",
                  "235104cf93754fa0b4b4c7983693842f",
                  "4c4d6d5691fd4e7db73b20b6edd27fe2",
                  "3c93dabcea2147c48f142e1fad482c36",
                  "b3f9b26bdd8f60ef0e2c2c0be0b74260",
                  "GvHfSjHAScUuTAasglA81CmfCEtciNmt",
                  "9692a066e340d51cb0b19f27ea06b364",
                  "e66654556ca510d3487c647399a2caf2",
                  "8ee5d5e1e43b4a92835709f4c4a973c9",
                  "689175898efa478d96d0dfda038e4dad",
                  "3fbe6187e6904dae93606048e2ff003a",
                  "f046805b8ac1461ca76dcf2e3d3f4040",
                  "96562a9d820d441cbc480c7a3758df7b",
                  "6392fc87a33447529e12a454da6c339b",
                  "6fa08f482b4c473880aa0215b3c5de39",
                  "V2ztxK2rFe86jD7zYkRhDSAdrOrcY5qo",
                  "9b67e2693d374162be5e2b1b0c66f036",
                  "0973656604e444bcba03231584b74870",
                  "5c31057bc55c4963837049a6d384b567",
                  "d11ae88278b74a6c931176ca4b7b164f",
                  "b4357251c0574a5e98661bbd06c2ca11",
                  "97f3c5a6f2d945528977e86535b927dd",
                  "HipATLcFtfhaa4NGPzk1dcPsIweaGmLh",
                  "3cf82ad2309640b48d43953c661fca7f",
                  "1a79efcfbfb34ff2b704e4dcde4e8fe9",
                  "2db786407faf4d2fa01bbd07f9a93e79",
                  "2918d633d2fe458f89fff1c241b96e9a",
                  "x7vQOMYuj1sZ6zeTNFeqL83qadqFT0Zm",
                  "480dd90425224c2f8cc9a77a402df105",
                  "c3526ba3fa99454896e0e6a9f4c3c4cc",
                  "8b96563e98c2433585767cb2fe1bee21",
                  "6d0b3139a676431992558dda67b6ba65",
                  "OMA5xOj8iBFRAcHJRmJeenKm4lr8UYTT",
                  "c6YGngARruDia5MOwAKgaMxyQdGnJ60H",
                  "fV8NesDn4r3e02A3XeAAhcGGqEb72W90",
                  "fe69ca7dfd6149ec9a47b3dd521e7644",
                  "fb7295e9e6f1427ebe937023e9114228",
                  "7a809a5636e84d1bac1d6f644ce8b56a",
                  "a692b345717e4adb85879bcee227bca9",
                  "fe1a806e420a45179b88e3689ca63446",
                  "e476082cf7af49b1b817e34c91d3486e",
                  "4eeb5d540ff54cf6b077ec469f2dd806",
                  "f4fc174d4733428e86fc38fc7f7bb748",
                  "e0c1977f09a14a7f8ffc35249e740bd3",
                  "003d23de388a443a813d8c2aeee76418",
                  "a90f1203bd8b4f16bd942870c6e14fbd",
                  "6eabe1249ed14043ac393cb5248f4fb6",
                  "819a5f22f3964bbc99931139ee2eb538",
                  "864d71cdaffb4e03a43a535c23d3292a",
                  "18ba5cb2b70d4093a20a362078f0958c",
                  "UnZqOVp4laTfF1l71GqnzXR5e34MUG3M",
                  "2c8792edf77a4bfa86f442bbf79da4e0",
                  "d79960cf15db4422a34d52785e088262",
                  "0e393a6f3c9c4e08aab38db741953af0",
                  "cede30a1de9c44f6b9183ff9be9ae309",
                  "e1a0f189b4f44b998fc8e47d515ab418",
                  "2b0d95e5167742bfaa87b50141d327b9",
                  "b38695ad77ef4d31b11192f8d80d9a8d",
                  "37504a549ca94c2fbcff1cc7ebfd89e2",
                  "6ac66961851f424f87aa7992a5cea5ca",
                  "5310815a01e14e95bfedf1b655fdef03",
                  "3e33684992de4c85a09d565eca3c0591",
                  "1edd47e8e8424d728f648f9c679f1fae",
                  "e12b65ecd73848db87c5ee7eb3f439e5",
                  "WZWxsKIlLOuwUxyn43usGMl2mBFJuczV",
                  "j2S1P01uImUQum2LFGuO9z2Jin0iqak7",
                  "f5e0a094f420d987ae37ef31813f3e46",
                  "IOGl4gRimt6h9gpPCfABcMjfPNKPzQer",
                  "m2ff39ba49a5498b8c7093c677016b87",
                  "2e57292fec6b4c7e9f9d0ccf49358a74",
                  "b9bdf962b01f4d39a524da440c3a9a24",
                  "3241a555f3bb49e0abebce79e2d9c683",
                  "c67b808be97b4ed7b1de747a7597c6ae",
                  "131457365d7a4b868263b1408386a4e9",
                  "73cb362d47024acebac4a5d7811f16e8",
                  "8a9ba4f6a62142e79e31d95d0b320df5",
                  "98a16c977805f1614cc9017fc0ca027c",
                  "e4eb2861e24ff944d3aa0e16bcb91122",
                  "drLb",
                  "drMonitoring",
                  "slowpitchstats",
                  "T38IByPBQUvbLHxrI1x9kIuY3BTTQSIb",
                  "95204aa36c9e464d95a9f94166ce1df7",
                  "GrEaNYFccnbzjiaNdGjyG627SiWCmv3g",
                  "LFiVpk5qjj570GwT6w8eSaVek9dcyUyo",
                  "dd05220dbc214907a081a449982f3d26",
                  "393169b895e84e13ba6389c0e412d193",
                  "jPvJi1XNitsGyJ8AFDNAizCAdVLKXm2y",
                  "6d9cc52eadd14cd7847b588468863592",
                  "5825c528f47a4f45881a6753c57b3a7f",
                  "11aa0d2e8f55487e99e67a15a9ff6168",
                  "989529bd2f0e4238a3012263d3d48241",
                  "6809b4l0G127438bb773d2d6ec18c394",
                  "4b9a7d96ccad47e0846628ac504b1e1b",
                  "74ba26c4a9d049be86c7cdb092417d97",
                  "fa1eaa5b2242410c82ff92323fcf6d47",
                  "a5a154df5b7840588172fc85ebe71e87",
                  "17d0e59684b34c3aab2861d0248cc25b",
                  "0c546c8ae3874452a66e37d505bec29a",
                  "01815239b9bb48869dea0f48b08ad5b7",
                  "cfb3cb708ce14e069555f231933454b6",
                  "83768800514044c883c1761ae50bffb4",
                  "61972e2ace5b43caad61136ee9ad9254",
                  "dbb3a637c32a4af1ad2410f8d32a7c84",
                  "01186811f3224264b1e564fcf5b7fdb9",
                  "e375ca2119cf4c14aa18ac3722dd07fb",
                  "ec48db0385914ebe9200d9547cb27c5f",
                  "21ea08fb07aa419aba9c4b4f077562d1",
                  "14e24fa4909743038e494db6b4b85697",
                  "65168b875d2b4a2da0321d75834f2620",
                  "8ba21719b32a41bb85a83f70ee999ec4",
                  "bf3c4e727412474c9d105c8d5b6f61ad",
                  "fee22d69e94a472192b30c23b3ac6ac7",
                  "4d0164638250450499a5483fc886f476",
                  "d87c355242804c4db2b474b070c100b7",
                  "47c970d8fa144db28a4908766d3e552b",
                  "75c5079cc5c34a4daca144acb33f191f",
                  "405ccf3d4bc541b6bf95b9ac8f732db7",
                  "11b3ec91ec684ad5b2c2bbcf0e117028",
                  "d0f92bb7bc42475994985532676e4d29",
                  "2b07a6cc14ba46b0ae52bafef48b7272",
                  "875fa335caaa46089d1e27455ba6b46a",
                  "e14e408740894337b29667ff124c3747",
                  "bd4ba131e94a49c48fc4621e4e208391",
                  "77c8cb21f0ee4d1e917e976d40a0192c",
                  "5d6509415b35421eb4c592f7f97fd5f2",
                  "b838ddb2e2814523a79accc70ae46417",
                  "b646a118ccf140508b0253c9a44d3e12",
                  "f9a80526573b495fb75b518b2b89354e",
                  "6d240ae497f14063be4c690890a60f86",
                  "31d1063fb493428794cc6b9a24f0af82",
                  "5c8c0596d0204a48bcf982e75f7b0057",
                  "badf3f7d1a924ef5b32c732a0dc85b66",
                  "7c43df67376442a69005f5cae5c3b25b",
                  "9d7500dc9bdc4b6381e66015387823eb",
                  "2159d7e4c5c047e6bd3745c85e403756",
                  "0ab3d1d0b1dd46e4839966bcd1b415c0",
                  "02561c33bd18412a9502326922b83a02",
                  "2815b31e5dd54c0aabcb32bf84a79bd9",
                  "25d0b5c0ecda494faa55f76384567c75",
                  "e75e39d4e89042c094d4c1b1c6a5d86e",
                  "7c73cd5e8e8f45689235f51f70732f8e",
                  "9130902f881a44aeacc8f319419cc929",
                  "10a0d29e20a14fbb87749cc73f8efff3",
                  "00dddd556c33472ab7afb4ebc7843282",
                  "0d5bf93475ea4372a96ef75938239fa2",
                  "2011706e978d4653b536ea3ea85b3005",
                  "36025fe36a014fc8a8c2ba4b585ab58c",
                  "4011d0dbbd4742f0a31fc3dbcf0c4299",
                  "592b25979f1d4ba3bdef695a144d64c0",
                  "9e1d95dec9d543f7a1a28345c64a2b73",
                  "c337ae62486445f58609a83cf0446851",
                  "fe7384de29d0498d99fc169315ee63c9",
                  "434920cfddec4c318beccf809d919a94",
                  "4009d041afec4bbda55cfcb32eddf94d",
                  "09fc9b3ad0c6494294ee7e6adabdcaa9",
                  "dcc4505ad4644b428264f44922b12ee5",
                  "fec7126def664064840f03dfd693b524",
                  "47ec2875c3e74c8e965b918a0dd0b37f",
                  "0cf750d174b4421c948323ff0f150eb2",
                  "82b2bcac1a5e429bbc14b12f558ef1d2",
                  "52020246f6e94edb861d4b7c86cf1659",
                  "f2c6fcc010824c05989a44e69e588742",
                  "bf2136f4b1234b48bd94ddf1f97d4e67",
                  "36b3419fa81d434ebfddbe1415356e0b",
                  "c65d281d6d3941e49982bd634fbbec25",
                  "6fe5bb8863c24a3fb4a1515c26153da0",
                  "270a9538f6f44736bb8834f8f14d61a6",
                  "03a5370a46014fe0a4da4241682e6079",
                  "968adfad396c41b1b8c2ed54dd2ee471",
                  "7dd17e4290984c9fb39d421a565b7abb",
                  "bbddf0b2ae65413d91fa2ec54c352e51",
                  "47618a302887457783034cddee3cac73",
                  "ef029932ce20412a9e4dac1ea7fe83b3",
                  "46c4a16e6b3748f58f918cd7e20c06f1",
                  "a9a505bb3b6c4648b071f9e774d4e3f7",
                  "996d2558219840f3869d0feee75a4ba4",
                  "13626bbd97224522a159545a50c28383",
                  "de6c4779b8584f9fb1a1b880da974fc6",
                  "6163570332e746479d2052a10f1f4315",
                  "6b43a7c9ff634eef9d0a1d430b994609",
                  "0c6cb9bf180043458fbcd9a74f4ee5a3",
                  "b679d652d6704c9e8c5a812157552329",
                  "83fb8058737345aba941639128699cd7",
                  "5b026578210849e0a3435a95b95d0ea2",
                  "19e3ed05bf584df69be668709fafa954",
                  "360897d6b74b4d7a8f80bdff388e0ca1",
                  "3ce90c17b5e64559b9f198efb5418913",
                  "d487033298da4c4e8532f8da8d4bc2e4",
                  "49ea6136b8b94019897647eb6cb40b6d",
                  "289d7fecc9814fd7953223d7ef4c0350",
                  "de1c2c1beb49463b9cc01c8785d06051",
                  "a26cf34353044b78aa9e20a3efcf0abb",
                  "5ba8c5935f29425789687688a0bd778b",
                  "39af461e1a9249d0af8896fa8443979c",
                  "1d18eaea1bdd496d9d78589359a72bd5",
                  "30d9063c1cc641d88ea46b6058ebc38f",
                  "29698303f906482a906dca00f94f8d01",
                  "91017dfa6e484fa3b8da08db8a553905",
                  "e0a7add820724303872d7f6ccf24392a",
                  "aa631b2b61f44f9c8a2f50fa909007e7",
                  "e85ef23487124be5a3844dff4e15d318",
                  "5fd2a624e71746c981f58d7ac79e9fc4",
                  "6345e570f5d04a80a26e0916a654c974",
                  "839ceead92404cbdb4419ac6ef7f6d05",
                  "d8d5550c60f44055830fdd5c5a3d05bc",
                  "4e2672ea3d2d4d69b8dda44a00806e34",
                  "3ff138ba511b4ea19e03825a8565599f",
                  "183f5c47c9784caea04bb4bcfd160806",
                  "Mf9WXzGfr2B8UgF63ucNGLpmCNmuHJGe",
                  "84LfuDZFMzh4OkqAEqf9FwzzAm9a5m7z",
                  "4GEFGGGU8KltQGPpqClVXLusU7I9xDvw",
                  "3YGONLdp1Ze88sLyBDbPFN8DUR5oQI4p",
                  "EwUZtJiOJIlnkLq2k46V5txKR3bjJWq8",
                  "lv1kDTOXvnNQvuFpkM5Af1NIFtK9TOAD",
                  "mw8GrV3n5RjkoBCyYXmuApRf9bs5Y8Id",
                  "BIPVgoickzA3F3f6vDolpNdyyVIJqNu9",
                  "b97fd7152d804d429d706e1b8f82cb2a",
                  "27fb8aa9e9e94f4da269144fc92dbac7",
                  "9485fa7b159e42edb08a83bde0d83dia",
                  "x4Uo2cwIaUr1GSVHEPY82EQ15MWOuHUa",
                  "HBAgVRFqtU232A82hGGINxxXHDbHFi5q",
                  "Gr7UzxdwWXOTHbyPD2DGsFTMV7cAGt0f",
                  "ffde04838d9e4778a9295ba5f825fd84",
                  "29f2aa5dfbe21265da9df360e9c40f34",
                  "192a09e3f41571b5421dec528c76c846",
                  "21f64753cf014b9783a73e9645ee640d",
                  "817f2a161e624076b35219965b88a25d",
                  "7c80329a76e14e6e8fe252d5d67562de",
                  "f5a8d5cdf1a84a548ca7b3dd87d3f097",
                  "7eb58ac6d2b0437294159cce8d968995",
                  "c5017f3034ff48ce8bac77defcc27fff",
                  "e4e5b7be6f0343b4aa7530c104329b42",
                  "2ed1ec032d0a43c6b694d90166597ca2",
                  "1b3476bae4e94fa08f156ea59fdf51fe",
                  "99e21358c19c4ced9d1932a29f0623f1",
                  "5538a2fed2f94d038ec48cc41beb6a38",
                  "1fb4b501e1504cb49befc0adc661747d",
                  "8e3fd8a6b52e48a38170c9be9b29ffe1",
                  "OfEXe4Rr9ON0F0buy7GfwlMJTQztRCUk",
                  "P6CpVQdHrJD4AixO6zRZO1sd1aD0WmOi",
                  "O2k6McH9iN7UGAJoVWUDzFU5AKgkhNkK",
                  "deb09d9fce9b4cf2a1b6e0570227a6e5",
                  "74d07d5ecbd0466cb3e6016ce91aa466",
                  "5af30905f7874fb0962f153ec990e9f5",
                  "LjJiINSM8m6aLAZ5GzOXvABPiAgCaRmY",
                  "4af9b12fbb284f069a1887d67cda5a01",
                  "0fffa5a070a3409c9fec8211f35ca945",
                  "5f5105c7a96d40c3b02de118d7aea4e5",
                  "5954b627ade9405c9955687939ffab6a",
                  "5de150dc29228095f9811cdf15ea5938",
                  "b0dc30922cd14014857de1fc83208529",
                  "ea243ea946744e9d9cc7290a9dabf438",
                  "02fa6c6228f9df9bf445d28216705a97",
                  "77d378c27c11402285201cdf2dc0bccc",
                  "780e6221a2ee627b0ae1cffcdf31f9aa",
                  "36tnbk7frf5suyj5gby3j6yb",
                  "SNvVwAFtjoq0UOuAJ3Rj7lZl4BPjoENy",
                  "66759a8a36a3463c8523b31ecc5b65ef",
                  "5a7b5d42d95d418b9cf7f7410f7972f7",
                  "8ac42ccff20845f2be98ea157a5477ca",
                  "ffdd879d12a34305bb4d0dd5ac1dffaa",
                  "ef5462596d6b41b9be9d8c724e1906a3",
                  "f5a213b29d334070b40bd3e1f6fb6b6c",
                  "3c9b552c6fc64cfda6bccb86efb4c297",
                  "4210306424e546b78990dd9ea42bb5a9",
                  "W8p50dcae1884cd9a945472ad60b9afe",
                  "398fd4cd5b484aa1a47a10dee2a8fca3",
                  "84fc57c62fbd4dff8b8f29ec6c896dd3",
                  "SKqtQ0XopVO70r4k0okPGHDmAZxOACSR",
                  "eAmN9NUzzDdvAD1Xwvtf3L8UVq6MTycC",
                  "AhGyi9pPBPmRsA14rCGcvTlHT9cVDECe",
                  "4e1d0267e2b8406ebee074ef7b81867d",
                  "b0b53721112a43238a21907e6ddfbfa5",
                  "c37f4c6cf2d6416fbde31c5197a6747a",
                  "9a7b3aa0dd924a5bb5d0d6ee382cb0f1",
                  "b691279436264b0aa1c60b51c536383b",
                  "ca16fb2bc8b8467aa35a15f885565915",
                  "c1c7ce2f588248cbb35cc47e7749e024",
                  "40943e90d623415391d1677e91c10e4d",
                  "5ef7f2e4ea66403685823e72dcb2f50b",
                  "3931467461dc4c22b03bd23545a8b9e9",
                  "d4f5388ea0b040baaaeeeaf31a39bbfc",
                  "2d6c9790b3c74fa8b5bd40be56c944a0",
                  "ef251a886f594732a5ebde1cbb63318d",
                  "7bb58f576e1a4f0d9b0b05345e4fc00b",
                  "32ad5ead59b048b2a4784a748571aa7e",
                  "0e3080b2c3b745c2a4c25009fd3470af",
                  "2a2c8fb134624033b0e2b0295046296e",
                  "bcd1f840d68e4f86b49524ed7312b454",
                  "c9035ba3f06a41eea2015c17d7bb4c91",
                  "1ea8a8c2acac4307bb5a9a6950906516",
                  "4e3614e0fc8b4d75a074d0a12e0a863b",
                  "8370f74a7b6441aa8b34b4a8770b8753",
                  "b78be955d5b54f6198e6d61e7f8112c9",
                  "b662deb3a4024e90b94f491689d15eca",
                  "360b4801a0eb4321aa3d187855026cbe",
                  "a7e2af2a8976518a2e9d50abb0879417",
                  "R27RpTAwWXl9CEj0oam3ABhm6KfNXhAY",
                  "ffff826ce66ee941c47ae664eb1ea75e",
                  "fPFPi36zIGKmIX33D6FujlGTSuZeHUEb",
                  "e8801e97251c4f6298b1a3e8282ae169",
                  "e3e03a04bd704fc783f93410e41005fc",
                  "2d022a0bc7a14e788f74df5fb6c38e12",
                  "451402db08cd4b90ad538fca563359ac",
                  "b88f4c94a4774dcea2e9ab54fa595ce9",
                  "3e3411ccd49648e1a568521612eaf73c"
                ]
              }
            },
            "serviceIds": {
              "type": "array",
              "title": "Service IDs",
              "items": {
                "type": "string",
                "title": "Service ID",
                "enum": [
                  "CFSRFNotificationPush",
                  "absorb-sso",
                  "addresses",
                  "admin",
                  "admin-jobs",
                  "admin-products",
                  "api-directory-service",
                  "api-key-service",
                  "aqueduct",
                  "arctic-pricing-processor-web",
                  "arctic-usage-web",
                  "audit-service",
                  "bvseo-proxy",
                  "catalog-pdm-shopper",
                  "compliance-affirm",
                  "device-information",
                  "devprod",
                  "digital-rights-service",
                  "dispatch-metrics-service",
                  "display-management",
                  "fmis",
                  "forge-settings-service",
                  "fps",
                  "integration-provisioning",
                  "managed-inventory",
                  "merchandising-offer",
                  "merchandising-shopper",
                  "metered",
                  "mosaic",
                  "msuni",
                  "notification",
                  "oauth20",
                  "om",
                  "orca-admin",
                  "pricing-shopper",
                  "reporting-auth",
                  "riskified",
                  "shopatron-inv-orca",
                  "shopper-api-reporting",
                  "shoppers",
                  "ssr-ms-shipment-storage",
                  "ssr-user-management",
                  "swagger",
                  "testService",
                  "trace",
                  "v1",
                  "v1ods",
                  "watch-service"
                ]
              }
            },
            "clusters": {
              "type": "array",
              "title": "Clusters",
              "items": {
                "title": "Cluter",
                "type": "string"
              }
            },
            "documentTypes": {
              "type": "array",
              "title": "Document Types",
              "items": {
                "type": "string",
                "title": "Document Type"
              }
            },
            "properties": {
              "type": "object",
              "properties": {
                "count": {
                  "type": "string"
                },
                "interval": {
                  "type": "string"
                },
                "siteId": {
                  "type": "string"
                },
                "responseSource": {
                  "type": "string"
                },
                "responseStatus": {
                  "type": "string"
                }
              }
            }
          }
        },
        "CreateWatchDefinition": {
          "$ref": "#"
        }
      }
    }
  },
  'dispatch-errors-watch': {
    "links": {
      "up": {
        "rel": "up",
        "href": "http://localhost:8082/watch-definitions.drive?offset=0&max=10",
        "title": "Back to list"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:8082/watch-definitions/dispatch-errors-watch",
        "title": "Delete",
        "method": "DELETE"
      },
      "edit": {
        "rel": "edit",
        "href": "http://localhost:8082/watch-definitions.drive",
        "title": "Save",
        "method": "PUT",
        "type": "application/json",
        "$ref": "#/definitions/CreateWatchDefinition"
      },
      "self": {
        "rel": "self",
        "href": "http://localhost:8082/watch-definitions/dispatch-errors-watch"
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
    "schema": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "WatchDefinition",
      "description": "An explanation about the purpose of this instance.",
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "path": {
          "type": "string",
          "title": "Path",
          "readOnly": true
        },
        "description": {
          "type": "string",
          "title": "Description"
        },
        "active": {
          "type": "boolean",
          "title": "Active"
        },
        "trigger": {
          "title": "Trigger",
          "type": "string"
        },
        "policyDefinition": {
          "title": "Policy Definition Type",
          "oneOf": [
            {
              "title": "Average Response Time Spike",
              "type": "object",
              "name": "AverageResponseTimeSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "AverageResponseTimeSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_avg_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "avg_response_time_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Decrease Traffic Spike",
              "type": "object",
              "name": "DecreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "DecreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Flatline",
              "type": "object",
              "name": "FlatlinePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "FlatlinePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "predefinedMatchingPattern": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "flatline"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Error Spike",
              "type": "object",
              "name": "IncreaseErrorSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseErrorSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "eventsCountThreshold": {
                      "type": "string"
                    },
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "errorCountThreshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "SERVER_ERROR_RESPONSE",
                        "ERROR_RESPONSE",
                        "CLIENT_ERROR_RESPONSE"
                      ]
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "date_range_terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "error_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Traffic Spike",
              "type": "object",
              "name": "IncreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Service Availability",
              "type": "object",
              "name": "ServiceAvailabilityPolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "ServiceAvailabilityPolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "NON_5XX_RESPONSE",
                        "OK_RESPONSE",
                        "ONLY_200_RESPONSE"
                      ]
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "service_availability"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Slow Average Response Time",
              "type": "object",
              "name": "SlowAverageResponseTimePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "SlowAverageResponseTimePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string",
                      "default": 100
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "metrics_avg"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "slow_avg_response_time"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            }
          ]
        }
      },
      "required": [
        "name",
        "path",
        "active",
        "trigger",
        "policyDefinition"
      ],
      "definitions": {
        "alertDefinitions": {
          "type": "object",
          "title": "Alert Definition",
          "properties": {
            "alertType": {
              "title": "Alert Type",
              "oneOf": [
                {
                  "title": "EMAIL",
                  "type": "object",
                  "name": "EMAIL",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "EMAIL"
                      ]
                    },
                    "subject": {
                      "type": "string"
                    },
                    "from": {
                      "type": "string"
                    },
                    "to": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type",
                    "subject",
                    "to"
                  ]
                },
                {
                  "title": "CONSOLE_TEXT",
                  "type": "object",
                  "name": "CONSOLE_TEXT",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "CONSOLE_TEXT"
                      ]
                    }
                  },
                  "required": [
                    "type"
                  ]
                },
                {
                  "title": "SLACK",
                  "type": "object",
                  "name": "SLACK",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "SLACK"
                      ]
                    },
                    "webhook": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "channel": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type"
                  ]
                }
              ]
            },
            "firingPolicy": {
              "type": "string",
              "title": "Firing Policy",
              "enum": [
                "CONTINUOUS",
                "ONCE_WITH_FOLLOW_UP"
              ]
            }
          }
        },
        "queryType_SEARCH_WITH_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH_WITH_COUNT"
        },
        "queryType_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "COUNT"
        },
        "queryType_SEARCH": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH"
        },
        "queryDefinition": {
          "title": "Query Definition Details",
          "properties": {
            "timeInterval": {
              "type": "object",
              "title": "Time Interval",
              "properties": {
                "from": {
                  "type": "string",
                  "title": "From"
                },
                "to": {
                  "type": "string",
                  "title": "To"
                }
              },
              "required": [
                "from",
                "to"
              ]
            },
            "apiKeys": {
              "type": "array",
              "title": "Api Keys",
              "items": {
                "type": "string",
                "title": "Api Key",
                "enum": [
                  "a52e39b2e85f44518c9557bef07cefb7",
                  "c379d9cfb0dd490a8399734afa7e28c4",
                  "63ef06b39d47413989f52fbd5be19761",
                  "3daaa577d3084251b2f22bb5bcfb092c",
                  "ce5679c23cd648e19896ce11c9183acf",
                  "71c9782424b64dbbb2e3b1b5ed7b9357",
                  "bd8bba27f49a45f69296a8f57715887a",
                  "722aacea2683463e965c0992d0a1fed6",
                  "d503c0c1e0774c33b6906f5379a114ab",
                  "a59de855c96448acb6f303edc6e26fe7",
                  "f621bcb5b7d44c238631e5e2cea96ac6",
                  "09a8a9e5c81b48f69fd43c0c3defddb0",
                  "d9b0f8ea7f7a4622999c8e1c15933a1e",
                  "dec38ad6b095403e8a1535585b2e9078",
                  "29f94443bbe74b49a9c67fa7a27fac84",
                  "7508fdb7357a4420b1d09271fe682905",
                  "bc81f22c34e84caa96e1d42e8c6df284",
                  "785336eafbea4c1d9c8c47f8cc07bf20",
                  "4a0d6a3658874b6c84e24424f73d5b34",
                  "c9933ce47b76448eaa8dd834a6edb588",
                  "d71730a87ca84a59a2ce94b9bbcc066f",
                  "1e4533bef3f74093b9ddcf727c32ecbd",
                  "6fc4f795c08846368f2ebcf942c38257",
                  "2584ca43d8c34818b409d70813725d06",
                  "75cd2758726d471abb499ba4a83cd43d",
                  "ffe9924c2c0a42fc97ffd80e85d37bc2",
                  "9791ea76c17a41b7b19e0c5de66cd595",
                  "aa51af2df7c3427faf9d8590fe464bc2",
                  "909009c5214249d18054565e6c57886f",
                  "c3609dd96eac4376b20890494e882a38",
                  "d7366e9c1f7a4c3f97cbc340c757d55b",
                  "42e71d5576964354b51688a983caa52c",
                  "1ac2152179c3469e8c9bd1b9b62de1f6",
                  "2f0c928b61654c36ade08c8c23bed62b",
                  "639e54158b254306ae68867995b70ee9",
                  "f5fbf33974794e859696defe6fc9818a",
                  "dfee9ead4fc245d59f7968c87e40709c",
                  "2d58cd1208f34a7886f8ab0760055ab3",
                  "45e8b0e39aba4eebb15ddf134e9b0bd9",
                  "0971189a1331474abbb8633f2c11bba1",
                  "b400399bbf444710af162ee1668aa47d",
                  "37429d6b9e304fafa37c64358921f565",
                  "26ceda9f2a694254979100a8455f0e73",
                  "2aa724b75a684e6c98bdfe9b00d94a08",
                  "ed7401c749404258a4c264f6b0f1786b",
                  "eff377216fae4ac0bbf41864d115cb22",
                  "014d336197b94414910b7317b5d019d1",
                  "0f61671976abf7f85d1c98b207830f6b",
                  "2c84e84bb902457aad6cb73206db923f",
                  "3563c230c22945f1826644bdb9534d95",
                  "fbe2a04cb5144f4cb8ec2a13f326398c",
                  "66a15471554f4326bbe5c2eb73c49ee3",
                  "JJ9QFssRnxzms2GPPRCBnMDXHjKQNAMW",
                  "58b6ec9ece784e88a575663cbb69074a",
                  "fa40c38d914340fb89f0c63027833a9d",
                  "3e99952c2cc7f1f566126deaff432996",
                  "uFBV0VlouC8OfU38v0l6lG0oVQ0kDqvr",
                  "d4cd446bb89a43c28a15d8909ad58f3b",
                  "1125ee6b84fc4dce83b890763fd567c3",
                  "529ec2c526214e388f13bd7347342483",
                  "604df5ac990fbc67dab8fc098af271e6",
                  "8430105cfa7149bf9273e8046b9751e0",
                  "f84c1db8380944308a93e085b5b1af86",
                  "6c228c145bc04142b13dd7b2c429d62b",
                  "3eb1d5c4b4df444a81e41afaf7053cd1",
                  "60bd7f41a86549698ec9d36b1243a3b5",
                  "65c9d01e68d945d9a3629c6a67a96127",
                  "634720b45ec046a1a193810f87755674",
                  "e71db157a8724cafabd2c579602b10d6",
                  "fe43a8180b58471084a27afc8b781b67",
                  "2f75c16649c04335b666ace790f3631e",
                  "13b9e5d0b4d342dd9ed599d196dcb5ad",
                  "a393b43b8a4047018db5ddd28bea8bbb",
                  "183e4c1b72294c60ac2fcc5de3bc2bfd",
                  "b46b718c759a412aa7ab20c1626062d3",
                  "f06ec13a06cb4faba310c583fa4419ba",
                  "17b573bf92c64b4dad88d1d6d5a3eeef",
                  "83e130a304f2489385b6d267105ee40b",
                  "0fb1db8761ac4a85b4eac8ec49a16867",
                  "6801c617d31745499828eed4c696f4bc",
                  "AjYFBMpbQdCoAFomuHhhFNNjvP5LHCfo",
                  "3bf2a0a885f94f279b9d86568182d75d",
                  "3db6d8afe2d24a78a2e7b976457a40f5",
                  "c2a8ae12b885451b90b86beee0c6e374",
                  "235104cf93754fa0b4b4c7983693842f",
                  "4c4d6d5691fd4e7db73b20b6edd27fe2",
                  "3c93dabcea2147c48f142e1fad482c36",
                  "b3f9b26bdd8f60ef0e2c2c0be0b74260",
                  "GvHfSjHAScUuTAasglA81CmfCEtciNmt",
                  "9692a066e340d51cb0b19f27ea06b364",
                  "e66654556ca510d3487c647399a2caf2",
                  "8ee5d5e1e43b4a92835709f4c4a973c9",
                  "689175898efa478d96d0dfda038e4dad",
                  "3fbe6187e6904dae93606048e2ff003a",
                  "f046805b8ac1461ca76dcf2e3d3f4040",
                  "96562a9d820d441cbc480c7a3758df7b",
                  "6392fc87a33447529e12a454da6c339b",
                  "6fa08f482b4c473880aa0215b3c5de39",
                  "V2ztxK2rFe86jD7zYkRhDSAdrOrcY5qo",
                  "9b67e2693d374162be5e2b1b0c66f036",
                  "0973656604e444bcba03231584b74870",
                  "5c31057bc55c4963837049a6d384b567",
                  "d11ae88278b74a6c931176ca4b7b164f",
                  "b4357251c0574a5e98661bbd06c2ca11",
                  "97f3c5a6f2d945528977e86535b927dd",
                  "HipATLcFtfhaa4NGPzk1dcPsIweaGmLh",
                  "3cf82ad2309640b48d43953c661fca7f",
                  "1a79efcfbfb34ff2b704e4dcde4e8fe9",
                  "2db786407faf4d2fa01bbd07f9a93e79",
                  "2918d633d2fe458f89fff1c241b96e9a",
                  "x7vQOMYuj1sZ6zeTNFeqL83qadqFT0Zm",
                  "480dd90425224c2f8cc9a77a402df105",
                  "c3526ba3fa99454896e0e6a9f4c3c4cc",
                  "8b96563e98c2433585767cb2fe1bee21",
                  "6d0b3139a676431992558dda67b6ba65",
                  "OMA5xOj8iBFRAcHJRmJeenKm4lr8UYTT",
                  "c6YGngARruDia5MOwAKgaMxyQdGnJ60H",
                  "fV8NesDn4r3e02A3XeAAhcGGqEb72W90",
                  "fe69ca7dfd6149ec9a47b3dd521e7644",
                  "fb7295e9e6f1427ebe937023e9114228",
                  "7a809a5636e84d1bac1d6f644ce8b56a",
                  "a692b345717e4adb85879bcee227bca9",
                  "fe1a806e420a45179b88e3689ca63446",
                  "e476082cf7af49b1b817e34c91d3486e",
                  "4eeb5d540ff54cf6b077ec469f2dd806",
                  "f4fc174d4733428e86fc38fc7f7bb748",
                  "e0c1977f09a14a7f8ffc35249e740bd3",
                  "003d23de388a443a813d8c2aeee76418",
                  "a90f1203bd8b4f16bd942870c6e14fbd",
                  "6eabe1249ed14043ac393cb5248f4fb6",
                  "819a5f22f3964bbc99931139ee2eb538",
                  "864d71cdaffb4e03a43a535c23d3292a",
                  "18ba5cb2b70d4093a20a362078f0958c",
                  "UnZqOVp4laTfF1l71GqnzXR5e34MUG3M",
                  "2c8792edf77a4bfa86f442bbf79da4e0",
                  "d79960cf15db4422a34d52785e088262",
                  "0e393a6f3c9c4e08aab38db741953af0",
                  "cede30a1de9c44f6b9183ff9be9ae309",
                  "e1a0f189b4f44b998fc8e47d515ab418",
                  "2b0d95e5167742bfaa87b50141d327b9",
                  "b38695ad77ef4d31b11192f8d80d9a8d",
                  "37504a549ca94c2fbcff1cc7ebfd89e2",
                  "6ac66961851f424f87aa7992a5cea5ca",
                  "5310815a01e14e95bfedf1b655fdef03",
                  "3e33684992de4c85a09d565eca3c0591",
                  "1edd47e8e8424d728f648f9c679f1fae",
                  "e12b65ecd73848db87c5ee7eb3f439e5",
                  "WZWxsKIlLOuwUxyn43usGMl2mBFJuczV",
                  "j2S1P01uImUQum2LFGuO9z2Jin0iqak7",
                  "f5e0a094f420d987ae37ef31813f3e46",
                  "IOGl4gRimt6h9gpPCfABcMjfPNKPzQer",
                  "m2ff39ba49a5498b8c7093c677016b87",
                  "2e57292fec6b4c7e9f9d0ccf49358a74",
                  "b9bdf962b01f4d39a524da440c3a9a24",
                  "3241a555f3bb49e0abebce79e2d9c683",
                  "c67b808be97b4ed7b1de747a7597c6ae",
                  "131457365d7a4b868263b1408386a4e9",
                  "73cb362d47024acebac4a5d7811f16e8",
                  "8a9ba4f6a62142e79e31d95d0b320df5",
                  "98a16c977805f1614cc9017fc0ca027c",
                  "e4eb2861e24ff944d3aa0e16bcb91122",
                  "drLb",
                  "drMonitoring",
                  "slowpitchstats",
                  "T38IByPBQUvbLHxrI1x9kIuY3BTTQSIb",
                  "95204aa36c9e464d95a9f94166ce1df7",
                  "GrEaNYFccnbzjiaNdGjyG627SiWCmv3g",
                  "LFiVpk5qjj570GwT6w8eSaVek9dcyUyo",
                  "dd05220dbc214907a081a449982f3d26",
                  "393169b895e84e13ba6389c0e412d193",
                  "jPvJi1XNitsGyJ8AFDNAizCAdVLKXm2y",
                  "6d9cc52eadd14cd7847b588468863592",
                  "5825c528f47a4f45881a6753c57b3a7f",
                  "11aa0d2e8f55487e99e67a15a9ff6168",
                  "989529bd2f0e4238a3012263d3d48241",
                  "6809b4l0G127438bb773d2d6ec18c394",
                  "4b9a7d96ccad47e0846628ac504b1e1b",
                  "74ba26c4a9d049be86c7cdb092417d97",
                  "fa1eaa5b2242410c82ff92323fcf6d47",
                  "a5a154df5b7840588172fc85ebe71e87",
                  "17d0e59684b34c3aab2861d0248cc25b",
                  "0c546c8ae3874452a66e37d505bec29a",
                  "01815239b9bb48869dea0f48b08ad5b7",
                  "cfb3cb708ce14e069555f231933454b6",
                  "83768800514044c883c1761ae50bffb4",
                  "61972e2ace5b43caad61136ee9ad9254",
                  "dbb3a637c32a4af1ad2410f8d32a7c84",
                  "01186811f3224264b1e564fcf5b7fdb9",
                  "e375ca2119cf4c14aa18ac3722dd07fb",
                  "ec48db0385914ebe9200d9547cb27c5f",
                  "21ea08fb07aa419aba9c4b4f077562d1",
                  "14e24fa4909743038e494db6b4b85697",
                  "65168b875d2b4a2da0321d75834f2620",
                  "8ba21719b32a41bb85a83f70ee999ec4",
                  "bf3c4e727412474c9d105c8d5b6f61ad",
                  "fee22d69e94a472192b30c23b3ac6ac7",
                  "4d0164638250450499a5483fc886f476",
                  "d87c355242804c4db2b474b070c100b7",
                  "47c970d8fa144db28a4908766d3e552b",
                  "75c5079cc5c34a4daca144acb33f191f",
                  "405ccf3d4bc541b6bf95b9ac8f732db7",
                  "11b3ec91ec684ad5b2c2bbcf0e117028",
                  "d0f92bb7bc42475994985532676e4d29",
                  "2b07a6cc14ba46b0ae52bafef48b7272",
                  "875fa335caaa46089d1e27455ba6b46a",
                  "e14e408740894337b29667ff124c3747",
                  "bd4ba131e94a49c48fc4621e4e208391",
                  "77c8cb21f0ee4d1e917e976d40a0192c",
                  "5d6509415b35421eb4c592f7f97fd5f2",
                  "b838ddb2e2814523a79accc70ae46417",
                  "b646a118ccf140508b0253c9a44d3e12",
                  "f9a80526573b495fb75b518b2b89354e",
                  "6d240ae497f14063be4c690890a60f86",
                  "31d1063fb493428794cc6b9a24f0af82",
                  "5c8c0596d0204a48bcf982e75f7b0057",
                  "badf3f7d1a924ef5b32c732a0dc85b66",
                  "7c43df67376442a69005f5cae5c3b25b",
                  "9d7500dc9bdc4b6381e66015387823eb",
                  "2159d7e4c5c047e6bd3745c85e403756",
                  "0ab3d1d0b1dd46e4839966bcd1b415c0",
                  "02561c33bd18412a9502326922b83a02",
                  "2815b31e5dd54c0aabcb32bf84a79bd9",
                  "25d0b5c0ecda494faa55f76384567c75",
                  "e75e39d4e89042c094d4c1b1c6a5d86e",
                  "7c73cd5e8e8f45689235f51f70732f8e",
                  "9130902f881a44aeacc8f319419cc929",
                  "10a0d29e20a14fbb87749cc73f8efff3",
                  "00dddd556c33472ab7afb4ebc7843282",
                  "0d5bf93475ea4372a96ef75938239fa2",
                  "2011706e978d4653b536ea3ea85b3005",
                  "36025fe36a014fc8a8c2ba4b585ab58c",
                  "4011d0dbbd4742f0a31fc3dbcf0c4299",
                  "592b25979f1d4ba3bdef695a144d64c0",
                  "9e1d95dec9d543f7a1a28345c64a2b73",
                  "c337ae62486445f58609a83cf0446851",
                  "fe7384de29d0498d99fc169315ee63c9",
                  "434920cfddec4c318beccf809d919a94",
                  "4009d041afec4bbda55cfcb32eddf94d",
                  "09fc9b3ad0c6494294ee7e6adabdcaa9",
                  "dcc4505ad4644b428264f44922b12ee5",
                  "fec7126def664064840f03dfd693b524",
                  "47ec2875c3e74c8e965b918a0dd0b37f",
                  "0cf750d174b4421c948323ff0f150eb2",
                  "82b2bcac1a5e429bbc14b12f558ef1d2",
                  "52020246f6e94edb861d4b7c86cf1659",
                  "f2c6fcc010824c05989a44e69e588742",
                  "bf2136f4b1234b48bd94ddf1f97d4e67",
                  "36b3419fa81d434ebfddbe1415356e0b",
                  "c65d281d6d3941e49982bd634fbbec25",
                  "6fe5bb8863c24a3fb4a1515c26153da0",
                  "270a9538f6f44736bb8834f8f14d61a6",
                  "03a5370a46014fe0a4da4241682e6079",
                  "968adfad396c41b1b8c2ed54dd2ee471",
                  "7dd17e4290984c9fb39d421a565b7abb",
                  "bbddf0b2ae65413d91fa2ec54c352e51",
                  "47618a302887457783034cddee3cac73",
                  "ef029932ce20412a9e4dac1ea7fe83b3",
                  "46c4a16e6b3748f58f918cd7e20c06f1",
                  "a9a505bb3b6c4648b071f9e774d4e3f7",
                  "996d2558219840f3869d0feee75a4ba4",
                  "13626bbd97224522a159545a50c28383",
                  "de6c4779b8584f9fb1a1b880da974fc6",
                  "6163570332e746479d2052a10f1f4315",
                  "6b43a7c9ff634eef9d0a1d430b994609",
                  "0c6cb9bf180043458fbcd9a74f4ee5a3",
                  "b679d652d6704c9e8c5a812157552329",
                  "83fb8058737345aba941639128699cd7",
                  "5b026578210849e0a3435a95b95d0ea2",
                  "19e3ed05bf584df69be668709fafa954",
                  "360897d6b74b4d7a8f80bdff388e0ca1",
                  "3ce90c17b5e64559b9f198efb5418913",
                  "d487033298da4c4e8532f8da8d4bc2e4",
                  "49ea6136b8b94019897647eb6cb40b6d",
                  "289d7fecc9814fd7953223d7ef4c0350",
                  "de1c2c1beb49463b9cc01c8785d06051",
                  "a26cf34353044b78aa9e20a3efcf0abb",
                  "5ba8c5935f29425789687688a0bd778b",
                  "39af461e1a9249d0af8896fa8443979c",
                  "1d18eaea1bdd496d9d78589359a72bd5",
                  "30d9063c1cc641d88ea46b6058ebc38f",
                  "29698303f906482a906dca00f94f8d01",
                  "91017dfa6e484fa3b8da08db8a553905",
                  "e0a7add820724303872d7f6ccf24392a",
                  "aa631b2b61f44f9c8a2f50fa909007e7",
                  "e85ef23487124be5a3844dff4e15d318",
                  "5fd2a624e71746c981f58d7ac79e9fc4",
                  "6345e570f5d04a80a26e0916a654c974",
                  "839ceead92404cbdb4419ac6ef7f6d05",
                  "d8d5550c60f44055830fdd5c5a3d05bc",
                  "4e2672ea3d2d4d69b8dda44a00806e34",
                  "3ff138ba511b4ea19e03825a8565599f",
                  "183f5c47c9784caea04bb4bcfd160806",
                  "Mf9WXzGfr2B8UgF63ucNGLpmCNmuHJGe",
                  "84LfuDZFMzh4OkqAEqf9FwzzAm9a5m7z",
                  "4GEFGGGU8KltQGPpqClVXLusU7I9xDvw",
                  "3YGONLdp1Ze88sLyBDbPFN8DUR5oQI4p",
                  "EwUZtJiOJIlnkLq2k46V5txKR3bjJWq8",
                  "lv1kDTOXvnNQvuFpkM5Af1NIFtK9TOAD",
                  "mw8GrV3n5RjkoBCyYXmuApRf9bs5Y8Id",
                  "BIPVgoickzA3F3f6vDolpNdyyVIJqNu9",
                  "b97fd7152d804d429d706e1b8f82cb2a",
                  "27fb8aa9e9e94f4da269144fc92dbac7",
                  "9485fa7b159e42edb08a83bde0d83dia",
                  "x4Uo2cwIaUr1GSVHEPY82EQ15MWOuHUa",
                  "HBAgVRFqtU232A82hGGINxxXHDbHFi5q",
                  "Gr7UzxdwWXOTHbyPD2DGsFTMV7cAGt0f",
                  "ffde04838d9e4778a9295ba5f825fd84",
                  "29f2aa5dfbe21265da9df360e9c40f34",
                  "192a09e3f41571b5421dec528c76c846",
                  "21f64753cf014b9783a73e9645ee640d",
                  "817f2a161e624076b35219965b88a25d",
                  "7c80329a76e14e6e8fe252d5d67562de",
                  "f5a8d5cdf1a84a548ca7b3dd87d3f097",
                  "7eb58ac6d2b0437294159cce8d968995",
                  "c5017f3034ff48ce8bac77defcc27fff",
                  "e4e5b7be6f0343b4aa7530c104329b42",
                  "2ed1ec032d0a43c6b694d90166597ca2",
                  "1b3476bae4e94fa08f156ea59fdf51fe",
                  "99e21358c19c4ced9d1932a29f0623f1",
                  "5538a2fed2f94d038ec48cc41beb6a38",
                  "1fb4b501e1504cb49befc0adc661747d",
                  "8e3fd8a6b52e48a38170c9be9b29ffe1",
                  "OfEXe4Rr9ON0F0buy7GfwlMJTQztRCUk",
                  "P6CpVQdHrJD4AixO6zRZO1sd1aD0WmOi",
                  "O2k6McH9iN7UGAJoVWUDzFU5AKgkhNkK",
                  "deb09d9fce9b4cf2a1b6e0570227a6e5",
                  "74d07d5ecbd0466cb3e6016ce91aa466",
                  "5af30905f7874fb0962f153ec990e9f5",
                  "LjJiINSM8m6aLAZ5GzOXvABPiAgCaRmY",
                  "4af9b12fbb284f069a1887d67cda5a01",
                  "0fffa5a070a3409c9fec8211f35ca945",
                  "5f5105c7a96d40c3b02de118d7aea4e5",
                  "5954b627ade9405c9955687939ffab6a",
                  "5de150dc29228095f9811cdf15ea5938",
                  "b0dc30922cd14014857de1fc83208529",
                  "ea243ea946744e9d9cc7290a9dabf438",
                  "02fa6c6228f9df9bf445d28216705a97",
                  "77d378c27c11402285201cdf2dc0bccc",
                  "780e6221a2ee627b0ae1cffcdf31f9aa",
                  "36tnbk7frf5suyj5gby3j6yb",
                  "SNvVwAFtjoq0UOuAJ3Rj7lZl4BPjoENy",
                  "66759a8a36a3463c8523b31ecc5b65ef",
                  "5a7b5d42d95d418b9cf7f7410f7972f7",
                  "8ac42ccff20845f2be98ea157a5477ca",
                  "ffdd879d12a34305bb4d0dd5ac1dffaa",
                  "ef5462596d6b41b9be9d8c724e1906a3",
                  "f5a213b29d334070b40bd3e1f6fb6b6c",
                  "3c9b552c6fc64cfda6bccb86efb4c297",
                  "4210306424e546b78990dd9ea42bb5a9",
                  "W8p50dcae1884cd9a945472ad60b9afe",
                  "398fd4cd5b484aa1a47a10dee2a8fca3",
                  "84fc57c62fbd4dff8b8f29ec6c896dd3",
                  "SKqtQ0XopVO70r4k0okPGHDmAZxOACSR",
                  "eAmN9NUzzDdvAD1Xwvtf3L8UVq6MTycC",
                  "AhGyi9pPBPmRsA14rCGcvTlHT9cVDECe",
                  "4e1d0267e2b8406ebee074ef7b81867d",
                  "b0b53721112a43238a21907e6ddfbfa5",
                  "c37f4c6cf2d6416fbde31c5197a6747a",
                  "9a7b3aa0dd924a5bb5d0d6ee382cb0f1",
                  "b691279436264b0aa1c60b51c536383b",
                  "ca16fb2bc8b8467aa35a15f885565915",
                  "c1c7ce2f588248cbb35cc47e7749e024",
                  "40943e90d623415391d1677e91c10e4d",
                  "5ef7f2e4ea66403685823e72dcb2f50b",
                  "3931467461dc4c22b03bd23545a8b9e9",
                  "d4f5388ea0b040baaaeeeaf31a39bbfc",
                  "2d6c9790b3c74fa8b5bd40be56c944a0",
                  "ef251a886f594732a5ebde1cbb63318d",
                  "7bb58f576e1a4f0d9b0b05345e4fc00b",
                  "32ad5ead59b048b2a4784a748571aa7e",
                  "0e3080b2c3b745c2a4c25009fd3470af",
                  "2a2c8fb134624033b0e2b0295046296e",
                  "bcd1f840d68e4f86b49524ed7312b454",
                  "c9035ba3f06a41eea2015c17d7bb4c91",
                  "1ea8a8c2acac4307bb5a9a6950906516",
                  "4e3614e0fc8b4d75a074d0a12e0a863b",
                  "8370f74a7b6441aa8b34b4a8770b8753",
                  "b78be955d5b54f6198e6d61e7f8112c9",
                  "b662deb3a4024e90b94f491689d15eca",
                  "360b4801a0eb4321aa3d187855026cbe",
                  "a7e2af2a8976518a2e9d50abb0879417",
                  "R27RpTAwWXl9CEj0oam3ABhm6KfNXhAY",
                  "ffff826ce66ee941c47ae664eb1ea75e",
                  "fPFPi36zIGKmIX33D6FujlGTSuZeHUEb",
                  "e8801e97251c4f6298b1a3e8282ae169",
                  "e3e03a04bd704fc783f93410e41005fc",
                  "2d022a0bc7a14e788f74df5fb6c38e12",
                  "451402db08cd4b90ad538fca563359ac",
                  "b88f4c94a4774dcea2e9ab54fa595ce9",
                  "3e3411ccd49648e1a568521612eaf73c"
                ]
              }
            },
            "serviceIds": {
              "type": "array",
              "title": "Service IDs",
              "items": {
                "type": "string",
                "title": "Service ID",
                "enum": [
                  "CFSRFNotificationPush",
                  "absorb-sso",
                  "addresses",
                  "admin",
                  "admin-jobs",
                  "admin-products",
                  "api-directory-service",
                  "api-key-service",
                  "aqueduct",
                  "arctic-pricing-processor-web",
                  "arctic-usage-web",
                  "audit-service",
                  "bvseo-proxy",
                  "catalog-pdm-shopper",
                  "compliance-affirm",
                  "device-information",
                  "devprod",
                  "digital-rights-service",
                  "dispatch-metrics-service",
                  "display-management",
                  "fmis",
                  "forge-settings-service",
                  "fps",
                  "integration-provisioning",
                  "managed-inventory",
                  "merchandising-offer",
                  "merchandising-shopper",
                  "metered",
                  "mosaic",
                  "msuni",
                  "notification",
                  "oauth20",
                  "om",
                  "orca-admin",
                  "pricing-shopper",
                  "reporting-auth",
                  "riskified",
                  "shopatron-inv-orca",
                  "shopper-api-reporting",
                  "shoppers",
                  "ssr-ms-shipment-storage",
                  "ssr-user-management",
                  "swagger",
                  "testService",
                  "trace",
                  "v1",
                  "v1ods",
                  "watch-service"
                ]
              }
            },
            "clusters": {
              "type": "array",
              "title": "Clusters",
              "items": {
                "title": "Cluter",
                "type": "string"
              }
            },
            "documentTypes": {
              "type": "array",
              "title": "Document Types",
              "items": {
                "type": "string",
                "title": "Document Type"
              }
            },
            "properties": {
              "type": "object",
              "properties": {
                "count": {
                  "type": "string"
                },
                "interval": {
                  "type": "string"
                },
                "siteId": {
                  "type": "string"
                },
                "responseSource": {
                  "type": "string"
                },
                "responseStatus": {
                  "type": "string"
                }
              }
            }
          }
        },
        "CreateWatchDefinition": {
          "$ref": "#"
        }
      }
    }
  },
  'dispatch-hosts-watch': {
    "links": {
      "up": {
        "rel": "up",
        "href": "http://localhost:8082/watch-definitions.drive?offset=0&max=10",
        "title": "Back to list"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:8082/watch-definitions/dispatch-hosts-watch",
        "title": "Delete",
        "method": "DELETE"
      },
      "edit": {
        "rel": "edit",
        "href": "http://localhost:8082/watch-definitions.drive",
        "title": "Save",
        "method": "PUT",
        "type": "application/json",
        "$ref": "#/definitions/CreateWatchDefinition"
      },
      "self": {
        "rel": "self",
        "href": "http://localhost:8082/watch-definitions/dispatch-hosts-watch"
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
    "schema": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "WatchDefinition",
      "description": "An explanation about the purpose of this instance.",
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "path": {
          "type": "string",
          "title": "Path",
          "readOnly": true
        },
        "description": {
          "type": "string",
          "title": "Description"
        },
        "active": {
          "type": "boolean",
          "title": "Active"
        },
        "trigger": {
          "title": "Trigger",
          "type": "string"
        },
        "policyDefinition": {
          "title": "Policy Definition Type",
          "oneOf": [
            {
              "title": "Average Response Time Spike",
              "type": "object",
              "name": "AverageResponseTimeSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "AverageResponseTimeSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_avg_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "avg_response_time_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Decrease Traffic Spike",
              "type": "object",
              "name": "DecreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "DecreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Flatline",
              "type": "object",
              "name": "FlatlinePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "FlatlinePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "predefinedMatchingPattern": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "flatline"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Error Spike",
              "type": "object",
              "name": "IncreaseErrorSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseErrorSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "eventsCountThreshold": {
                      "type": "string"
                    },
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "errorCountThreshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "SERVER_ERROR_RESPONSE",
                        "ERROR_RESPONSE",
                        "CLIENT_ERROR_RESPONSE"
                      ]
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "date_range_terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "error_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Traffic Spike",
              "type": "object",
              "name": "IncreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Service Availability",
              "type": "object",
              "name": "ServiceAvailabilityPolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "ServiceAvailabilityPolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "NON_5XX_RESPONSE",
                        "OK_RESPONSE",
                        "ONLY_200_RESPONSE"
                      ]
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "service_availability"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Slow Average Response Time",
              "type": "object",
              "name": "SlowAverageResponseTimePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "SlowAverageResponseTimePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string",
                      "default": 100
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "metrics_avg"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "slow_avg_response_time"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            }
          ]
        }
      },
      "required": [
        "name",
        "path",
        "active",
        "trigger",
        "policyDefinition"
      ],
      "definitions": {
        "alertDefinitions": {
          "type": "object",
          "title": "Alert Definition",
          "properties": {
            "alertType": {
              "title": "Alert Type",
              "oneOf": [
                {
                  "title": "EMAIL",
                  "type": "object",
                  "name": "EMAIL",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "EMAIL"
                      ]
                    },
                    "subject": {
                      "type": "string"
                    },
                    "from": {
                      "type": "string"
                    },
                    "to": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type",
                    "subject",
                    "to"
                  ]
                },
                {
                  "title": "CONSOLE_TEXT",
                  "type": "object",
                  "name": "CONSOLE_TEXT",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "CONSOLE_TEXT"
                      ]
                    }
                  },
                  "required": [
                    "type"
                  ]
                },
                {
                  "title": "SLACK",
                  "type": "object",
                  "name": "SLACK",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "SLACK"
                      ]
                    },
                    "webhook": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "channel": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type"
                  ]
                }
              ]
            },
            "firingPolicy": {
              "type": "string",
              "title": "Firing Policy",
              "enum": [
                "CONTINUOUS",
                "ONCE_WITH_FOLLOW_UP"
              ]
            }
          }
        },
        "queryType_SEARCH_WITH_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH_WITH_COUNT"
        },
        "queryType_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "COUNT"
        },
        "queryType_SEARCH": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH"
        },
        "queryDefinition": {
          "title": "Query Definition Details",
          "properties": {
            "timeInterval": {
              "type": "object",
              "title": "Time Interval",
              "properties": {
                "from": {
                  "type": "string",
                  "title": "From"
                },
                "to": {
                  "type": "string",
                  "title": "To"
                }
              },
              "required": [
                "from",
                "to"
              ]
            },
            "apiKeys": {
              "type": "array",
              "title": "Api Keys",
              "items": {
                "type": "string",
                "title": "Api Key",
                "enum": [
                  "a52e39b2e85f44518c9557bef07cefb7",
                  "c379d9cfb0dd490a8399734afa7e28c4",
                  "63ef06b39d47413989f52fbd5be19761",
                  "3daaa577d3084251b2f22bb5bcfb092c",
                  "ce5679c23cd648e19896ce11c9183acf",
                  "71c9782424b64dbbb2e3b1b5ed7b9357",
                  "bd8bba27f49a45f69296a8f57715887a",
                  "722aacea2683463e965c0992d0a1fed6",
                  "d503c0c1e0774c33b6906f5379a114ab",
                  "a59de855c96448acb6f303edc6e26fe7",
                  "f621bcb5b7d44c238631e5e2cea96ac6",
                  "09a8a9e5c81b48f69fd43c0c3defddb0",
                  "d9b0f8ea7f7a4622999c8e1c15933a1e",
                  "dec38ad6b095403e8a1535585b2e9078",
                  "29f94443bbe74b49a9c67fa7a27fac84",
                  "7508fdb7357a4420b1d09271fe682905",
                  "bc81f22c34e84caa96e1d42e8c6df284",
                  "785336eafbea4c1d9c8c47f8cc07bf20",
                  "4a0d6a3658874b6c84e24424f73d5b34",
                  "c9933ce47b76448eaa8dd834a6edb588",
                  "d71730a87ca84a59a2ce94b9bbcc066f",
                  "1e4533bef3f74093b9ddcf727c32ecbd",
                  "6fc4f795c08846368f2ebcf942c38257",
                  "2584ca43d8c34818b409d70813725d06",
                  "75cd2758726d471abb499ba4a83cd43d",
                  "ffe9924c2c0a42fc97ffd80e85d37bc2",
                  "9791ea76c17a41b7b19e0c5de66cd595",
                  "aa51af2df7c3427faf9d8590fe464bc2",
                  "909009c5214249d18054565e6c57886f",
                  "c3609dd96eac4376b20890494e882a38",
                  "d7366e9c1f7a4c3f97cbc340c757d55b",
                  "42e71d5576964354b51688a983caa52c",
                  "1ac2152179c3469e8c9bd1b9b62de1f6",
                  "2f0c928b61654c36ade08c8c23bed62b",
                  "639e54158b254306ae68867995b70ee9",
                  "f5fbf33974794e859696defe6fc9818a",
                  "dfee9ead4fc245d59f7968c87e40709c",
                  "2d58cd1208f34a7886f8ab0760055ab3",
                  "45e8b0e39aba4eebb15ddf134e9b0bd9",
                  "0971189a1331474abbb8633f2c11bba1",
                  "b400399bbf444710af162ee1668aa47d",
                  "37429d6b9e304fafa37c64358921f565",
                  "26ceda9f2a694254979100a8455f0e73",
                  "2aa724b75a684e6c98bdfe9b00d94a08",
                  "ed7401c749404258a4c264f6b0f1786b",
                  "eff377216fae4ac0bbf41864d115cb22",
                  "014d336197b94414910b7317b5d019d1",
                  "0f61671976abf7f85d1c98b207830f6b",
                  "2c84e84bb902457aad6cb73206db923f",
                  "3563c230c22945f1826644bdb9534d95",
                  "fbe2a04cb5144f4cb8ec2a13f326398c",
                  "66a15471554f4326bbe5c2eb73c49ee3",
                  "JJ9QFssRnxzms2GPPRCBnMDXHjKQNAMW",
                  "58b6ec9ece784e88a575663cbb69074a",
                  "fa40c38d914340fb89f0c63027833a9d",
                  "3e99952c2cc7f1f566126deaff432996",
                  "uFBV0VlouC8OfU38v0l6lG0oVQ0kDqvr",
                  "d4cd446bb89a43c28a15d8909ad58f3b",
                  "1125ee6b84fc4dce83b890763fd567c3",
                  "529ec2c526214e388f13bd7347342483",
                  "604df5ac990fbc67dab8fc098af271e6",
                  "8430105cfa7149bf9273e8046b9751e0",
                  "f84c1db8380944308a93e085b5b1af86",
                  "6c228c145bc04142b13dd7b2c429d62b",
                  "3eb1d5c4b4df444a81e41afaf7053cd1",
                  "60bd7f41a86549698ec9d36b1243a3b5",
                  "65c9d01e68d945d9a3629c6a67a96127",
                  "634720b45ec046a1a193810f87755674",
                  "e71db157a8724cafabd2c579602b10d6",
                  "fe43a8180b58471084a27afc8b781b67",
                  "2f75c16649c04335b666ace790f3631e",
                  "13b9e5d0b4d342dd9ed599d196dcb5ad",
                  "a393b43b8a4047018db5ddd28bea8bbb",
                  "183e4c1b72294c60ac2fcc5de3bc2bfd",
                  "b46b718c759a412aa7ab20c1626062d3",
                  "f06ec13a06cb4faba310c583fa4419ba",
                  "17b573bf92c64b4dad88d1d6d5a3eeef",
                  "83e130a304f2489385b6d267105ee40b",
                  "0fb1db8761ac4a85b4eac8ec49a16867",
                  "6801c617d31745499828eed4c696f4bc",
                  "AjYFBMpbQdCoAFomuHhhFNNjvP5LHCfo",
                  "3bf2a0a885f94f279b9d86568182d75d",
                  "3db6d8afe2d24a78a2e7b976457a40f5",
                  "c2a8ae12b885451b90b86beee0c6e374",
                  "235104cf93754fa0b4b4c7983693842f",
                  "4c4d6d5691fd4e7db73b20b6edd27fe2",
                  "3c93dabcea2147c48f142e1fad482c36",
                  "b3f9b26bdd8f60ef0e2c2c0be0b74260",
                  "GvHfSjHAScUuTAasglA81CmfCEtciNmt",
                  "9692a066e340d51cb0b19f27ea06b364",
                  "e66654556ca510d3487c647399a2caf2",
                  "8ee5d5e1e43b4a92835709f4c4a973c9",
                  "689175898efa478d96d0dfda038e4dad",
                  "3fbe6187e6904dae93606048e2ff003a",
                  "f046805b8ac1461ca76dcf2e3d3f4040",
                  "96562a9d820d441cbc480c7a3758df7b",
                  "6392fc87a33447529e12a454da6c339b",
                  "6fa08f482b4c473880aa0215b3c5de39",
                  "V2ztxK2rFe86jD7zYkRhDSAdrOrcY5qo",
                  "9b67e2693d374162be5e2b1b0c66f036",
                  "0973656604e444bcba03231584b74870",
                  "5c31057bc55c4963837049a6d384b567",
                  "d11ae88278b74a6c931176ca4b7b164f",
                  "b4357251c0574a5e98661bbd06c2ca11",
                  "97f3c5a6f2d945528977e86535b927dd",
                  "HipATLcFtfhaa4NGPzk1dcPsIweaGmLh",
                  "3cf82ad2309640b48d43953c661fca7f",
                  "1a79efcfbfb34ff2b704e4dcde4e8fe9",
                  "2db786407faf4d2fa01bbd07f9a93e79",
                  "2918d633d2fe458f89fff1c241b96e9a",
                  "x7vQOMYuj1sZ6zeTNFeqL83qadqFT0Zm",
                  "480dd90425224c2f8cc9a77a402df105",
                  "c3526ba3fa99454896e0e6a9f4c3c4cc",
                  "8b96563e98c2433585767cb2fe1bee21",
                  "6d0b3139a676431992558dda67b6ba65",
                  "OMA5xOj8iBFRAcHJRmJeenKm4lr8UYTT",
                  "c6YGngARruDia5MOwAKgaMxyQdGnJ60H",
                  "fV8NesDn4r3e02A3XeAAhcGGqEb72W90",
                  "fe69ca7dfd6149ec9a47b3dd521e7644",
                  "fb7295e9e6f1427ebe937023e9114228",
                  "7a809a5636e84d1bac1d6f644ce8b56a",
                  "a692b345717e4adb85879bcee227bca9",
                  "fe1a806e420a45179b88e3689ca63446",
                  "e476082cf7af49b1b817e34c91d3486e",
                  "4eeb5d540ff54cf6b077ec469f2dd806",
                  "f4fc174d4733428e86fc38fc7f7bb748",
                  "e0c1977f09a14a7f8ffc35249e740bd3",
                  "003d23de388a443a813d8c2aeee76418",
                  "a90f1203bd8b4f16bd942870c6e14fbd",
                  "6eabe1249ed14043ac393cb5248f4fb6",
                  "819a5f22f3964bbc99931139ee2eb538",
                  "864d71cdaffb4e03a43a535c23d3292a",
                  "18ba5cb2b70d4093a20a362078f0958c",
                  "UnZqOVp4laTfF1l71GqnzXR5e34MUG3M",
                  "2c8792edf77a4bfa86f442bbf79da4e0",
                  "d79960cf15db4422a34d52785e088262",
                  "0e393a6f3c9c4e08aab38db741953af0",
                  "cede30a1de9c44f6b9183ff9be9ae309",
                  "e1a0f189b4f44b998fc8e47d515ab418",
                  "2b0d95e5167742bfaa87b50141d327b9",
                  "b38695ad77ef4d31b11192f8d80d9a8d",
                  "37504a549ca94c2fbcff1cc7ebfd89e2",
                  "6ac66961851f424f87aa7992a5cea5ca",
                  "5310815a01e14e95bfedf1b655fdef03",
                  "3e33684992de4c85a09d565eca3c0591",
                  "1edd47e8e8424d728f648f9c679f1fae",
                  "e12b65ecd73848db87c5ee7eb3f439e5",
                  "WZWxsKIlLOuwUxyn43usGMl2mBFJuczV",
                  "j2S1P01uImUQum2LFGuO9z2Jin0iqak7",
                  "f5e0a094f420d987ae37ef31813f3e46",
                  "IOGl4gRimt6h9gpPCfABcMjfPNKPzQer",
                  "m2ff39ba49a5498b8c7093c677016b87",
                  "2e57292fec6b4c7e9f9d0ccf49358a74",
                  "b9bdf962b01f4d39a524da440c3a9a24",
                  "3241a555f3bb49e0abebce79e2d9c683",
                  "c67b808be97b4ed7b1de747a7597c6ae",
                  "131457365d7a4b868263b1408386a4e9",
                  "73cb362d47024acebac4a5d7811f16e8",
                  "8a9ba4f6a62142e79e31d95d0b320df5",
                  "98a16c977805f1614cc9017fc0ca027c",
                  "e4eb2861e24ff944d3aa0e16bcb91122",
                  "drLb",
                  "drMonitoring",
                  "slowpitchstats",
                  "T38IByPBQUvbLHxrI1x9kIuY3BTTQSIb",
                  "95204aa36c9e464d95a9f94166ce1df7",
                  "GrEaNYFccnbzjiaNdGjyG627SiWCmv3g",
                  "LFiVpk5qjj570GwT6w8eSaVek9dcyUyo",
                  "dd05220dbc214907a081a449982f3d26",
                  "393169b895e84e13ba6389c0e412d193",
                  "jPvJi1XNitsGyJ8AFDNAizCAdVLKXm2y",
                  "6d9cc52eadd14cd7847b588468863592",
                  "5825c528f47a4f45881a6753c57b3a7f",
                  "11aa0d2e8f55487e99e67a15a9ff6168",
                  "989529bd2f0e4238a3012263d3d48241",
                  "6809b4l0G127438bb773d2d6ec18c394",
                  "4b9a7d96ccad47e0846628ac504b1e1b",
                  "74ba26c4a9d049be86c7cdb092417d97",
                  "fa1eaa5b2242410c82ff92323fcf6d47",
                  "a5a154df5b7840588172fc85ebe71e87",
                  "17d0e59684b34c3aab2861d0248cc25b",
                  "0c546c8ae3874452a66e37d505bec29a",
                  "01815239b9bb48869dea0f48b08ad5b7",
                  "cfb3cb708ce14e069555f231933454b6",
                  "83768800514044c883c1761ae50bffb4",
                  "61972e2ace5b43caad61136ee9ad9254",
                  "dbb3a637c32a4af1ad2410f8d32a7c84",
                  "01186811f3224264b1e564fcf5b7fdb9",
                  "e375ca2119cf4c14aa18ac3722dd07fb",
                  "ec48db0385914ebe9200d9547cb27c5f",
                  "21ea08fb07aa419aba9c4b4f077562d1",
                  "14e24fa4909743038e494db6b4b85697",
                  "65168b875d2b4a2da0321d75834f2620",
                  "8ba21719b32a41bb85a83f70ee999ec4",
                  "bf3c4e727412474c9d105c8d5b6f61ad",
                  "fee22d69e94a472192b30c23b3ac6ac7",
                  "4d0164638250450499a5483fc886f476",
                  "d87c355242804c4db2b474b070c100b7",
                  "47c970d8fa144db28a4908766d3e552b",
                  "75c5079cc5c34a4daca144acb33f191f",
                  "405ccf3d4bc541b6bf95b9ac8f732db7",
                  "11b3ec91ec684ad5b2c2bbcf0e117028",
                  "d0f92bb7bc42475994985532676e4d29",
                  "2b07a6cc14ba46b0ae52bafef48b7272",
                  "875fa335caaa46089d1e27455ba6b46a",
                  "e14e408740894337b29667ff124c3747",
                  "bd4ba131e94a49c48fc4621e4e208391",
                  "77c8cb21f0ee4d1e917e976d40a0192c",
                  "5d6509415b35421eb4c592f7f97fd5f2",
                  "b838ddb2e2814523a79accc70ae46417",
                  "b646a118ccf140508b0253c9a44d3e12",
                  "f9a80526573b495fb75b518b2b89354e",
                  "6d240ae497f14063be4c690890a60f86",
                  "31d1063fb493428794cc6b9a24f0af82",
                  "5c8c0596d0204a48bcf982e75f7b0057",
                  "badf3f7d1a924ef5b32c732a0dc85b66",
                  "7c43df67376442a69005f5cae5c3b25b",
                  "9d7500dc9bdc4b6381e66015387823eb",
                  "2159d7e4c5c047e6bd3745c85e403756",
                  "0ab3d1d0b1dd46e4839966bcd1b415c0",
                  "02561c33bd18412a9502326922b83a02",
                  "2815b31e5dd54c0aabcb32bf84a79bd9",
                  "25d0b5c0ecda494faa55f76384567c75",
                  "e75e39d4e89042c094d4c1b1c6a5d86e",
                  "7c73cd5e8e8f45689235f51f70732f8e",
                  "9130902f881a44aeacc8f319419cc929",
                  "10a0d29e20a14fbb87749cc73f8efff3",
                  "00dddd556c33472ab7afb4ebc7843282",
                  "0d5bf93475ea4372a96ef75938239fa2",
                  "2011706e978d4653b536ea3ea85b3005",
                  "36025fe36a014fc8a8c2ba4b585ab58c",
                  "4011d0dbbd4742f0a31fc3dbcf0c4299",
                  "592b25979f1d4ba3bdef695a144d64c0",
                  "9e1d95dec9d543f7a1a28345c64a2b73",
                  "c337ae62486445f58609a83cf0446851",
                  "fe7384de29d0498d99fc169315ee63c9",
                  "434920cfddec4c318beccf809d919a94",
                  "4009d041afec4bbda55cfcb32eddf94d",
                  "09fc9b3ad0c6494294ee7e6adabdcaa9",
                  "dcc4505ad4644b428264f44922b12ee5",
                  "fec7126def664064840f03dfd693b524",
                  "47ec2875c3e74c8e965b918a0dd0b37f",
                  "0cf750d174b4421c948323ff0f150eb2",
                  "82b2bcac1a5e429bbc14b12f558ef1d2",
                  "52020246f6e94edb861d4b7c86cf1659",
                  "f2c6fcc010824c05989a44e69e588742",
                  "bf2136f4b1234b48bd94ddf1f97d4e67",
                  "36b3419fa81d434ebfddbe1415356e0b",
                  "c65d281d6d3941e49982bd634fbbec25",
                  "6fe5bb8863c24a3fb4a1515c26153da0",
                  "270a9538f6f44736bb8834f8f14d61a6",
                  "03a5370a46014fe0a4da4241682e6079",
                  "968adfad396c41b1b8c2ed54dd2ee471",
                  "7dd17e4290984c9fb39d421a565b7abb",
                  "bbddf0b2ae65413d91fa2ec54c352e51",
                  "47618a302887457783034cddee3cac73",
                  "ef029932ce20412a9e4dac1ea7fe83b3",
                  "46c4a16e6b3748f58f918cd7e20c06f1",
                  "a9a505bb3b6c4648b071f9e774d4e3f7",
                  "996d2558219840f3869d0feee75a4ba4",
                  "13626bbd97224522a159545a50c28383",
                  "de6c4779b8584f9fb1a1b880da974fc6",
                  "6163570332e746479d2052a10f1f4315",
                  "6b43a7c9ff634eef9d0a1d430b994609",
                  "0c6cb9bf180043458fbcd9a74f4ee5a3",
                  "b679d652d6704c9e8c5a812157552329",
                  "83fb8058737345aba941639128699cd7",
                  "5b026578210849e0a3435a95b95d0ea2",
                  "19e3ed05bf584df69be668709fafa954",
                  "360897d6b74b4d7a8f80bdff388e0ca1",
                  "3ce90c17b5e64559b9f198efb5418913",
                  "d487033298da4c4e8532f8da8d4bc2e4",
                  "49ea6136b8b94019897647eb6cb40b6d",
                  "289d7fecc9814fd7953223d7ef4c0350",
                  "de1c2c1beb49463b9cc01c8785d06051",
                  "a26cf34353044b78aa9e20a3efcf0abb",
                  "5ba8c5935f29425789687688a0bd778b",
                  "39af461e1a9249d0af8896fa8443979c",
                  "1d18eaea1bdd496d9d78589359a72bd5",
                  "30d9063c1cc641d88ea46b6058ebc38f",
                  "29698303f906482a906dca00f94f8d01",
                  "91017dfa6e484fa3b8da08db8a553905",
                  "e0a7add820724303872d7f6ccf24392a",
                  "aa631b2b61f44f9c8a2f50fa909007e7",
                  "e85ef23487124be5a3844dff4e15d318",
                  "5fd2a624e71746c981f58d7ac79e9fc4",
                  "6345e570f5d04a80a26e0916a654c974",
                  "839ceead92404cbdb4419ac6ef7f6d05",
                  "d8d5550c60f44055830fdd5c5a3d05bc",
                  "4e2672ea3d2d4d69b8dda44a00806e34",
                  "3ff138ba511b4ea19e03825a8565599f",
                  "183f5c47c9784caea04bb4bcfd160806",
                  "Mf9WXzGfr2B8UgF63ucNGLpmCNmuHJGe",
                  "84LfuDZFMzh4OkqAEqf9FwzzAm9a5m7z",
                  "4GEFGGGU8KltQGPpqClVXLusU7I9xDvw",
                  "3YGONLdp1Ze88sLyBDbPFN8DUR5oQI4p",
                  "EwUZtJiOJIlnkLq2k46V5txKR3bjJWq8",
                  "lv1kDTOXvnNQvuFpkM5Af1NIFtK9TOAD",
                  "mw8GrV3n5RjkoBCyYXmuApRf9bs5Y8Id",
                  "BIPVgoickzA3F3f6vDolpNdyyVIJqNu9",
                  "b97fd7152d804d429d706e1b8f82cb2a",
                  "27fb8aa9e9e94f4da269144fc92dbac7",
                  "9485fa7b159e42edb08a83bde0d83dia",
                  "x4Uo2cwIaUr1GSVHEPY82EQ15MWOuHUa",
                  "HBAgVRFqtU232A82hGGINxxXHDbHFi5q",
                  "Gr7UzxdwWXOTHbyPD2DGsFTMV7cAGt0f",
                  "ffde04838d9e4778a9295ba5f825fd84",
                  "29f2aa5dfbe21265da9df360e9c40f34",
                  "192a09e3f41571b5421dec528c76c846",
                  "21f64753cf014b9783a73e9645ee640d",
                  "817f2a161e624076b35219965b88a25d",
                  "7c80329a76e14e6e8fe252d5d67562de",
                  "f5a8d5cdf1a84a548ca7b3dd87d3f097",
                  "7eb58ac6d2b0437294159cce8d968995",
                  "c5017f3034ff48ce8bac77defcc27fff",
                  "e4e5b7be6f0343b4aa7530c104329b42",
                  "2ed1ec032d0a43c6b694d90166597ca2",
                  "1b3476bae4e94fa08f156ea59fdf51fe",
                  "99e21358c19c4ced9d1932a29f0623f1",
                  "5538a2fed2f94d038ec48cc41beb6a38",
                  "1fb4b501e1504cb49befc0adc661747d",
                  "8e3fd8a6b52e48a38170c9be9b29ffe1",
                  "OfEXe4Rr9ON0F0buy7GfwlMJTQztRCUk",
                  "P6CpVQdHrJD4AixO6zRZO1sd1aD0WmOi",
                  "O2k6McH9iN7UGAJoVWUDzFU5AKgkhNkK",
                  "deb09d9fce9b4cf2a1b6e0570227a6e5",
                  "74d07d5ecbd0466cb3e6016ce91aa466",
                  "5af30905f7874fb0962f153ec990e9f5",
                  "LjJiINSM8m6aLAZ5GzOXvABPiAgCaRmY",
                  "4af9b12fbb284f069a1887d67cda5a01",
                  "0fffa5a070a3409c9fec8211f35ca945",
                  "5f5105c7a96d40c3b02de118d7aea4e5",
                  "5954b627ade9405c9955687939ffab6a",
                  "5de150dc29228095f9811cdf15ea5938",
                  "b0dc30922cd14014857de1fc83208529",
                  "ea243ea946744e9d9cc7290a9dabf438",
                  "02fa6c6228f9df9bf445d28216705a97",
                  "77d378c27c11402285201cdf2dc0bccc",
                  "780e6221a2ee627b0ae1cffcdf31f9aa",
                  "36tnbk7frf5suyj5gby3j6yb",
                  "SNvVwAFtjoq0UOuAJ3Rj7lZl4BPjoENy",
                  "66759a8a36a3463c8523b31ecc5b65ef",
                  "5a7b5d42d95d418b9cf7f7410f7972f7",
                  "8ac42ccff20845f2be98ea157a5477ca",
                  "ffdd879d12a34305bb4d0dd5ac1dffaa",
                  "ef5462596d6b41b9be9d8c724e1906a3",
                  "f5a213b29d334070b40bd3e1f6fb6b6c",
                  "3c9b552c6fc64cfda6bccb86efb4c297",
                  "4210306424e546b78990dd9ea42bb5a9",
                  "W8p50dcae1884cd9a945472ad60b9afe",
                  "398fd4cd5b484aa1a47a10dee2a8fca3",
                  "84fc57c62fbd4dff8b8f29ec6c896dd3",
                  "SKqtQ0XopVO70r4k0okPGHDmAZxOACSR",
                  "eAmN9NUzzDdvAD1Xwvtf3L8UVq6MTycC",
                  "AhGyi9pPBPmRsA14rCGcvTlHT9cVDECe",
                  "4e1d0267e2b8406ebee074ef7b81867d",
                  "b0b53721112a43238a21907e6ddfbfa5",
                  "c37f4c6cf2d6416fbde31c5197a6747a",
                  "9a7b3aa0dd924a5bb5d0d6ee382cb0f1",
                  "b691279436264b0aa1c60b51c536383b",
                  "ca16fb2bc8b8467aa35a15f885565915",
                  "c1c7ce2f588248cbb35cc47e7749e024",
                  "40943e90d623415391d1677e91c10e4d",
                  "5ef7f2e4ea66403685823e72dcb2f50b",
                  "3931467461dc4c22b03bd23545a8b9e9",
                  "d4f5388ea0b040baaaeeeaf31a39bbfc",
                  "2d6c9790b3c74fa8b5bd40be56c944a0",
                  "ef251a886f594732a5ebde1cbb63318d",
                  "7bb58f576e1a4f0d9b0b05345e4fc00b",
                  "32ad5ead59b048b2a4784a748571aa7e",
                  "0e3080b2c3b745c2a4c25009fd3470af",
                  "2a2c8fb134624033b0e2b0295046296e",
                  "bcd1f840d68e4f86b49524ed7312b454",
                  "c9035ba3f06a41eea2015c17d7bb4c91",
                  "1ea8a8c2acac4307bb5a9a6950906516",
                  "4e3614e0fc8b4d75a074d0a12e0a863b",
                  "8370f74a7b6441aa8b34b4a8770b8753",
                  "b78be955d5b54f6198e6d61e7f8112c9",
                  "b662deb3a4024e90b94f491689d15eca",
                  "360b4801a0eb4321aa3d187855026cbe",
                  "a7e2af2a8976518a2e9d50abb0879417",
                  "R27RpTAwWXl9CEj0oam3ABhm6KfNXhAY",
                  "ffff826ce66ee941c47ae664eb1ea75e",
                  "fPFPi36zIGKmIX33D6FujlGTSuZeHUEb",
                  "e8801e97251c4f6298b1a3e8282ae169",
                  "e3e03a04bd704fc783f93410e41005fc",
                  "2d022a0bc7a14e788f74df5fb6c38e12",
                  "451402db08cd4b90ad538fca563359ac",
                  "b88f4c94a4774dcea2e9ab54fa595ce9",
                  "3e3411ccd49648e1a568521612eaf73c"
                ]
              }
            },
            "serviceIds": {
              "type": "array",
              "title": "Service IDs",
              "items": {
                "type": "string",
                "title": "Service ID",
                "enum": [
                  "CFSRFNotificationPush",
                  "absorb-sso",
                  "addresses",
                  "admin",
                  "admin-jobs",
                  "admin-products",
                  "api-directory-service",
                  "api-key-service",
                  "aqueduct",
                  "arctic-pricing-processor-web",
                  "arctic-usage-web",
                  "audit-service",
                  "bvseo-proxy",
                  "catalog-pdm-shopper",
                  "compliance-affirm",
                  "device-information",
                  "devprod",
                  "digital-rights-service",
                  "dispatch-metrics-service",
                  "display-management",
                  "fmis",
                  "forge-settings-service",
                  "fps",
                  "integration-provisioning",
                  "managed-inventory",
                  "merchandising-offer",
                  "merchandising-shopper",
                  "metered",
                  "mosaic",
                  "msuni",
                  "notification",
                  "oauth20",
                  "om",
                  "orca-admin",
                  "pricing-shopper",
                  "reporting-auth",
                  "riskified",
                  "shopatron-inv-orca",
                  "shopper-api-reporting",
                  "shoppers",
                  "ssr-ms-shipment-storage",
                  "ssr-user-management",
                  "swagger",
                  "testService",
                  "trace",
                  "v1",
                  "v1ods",
                  "watch-service"
                ]
              }
            },
            "clusters": {
              "type": "array",
              "title": "Clusters",
              "items": {
                "title": "Cluter",
                "type": "string"
              }
            },
            "documentTypes": {
              "type": "array",
              "title": "Document Types",
              "items": {
                "type": "string",
                "title": "Document Type"
              }
            },
            "properties": {
              "type": "object",
              "properties": {
                "count": {
                  "type": "string"
                },
                "interval": {
                  "type": "string"
                },
                "siteId": {
                  "type": "string"
                },
                "responseSource": {
                  "type": "string"
                },
                "responseStatus": {
                  "type": "string"
                }
              }
            }
          }
        },
        "CreateWatchDefinition": {
          "$ref": "#"
        }
      }
    }
  },
  'v1-electrol-availability': {
    "links": {
      "up": {
        "rel": "up",
        "href": "http://localhost:8082/watch-definitions.drive?offset=0&max=10",
        "title": "Back to list"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:8082/watch-definitions/v1-electrol-availability",
        "title": "Delete",
        "method": "DELETE"
      },
      "edit": {
        "rel": "edit",
        "href": "http://localhost:8082/watch-definitions.drive",
        "title": "Save",
        "method": "PUT",
        "type": "application/json",
        "$ref": "#/definitions/CreateWatchDefinition"
      },
      "self": {
        "rel": "self",
        "href": "http://localhost:8082/watch-definitions/v1-electrol-availability"
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
    "schema": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "WatchDefinition",
      "description": "An explanation about the purpose of this instance.",
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "path": {
          "type": "string",
          "title": "Path",
          "readOnly": true
        },
        "description": {
          "type": "string",
          "title": "Description"
        },
        "active": {
          "type": "boolean",
          "title": "Active"
        },
        "trigger": {
          "title": "Trigger",
          "type": "string"
        },
        "policyDefinition": {
          "title": "Policy Definition Type",
          "oneOf": [
            {
              "title": "Average Response Time Spike",
              "type": "object",
              "name": "AverageResponseTimeSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "AverageResponseTimeSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_avg_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "avg_response_time_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Decrease Traffic Spike",
              "type": "object",
              "name": "DecreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "DecreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Flatline",
              "type": "object",
              "name": "FlatlinePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "FlatlinePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "predefinedMatchingPattern": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "flatline"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Error Spike",
              "type": "object",
              "name": "IncreaseErrorSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseErrorSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "eventsCountThreshold": {
                      "type": "string"
                    },
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "errorCountThreshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "SERVER_ERROR_RESPONSE",
                        "ERROR_RESPONSE",
                        "CLIENT_ERROR_RESPONSE"
                      ]
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "date_range_terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "error_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Traffic Spike",
              "type": "object",
              "name": "IncreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Service Availability",
              "type": "object",
              "name": "ServiceAvailabilityPolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "ServiceAvailabilityPolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "NON_5XX_RESPONSE",
                        "OK_RESPONSE",
                        "ONLY_200_RESPONSE"
                      ]
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "service_availability"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Slow Average Response Time",
              "type": "object",
              "name": "SlowAverageResponseTimePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "SlowAverageResponseTimePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string",
                      "default": 100
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "metrics_avg"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "slow_avg_response_time"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            }
          ]
        }
      },
      "required": [
        "name",
        "path",
        "active",
        "trigger",
        "policyDefinition"
      ],
      "definitions": {
        "alertDefinitions": {
          "type": "object",
          "title": "Alert Definition",
          "properties": {
            "alertType": {
              "title": "Alert Type",
              "oneOf": [
                {
                  "title": "EMAIL",
                  "type": "object",
                  "name": "EMAIL",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "EMAIL"
                      ]
                    },
                    "subject": {
                      "type": "string"
                    },
                    "from": {
                      "type": "string"
                    },
                    "to": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type",
                    "subject",
                    "to"
                  ]
                },
                {
                  "title": "CONSOLE_TEXT",
                  "type": "object",
                  "name": "CONSOLE_TEXT",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "CONSOLE_TEXT"
                      ]
                    }
                  },
                  "required": [
                    "type"
                  ]
                },
                {
                  "title": "SLACK",
                  "type": "object",
                  "name": "SLACK",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "SLACK"
                      ]
                    },
                    "webhook": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "channel": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type"
                  ]
                }
              ]
            },
            "firingPolicy": {
              "type": "string",
              "title": "Firing Policy",
              "enum": [
                "CONTINUOUS",
                "ONCE_WITH_FOLLOW_UP"
              ]
            }
          }
        },
        "queryType_SEARCH_WITH_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH_WITH_COUNT"
        },
        "queryType_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "COUNT"
        },
        "queryType_SEARCH": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH"
        },
        "queryDefinition": {
          "title": "Query Definition Details",
          "properties": {
            "timeInterval": {
              "type": "object",
              "title": "Time Interval",
              "properties": {
                "from": {
                  "type": "string",
                  "title": "From"
                },
                "to": {
                  "type": "string",
                  "title": "To"
                }
              },
              "required": [
                "from",
                "to"
              ]
            },
            "apiKeys": {
              "type": "array",
              "title": "Api Keys",
              "items": {
                "type": "string",
                "title": "Api Key",
                "enum": [
                  "a52e39b2e85f44518c9557bef07cefb7",
                  "c379d9cfb0dd490a8399734afa7e28c4",
                  "63ef06b39d47413989f52fbd5be19761",
                  "3daaa577d3084251b2f22bb5bcfb092c",
                  "ce5679c23cd648e19896ce11c9183acf",
                  "71c9782424b64dbbb2e3b1b5ed7b9357",
                  "bd8bba27f49a45f69296a8f57715887a",
                  "722aacea2683463e965c0992d0a1fed6",
                  "d503c0c1e0774c33b6906f5379a114ab",
                  "a59de855c96448acb6f303edc6e26fe7",
                  "f621bcb5b7d44c238631e5e2cea96ac6",
                  "09a8a9e5c81b48f69fd43c0c3defddb0",
                  "d9b0f8ea7f7a4622999c8e1c15933a1e",
                  "dec38ad6b095403e8a1535585b2e9078",
                  "29f94443bbe74b49a9c67fa7a27fac84",
                  "7508fdb7357a4420b1d09271fe682905",
                  "bc81f22c34e84caa96e1d42e8c6df284",
                  "785336eafbea4c1d9c8c47f8cc07bf20",
                  "4a0d6a3658874b6c84e24424f73d5b34",
                  "c9933ce47b76448eaa8dd834a6edb588",
                  "d71730a87ca84a59a2ce94b9bbcc066f",
                  "1e4533bef3f74093b9ddcf727c32ecbd",
                  "6fc4f795c08846368f2ebcf942c38257",
                  "2584ca43d8c34818b409d70813725d06",
                  "75cd2758726d471abb499ba4a83cd43d",
                  "ffe9924c2c0a42fc97ffd80e85d37bc2",
                  "9791ea76c17a41b7b19e0c5de66cd595",
                  "aa51af2df7c3427faf9d8590fe464bc2",
                  "909009c5214249d18054565e6c57886f",
                  "c3609dd96eac4376b20890494e882a38",
                  "d7366e9c1f7a4c3f97cbc340c757d55b",
                  "42e71d5576964354b51688a983caa52c",
                  "1ac2152179c3469e8c9bd1b9b62de1f6",
                  "2f0c928b61654c36ade08c8c23bed62b",
                  "639e54158b254306ae68867995b70ee9",
                  "f5fbf33974794e859696defe6fc9818a",
                  "dfee9ead4fc245d59f7968c87e40709c",
                  "2d58cd1208f34a7886f8ab0760055ab3",
                  "45e8b0e39aba4eebb15ddf134e9b0bd9",
                  "0971189a1331474abbb8633f2c11bba1",
                  "b400399bbf444710af162ee1668aa47d",
                  "37429d6b9e304fafa37c64358921f565",
                  "26ceda9f2a694254979100a8455f0e73",
                  "2aa724b75a684e6c98bdfe9b00d94a08",
                  "ed7401c749404258a4c264f6b0f1786b",
                  "eff377216fae4ac0bbf41864d115cb22",
                  "014d336197b94414910b7317b5d019d1",
                  "0f61671976abf7f85d1c98b207830f6b",
                  "2c84e84bb902457aad6cb73206db923f",
                  "3563c230c22945f1826644bdb9534d95",
                  "fbe2a04cb5144f4cb8ec2a13f326398c",
                  "66a15471554f4326bbe5c2eb73c49ee3",
                  "JJ9QFssRnxzms2GPPRCBnMDXHjKQNAMW",
                  "58b6ec9ece784e88a575663cbb69074a",
                  "fa40c38d914340fb89f0c63027833a9d",
                  "3e99952c2cc7f1f566126deaff432996",
                  "uFBV0VlouC8OfU38v0l6lG0oVQ0kDqvr",
                  "d4cd446bb89a43c28a15d8909ad58f3b",
                  "1125ee6b84fc4dce83b890763fd567c3",
                  "529ec2c526214e388f13bd7347342483",
                  "604df5ac990fbc67dab8fc098af271e6",
                  "8430105cfa7149bf9273e8046b9751e0",
                  "f84c1db8380944308a93e085b5b1af86",
                  "6c228c145bc04142b13dd7b2c429d62b",
                  "3eb1d5c4b4df444a81e41afaf7053cd1",
                  "60bd7f41a86549698ec9d36b1243a3b5",
                  "65c9d01e68d945d9a3629c6a67a96127",
                  "634720b45ec046a1a193810f87755674",
                  "e71db157a8724cafabd2c579602b10d6",
                  "fe43a8180b58471084a27afc8b781b67",
                  "2f75c16649c04335b666ace790f3631e",
                  "13b9e5d0b4d342dd9ed599d196dcb5ad",
                  "a393b43b8a4047018db5ddd28bea8bbb",
                  "183e4c1b72294c60ac2fcc5de3bc2bfd",
                  "b46b718c759a412aa7ab20c1626062d3",
                  "f06ec13a06cb4faba310c583fa4419ba",
                  "17b573bf92c64b4dad88d1d6d5a3eeef",
                  "83e130a304f2489385b6d267105ee40b",
                  "0fb1db8761ac4a85b4eac8ec49a16867",
                  "6801c617d31745499828eed4c696f4bc",
                  "AjYFBMpbQdCoAFomuHhhFNNjvP5LHCfo",
                  "3bf2a0a885f94f279b9d86568182d75d",
                  "3db6d8afe2d24a78a2e7b976457a40f5",
                  "c2a8ae12b885451b90b86beee0c6e374",
                  "235104cf93754fa0b4b4c7983693842f",
                  "4c4d6d5691fd4e7db73b20b6edd27fe2",
                  "3c93dabcea2147c48f142e1fad482c36",
                  "b3f9b26bdd8f60ef0e2c2c0be0b74260",
                  "GvHfSjHAScUuTAasglA81CmfCEtciNmt",
                  "9692a066e340d51cb0b19f27ea06b364",
                  "e66654556ca510d3487c647399a2caf2",
                  "8ee5d5e1e43b4a92835709f4c4a973c9",
                  "689175898efa478d96d0dfda038e4dad",
                  "3fbe6187e6904dae93606048e2ff003a",
                  "f046805b8ac1461ca76dcf2e3d3f4040",
                  "96562a9d820d441cbc480c7a3758df7b",
                  "6392fc87a33447529e12a454da6c339b",
                  "6fa08f482b4c473880aa0215b3c5de39",
                  "V2ztxK2rFe86jD7zYkRhDSAdrOrcY5qo",
                  "9b67e2693d374162be5e2b1b0c66f036",
                  "0973656604e444bcba03231584b74870",
                  "5c31057bc55c4963837049a6d384b567",
                  "d11ae88278b74a6c931176ca4b7b164f",
                  "b4357251c0574a5e98661bbd06c2ca11",
                  "97f3c5a6f2d945528977e86535b927dd",
                  "HipATLcFtfhaa4NGPzk1dcPsIweaGmLh",
                  "3cf82ad2309640b48d43953c661fca7f",
                  "1a79efcfbfb34ff2b704e4dcde4e8fe9",
                  "2db786407faf4d2fa01bbd07f9a93e79",
                  "2918d633d2fe458f89fff1c241b96e9a",
                  "x7vQOMYuj1sZ6zeTNFeqL83qadqFT0Zm",
                  "480dd90425224c2f8cc9a77a402df105",
                  "c3526ba3fa99454896e0e6a9f4c3c4cc",
                  "8b96563e98c2433585767cb2fe1bee21",
                  "6d0b3139a676431992558dda67b6ba65",
                  "OMA5xOj8iBFRAcHJRmJeenKm4lr8UYTT",
                  "c6YGngARruDia5MOwAKgaMxyQdGnJ60H",
                  "fV8NesDn4r3e02A3XeAAhcGGqEb72W90",
                  "fe69ca7dfd6149ec9a47b3dd521e7644",
                  "fb7295e9e6f1427ebe937023e9114228",
                  "7a809a5636e84d1bac1d6f644ce8b56a",
                  "a692b345717e4adb85879bcee227bca9",
                  "fe1a806e420a45179b88e3689ca63446",
                  "e476082cf7af49b1b817e34c91d3486e",
                  "4eeb5d540ff54cf6b077ec469f2dd806",
                  "f4fc174d4733428e86fc38fc7f7bb748",
                  "e0c1977f09a14a7f8ffc35249e740bd3",
                  "003d23de388a443a813d8c2aeee76418",
                  "a90f1203bd8b4f16bd942870c6e14fbd",
                  "6eabe1249ed14043ac393cb5248f4fb6",
                  "819a5f22f3964bbc99931139ee2eb538",
                  "864d71cdaffb4e03a43a535c23d3292a",
                  "18ba5cb2b70d4093a20a362078f0958c",
                  "UnZqOVp4laTfF1l71GqnzXR5e34MUG3M",
                  "2c8792edf77a4bfa86f442bbf79da4e0",
                  "d79960cf15db4422a34d52785e088262",
                  "0e393a6f3c9c4e08aab38db741953af0",
                  "cede30a1de9c44f6b9183ff9be9ae309",
                  "e1a0f189b4f44b998fc8e47d515ab418",
                  "2b0d95e5167742bfaa87b50141d327b9",
                  "b38695ad77ef4d31b11192f8d80d9a8d",
                  "37504a549ca94c2fbcff1cc7ebfd89e2",
                  "6ac66961851f424f87aa7992a5cea5ca",
                  "5310815a01e14e95bfedf1b655fdef03",
                  "3e33684992de4c85a09d565eca3c0591",
                  "1edd47e8e8424d728f648f9c679f1fae",
                  "e12b65ecd73848db87c5ee7eb3f439e5",
                  "WZWxsKIlLOuwUxyn43usGMl2mBFJuczV",
                  "j2S1P01uImUQum2LFGuO9z2Jin0iqak7",
                  "f5e0a094f420d987ae37ef31813f3e46",
                  "IOGl4gRimt6h9gpPCfABcMjfPNKPzQer",
                  "m2ff39ba49a5498b8c7093c677016b87",
                  "2e57292fec6b4c7e9f9d0ccf49358a74",
                  "b9bdf962b01f4d39a524da440c3a9a24",
                  "3241a555f3bb49e0abebce79e2d9c683",
                  "c67b808be97b4ed7b1de747a7597c6ae",
                  "131457365d7a4b868263b1408386a4e9",
                  "73cb362d47024acebac4a5d7811f16e8",
                  "8a9ba4f6a62142e79e31d95d0b320df5",
                  "98a16c977805f1614cc9017fc0ca027c",
                  "e4eb2861e24ff944d3aa0e16bcb91122",
                  "drLb",
                  "drMonitoring",
                  "slowpitchstats",
                  "T38IByPBQUvbLHxrI1x9kIuY3BTTQSIb",
                  "95204aa36c9e464d95a9f94166ce1df7",
                  "GrEaNYFccnbzjiaNdGjyG627SiWCmv3g",
                  "LFiVpk5qjj570GwT6w8eSaVek9dcyUyo",
                  "dd05220dbc214907a081a449982f3d26",
                  "393169b895e84e13ba6389c0e412d193",
                  "jPvJi1XNitsGyJ8AFDNAizCAdVLKXm2y",
                  "6d9cc52eadd14cd7847b588468863592",
                  "5825c528f47a4f45881a6753c57b3a7f",
                  "11aa0d2e8f55487e99e67a15a9ff6168",
                  "989529bd2f0e4238a3012263d3d48241",
                  "6809b4l0G127438bb773d2d6ec18c394",
                  "4b9a7d96ccad47e0846628ac504b1e1b",
                  "74ba26c4a9d049be86c7cdb092417d97",
                  "fa1eaa5b2242410c82ff92323fcf6d47",
                  "a5a154df5b7840588172fc85ebe71e87",
                  "17d0e59684b34c3aab2861d0248cc25b",
                  "0c546c8ae3874452a66e37d505bec29a",
                  "01815239b9bb48869dea0f48b08ad5b7",
                  "cfb3cb708ce14e069555f231933454b6",
                  "83768800514044c883c1761ae50bffb4",
                  "61972e2ace5b43caad61136ee9ad9254",
                  "dbb3a637c32a4af1ad2410f8d32a7c84",
                  "01186811f3224264b1e564fcf5b7fdb9",
                  "e375ca2119cf4c14aa18ac3722dd07fb",
                  "ec48db0385914ebe9200d9547cb27c5f",
                  "21ea08fb07aa419aba9c4b4f077562d1",
                  "14e24fa4909743038e494db6b4b85697",
                  "65168b875d2b4a2da0321d75834f2620",
                  "8ba21719b32a41bb85a83f70ee999ec4",
                  "bf3c4e727412474c9d105c8d5b6f61ad",
                  "fee22d69e94a472192b30c23b3ac6ac7",
                  "4d0164638250450499a5483fc886f476",
                  "d87c355242804c4db2b474b070c100b7",
                  "47c970d8fa144db28a4908766d3e552b",
                  "75c5079cc5c34a4daca144acb33f191f",
                  "405ccf3d4bc541b6bf95b9ac8f732db7",
                  "11b3ec91ec684ad5b2c2bbcf0e117028",
                  "d0f92bb7bc42475994985532676e4d29",
                  "2b07a6cc14ba46b0ae52bafef48b7272",
                  "875fa335caaa46089d1e27455ba6b46a",
                  "e14e408740894337b29667ff124c3747",
                  "bd4ba131e94a49c48fc4621e4e208391",
                  "77c8cb21f0ee4d1e917e976d40a0192c",
                  "5d6509415b35421eb4c592f7f97fd5f2",
                  "b838ddb2e2814523a79accc70ae46417",
                  "b646a118ccf140508b0253c9a44d3e12",
                  "f9a80526573b495fb75b518b2b89354e",
                  "6d240ae497f14063be4c690890a60f86",
                  "31d1063fb493428794cc6b9a24f0af82",
                  "5c8c0596d0204a48bcf982e75f7b0057",
                  "badf3f7d1a924ef5b32c732a0dc85b66",
                  "7c43df67376442a69005f5cae5c3b25b",
                  "9d7500dc9bdc4b6381e66015387823eb",
                  "2159d7e4c5c047e6bd3745c85e403756",
                  "0ab3d1d0b1dd46e4839966bcd1b415c0",
                  "02561c33bd18412a9502326922b83a02",
                  "2815b31e5dd54c0aabcb32bf84a79bd9",
                  "25d0b5c0ecda494faa55f76384567c75",
                  "e75e39d4e89042c094d4c1b1c6a5d86e",
                  "7c73cd5e8e8f45689235f51f70732f8e",
                  "9130902f881a44aeacc8f319419cc929",
                  "10a0d29e20a14fbb87749cc73f8efff3",
                  "00dddd556c33472ab7afb4ebc7843282",
                  "0d5bf93475ea4372a96ef75938239fa2",
                  "2011706e978d4653b536ea3ea85b3005",
                  "36025fe36a014fc8a8c2ba4b585ab58c",
                  "4011d0dbbd4742f0a31fc3dbcf0c4299",
                  "592b25979f1d4ba3bdef695a144d64c0",
                  "9e1d95dec9d543f7a1a28345c64a2b73",
                  "c337ae62486445f58609a83cf0446851",
                  "fe7384de29d0498d99fc169315ee63c9",
                  "434920cfddec4c318beccf809d919a94",
                  "4009d041afec4bbda55cfcb32eddf94d",
                  "09fc9b3ad0c6494294ee7e6adabdcaa9",
                  "dcc4505ad4644b428264f44922b12ee5",
                  "fec7126def664064840f03dfd693b524",
                  "47ec2875c3e74c8e965b918a0dd0b37f",
                  "0cf750d174b4421c948323ff0f150eb2",
                  "82b2bcac1a5e429bbc14b12f558ef1d2",
                  "52020246f6e94edb861d4b7c86cf1659",
                  "f2c6fcc010824c05989a44e69e588742",
                  "bf2136f4b1234b48bd94ddf1f97d4e67",
                  "36b3419fa81d434ebfddbe1415356e0b",
                  "c65d281d6d3941e49982bd634fbbec25",
                  "6fe5bb8863c24a3fb4a1515c26153da0",
                  "270a9538f6f44736bb8834f8f14d61a6",
                  "03a5370a46014fe0a4da4241682e6079",
                  "968adfad396c41b1b8c2ed54dd2ee471",
                  "7dd17e4290984c9fb39d421a565b7abb",
                  "bbddf0b2ae65413d91fa2ec54c352e51",
                  "47618a302887457783034cddee3cac73",
                  "ef029932ce20412a9e4dac1ea7fe83b3",
                  "46c4a16e6b3748f58f918cd7e20c06f1",
                  "a9a505bb3b6c4648b071f9e774d4e3f7",
                  "996d2558219840f3869d0feee75a4ba4",
                  "13626bbd97224522a159545a50c28383",
                  "de6c4779b8584f9fb1a1b880da974fc6",
                  "6163570332e746479d2052a10f1f4315",
                  "6b43a7c9ff634eef9d0a1d430b994609",
                  "0c6cb9bf180043458fbcd9a74f4ee5a3",
                  "b679d652d6704c9e8c5a812157552329",
                  "83fb8058737345aba941639128699cd7",
                  "5b026578210849e0a3435a95b95d0ea2",
                  "19e3ed05bf584df69be668709fafa954",
                  "360897d6b74b4d7a8f80bdff388e0ca1",
                  "3ce90c17b5e64559b9f198efb5418913",
                  "d487033298da4c4e8532f8da8d4bc2e4",
                  "49ea6136b8b94019897647eb6cb40b6d",
                  "289d7fecc9814fd7953223d7ef4c0350",
                  "de1c2c1beb49463b9cc01c8785d06051",
                  "a26cf34353044b78aa9e20a3efcf0abb",
                  "5ba8c5935f29425789687688a0bd778b",
                  "39af461e1a9249d0af8896fa8443979c",
                  "1d18eaea1bdd496d9d78589359a72bd5",
                  "30d9063c1cc641d88ea46b6058ebc38f",
                  "29698303f906482a906dca00f94f8d01",
                  "91017dfa6e484fa3b8da08db8a553905",
                  "e0a7add820724303872d7f6ccf24392a",
                  "aa631b2b61f44f9c8a2f50fa909007e7",
                  "e85ef23487124be5a3844dff4e15d318",
                  "5fd2a624e71746c981f58d7ac79e9fc4",
                  "6345e570f5d04a80a26e0916a654c974",
                  "839ceead92404cbdb4419ac6ef7f6d05",
                  "d8d5550c60f44055830fdd5c5a3d05bc",
                  "4e2672ea3d2d4d69b8dda44a00806e34",
                  "3ff138ba511b4ea19e03825a8565599f",
                  "183f5c47c9784caea04bb4bcfd160806",
                  "Mf9WXzGfr2B8UgF63ucNGLpmCNmuHJGe",
                  "84LfuDZFMzh4OkqAEqf9FwzzAm9a5m7z",
                  "4GEFGGGU8KltQGPpqClVXLusU7I9xDvw",
                  "3YGONLdp1Ze88sLyBDbPFN8DUR5oQI4p",
                  "EwUZtJiOJIlnkLq2k46V5txKR3bjJWq8",
                  "lv1kDTOXvnNQvuFpkM5Af1NIFtK9TOAD",
                  "mw8GrV3n5RjkoBCyYXmuApRf9bs5Y8Id",
                  "BIPVgoickzA3F3f6vDolpNdyyVIJqNu9",
                  "b97fd7152d804d429d706e1b8f82cb2a",
                  "27fb8aa9e9e94f4da269144fc92dbac7",
                  "9485fa7b159e42edb08a83bde0d83dia",
                  "x4Uo2cwIaUr1GSVHEPY82EQ15MWOuHUa",
                  "HBAgVRFqtU232A82hGGINxxXHDbHFi5q",
                  "Gr7UzxdwWXOTHbyPD2DGsFTMV7cAGt0f",
                  "ffde04838d9e4778a9295ba5f825fd84",
                  "29f2aa5dfbe21265da9df360e9c40f34",
                  "192a09e3f41571b5421dec528c76c846",
                  "21f64753cf014b9783a73e9645ee640d",
                  "817f2a161e624076b35219965b88a25d",
                  "7c80329a76e14e6e8fe252d5d67562de",
                  "f5a8d5cdf1a84a548ca7b3dd87d3f097",
                  "7eb58ac6d2b0437294159cce8d968995",
                  "c5017f3034ff48ce8bac77defcc27fff",
                  "e4e5b7be6f0343b4aa7530c104329b42",
                  "2ed1ec032d0a43c6b694d90166597ca2",
                  "1b3476bae4e94fa08f156ea59fdf51fe",
                  "99e21358c19c4ced9d1932a29f0623f1",
                  "5538a2fed2f94d038ec48cc41beb6a38",
                  "1fb4b501e1504cb49befc0adc661747d",
                  "8e3fd8a6b52e48a38170c9be9b29ffe1",
                  "OfEXe4Rr9ON0F0buy7GfwlMJTQztRCUk",
                  "P6CpVQdHrJD4AixO6zRZO1sd1aD0WmOi",
                  "O2k6McH9iN7UGAJoVWUDzFU5AKgkhNkK",
                  "deb09d9fce9b4cf2a1b6e0570227a6e5",
                  "74d07d5ecbd0466cb3e6016ce91aa466",
                  "5af30905f7874fb0962f153ec990e9f5",
                  "LjJiINSM8m6aLAZ5GzOXvABPiAgCaRmY",
                  "4af9b12fbb284f069a1887d67cda5a01",
                  "0fffa5a070a3409c9fec8211f35ca945",
                  "5f5105c7a96d40c3b02de118d7aea4e5",
                  "5954b627ade9405c9955687939ffab6a",
                  "5de150dc29228095f9811cdf15ea5938",
                  "b0dc30922cd14014857de1fc83208529",
                  "ea243ea946744e9d9cc7290a9dabf438",
                  "02fa6c6228f9df9bf445d28216705a97",
                  "77d378c27c11402285201cdf2dc0bccc",
                  "780e6221a2ee627b0ae1cffcdf31f9aa",
                  "36tnbk7frf5suyj5gby3j6yb",
                  "SNvVwAFtjoq0UOuAJ3Rj7lZl4BPjoENy",
                  "66759a8a36a3463c8523b31ecc5b65ef",
                  "5a7b5d42d95d418b9cf7f7410f7972f7",
                  "8ac42ccff20845f2be98ea157a5477ca",
                  "ffdd879d12a34305bb4d0dd5ac1dffaa",
                  "ef5462596d6b41b9be9d8c724e1906a3",
                  "f5a213b29d334070b40bd3e1f6fb6b6c",
                  "3c9b552c6fc64cfda6bccb86efb4c297",
                  "4210306424e546b78990dd9ea42bb5a9",
                  "W8p50dcae1884cd9a945472ad60b9afe",
                  "398fd4cd5b484aa1a47a10dee2a8fca3",
                  "84fc57c62fbd4dff8b8f29ec6c896dd3",
                  "SKqtQ0XopVO70r4k0okPGHDmAZxOACSR",
                  "eAmN9NUzzDdvAD1Xwvtf3L8UVq6MTycC",
                  "AhGyi9pPBPmRsA14rCGcvTlHT9cVDECe",
                  "4e1d0267e2b8406ebee074ef7b81867d",
                  "b0b53721112a43238a21907e6ddfbfa5",
                  "c37f4c6cf2d6416fbde31c5197a6747a",
                  "9a7b3aa0dd924a5bb5d0d6ee382cb0f1",
                  "b691279436264b0aa1c60b51c536383b",
                  "ca16fb2bc8b8467aa35a15f885565915",
                  "c1c7ce2f588248cbb35cc47e7749e024",
                  "40943e90d623415391d1677e91c10e4d",
                  "5ef7f2e4ea66403685823e72dcb2f50b",
                  "3931467461dc4c22b03bd23545a8b9e9",
                  "d4f5388ea0b040baaaeeeaf31a39bbfc",
                  "2d6c9790b3c74fa8b5bd40be56c944a0",
                  "ef251a886f594732a5ebde1cbb63318d",
                  "7bb58f576e1a4f0d9b0b05345e4fc00b",
                  "32ad5ead59b048b2a4784a748571aa7e",
                  "0e3080b2c3b745c2a4c25009fd3470af",
                  "2a2c8fb134624033b0e2b0295046296e",
                  "bcd1f840d68e4f86b49524ed7312b454",
                  "c9035ba3f06a41eea2015c17d7bb4c91",
                  "1ea8a8c2acac4307bb5a9a6950906516",
                  "4e3614e0fc8b4d75a074d0a12e0a863b",
                  "8370f74a7b6441aa8b34b4a8770b8753",
                  "b78be955d5b54f6198e6d61e7f8112c9",
                  "b662deb3a4024e90b94f491689d15eca",
                  "360b4801a0eb4321aa3d187855026cbe",
                  "a7e2af2a8976518a2e9d50abb0879417",
                  "R27RpTAwWXl9CEj0oam3ABhm6KfNXhAY",
                  "ffff826ce66ee941c47ae664eb1ea75e",
                  "fPFPi36zIGKmIX33D6FujlGTSuZeHUEb",
                  "e8801e97251c4f6298b1a3e8282ae169",
                  "e3e03a04bd704fc783f93410e41005fc",
                  "2d022a0bc7a14e788f74df5fb6c38e12",
                  "451402db08cd4b90ad538fca563359ac",
                  "b88f4c94a4774dcea2e9ab54fa595ce9",
                  "3e3411ccd49648e1a568521612eaf73c"
                ]
              }
            },
            "serviceIds": {
              "type": "array",
              "title": "Service IDs",
              "items": {
                "type": "string",
                "title": "Service ID",
                "enum": [
                  "CFSRFNotificationPush",
                  "absorb-sso",
                  "addresses",
                  "admin",
                  "admin-jobs",
                  "admin-products",
                  "api-directory-service",
                  "api-key-service",
                  "aqueduct",
                  "arctic-pricing-processor-web",
                  "arctic-usage-web",
                  "audit-service",
                  "bvseo-proxy",
                  "catalog-pdm-shopper",
                  "compliance-affirm",
                  "device-information",
                  "devprod",
                  "digital-rights-service",
                  "dispatch-metrics-service",
                  "display-management",
                  "fmis",
                  "forge-settings-service",
                  "fps",
                  "integration-provisioning",
                  "managed-inventory",
                  "merchandising-offer",
                  "merchandising-shopper",
                  "metered",
                  "mosaic",
                  "msuni",
                  "notification",
                  "oauth20",
                  "om",
                  "orca-admin",
                  "pricing-shopper",
                  "reporting-auth",
                  "riskified",
                  "shopatron-inv-orca",
                  "shopper-api-reporting",
                  "shoppers",
                  "ssr-ms-shipment-storage",
                  "ssr-user-management",
                  "swagger",
                  "testService",
                  "trace",
                  "v1",
                  "v1ods",
                  "watch-service"
                ]
              }
            },
            "clusters": {
              "type": "array",
              "title": "Clusters",
              "items": {
                "title": "Cluter",
                "type": "string"
              }
            },
            "documentTypes": {
              "type": "array",
              "title": "Document Types",
              "items": {
                "type": "string",
                "title": "Document Type"
              }
            },
            "properties": {
              "type": "object",
              "properties": {
                "count": {
                  "type": "string"
                },
                "interval": {
                  "type": "string"
                },
                "siteId": {
                  "type": "string"
                },
                "responseSource": {
                  "type": "string"
                },
                "responseStatus": {
                  "type": "string"
                }
              }
            }
          }
        },
        "CreateWatchDefinition": {
          "$ref": "#"
        }
      }
    }
  },
  'v1-electrol-decrease-traffic-sprike': {
    "links": {
      "up": {
        "rel": "up",
        "href": "http://localhost:8082/watch-definitions.drive?offset=0&max=10",
        "title": "Back to list"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:8082/watch-definitions/v1-electrol-decrease-traffic-sprike",
        "title": "Delete",
        "method": "DELETE"
      },
      "edit": {
        "rel": "edit",
        "href": "http://localhost:8082/watch-definitions.drive",
        "title": "Save",
        "method": "PUT",
        "type": "application/json",
        "$ref": "#/definitions/CreateWatchDefinition"
      },
      "self": {
        "rel": "self",
        "href": "http://localhost:8082/watch-definitions/v1-electrol-decrease-traffic-sprike"
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
    "schema": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "WatchDefinition",
      "description": "An explanation about the purpose of this instance.",
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "path": {
          "type": "string",
          "title": "Path",
          "readOnly": true
        },
        "description": {
          "type": "string",
          "title": "Description"
        },
        "active": {
          "type": "boolean",
          "title": "Active"
        },
        "trigger": {
          "title": "Trigger",
          "type": "string"
        },
        "policyDefinition": {
          "title": "Policy Definition Type",
          "oneOf": [
            {
              "title": "Average Response Time Spike",
              "type": "object",
              "name": "AverageResponseTimeSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "AverageResponseTimeSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_avg_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "avg_response_time_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Decrease Traffic Spike",
              "type": "object",
              "name": "DecreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "DecreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Flatline",
              "type": "object",
              "name": "FlatlinePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "FlatlinePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "predefinedMatchingPattern": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "flatline"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Error Spike",
              "type": "object",
              "name": "IncreaseErrorSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseErrorSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "eventsCountThreshold": {
                      "type": "string"
                    },
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "errorCountThreshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "SERVER_ERROR_RESPONSE",
                        "ERROR_RESPONSE",
                        "CLIENT_ERROR_RESPONSE"
                      ]
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "date_range_terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "error_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Traffic Spike",
              "type": "object",
              "name": "IncreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Service Availability",
              "type": "object",
              "name": "ServiceAvailabilityPolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "ServiceAvailabilityPolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "NON_5XX_RESPONSE",
                        "OK_RESPONSE",
                        "ONLY_200_RESPONSE"
                      ]
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "service_availability"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Slow Average Response Time",
              "type": "object",
              "name": "SlowAverageResponseTimePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "SlowAverageResponseTimePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string",
                      "default": 100
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "metrics_avg"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "slow_avg_response_time"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            }
          ]
        }
      },
      "required": [
        "name",
        "path",
        "active",
        "trigger",
        "policyDefinition"
      ],
      "definitions": {
        "alertDefinitions": {
          "type": "object",
          "title": "Alert Definition",
          "properties": {
            "alertType": {
              "title": "Alert Type",
              "oneOf": [
                {
                  "title": "EMAIL",
                  "type": "object",
                  "name": "EMAIL",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "EMAIL"
                      ]
                    },
                    "subject": {
                      "type": "string"
                    },
                    "from": {
                      "type": "string"
                    },
                    "to": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type",
                    "subject",
                    "to"
                  ]
                },
                {
                  "title": "CONSOLE_TEXT",
                  "type": "object",
                  "name": "CONSOLE_TEXT",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "CONSOLE_TEXT"
                      ]
                    }
                  },
                  "required": [
                    "type"
                  ]
                },
                {
                  "title": "SLACK",
                  "type": "object",
                  "name": "SLACK",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "SLACK"
                      ]
                    },
                    "webhook": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "channel": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type"
                  ]
                }
              ]
            },
            "firingPolicy": {
              "type": "string",
              "title": "Firing Policy",
              "enum": [
                "CONTINUOUS",
                "ONCE_WITH_FOLLOW_UP"
              ]
            }
          }
        },
        "queryType_SEARCH_WITH_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH_WITH_COUNT"
        },
        "queryType_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "COUNT"
        },
        "queryType_SEARCH": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH"
        },
        "queryDefinition": {
          "title": "Query Definition Details",
          "properties": {
            "timeInterval": {
              "type": "object",
              "title": "Time Interval",
              "properties": {
                "from": {
                  "type": "string",
                  "title": "From"
                },
                "to": {
                  "type": "string",
                  "title": "To"
                }
              },
              "required": [
                "from",
                "to"
              ]
            },
            "apiKeys": {
              "type": "array",
              "title": "Api Keys",
              "items": {
                "type": "string",
                "title": "Api Key",
                "enum": [
                  "a52e39b2e85f44518c9557bef07cefb7",
                  "c379d9cfb0dd490a8399734afa7e28c4",
                  "63ef06b39d47413989f52fbd5be19761",
                  "3daaa577d3084251b2f22bb5bcfb092c",
                  "ce5679c23cd648e19896ce11c9183acf",
                  "71c9782424b64dbbb2e3b1b5ed7b9357",
                  "bd8bba27f49a45f69296a8f57715887a",
                  "722aacea2683463e965c0992d0a1fed6",
                  "d503c0c1e0774c33b6906f5379a114ab",
                  "a59de855c96448acb6f303edc6e26fe7",
                  "f621bcb5b7d44c238631e5e2cea96ac6",
                  "09a8a9e5c81b48f69fd43c0c3defddb0",
                  "d9b0f8ea7f7a4622999c8e1c15933a1e",
                  "dec38ad6b095403e8a1535585b2e9078",
                  "29f94443bbe74b49a9c67fa7a27fac84",
                  "7508fdb7357a4420b1d09271fe682905",
                  "bc81f22c34e84caa96e1d42e8c6df284",
                  "785336eafbea4c1d9c8c47f8cc07bf20",
                  "4a0d6a3658874b6c84e24424f73d5b34",
                  "c9933ce47b76448eaa8dd834a6edb588",
                  "d71730a87ca84a59a2ce94b9bbcc066f",
                  "1e4533bef3f74093b9ddcf727c32ecbd",
                  "6fc4f795c08846368f2ebcf942c38257",
                  "2584ca43d8c34818b409d70813725d06",
                  "75cd2758726d471abb499ba4a83cd43d",
                  "ffe9924c2c0a42fc97ffd80e85d37bc2",
                  "9791ea76c17a41b7b19e0c5de66cd595",
                  "aa51af2df7c3427faf9d8590fe464bc2",
                  "909009c5214249d18054565e6c57886f",
                  "c3609dd96eac4376b20890494e882a38",
                  "d7366e9c1f7a4c3f97cbc340c757d55b",
                  "42e71d5576964354b51688a983caa52c",
                  "1ac2152179c3469e8c9bd1b9b62de1f6",
                  "2f0c928b61654c36ade08c8c23bed62b",
                  "639e54158b254306ae68867995b70ee9",
                  "f5fbf33974794e859696defe6fc9818a",
                  "dfee9ead4fc245d59f7968c87e40709c",
                  "2d58cd1208f34a7886f8ab0760055ab3",
                  "45e8b0e39aba4eebb15ddf134e9b0bd9",
                  "0971189a1331474abbb8633f2c11bba1",
                  "b400399bbf444710af162ee1668aa47d",
                  "37429d6b9e304fafa37c64358921f565",
                  "26ceda9f2a694254979100a8455f0e73",
                  "2aa724b75a684e6c98bdfe9b00d94a08",
                  "ed7401c749404258a4c264f6b0f1786b",
                  "eff377216fae4ac0bbf41864d115cb22",
                  "014d336197b94414910b7317b5d019d1",
                  "0f61671976abf7f85d1c98b207830f6b",
                  "2c84e84bb902457aad6cb73206db923f",
                  "3563c230c22945f1826644bdb9534d95",
                  "fbe2a04cb5144f4cb8ec2a13f326398c",
                  "66a15471554f4326bbe5c2eb73c49ee3",
                  "JJ9QFssRnxzms2GPPRCBnMDXHjKQNAMW",
                  "58b6ec9ece784e88a575663cbb69074a",
                  "fa40c38d914340fb89f0c63027833a9d",
                  "3e99952c2cc7f1f566126deaff432996",
                  "uFBV0VlouC8OfU38v0l6lG0oVQ0kDqvr",
                  "d4cd446bb89a43c28a15d8909ad58f3b",
                  "1125ee6b84fc4dce83b890763fd567c3",
                  "529ec2c526214e388f13bd7347342483",
                  "604df5ac990fbc67dab8fc098af271e6",
                  "8430105cfa7149bf9273e8046b9751e0",
                  "f84c1db8380944308a93e085b5b1af86",
                  "6c228c145bc04142b13dd7b2c429d62b",
                  "3eb1d5c4b4df444a81e41afaf7053cd1",
                  "60bd7f41a86549698ec9d36b1243a3b5",
                  "65c9d01e68d945d9a3629c6a67a96127",
                  "634720b45ec046a1a193810f87755674",
                  "e71db157a8724cafabd2c579602b10d6",
                  "fe43a8180b58471084a27afc8b781b67",
                  "2f75c16649c04335b666ace790f3631e",
                  "13b9e5d0b4d342dd9ed599d196dcb5ad",
                  "a393b43b8a4047018db5ddd28bea8bbb",
                  "183e4c1b72294c60ac2fcc5de3bc2bfd",
                  "b46b718c759a412aa7ab20c1626062d3",
                  "f06ec13a06cb4faba310c583fa4419ba",
                  "17b573bf92c64b4dad88d1d6d5a3eeef",
                  "83e130a304f2489385b6d267105ee40b",
                  "0fb1db8761ac4a85b4eac8ec49a16867",
                  "6801c617d31745499828eed4c696f4bc",
                  "AjYFBMpbQdCoAFomuHhhFNNjvP5LHCfo",
                  "3bf2a0a885f94f279b9d86568182d75d",
                  "3db6d8afe2d24a78a2e7b976457a40f5",
                  "c2a8ae12b885451b90b86beee0c6e374",
                  "235104cf93754fa0b4b4c7983693842f",
                  "4c4d6d5691fd4e7db73b20b6edd27fe2",
                  "3c93dabcea2147c48f142e1fad482c36",
                  "b3f9b26bdd8f60ef0e2c2c0be0b74260",
                  "GvHfSjHAScUuTAasglA81CmfCEtciNmt",
                  "9692a066e340d51cb0b19f27ea06b364",
                  "e66654556ca510d3487c647399a2caf2",
                  "8ee5d5e1e43b4a92835709f4c4a973c9",
                  "689175898efa478d96d0dfda038e4dad",
                  "3fbe6187e6904dae93606048e2ff003a",
                  "f046805b8ac1461ca76dcf2e3d3f4040",
                  "96562a9d820d441cbc480c7a3758df7b",
                  "6392fc87a33447529e12a454da6c339b",
                  "6fa08f482b4c473880aa0215b3c5de39",
                  "V2ztxK2rFe86jD7zYkRhDSAdrOrcY5qo",
                  "9b67e2693d374162be5e2b1b0c66f036",
                  "0973656604e444bcba03231584b74870",
                  "5c31057bc55c4963837049a6d384b567",
                  "d11ae88278b74a6c931176ca4b7b164f",
                  "b4357251c0574a5e98661bbd06c2ca11",
                  "97f3c5a6f2d945528977e86535b927dd",
                  "HipATLcFtfhaa4NGPzk1dcPsIweaGmLh",
                  "3cf82ad2309640b48d43953c661fca7f",
                  "1a79efcfbfb34ff2b704e4dcde4e8fe9",
                  "2db786407faf4d2fa01bbd07f9a93e79",
                  "2918d633d2fe458f89fff1c241b96e9a",
                  "x7vQOMYuj1sZ6zeTNFeqL83qadqFT0Zm",
                  "480dd90425224c2f8cc9a77a402df105",
                  "c3526ba3fa99454896e0e6a9f4c3c4cc",
                  "8b96563e98c2433585767cb2fe1bee21",
                  "6d0b3139a676431992558dda67b6ba65",
                  "OMA5xOj8iBFRAcHJRmJeenKm4lr8UYTT",
                  "c6YGngARruDia5MOwAKgaMxyQdGnJ60H",
                  "fV8NesDn4r3e02A3XeAAhcGGqEb72W90",
                  "fe69ca7dfd6149ec9a47b3dd521e7644",
                  "fb7295e9e6f1427ebe937023e9114228",
                  "7a809a5636e84d1bac1d6f644ce8b56a",
                  "a692b345717e4adb85879bcee227bca9",
                  "fe1a806e420a45179b88e3689ca63446",
                  "e476082cf7af49b1b817e34c91d3486e",
                  "4eeb5d540ff54cf6b077ec469f2dd806",
                  "f4fc174d4733428e86fc38fc7f7bb748",
                  "e0c1977f09a14a7f8ffc35249e740bd3",
                  "003d23de388a443a813d8c2aeee76418",
                  "a90f1203bd8b4f16bd942870c6e14fbd",
                  "6eabe1249ed14043ac393cb5248f4fb6",
                  "819a5f22f3964bbc99931139ee2eb538",
                  "864d71cdaffb4e03a43a535c23d3292a",
                  "18ba5cb2b70d4093a20a362078f0958c",
                  "UnZqOVp4laTfF1l71GqnzXR5e34MUG3M",
                  "2c8792edf77a4bfa86f442bbf79da4e0",
                  "d79960cf15db4422a34d52785e088262",
                  "0e393a6f3c9c4e08aab38db741953af0",
                  "cede30a1de9c44f6b9183ff9be9ae309",
                  "e1a0f189b4f44b998fc8e47d515ab418",
                  "2b0d95e5167742bfaa87b50141d327b9",
                  "b38695ad77ef4d31b11192f8d80d9a8d",
                  "37504a549ca94c2fbcff1cc7ebfd89e2",
                  "6ac66961851f424f87aa7992a5cea5ca",
                  "5310815a01e14e95bfedf1b655fdef03",
                  "3e33684992de4c85a09d565eca3c0591",
                  "1edd47e8e8424d728f648f9c679f1fae",
                  "e12b65ecd73848db87c5ee7eb3f439e5",
                  "WZWxsKIlLOuwUxyn43usGMl2mBFJuczV",
                  "j2S1P01uImUQum2LFGuO9z2Jin0iqak7",
                  "f5e0a094f420d987ae37ef31813f3e46",
                  "IOGl4gRimt6h9gpPCfABcMjfPNKPzQer",
                  "m2ff39ba49a5498b8c7093c677016b87",
                  "2e57292fec6b4c7e9f9d0ccf49358a74",
                  "b9bdf962b01f4d39a524da440c3a9a24",
                  "3241a555f3bb49e0abebce79e2d9c683",
                  "c67b808be97b4ed7b1de747a7597c6ae",
                  "131457365d7a4b868263b1408386a4e9",
                  "73cb362d47024acebac4a5d7811f16e8",
                  "8a9ba4f6a62142e79e31d95d0b320df5",
                  "98a16c977805f1614cc9017fc0ca027c",
                  "e4eb2861e24ff944d3aa0e16bcb91122",
                  "drLb",
                  "drMonitoring",
                  "slowpitchstats",
                  "T38IByPBQUvbLHxrI1x9kIuY3BTTQSIb",
                  "95204aa36c9e464d95a9f94166ce1df7",
                  "GrEaNYFccnbzjiaNdGjyG627SiWCmv3g",
                  "LFiVpk5qjj570GwT6w8eSaVek9dcyUyo",
                  "dd05220dbc214907a081a449982f3d26",
                  "393169b895e84e13ba6389c0e412d193",
                  "jPvJi1XNitsGyJ8AFDNAizCAdVLKXm2y",
                  "6d9cc52eadd14cd7847b588468863592",
                  "5825c528f47a4f45881a6753c57b3a7f",
                  "11aa0d2e8f55487e99e67a15a9ff6168",
                  "989529bd2f0e4238a3012263d3d48241",
                  "6809b4l0G127438bb773d2d6ec18c394",
                  "4b9a7d96ccad47e0846628ac504b1e1b",
                  "74ba26c4a9d049be86c7cdb092417d97",
                  "fa1eaa5b2242410c82ff92323fcf6d47",
                  "a5a154df5b7840588172fc85ebe71e87",
                  "17d0e59684b34c3aab2861d0248cc25b",
                  "0c546c8ae3874452a66e37d505bec29a",
                  "01815239b9bb48869dea0f48b08ad5b7",
                  "cfb3cb708ce14e069555f231933454b6",
                  "83768800514044c883c1761ae50bffb4",
                  "61972e2ace5b43caad61136ee9ad9254",
                  "dbb3a637c32a4af1ad2410f8d32a7c84",
                  "01186811f3224264b1e564fcf5b7fdb9",
                  "e375ca2119cf4c14aa18ac3722dd07fb",
                  "ec48db0385914ebe9200d9547cb27c5f",
                  "21ea08fb07aa419aba9c4b4f077562d1",
                  "14e24fa4909743038e494db6b4b85697",
                  "65168b875d2b4a2da0321d75834f2620",
                  "8ba21719b32a41bb85a83f70ee999ec4",
                  "bf3c4e727412474c9d105c8d5b6f61ad",
                  "fee22d69e94a472192b30c23b3ac6ac7",
                  "4d0164638250450499a5483fc886f476",
                  "d87c355242804c4db2b474b070c100b7",
                  "47c970d8fa144db28a4908766d3e552b",
                  "75c5079cc5c34a4daca144acb33f191f",
                  "405ccf3d4bc541b6bf95b9ac8f732db7",
                  "11b3ec91ec684ad5b2c2bbcf0e117028",
                  "d0f92bb7bc42475994985532676e4d29",
                  "2b07a6cc14ba46b0ae52bafef48b7272",
                  "875fa335caaa46089d1e27455ba6b46a",
                  "e14e408740894337b29667ff124c3747",
                  "bd4ba131e94a49c48fc4621e4e208391",
                  "77c8cb21f0ee4d1e917e976d40a0192c",
                  "5d6509415b35421eb4c592f7f97fd5f2",
                  "b838ddb2e2814523a79accc70ae46417",
                  "b646a118ccf140508b0253c9a44d3e12",
                  "f9a80526573b495fb75b518b2b89354e",
                  "6d240ae497f14063be4c690890a60f86",
                  "31d1063fb493428794cc6b9a24f0af82",
                  "5c8c0596d0204a48bcf982e75f7b0057",
                  "badf3f7d1a924ef5b32c732a0dc85b66",
                  "7c43df67376442a69005f5cae5c3b25b",
                  "9d7500dc9bdc4b6381e66015387823eb",
                  "2159d7e4c5c047e6bd3745c85e403756",
                  "0ab3d1d0b1dd46e4839966bcd1b415c0",
                  "02561c33bd18412a9502326922b83a02",
                  "2815b31e5dd54c0aabcb32bf84a79bd9",
                  "25d0b5c0ecda494faa55f76384567c75",
                  "e75e39d4e89042c094d4c1b1c6a5d86e",
                  "7c73cd5e8e8f45689235f51f70732f8e",
                  "9130902f881a44aeacc8f319419cc929",
                  "10a0d29e20a14fbb87749cc73f8efff3",
                  "00dddd556c33472ab7afb4ebc7843282",
                  "0d5bf93475ea4372a96ef75938239fa2",
                  "2011706e978d4653b536ea3ea85b3005",
                  "36025fe36a014fc8a8c2ba4b585ab58c",
                  "4011d0dbbd4742f0a31fc3dbcf0c4299",
                  "592b25979f1d4ba3bdef695a144d64c0",
                  "9e1d95dec9d543f7a1a28345c64a2b73",
                  "c337ae62486445f58609a83cf0446851",
                  "fe7384de29d0498d99fc169315ee63c9",
                  "434920cfddec4c318beccf809d919a94",
                  "4009d041afec4bbda55cfcb32eddf94d",
                  "09fc9b3ad0c6494294ee7e6adabdcaa9",
                  "dcc4505ad4644b428264f44922b12ee5",
                  "fec7126def664064840f03dfd693b524",
                  "47ec2875c3e74c8e965b918a0dd0b37f",
                  "0cf750d174b4421c948323ff0f150eb2",
                  "82b2bcac1a5e429bbc14b12f558ef1d2",
                  "52020246f6e94edb861d4b7c86cf1659",
                  "f2c6fcc010824c05989a44e69e588742",
                  "bf2136f4b1234b48bd94ddf1f97d4e67",
                  "36b3419fa81d434ebfddbe1415356e0b",
                  "c65d281d6d3941e49982bd634fbbec25",
                  "6fe5bb8863c24a3fb4a1515c26153da0",
                  "270a9538f6f44736bb8834f8f14d61a6",
                  "03a5370a46014fe0a4da4241682e6079",
                  "968adfad396c41b1b8c2ed54dd2ee471",
                  "7dd17e4290984c9fb39d421a565b7abb",
                  "bbddf0b2ae65413d91fa2ec54c352e51",
                  "47618a302887457783034cddee3cac73",
                  "ef029932ce20412a9e4dac1ea7fe83b3",
                  "46c4a16e6b3748f58f918cd7e20c06f1",
                  "a9a505bb3b6c4648b071f9e774d4e3f7",
                  "996d2558219840f3869d0feee75a4ba4",
                  "13626bbd97224522a159545a50c28383",
                  "de6c4779b8584f9fb1a1b880da974fc6",
                  "6163570332e746479d2052a10f1f4315",
                  "6b43a7c9ff634eef9d0a1d430b994609",
                  "0c6cb9bf180043458fbcd9a74f4ee5a3",
                  "b679d652d6704c9e8c5a812157552329",
                  "83fb8058737345aba941639128699cd7",
                  "5b026578210849e0a3435a95b95d0ea2",
                  "19e3ed05bf584df69be668709fafa954",
                  "360897d6b74b4d7a8f80bdff388e0ca1",
                  "3ce90c17b5e64559b9f198efb5418913",
                  "d487033298da4c4e8532f8da8d4bc2e4",
                  "49ea6136b8b94019897647eb6cb40b6d",
                  "289d7fecc9814fd7953223d7ef4c0350",
                  "de1c2c1beb49463b9cc01c8785d06051",
                  "a26cf34353044b78aa9e20a3efcf0abb",
                  "5ba8c5935f29425789687688a0bd778b",
                  "39af461e1a9249d0af8896fa8443979c",
                  "1d18eaea1bdd496d9d78589359a72bd5",
                  "30d9063c1cc641d88ea46b6058ebc38f",
                  "29698303f906482a906dca00f94f8d01",
                  "91017dfa6e484fa3b8da08db8a553905",
                  "e0a7add820724303872d7f6ccf24392a",
                  "aa631b2b61f44f9c8a2f50fa909007e7",
                  "e85ef23487124be5a3844dff4e15d318",
                  "5fd2a624e71746c981f58d7ac79e9fc4",
                  "6345e570f5d04a80a26e0916a654c974",
                  "839ceead92404cbdb4419ac6ef7f6d05",
                  "d8d5550c60f44055830fdd5c5a3d05bc",
                  "4e2672ea3d2d4d69b8dda44a00806e34",
                  "3ff138ba511b4ea19e03825a8565599f",
                  "183f5c47c9784caea04bb4bcfd160806",
                  "Mf9WXzGfr2B8UgF63ucNGLpmCNmuHJGe",
                  "84LfuDZFMzh4OkqAEqf9FwzzAm9a5m7z",
                  "4GEFGGGU8KltQGPpqClVXLusU7I9xDvw",
                  "3YGONLdp1Ze88sLyBDbPFN8DUR5oQI4p",
                  "EwUZtJiOJIlnkLq2k46V5txKR3bjJWq8",
                  "lv1kDTOXvnNQvuFpkM5Af1NIFtK9TOAD",
                  "mw8GrV3n5RjkoBCyYXmuApRf9bs5Y8Id",
                  "BIPVgoickzA3F3f6vDolpNdyyVIJqNu9",
                  "b97fd7152d804d429d706e1b8f82cb2a",
                  "27fb8aa9e9e94f4da269144fc92dbac7",
                  "9485fa7b159e42edb08a83bde0d83dia",
                  "x4Uo2cwIaUr1GSVHEPY82EQ15MWOuHUa",
                  "HBAgVRFqtU232A82hGGINxxXHDbHFi5q",
                  "Gr7UzxdwWXOTHbyPD2DGsFTMV7cAGt0f",
                  "ffde04838d9e4778a9295ba5f825fd84",
                  "29f2aa5dfbe21265da9df360e9c40f34",
                  "192a09e3f41571b5421dec528c76c846",
                  "21f64753cf014b9783a73e9645ee640d",
                  "817f2a161e624076b35219965b88a25d",
                  "7c80329a76e14e6e8fe252d5d67562de",
                  "f5a8d5cdf1a84a548ca7b3dd87d3f097",
                  "7eb58ac6d2b0437294159cce8d968995",
                  "c5017f3034ff48ce8bac77defcc27fff",
                  "e4e5b7be6f0343b4aa7530c104329b42",
                  "2ed1ec032d0a43c6b694d90166597ca2",
                  "1b3476bae4e94fa08f156ea59fdf51fe",
                  "99e21358c19c4ced9d1932a29f0623f1",
                  "5538a2fed2f94d038ec48cc41beb6a38",
                  "1fb4b501e1504cb49befc0adc661747d",
                  "8e3fd8a6b52e48a38170c9be9b29ffe1",
                  "OfEXe4Rr9ON0F0buy7GfwlMJTQztRCUk",
                  "P6CpVQdHrJD4AixO6zRZO1sd1aD0WmOi",
                  "O2k6McH9iN7UGAJoVWUDzFU5AKgkhNkK",
                  "deb09d9fce9b4cf2a1b6e0570227a6e5",
                  "74d07d5ecbd0466cb3e6016ce91aa466",
                  "5af30905f7874fb0962f153ec990e9f5",
                  "LjJiINSM8m6aLAZ5GzOXvABPiAgCaRmY",
                  "4af9b12fbb284f069a1887d67cda5a01",
                  "0fffa5a070a3409c9fec8211f35ca945",
                  "5f5105c7a96d40c3b02de118d7aea4e5",
                  "5954b627ade9405c9955687939ffab6a",
                  "5de150dc29228095f9811cdf15ea5938",
                  "b0dc30922cd14014857de1fc83208529",
                  "ea243ea946744e9d9cc7290a9dabf438",
                  "02fa6c6228f9df9bf445d28216705a97",
                  "77d378c27c11402285201cdf2dc0bccc",
                  "780e6221a2ee627b0ae1cffcdf31f9aa",
                  "36tnbk7frf5suyj5gby3j6yb",
                  "SNvVwAFtjoq0UOuAJ3Rj7lZl4BPjoENy",
                  "66759a8a36a3463c8523b31ecc5b65ef",
                  "5a7b5d42d95d418b9cf7f7410f7972f7",
                  "8ac42ccff20845f2be98ea157a5477ca",
                  "ffdd879d12a34305bb4d0dd5ac1dffaa",
                  "ef5462596d6b41b9be9d8c724e1906a3",
                  "f5a213b29d334070b40bd3e1f6fb6b6c",
                  "3c9b552c6fc64cfda6bccb86efb4c297",
                  "4210306424e546b78990dd9ea42bb5a9",
                  "W8p50dcae1884cd9a945472ad60b9afe",
                  "398fd4cd5b484aa1a47a10dee2a8fca3",
                  "84fc57c62fbd4dff8b8f29ec6c896dd3",
                  "SKqtQ0XopVO70r4k0okPGHDmAZxOACSR",
                  "eAmN9NUzzDdvAD1Xwvtf3L8UVq6MTycC",
                  "AhGyi9pPBPmRsA14rCGcvTlHT9cVDECe",
                  "4e1d0267e2b8406ebee074ef7b81867d",
                  "b0b53721112a43238a21907e6ddfbfa5",
                  "c37f4c6cf2d6416fbde31c5197a6747a",
                  "9a7b3aa0dd924a5bb5d0d6ee382cb0f1",
                  "b691279436264b0aa1c60b51c536383b",
                  "ca16fb2bc8b8467aa35a15f885565915",
                  "c1c7ce2f588248cbb35cc47e7749e024",
                  "40943e90d623415391d1677e91c10e4d",
                  "5ef7f2e4ea66403685823e72dcb2f50b",
                  "3931467461dc4c22b03bd23545a8b9e9",
                  "d4f5388ea0b040baaaeeeaf31a39bbfc",
                  "2d6c9790b3c74fa8b5bd40be56c944a0",
                  "ef251a886f594732a5ebde1cbb63318d",
                  "7bb58f576e1a4f0d9b0b05345e4fc00b",
                  "32ad5ead59b048b2a4784a748571aa7e",
                  "0e3080b2c3b745c2a4c25009fd3470af",
                  "2a2c8fb134624033b0e2b0295046296e",
                  "bcd1f840d68e4f86b49524ed7312b454",
                  "c9035ba3f06a41eea2015c17d7bb4c91",
                  "1ea8a8c2acac4307bb5a9a6950906516",
                  "4e3614e0fc8b4d75a074d0a12e0a863b",
                  "8370f74a7b6441aa8b34b4a8770b8753",
                  "b78be955d5b54f6198e6d61e7f8112c9",
                  "b662deb3a4024e90b94f491689d15eca",
                  "360b4801a0eb4321aa3d187855026cbe",
                  "a7e2af2a8976518a2e9d50abb0879417",
                  "R27RpTAwWXl9CEj0oam3ABhm6KfNXhAY",
                  "ffff826ce66ee941c47ae664eb1ea75e",
                  "fPFPi36zIGKmIX33D6FujlGTSuZeHUEb",
                  "e8801e97251c4f6298b1a3e8282ae169",
                  "e3e03a04bd704fc783f93410e41005fc",
                  "2d022a0bc7a14e788f74df5fb6c38e12",
                  "451402db08cd4b90ad538fca563359ac",
                  "b88f4c94a4774dcea2e9ab54fa595ce9",
                  "3e3411ccd49648e1a568521612eaf73c"
                ]
              }
            },
            "serviceIds": {
              "type": "array",
              "title": "Service IDs",
              "items": {
                "type": "string",
                "title": "Service ID",
                "enum": [
                  "CFSRFNotificationPush",
                  "absorb-sso",
                  "addresses",
                  "admin",
                  "admin-jobs",
                  "admin-products",
                  "api-directory-service",
                  "api-key-service",
                  "aqueduct",
                  "arctic-pricing-processor-web",
                  "arctic-usage-web",
                  "audit-service",
                  "bvseo-proxy",
                  "catalog-pdm-shopper",
                  "compliance-affirm",
                  "device-information",
                  "devprod",
                  "digital-rights-service",
                  "dispatch-metrics-service",
                  "display-management",
                  "fmis",
                  "forge-settings-service",
                  "fps",
                  "integration-provisioning",
                  "managed-inventory",
                  "merchandising-offer",
                  "merchandising-shopper",
                  "metered",
                  "mosaic",
                  "msuni",
                  "notification",
                  "oauth20",
                  "om",
                  "orca-admin",
                  "pricing-shopper",
                  "reporting-auth",
                  "riskified",
                  "shopatron-inv-orca",
                  "shopper-api-reporting",
                  "shoppers",
                  "ssr-ms-shipment-storage",
                  "ssr-user-management",
                  "swagger",
                  "testService",
                  "trace",
                  "v1",
                  "v1ods",
                  "watch-service"
                ]
              }
            },
            "clusters": {
              "type": "array",
              "title": "Clusters",
              "items": {
                "title": "Cluter",
                "type": "string"
              }
            },
            "documentTypes": {
              "type": "array",
              "title": "Document Types",
              "items": {
                "type": "string",
                "title": "Document Type"
              }
            },
            "properties": {
              "type": "object",
              "properties": {
                "count": {
                  "type": "string"
                },
                "interval": {
                  "type": "string"
                },
                "siteId": {
                  "type": "string"
                },
                "responseSource": {
                  "type": "string"
                },
                "responseStatus": {
                  "type": "string"
                }
              }
            }
          }
        },
        "CreateWatchDefinition": {
          "$ref": "#"
        }
      }
    }
  },
  'v1-furlaeu-availability': {
    "links": {
      "up": {
        "rel": "up",
        "href": "http://localhost:8082/watch-definitions.drive?offset=0&max=10",
        "title": "Back to list"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:8082/watch-definitions/v1-furlaeu-availability",
        "title": "Delete",
        "method": "DELETE"
      },
      "edit": {
        "rel": "edit",
        "href": "http://localhost:8082/watch-definitions.drive",
        "title": "Save",
        "method": "PUT",
        "type": "application/json",
        "$ref": "#/definitions/CreateWatchDefinition"
      },
      "self": {
        "rel": "self",
        "href": "http://localhost:8082/watch-definitions/v1-furlaeu-availability"
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
    "schema": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "WatchDefinition",
      "description": "An explanation about the purpose of this instance.",
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "path": {
          "type": "string",
          "title": "Path",
          "readOnly": true
        },
        "description": {
          "type": "string",
          "title": "Description"
        },
        "active": {
          "type": "boolean",
          "title": "Active"
        },
        "trigger": {
          "title": "Trigger",
          "type": "string"
        },
        "policyDefinition": {
          "title": "Policy Definition Type",
          "oneOf": [
            {
              "title": "Average Response Time Spike",
              "type": "object",
              "name": "AverageResponseTimeSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "AverageResponseTimeSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_avg_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "avg_response_time_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Decrease Traffic Spike",
              "type": "object",
              "name": "DecreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "DecreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Flatline",
              "type": "object",
              "name": "FlatlinePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "FlatlinePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "predefinedMatchingPattern": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "flatline"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Error Spike",
              "type": "object",
              "name": "IncreaseErrorSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseErrorSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "eventsCountThreshold": {
                      "type": "string"
                    },
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "errorCountThreshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "SERVER_ERROR_RESPONSE",
                        "ERROR_RESPONSE",
                        "CLIENT_ERROR_RESPONSE"
                      ]
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "date_range_terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "error_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Traffic Spike",
              "type": "object",
              "name": "IncreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Service Availability",
              "type": "object",
              "name": "ServiceAvailabilityPolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "ServiceAvailabilityPolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "NON_5XX_RESPONSE",
                        "OK_RESPONSE",
                        "ONLY_200_RESPONSE"
                      ]
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "service_availability"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Slow Average Response Time",
              "type": "object",
              "name": "SlowAverageResponseTimePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "SlowAverageResponseTimePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string",
                      "default": 100
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "metrics_avg"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "slow_avg_response_time"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            }
          ]
        }
      },
      "required": [
        "name",
        "path",
        "active",
        "trigger",
        "policyDefinition"
      ],
      "definitions": {
        "alertDefinitions": {
          "type": "object",
          "title": "Alert Definition",
          "properties": {
            "alertType": {
              "title": "Alert Type",
              "oneOf": [
                {
                  "title": "EMAIL",
                  "type": "object",
                  "name": "EMAIL",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "EMAIL"
                      ]
                    },
                    "subject": {
                      "type": "string"
                    },
                    "from": {
                      "type": "string"
                    },
                    "to": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type",
                    "subject",
                    "to"
                  ]
                },
                {
                  "title": "CONSOLE_TEXT",
                  "type": "object",
                  "name": "CONSOLE_TEXT",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "CONSOLE_TEXT"
                      ]
                    }
                  },
                  "required": [
                    "type"
                  ]
                },
                {
                  "title": "SLACK",
                  "type": "object",
                  "name": "SLACK",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "SLACK"
                      ]
                    },
                    "webhook": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "channel": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type"
                  ]
                }
              ]
            },
            "firingPolicy": {
              "type": "string",
              "title": "Firing Policy",
              "enum": [
                "CONTINUOUS",
                "ONCE_WITH_FOLLOW_UP"
              ]
            }
          }
        },
        "queryType_SEARCH_WITH_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH_WITH_COUNT"
        },
        "queryType_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "COUNT"
        },
        "queryType_SEARCH": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH"
        },
        "queryDefinition": {
          "title": "Query Definition Details",
          "properties": {
            "timeInterval": {
              "type": "object",
              "title": "Time Interval",
              "properties": {
                "from": {
                  "type": "string",
                  "title": "From"
                },
                "to": {
                  "type": "string",
                  "title": "To"
                }
              },
              "required": [
                "from",
                "to"
              ]
            },
            "apiKeys": {
              "type": "array",
              "title": "Api Keys",
              "items": {
                "type": "string",
                "title": "Api Key",
                "enum": [
                  "a52e39b2e85f44518c9557bef07cefb7",
                  "c379d9cfb0dd490a8399734afa7e28c4",
                  "63ef06b39d47413989f52fbd5be19761",
                  "3daaa577d3084251b2f22bb5bcfb092c",
                  "ce5679c23cd648e19896ce11c9183acf",
                  "71c9782424b64dbbb2e3b1b5ed7b9357",
                  "bd8bba27f49a45f69296a8f57715887a",
                  "722aacea2683463e965c0992d0a1fed6",
                  "d503c0c1e0774c33b6906f5379a114ab",
                  "a59de855c96448acb6f303edc6e26fe7",
                  "f621bcb5b7d44c238631e5e2cea96ac6",
                  "09a8a9e5c81b48f69fd43c0c3defddb0",
                  "d9b0f8ea7f7a4622999c8e1c15933a1e",
                  "dec38ad6b095403e8a1535585b2e9078",
                  "29f94443bbe74b49a9c67fa7a27fac84",
                  "7508fdb7357a4420b1d09271fe682905",
                  "bc81f22c34e84caa96e1d42e8c6df284",
                  "785336eafbea4c1d9c8c47f8cc07bf20",
                  "4a0d6a3658874b6c84e24424f73d5b34",
                  "c9933ce47b76448eaa8dd834a6edb588",
                  "d71730a87ca84a59a2ce94b9bbcc066f",
                  "1e4533bef3f74093b9ddcf727c32ecbd",
                  "6fc4f795c08846368f2ebcf942c38257",
                  "2584ca43d8c34818b409d70813725d06",
                  "75cd2758726d471abb499ba4a83cd43d",
                  "ffe9924c2c0a42fc97ffd80e85d37bc2",
                  "9791ea76c17a41b7b19e0c5de66cd595",
                  "aa51af2df7c3427faf9d8590fe464bc2",
                  "909009c5214249d18054565e6c57886f",
                  "c3609dd96eac4376b20890494e882a38",
                  "d7366e9c1f7a4c3f97cbc340c757d55b",
                  "42e71d5576964354b51688a983caa52c",
                  "1ac2152179c3469e8c9bd1b9b62de1f6",
                  "2f0c928b61654c36ade08c8c23bed62b",
                  "639e54158b254306ae68867995b70ee9",
                  "f5fbf33974794e859696defe6fc9818a",
                  "dfee9ead4fc245d59f7968c87e40709c",
                  "2d58cd1208f34a7886f8ab0760055ab3",
                  "45e8b0e39aba4eebb15ddf134e9b0bd9",
                  "0971189a1331474abbb8633f2c11bba1",
                  "b400399bbf444710af162ee1668aa47d",
                  "37429d6b9e304fafa37c64358921f565",
                  "26ceda9f2a694254979100a8455f0e73",
                  "2aa724b75a684e6c98bdfe9b00d94a08",
                  "ed7401c749404258a4c264f6b0f1786b",
                  "eff377216fae4ac0bbf41864d115cb22",
                  "014d336197b94414910b7317b5d019d1",
                  "0f61671976abf7f85d1c98b207830f6b",
                  "2c84e84bb902457aad6cb73206db923f",
                  "3563c230c22945f1826644bdb9534d95",
                  "fbe2a04cb5144f4cb8ec2a13f326398c",
                  "66a15471554f4326bbe5c2eb73c49ee3",
                  "JJ9QFssRnxzms2GPPRCBnMDXHjKQNAMW",
                  "58b6ec9ece784e88a575663cbb69074a",
                  "fa40c38d914340fb89f0c63027833a9d",
                  "3e99952c2cc7f1f566126deaff432996",
                  "uFBV0VlouC8OfU38v0l6lG0oVQ0kDqvr",
                  "d4cd446bb89a43c28a15d8909ad58f3b",
                  "1125ee6b84fc4dce83b890763fd567c3",
                  "529ec2c526214e388f13bd7347342483",
                  "604df5ac990fbc67dab8fc098af271e6",
                  "8430105cfa7149bf9273e8046b9751e0",
                  "f84c1db8380944308a93e085b5b1af86",
                  "6c228c145bc04142b13dd7b2c429d62b",
                  "3eb1d5c4b4df444a81e41afaf7053cd1",
                  "60bd7f41a86549698ec9d36b1243a3b5",
                  "65c9d01e68d945d9a3629c6a67a96127",
                  "634720b45ec046a1a193810f87755674",
                  "e71db157a8724cafabd2c579602b10d6",
                  "fe43a8180b58471084a27afc8b781b67",
                  "2f75c16649c04335b666ace790f3631e",
                  "13b9e5d0b4d342dd9ed599d196dcb5ad",
                  "a393b43b8a4047018db5ddd28bea8bbb",
                  "183e4c1b72294c60ac2fcc5de3bc2bfd",
                  "b46b718c759a412aa7ab20c1626062d3",
                  "f06ec13a06cb4faba310c583fa4419ba",
                  "17b573bf92c64b4dad88d1d6d5a3eeef",
                  "83e130a304f2489385b6d267105ee40b",
                  "0fb1db8761ac4a85b4eac8ec49a16867",
                  "6801c617d31745499828eed4c696f4bc",
                  "AjYFBMpbQdCoAFomuHhhFNNjvP5LHCfo",
                  "3bf2a0a885f94f279b9d86568182d75d",
                  "3db6d8afe2d24a78a2e7b976457a40f5",
                  "c2a8ae12b885451b90b86beee0c6e374",
                  "235104cf93754fa0b4b4c7983693842f",
                  "4c4d6d5691fd4e7db73b20b6edd27fe2",
                  "3c93dabcea2147c48f142e1fad482c36",
                  "b3f9b26bdd8f60ef0e2c2c0be0b74260",
                  "GvHfSjHAScUuTAasglA81CmfCEtciNmt",
                  "9692a066e340d51cb0b19f27ea06b364",
                  "e66654556ca510d3487c647399a2caf2",
                  "8ee5d5e1e43b4a92835709f4c4a973c9",
                  "689175898efa478d96d0dfda038e4dad",
                  "3fbe6187e6904dae93606048e2ff003a",
                  "f046805b8ac1461ca76dcf2e3d3f4040",
                  "96562a9d820d441cbc480c7a3758df7b",
                  "6392fc87a33447529e12a454da6c339b",
                  "6fa08f482b4c473880aa0215b3c5de39",
                  "V2ztxK2rFe86jD7zYkRhDSAdrOrcY5qo",
                  "9b67e2693d374162be5e2b1b0c66f036",
                  "0973656604e444bcba03231584b74870",
                  "5c31057bc55c4963837049a6d384b567",
                  "d11ae88278b74a6c931176ca4b7b164f",
                  "b4357251c0574a5e98661bbd06c2ca11",
                  "97f3c5a6f2d945528977e86535b927dd",
                  "HipATLcFtfhaa4NGPzk1dcPsIweaGmLh",
                  "3cf82ad2309640b48d43953c661fca7f",
                  "1a79efcfbfb34ff2b704e4dcde4e8fe9",
                  "2db786407faf4d2fa01bbd07f9a93e79",
                  "2918d633d2fe458f89fff1c241b96e9a",
                  "x7vQOMYuj1sZ6zeTNFeqL83qadqFT0Zm",
                  "480dd90425224c2f8cc9a77a402df105",
                  "c3526ba3fa99454896e0e6a9f4c3c4cc",
                  "8b96563e98c2433585767cb2fe1bee21",
                  "6d0b3139a676431992558dda67b6ba65",
                  "OMA5xOj8iBFRAcHJRmJeenKm4lr8UYTT",
                  "c6YGngARruDia5MOwAKgaMxyQdGnJ60H",
                  "fV8NesDn4r3e02A3XeAAhcGGqEb72W90",
                  "fe69ca7dfd6149ec9a47b3dd521e7644",
                  "fb7295e9e6f1427ebe937023e9114228",
                  "7a809a5636e84d1bac1d6f644ce8b56a",
                  "a692b345717e4adb85879bcee227bca9",
                  "fe1a806e420a45179b88e3689ca63446",
                  "e476082cf7af49b1b817e34c91d3486e",
                  "4eeb5d540ff54cf6b077ec469f2dd806",
                  "f4fc174d4733428e86fc38fc7f7bb748",
                  "e0c1977f09a14a7f8ffc35249e740bd3",
                  "003d23de388a443a813d8c2aeee76418",
                  "a90f1203bd8b4f16bd942870c6e14fbd",
                  "6eabe1249ed14043ac393cb5248f4fb6",
                  "819a5f22f3964bbc99931139ee2eb538",
                  "864d71cdaffb4e03a43a535c23d3292a",
                  "18ba5cb2b70d4093a20a362078f0958c",
                  "UnZqOVp4laTfF1l71GqnzXR5e34MUG3M",
                  "2c8792edf77a4bfa86f442bbf79da4e0",
                  "d79960cf15db4422a34d52785e088262",
                  "0e393a6f3c9c4e08aab38db741953af0",
                  "cede30a1de9c44f6b9183ff9be9ae309",
                  "e1a0f189b4f44b998fc8e47d515ab418",
                  "2b0d95e5167742bfaa87b50141d327b9",
                  "b38695ad77ef4d31b11192f8d80d9a8d",
                  "37504a549ca94c2fbcff1cc7ebfd89e2",
                  "6ac66961851f424f87aa7992a5cea5ca",
                  "5310815a01e14e95bfedf1b655fdef03",
                  "3e33684992de4c85a09d565eca3c0591",
                  "1edd47e8e8424d728f648f9c679f1fae",
                  "e12b65ecd73848db87c5ee7eb3f439e5",
                  "WZWxsKIlLOuwUxyn43usGMl2mBFJuczV",
                  "j2S1P01uImUQum2LFGuO9z2Jin0iqak7",
                  "f5e0a094f420d987ae37ef31813f3e46",
                  "IOGl4gRimt6h9gpPCfABcMjfPNKPzQer",
                  "m2ff39ba49a5498b8c7093c677016b87",
                  "2e57292fec6b4c7e9f9d0ccf49358a74",
                  "b9bdf962b01f4d39a524da440c3a9a24",
                  "3241a555f3bb49e0abebce79e2d9c683",
                  "c67b808be97b4ed7b1de747a7597c6ae",
                  "131457365d7a4b868263b1408386a4e9",
                  "73cb362d47024acebac4a5d7811f16e8",
                  "8a9ba4f6a62142e79e31d95d0b320df5",
                  "98a16c977805f1614cc9017fc0ca027c",
                  "e4eb2861e24ff944d3aa0e16bcb91122",
                  "drLb",
                  "drMonitoring",
                  "slowpitchstats",
                  "T38IByPBQUvbLHxrI1x9kIuY3BTTQSIb",
                  "95204aa36c9e464d95a9f94166ce1df7",
                  "GrEaNYFccnbzjiaNdGjyG627SiWCmv3g",
                  "LFiVpk5qjj570GwT6w8eSaVek9dcyUyo",
                  "dd05220dbc214907a081a449982f3d26",
                  "393169b895e84e13ba6389c0e412d193",
                  "jPvJi1XNitsGyJ8AFDNAizCAdVLKXm2y",
                  "6d9cc52eadd14cd7847b588468863592",
                  "5825c528f47a4f45881a6753c57b3a7f",
                  "11aa0d2e8f55487e99e67a15a9ff6168",
                  "989529bd2f0e4238a3012263d3d48241",
                  "6809b4l0G127438bb773d2d6ec18c394",
                  "4b9a7d96ccad47e0846628ac504b1e1b",
                  "74ba26c4a9d049be86c7cdb092417d97",
                  "fa1eaa5b2242410c82ff92323fcf6d47",
                  "a5a154df5b7840588172fc85ebe71e87",
                  "17d0e59684b34c3aab2861d0248cc25b",
                  "0c546c8ae3874452a66e37d505bec29a",
                  "01815239b9bb48869dea0f48b08ad5b7",
                  "cfb3cb708ce14e069555f231933454b6",
                  "83768800514044c883c1761ae50bffb4",
                  "61972e2ace5b43caad61136ee9ad9254",
                  "dbb3a637c32a4af1ad2410f8d32a7c84",
                  "01186811f3224264b1e564fcf5b7fdb9",
                  "e375ca2119cf4c14aa18ac3722dd07fb",
                  "ec48db0385914ebe9200d9547cb27c5f",
                  "21ea08fb07aa419aba9c4b4f077562d1",
                  "14e24fa4909743038e494db6b4b85697",
                  "65168b875d2b4a2da0321d75834f2620",
                  "8ba21719b32a41bb85a83f70ee999ec4",
                  "bf3c4e727412474c9d105c8d5b6f61ad",
                  "fee22d69e94a472192b30c23b3ac6ac7",
                  "4d0164638250450499a5483fc886f476",
                  "d87c355242804c4db2b474b070c100b7",
                  "47c970d8fa144db28a4908766d3e552b",
                  "75c5079cc5c34a4daca144acb33f191f",
                  "405ccf3d4bc541b6bf95b9ac8f732db7",
                  "11b3ec91ec684ad5b2c2bbcf0e117028",
                  "d0f92bb7bc42475994985532676e4d29",
                  "2b07a6cc14ba46b0ae52bafef48b7272",
                  "875fa335caaa46089d1e27455ba6b46a",
                  "e14e408740894337b29667ff124c3747",
                  "bd4ba131e94a49c48fc4621e4e208391",
                  "77c8cb21f0ee4d1e917e976d40a0192c",
                  "5d6509415b35421eb4c592f7f97fd5f2",
                  "b838ddb2e2814523a79accc70ae46417",
                  "b646a118ccf140508b0253c9a44d3e12",
                  "f9a80526573b495fb75b518b2b89354e",
                  "6d240ae497f14063be4c690890a60f86",
                  "31d1063fb493428794cc6b9a24f0af82",
                  "5c8c0596d0204a48bcf982e75f7b0057",
                  "badf3f7d1a924ef5b32c732a0dc85b66",
                  "7c43df67376442a69005f5cae5c3b25b",
                  "9d7500dc9bdc4b6381e66015387823eb",
                  "2159d7e4c5c047e6bd3745c85e403756",
                  "0ab3d1d0b1dd46e4839966bcd1b415c0",
                  "02561c33bd18412a9502326922b83a02",
                  "2815b31e5dd54c0aabcb32bf84a79bd9",
                  "25d0b5c0ecda494faa55f76384567c75",
                  "e75e39d4e89042c094d4c1b1c6a5d86e",
                  "7c73cd5e8e8f45689235f51f70732f8e",
                  "9130902f881a44aeacc8f319419cc929",
                  "10a0d29e20a14fbb87749cc73f8efff3",
                  "00dddd556c33472ab7afb4ebc7843282",
                  "0d5bf93475ea4372a96ef75938239fa2",
                  "2011706e978d4653b536ea3ea85b3005",
                  "36025fe36a014fc8a8c2ba4b585ab58c",
                  "4011d0dbbd4742f0a31fc3dbcf0c4299",
                  "592b25979f1d4ba3bdef695a144d64c0",
                  "9e1d95dec9d543f7a1a28345c64a2b73",
                  "c337ae62486445f58609a83cf0446851",
                  "fe7384de29d0498d99fc169315ee63c9",
                  "434920cfddec4c318beccf809d919a94",
                  "4009d041afec4bbda55cfcb32eddf94d",
                  "09fc9b3ad0c6494294ee7e6adabdcaa9",
                  "dcc4505ad4644b428264f44922b12ee5",
                  "fec7126def664064840f03dfd693b524",
                  "47ec2875c3e74c8e965b918a0dd0b37f",
                  "0cf750d174b4421c948323ff0f150eb2",
                  "82b2bcac1a5e429bbc14b12f558ef1d2",
                  "52020246f6e94edb861d4b7c86cf1659",
                  "f2c6fcc010824c05989a44e69e588742",
                  "bf2136f4b1234b48bd94ddf1f97d4e67",
                  "36b3419fa81d434ebfddbe1415356e0b",
                  "c65d281d6d3941e49982bd634fbbec25",
                  "6fe5bb8863c24a3fb4a1515c26153da0",
                  "270a9538f6f44736bb8834f8f14d61a6",
                  "03a5370a46014fe0a4da4241682e6079",
                  "968adfad396c41b1b8c2ed54dd2ee471",
                  "7dd17e4290984c9fb39d421a565b7abb",
                  "bbddf0b2ae65413d91fa2ec54c352e51",
                  "47618a302887457783034cddee3cac73",
                  "ef029932ce20412a9e4dac1ea7fe83b3",
                  "46c4a16e6b3748f58f918cd7e20c06f1",
                  "a9a505bb3b6c4648b071f9e774d4e3f7",
                  "996d2558219840f3869d0feee75a4ba4",
                  "13626bbd97224522a159545a50c28383",
                  "de6c4779b8584f9fb1a1b880da974fc6",
                  "6163570332e746479d2052a10f1f4315",
                  "6b43a7c9ff634eef9d0a1d430b994609",
                  "0c6cb9bf180043458fbcd9a74f4ee5a3",
                  "b679d652d6704c9e8c5a812157552329",
                  "83fb8058737345aba941639128699cd7",
                  "5b026578210849e0a3435a95b95d0ea2",
                  "19e3ed05bf584df69be668709fafa954",
                  "360897d6b74b4d7a8f80bdff388e0ca1",
                  "3ce90c17b5e64559b9f198efb5418913",
                  "d487033298da4c4e8532f8da8d4bc2e4",
                  "49ea6136b8b94019897647eb6cb40b6d",
                  "289d7fecc9814fd7953223d7ef4c0350",
                  "de1c2c1beb49463b9cc01c8785d06051",
                  "a26cf34353044b78aa9e20a3efcf0abb",
                  "5ba8c5935f29425789687688a0bd778b",
                  "39af461e1a9249d0af8896fa8443979c",
                  "1d18eaea1bdd496d9d78589359a72bd5",
                  "30d9063c1cc641d88ea46b6058ebc38f",
                  "29698303f906482a906dca00f94f8d01",
                  "91017dfa6e484fa3b8da08db8a553905",
                  "e0a7add820724303872d7f6ccf24392a",
                  "aa631b2b61f44f9c8a2f50fa909007e7",
                  "e85ef23487124be5a3844dff4e15d318",
                  "5fd2a624e71746c981f58d7ac79e9fc4",
                  "6345e570f5d04a80a26e0916a654c974",
                  "839ceead92404cbdb4419ac6ef7f6d05",
                  "d8d5550c60f44055830fdd5c5a3d05bc",
                  "4e2672ea3d2d4d69b8dda44a00806e34",
                  "3ff138ba511b4ea19e03825a8565599f",
                  "183f5c47c9784caea04bb4bcfd160806",
                  "Mf9WXzGfr2B8UgF63ucNGLpmCNmuHJGe",
                  "84LfuDZFMzh4OkqAEqf9FwzzAm9a5m7z",
                  "4GEFGGGU8KltQGPpqClVXLusU7I9xDvw",
                  "3YGONLdp1Ze88sLyBDbPFN8DUR5oQI4p",
                  "EwUZtJiOJIlnkLq2k46V5txKR3bjJWq8",
                  "lv1kDTOXvnNQvuFpkM5Af1NIFtK9TOAD",
                  "mw8GrV3n5RjkoBCyYXmuApRf9bs5Y8Id",
                  "BIPVgoickzA3F3f6vDolpNdyyVIJqNu9",
                  "b97fd7152d804d429d706e1b8f82cb2a",
                  "27fb8aa9e9e94f4da269144fc92dbac7",
                  "9485fa7b159e42edb08a83bde0d83dia",
                  "x4Uo2cwIaUr1GSVHEPY82EQ15MWOuHUa",
                  "HBAgVRFqtU232A82hGGINxxXHDbHFi5q",
                  "Gr7UzxdwWXOTHbyPD2DGsFTMV7cAGt0f",
                  "ffde04838d9e4778a9295ba5f825fd84",
                  "29f2aa5dfbe21265da9df360e9c40f34",
                  "192a09e3f41571b5421dec528c76c846",
                  "21f64753cf014b9783a73e9645ee640d",
                  "817f2a161e624076b35219965b88a25d",
                  "7c80329a76e14e6e8fe252d5d67562de",
                  "f5a8d5cdf1a84a548ca7b3dd87d3f097",
                  "7eb58ac6d2b0437294159cce8d968995",
                  "c5017f3034ff48ce8bac77defcc27fff",
                  "e4e5b7be6f0343b4aa7530c104329b42",
                  "2ed1ec032d0a43c6b694d90166597ca2",
                  "1b3476bae4e94fa08f156ea59fdf51fe",
                  "99e21358c19c4ced9d1932a29f0623f1",
                  "5538a2fed2f94d038ec48cc41beb6a38",
                  "1fb4b501e1504cb49befc0adc661747d",
                  "8e3fd8a6b52e48a38170c9be9b29ffe1",
                  "OfEXe4Rr9ON0F0buy7GfwlMJTQztRCUk",
                  "P6CpVQdHrJD4AixO6zRZO1sd1aD0WmOi",
                  "O2k6McH9iN7UGAJoVWUDzFU5AKgkhNkK",
                  "deb09d9fce9b4cf2a1b6e0570227a6e5",
                  "74d07d5ecbd0466cb3e6016ce91aa466",
                  "5af30905f7874fb0962f153ec990e9f5",
                  "LjJiINSM8m6aLAZ5GzOXvABPiAgCaRmY",
                  "4af9b12fbb284f069a1887d67cda5a01",
                  "0fffa5a070a3409c9fec8211f35ca945",
                  "5f5105c7a96d40c3b02de118d7aea4e5",
                  "5954b627ade9405c9955687939ffab6a",
                  "5de150dc29228095f9811cdf15ea5938",
                  "b0dc30922cd14014857de1fc83208529",
                  "ea243ea946744e9d9cc7290a9dabf438",
                  "02fa6c6228f9df9bf445d28216705a97",
                  "77d378c27c11402285201cdf2dc0bccc",
                  "780e6221a2ee627b0ae1cffcdf31f9aa",
                  "36tnbk7frf5suyj5gby3j6yb",
                  "SNvVwAFtjoq0UOuAJ3Rj7lZl4BPjoENy",
                  "66759a8a36a3463c8523b31ecc5b65ef",
                  "5a7b5d42d95d418b9cf7f7410f7972f7",
                  "8ac42ccff20845f2be98ea157a5477ca",
                  "ffdd879d12a34305bb4d0dd5ac1dffaa",
                  "ef5462596d6b41b9be9d8c724e1906a3",
                  "f5a213b29d334070b40bd3e1f6fb6b6c",
                  "3c9b552c6fc64cfda6bccb86efb4c297",
                  "4210306424e546b78990dd9ea42bb5a9",
                  "W8p50dcae1884cd9a945472ad60b9afe",
                  "398fd4cd5b484aa1a47a10dee2a8fca3",
                  "84fc57c62fbd4dff8b8f29ec6c896dd3",
                  "SKqtQ0XopVO70r4k0okPGHDmAZxOACSR",
                  "eAmN9NUzzDdvAD1Xwvtf3L8UVq6MTycC",
                  "AhGyi9pPBPmRsA14rCGcvTlHT9cVDECe",
                  "4e1d0267e2b8406ebee074ef7b81867d",
                  "b0b53721112a43238a21907e6ddfbfa5",
                  "c37f4c6cf2d6416fbde31c5197a6747a",
                  "9a7b3aa0dd924a5bb5d0d6ee382cb0f1",
                  "b691279436264b0aa1c60b51c536383b",
                  "ca16fb2bc8b8467aa35a15f885565915",
                  "c1c7ce2f588248cbb35cc47e7749e024",
                  "40943e90d623415391d1677e91c10e4d",
                  "5ef7f2e4ea66403685823e72dcb2f50b",
                  "3931467461dc4c22b03bd23545a8b9e9",
                  "d4f5388ea0b040baaaeeeaf31a39bbfc",
                  "2d6c9790b3c74fa8b5bd40be56c944a0",
                  "ef251a886f594732a5ebde1cbb63318d",
                  "7bb58f576e1a4f0d9b0b05345e4fc00b",
                  "32ad5ead59b048b2a4784a748571aa7e",
                  "0e3080b2c3b745c2a4c25009fd3470af",
                  "2a2c8fb134624033b0e2b0295046296e",
                  "bcd1f840d68e4f86b49524ed7312b454",
                  "c9035ba3f06a41eea2015c17d7bb4c91",
                  "1ea8a8c2acac4307bb5a9a6950906516",
                  "4e3614e0fc8b4d75a074d0a12e0a863b",
                  "8370f74a7b6441aa8b34b4a8770b8753",
                  "b78be955d5b54f6198e6d61e7f8112c9",
                  "b662deb3a4024e90b94f491689d15eca",
                  "360b4801a0eb4321aa3d187855026cbe",
                  "a7e2af2a8976518a2e9d50abb0879417",
                  "R27RpTAwWXl9CEj0oam3ABhm6KfNXhAY",
                  "ffff826ce66ee941c47ae664eb1ea75e",
                  "fPFPi36zIGKmIX33D6FujlGTSuZeHUEb",
                  "e8801e97251c4f6298b1a3e8282ae169",
                  "e3e03a04bd704fc783f93410e41005fc",
                  "2d022a0bc7a14e788f74df5fb6c38e12",
                  "451402db08cd4b90ad538fca563359ac",
                  "b88f4c94a4774dcea2e9ab54fa595ce9",
                  "3e3411ccd49648e1a568521612eaf73c"
                ]
              }
            },
            "serviceIds": {
              "type": "array",
              "title": "Service IDs",
              "items": {
                "type": "string",
                "title": "Service ID",
                "enum": [
                  "CFSRFNotificationPush",
                  "absorb-sso",
                  "addresses",
                  "admin",
                  "admin-jobs",
                  "admin-products",
                  "api-directory-service",
                  "api-key-service",
                  "aqueduct",
                  "arctic-pricing-processor-web",
                  "arctic-usage-web",
                  "audit-service",
                  "bvseo-proxy",
                  "catalog-pdm-shopper",
                  "compliance-affirm",
                  "device-information",
                  "devprod",
                  "digital-rights-service",
                  "dispatch-metrics-service",
                  "display-management",
                  "fmis",
                  "forge-settings-service",
                  "fps",
                  "integration-provisioning",
                  "managed-inventory",
                  "merchandising-offer",
                  "merchandising-shopper",
                  "metered",
                  "mosaic",
                  "msuni",
                  "notification",
                  "oauth20",
                  "om",
                  "orca-admin",
                  "pricing-shopper",
                  "reporting-auth",
                  "riskified",
                  "shopatron-inv-orca",
                  "shopper-api-reporting",
                  "shoppers",
                  "ssr-ms-shipment-storage",
                  "ssr-user-management",
                  "swagger",
                  "testService",
                  "trace",
                  "v1",
                  "v1ods",
                  "watch-service"
                ]
              }
            },
            "clusters": {
              "type": "array",
              "title": "Clusters",
              "items": {
                "title": "Cluter",
                "type": "string"
              }
            },
            "documentTypes": {
              "type": "array",
              "title": "Document Types",
              "items": {
                "type": "string",
                "title": "Document Type"
              }
            },
            "properties": {
              "type": "object",
              "properties": {
                "count": {
                  "type": "string"
                },
                "interval": {
                  "type": "string"
                },
                "siteId": {
                  "type": "string"
                },
                "responseSource": {
                  "type": "string"
                },
                "responseStatus": {
                  "type": "string"
                }
              }
            }
          }
        },
        "CreateWatchDefinition": {
          "$ref": "#"
        }
      }
    }
  },
  'v1-furlaeu-decrease-traffic-sprike': {
    "links": {
      "up": {
        "rel": "up",
        "href": "http://localhost:8082/watch-definitions.drive?offset=0&max=10",
        "title": "Back to list"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:8082/watch-definitions/v1-furlaeu-decrease-traffic-sprike",
        "title": "Delete",
        "method": "DELETE"
      },
      "edit": {
        "rel": "edit",
        "href": "http://localhost:8082/watch-definitions.drive",
        "title": "Save",
        "method": "PUT",
        "type": "application/json",
        "$ref": "#/definitions/CreateWatchDefinition"
      },
      "self": {
        "rel": "self",
        "href": "http://localhost:8082/watch-definitions/v1-furlaeu-decrease-traffic-sprike"
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
    "schema": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "WatchDefinition",
      "description": "An explanation about the purpose of this instance.",
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "path": {
          "type": "string",
          "title": "Path",
          "readOnly": true
        },
        "description": {
          "type": "string",
          "title": "Description"
        },
        "active": {
          "type": "boolean",
          "title": "Active"
        },
        "trigger": {
          "title": "Trigger",
          "type": "string"
        },
        "policyDefinition": {
          "title": "Policy Definition Type",
          "oneOf": [
            {
              "title": "Average Response Time Spike",
              "type": "object",
              "name": "AverageResponseTimeSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "AverageResponseTimeSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_avg_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "avg_response_time_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Decrease Traffic Spike",
              "type": "object",
              "name": "DecreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "DecreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Flatline",
              "type": "object",
              "name": "FlatlinePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "FlatlinePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "predefinedMatchingPattern": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "flatline"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Error Spike",
              "type": "object",
              "name": "IncreaseErrorSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseErrorSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "eventsCountThreshold": {
                      "type": "string"
                    },
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "errorCountThreshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "SERVER_ERROR_RESPONSE",
                        "ERROR_RESPONSE",
                        "CLIENT_ERROR_RESPONSE"
                      ]
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "date_range_terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "error_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Traffic Spike",
              "type": "object",
              "name": "IncreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Service Availability",
              "type": "object",
              "name": "ServiceAvailabilityPolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "ServiceAvailabilityPolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "NON_5XX_RESPONSE",
                        "OK_RESPONSE",
                        "ONLY_200_RESPONSE"
                      ]
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "service_availability"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Slow Average Response Time",
              "type": "object",
              "name": "SlowAverageResponseTimePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "SlowAverageResponseTimePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string",
                      "default": 100
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "metrics_avg"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "slow_avg_response_time"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            }
          ]
        }
      },
      "required": [
        "name",
        "path",
        "active",
        "trigger",
        "policyDefinition"
      ],
      "definitions": {
        "alertDefinitions": {
          "type": "object",
          "title": "Alert Definition",
          "properties": {
            "alertType": {
              "title": "Alert Type",
              "oneOf": [
                {
                  "title": "EMAIL",
                  "type": "object",
                  "name": "EMAIL",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "EMAIL"
                      ]
                    },
                    "subject": {
                      "type": "string"
                    },
                    "from": {
                      "type": "string"
                    },
                    "to": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type",
                    "subject",
                    "to"
                  ]
                },
                {
                  "title": "CONSOLE_TEXT",
                  "type": "object",
                  "name": "CONSOLE_TEXT",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "CONSOLE_TEXT"
                      ]
                    }
                  },
                  "required": [
                    "type"
                  ]
                },
                {
                  "title": "SLACK",
                  "type": "object",
                  "name": "SLACK",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "SLACK"
                      ]
                    },
                    "webhook": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "channel": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type"
                  ]
                }
              ]
            },
            "firingPolicy": {
              "type": "string",
              "title": "Firing Policy",
              "enum": [
                "CONTINUOUS",
                "ONCE_WITH_FOLLOW_UP"
              ]
            }
          }
        },
        "queryType_SEARCH_WITH_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH_WITH_COUNT"
        },
        "queryType_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "COUNT"
        },
        "queryType_SEARCH": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH"
        },
        "queryDefinition": {
          "title": "Query Definition Details",
          "properties": {
            "timeInterval": {
              "type": "object",
              "title": "Time Interval",
              "properties": {
                "from": {
                  "type": "string",
                  "title": "From"
                },
                "to": {
                  "type": "string",
                  "title": "To"
                }
              },
              "required": [
                "from",
                "to"
              ]
            },
            "apiKeys": {
              "type": "array",
              "title": "Api Keys",
              "items": {
                "type": "string",
                "title": "Api Key",
                "enum": [
                  "a52e39b2e85f44518c9557bef07cefb7",
                  "c379d9cfb0dd490a8399734afa7e28c4",
                  "63ef06b39d47413989f52fbd5be19761",
                  "3daaa577d3084251b2f22bb5bcfb092c",
                  "ce5679c23cd648e19896ce11c9183acf",
                  "71c9782424b64dbbb2e3b1b5ed7b9357",
                  "bd8bba27f49a45f69296a8f57715887a",
                  "722aacea2683463e965c0992d0a1fed6",
                  "d503c0c1e0774c33b6906f5379a114ab",
                  "a59de855c96448acb6f303edc6e26fe7",
                  "f621bcb5b7d44c238631e5e2cea96ac6",
                  "09a8a9e5c81b48f69fd43c0c3defddb0",
                  "d9b0f8ea7f7a4622999c8e1c15933a1e",
                  "dec38ad6b095403e8a1535585b2e9078",
                  "29f94443bbe74b49a9c67fa7a27fac84",
                  "7508fdb7357a4420b1d09271fe682905",
                  "bc81f22c34e84caa96e1d42e8c6df284",
                  "785336eafbea4c1d9c8c47f8cc07bf20",
                  "4a0d6a3658874b6c84e24424f73d5b34",
                  "c9933ce47b76448eaa8dd834a6edb588",
                  "d71730a87ca84a59a2ce94b9bbcc066f",
                  "1e4533bef3f74093b9ddcf727c32ecbd",
                  "6fc4f795c08846368f2ebcf942c38257",
                  "2584ca43d8c34818b409d70813725d06",
                  "75cd2758726d471abb499ba4a83cd43d",
                  "ffe9924c2c0a42fc97ffd80e85d37bc2",
                  "9791ea76c17a41b7b19e0c5de66cd595",
                  "aa51af2df7c3427faf9d8590fe464bc2",
                  "909009c5214249d18054565e6c57886f",
                  "c3609dd96eac4376b20890494e882a38",
                  "d7366e9c1f7a4c3f97cbc340c757d55b",
                  "42e71d5576964354b51688a983caa52c",
                  "1ac2152179c3469e8c9bd1b9b62de1f6",
                  "2f0c928b61654c36ade08c8c23bed62b",
                  "639e54158b254306ae68867995b70ee9",
                  "f5fbf33974794e859696defe6fc9818a",
                  "dfee9ead4fc245d59f7968c87e40709c",
                  "2d58cd1208f34a7886f8ab0760055ab3",
                  "45e8b0e39aba4eebb15ddf134e9b0bd9",
                  "0971189a1331474abbb8633f2c11bba1",
                  "b400399bbf444710af162ee1668aa47d",
                  "37429d6b9e304fafa37c64358921f565",
                  "26ceda9f2a694254979100a8455f0e73",
                  "2aa724b75a684e6c98bdfe9b00d94a08",
                  "ed7401c749404258a4c264f6b0f1786b",
                  "eff377216fae4ac0bbf41864d115cb22",
                  "014d336197b94414910b7317b5d019d1",
                  "0f61671976abf7f85d1c98b207830f6b",
                  "2c84e84bb902457aad6cb73206db923f",
                  "3563c230c22945f1826644bdb9534d95",
                  "fbe2a04cb5144f4cb8ec2a13f326398c",
                  "66a15471554f4326bbe5c2eb73c49ee3",
                  "JJ9QFssRnxzms2GPPRCBnMDXHjKQNAMW",
                  "58b6ec9ece784e88a575663cbb69074a",
                  "fa40c38d914340fb89f0c63027833a9d",
                  "3e99952c2cc7f1f566126deaff432996",
                  "uFBV0VlouC8OfU38v0l6lG0oVQ0kDqvr",
                  "d4cd446bb89a43c28a15d8909ad58f3b",
                  "1125ee6b84fc4dce83b890763fd567c3",
                  "529ec2c526214e388f13bd7347342483",
                  "604df5ac990fbc67dab8fc098af271e6",
                  "8430105cfa7149bf9273e8046b9751e0",
                  "f84c1db8380944308a93e085b5b1af86",
                  "6c228c145bc04142b13dd7b2c429d62b",
                  "3eb1d5c4b4df444a81e41afaf7053cd1",
                  "60bd7f41a86549698ec9d36b1243a3b5",
                  "65c9d01e68d945d9a3629c6a67a96127",
                  "634720b45ec046a1a193810f87755674",
                  "e71db157a8724cafabd2c579602b10d6",
                  "fe43a8180b58471084a27afc8b781b67",
                  "2f75c16649c04335b666ace790f3631e",
                  "13b9e5d0b4d342dd9ed599d196dcb5ad",
                  "a393b43b8a4047018db5ddd28bea8bbb",
                  "183e4c1b72294c60ac2fcc5de3bc2bfd",
                  "b46b718c759a412aa7ab20c1626062d3",
                  "f06ec13a06cb4faba310c583fa4419ba",
                  "17b573bf92c64b4dad88d1d6d5a3eeef",
                  "83e130a304f2489385b6d267105ee40b",
                  "0fb1db8761ac4a85b4eac8ec49a16867",
                  "6801c617d31745499828eed4c696f4bc",
                  "AjYFBMpbQdCoAFomuHhhFNNjvP5LHCfo",
                  "3bf2a0a885f94f279b9d86568182d75d",
                  "3db6d8afe2d24a78a2e7b976457a40f5",
                  "c2a8ae12b885451b90b86beee0c6e374",
                  "235104cf93754fa0b4b4c7983693842f",
                  "4c4d6d5691fd4e7db73b20b6edd27fe2",
                  "3c93dabcea2147c48f142e1fad482c36",
                  "b3f9b26bdd8f60ef0e2c2c0be0b74260",
                  "GvHfSjHAScUuTAasglA81CmfCEtciNmt",
                  "9692a066e340d51cb0b19f27ea06b364",
                  "e66654556ca510d3487c647399a2caf2",
                  "8ee5d5e1e43b4a92835709f4c4a973c9",
                  "689175898efa478d96d0dfda038e4dad",
                  "3fbe6187e6904dae93606048e2ff003a",
                  "f046805b8ac1461ca76dcf2e3d3f4040",
                  "96562a9d820d441cbc480c7a3758df7b",
                  "6392fc87a33447529e12a454da6c339b",
                  "6fa08f482b4c473880aa0215b3c5de39",
                  "V2ztxK2rFe86jD7zYkRhDSAdrOrcY5qo",
                  "9b67e2693d374162be5e2b1b0c66f036",
                  "0973656604e444bcba03231584b74870",
                  "5c31057bc55c4963837049a6d384b567",
                  "d11ae88278b74a6c931176ca4b7b164f",
                  "b4357251c0574a5e98661bbd06c2ca11",
                  "97f3c5a6f2d945528977e86535b927dd",
                  "HipATLcFtfhaa4NGPzk1dcPsIweaGmLh",
                  "3cf82ad2309640b48d43953c661fca7f",
                  "1a79efcfbfb34ff2b704e4dcde4e8fe9",
                  "2db786407faf4d2fa01bbd07f9a93e79",
                  "2918d633d2fe458f89fff1c241b96e9a",
                  "x7vQOMYuj1sZ6zeTNFeqL83qadqFT0Zm",
                  "480dd90425224c2f8cc9a77a402df105",
                  "c3526ba3fa99454896e0e6a9f4c3c4cc",
                  "8b96563e98c2433585767cb2fe1bee21",
                  "6d0b3139a676431992558dda67b6ba65",
                  "OMA5xOj8iBFRAcHJRmJeenKm4lr8UYTT",
                  "c6YGngARruDia5MOwAKgaMxyQdGnJ60H",
                  "fV8NesDn4r3e02A3XeAAhcGGqEb72W90",
                  "fe69ca7dfd6149ec9a47b3dd521e7644",
                  "fb7295e9e6f1427ebe937023e9114228",
                  "7a809a5636e84d1bac1d6f644ce8b56a",
                  "a692b345717e4adb85879bcee227bca9",
                  "fe1a806e420a45179b88e3689ca63446",
                  "e476082cf7af49b1b817e34c91d3486e",
                  "4eeb5d540ff54cf6b077ec469f2dd806",
                  "f4fc174d4733428e86fc38fc7f7bb748",
                  "e0c1977f09a14a7f8ffc35249e740bd3",
                  "003d23de388a443a813d8c2aeee76418",
                  "a90f1203bd8b4f16bd942870c6e14fbd",
                  "6eabe1249ed14043ac393cb5248f4fb6",
                  "819a5f22f3964bbc99931139ee2eb538",
                  "864d71cdaffb4e03a43a535c23d3292a",
                  "18ba5cb2b70d4093a20a362078f0958c",
                  "UnZqOVp4laTfF1l71GqnzXR5e34MUG3M",
                  "2c8792edf77a4bfa86f442bbf79da4e0",
                  "d79960cf15db4422a34d52785e088262",
                  "0e393a6f3c9c4e08aab38db741953af0",
                  "cede30a1de9c44f6b9183ff9be9ae309",
                  "e1a0f189b4f44b998fc8e47d515ab418",
                  "2b0d95e5167742bfaa87b50141d327b9",
                  "b38695ad77ef4d31b11192f8d80d9a8d",
                  "37504a549ca94c2fbcff1cc7ebfd89e2",
                  "6ac66961851f424f87aa7992a5cea5ca",
                  "5310815a01e14e95bfedf1b655fdef03",
                  "3e33684992de4c85a09d565eca3c0591",
                  "1edd47e8e8424d728f648f9c679f1fae",
                  "e12b65ecd73848db87c5ee7eb3f439e5",
                  "WZWxsKIlLOuwUxyn43usGMl2mBFJuczV",
                  "j2S1P01uImUQum2LFGuO9z2Jin0iqak7",
                  "f5e0a094f420d987ae37ef31813f3e46",
                  "IOGl4gRimt6h9gpPCfABcMjfPNKPzQer",
                  "m2ff39ba49a5498b8c7093c677016b87",
                  "2e57292fec6b4c7e9f9d0ccf49358a74",
                  "b9bdf962b01f4d39a524da440c3a9a24",
                  "3241a555f3bb49e0abebce79e2d9c683",
                  "c67b808be97b4ed7b1de747a7597c6ae",
                  "131457365d7a4b868263b1408386a4e9",
                  "73cb362d47024acebac4a5d7811f16e8",
                  "8a9ba4f6a62142e79e31d95d0b320df5",
                  "98a16c977805f1614cc9017fc0ca027c",
                  "e4eb2861e24ff944d3aa0e16bcb91122",
                  "drLb",
                  "drMonitoring",
                  "slowpitchstats",
                  "T38IByPBQUvbLHxrI1x9kIuY3BTTQSIb",
                  "95204aa36c9e464d95a9f94166ce1df7",
                  "GrEaNYFccnbzjiaNdGjyG627SiWCmv3g",
                  "LFiVpk5qjj570GwT6w8eSaVek9dcyUyo",
                  "dd05220dbc214907a081a449982f3d26",
                  "393169b895e84e13ba6389c0e412d193",
                  "jPvJi1XNitsGyJ8AFDNAizCAdVLKXm2y",
                  "6d9cc52eadd14cd7847b588468863592",
                  "5825c528f47a4f45881a6753c57b3a7f",
                  "11aa0d2e8f55487e99e67a15a9ff6168",
                  "989529bd2f0e4238a3012263d3d48241",
                  "6809b4l0G127438bb773d2d6ec18c394",
                  "4b9a7d96ccad47e0846628ac504b1e1b",
                  "74ba26c4a9d049be86c7cdb092417d97",
                  "fa1eaa5b2242410c82ff92323fcf6d47",
                  "a5a154df5b7840588172fc85ebe71e87",
                  "17d0e59684b34c3aab2861d0248cc25b",
                  "0c546c8ae3874452a66e37d505bec29a",
                  "01815239b9bb48869dea0f48b08ad5b7",
                  "cfb3cb708ce14e069555f231933454b6",
                  "83768800514044c883c1761ae50bffb4",
                  "61972e2ace5b43caad61136ee9ad9254",
                  "dbb3a637c32a4af1ad2410f8d32a7c84",
                  "01186811f3224264b1e564fcf5b7fdb9",
                  "e375ca2119cf4c14aa18ac3722dd07fb",
                  "ec48db0385914ebe9200d9547cb27c5f",
                  "21ea08fb07aa419aba9c4b4f077562d1",
                  "14e24fa4909743038e494db6b4b85697",
                  "65168b875d2b4a2da0321d75834f2620",
                  "8ba21719b32a41bb85a83f70ee999ec4",
                  "bf3c4e727412474c9d105c8d5b6f61ad",
                  "fee22d69e94a472192b30c23b3ac6ac7",
                  "4d0164638250450499a5483fc886f476",
                  "d87c355242804c4db2b474b070c100b7",
                  "47c970d8fa144db28a4908766d3e552b",
                  "75c5079cc5c34a4daca144acb33f191f",
                  "405ccf3d4bc541b6bf95b9ac8f732db7",
                  "11b3ec91ec684ad5b2c2bbcf0e117028",
                  "d0f92bb7bc42475994985532676e4d29",
                  "2b07a6cc14ba46b0ae52bafef48b7272",
                  "875fa335caaa46089d1e27455ba6b46a",
                  "e14e408740894337b29667ff124c3747",
                  "bd4ba131e94a49c48fc4621e4e208391",
                  "77c8cb21f0ee4d1e917e976d40a0192c",
                  "5d6509415b35421eb4c592f7f97fd5f2",
                  "b838ddb2e2814523a79accc70ae46417",
                  "b646a118ccf140508b0253c9a44d3e12",
                  "f9a80526573b495fb75b518b2b89354e",
                  "6d240ae497f14063be4c690890a60f86",
                  "31d1063fb493428794cc6b9a24f0af82",
                  "5c8c0596d0204a48bcf982e75f7b0057",
                  "badf3f7d1a924ef5b32c732a0dc85b66",
                  "7c43df67376442a69005f5cae5c3b25b",
                  "9d7500dc9bdc4b6381e66015387823eb",
                  "2159d7e4c5c047e6bd3745c85e403756",
                  "0ab3d1d0b1dd46e4839966bcd1b415c0",
                  "02561c33bd18412a9502326922b83a02",
                  "2815b31e5dd54c0aabcb32bf84a79bd9",
                  "25d0b5c0ecda494faa55f76384567c75",
                  "e75e39d4e89042c094d4c1b1c6a5d86e",
                  "7c73cd5e8e8f45689235f51f70732f8e",
                  "9130902f881a44aeacc8f319419cc929",
                  "10a0d29e20a14fbb87749cc73f8efff3",
                  "00dddd556c33472ab7afb4ebc7843282",
                  "0d5bf93475ea4372a96ef75938239fa2",
                  "2011706e978d4653b536ea3ea85b3005",
                  "36025fe36a014fc8a8c2ba4b585ab58c",
                  "4011d0dbbd4742f0a31fc3dbcf0c4299",
                  "592b25979f1d4ba3bdef695a144d64c0",
                  "9e1d95dec9d543f7a1a28345c64a2b73",
                  "c337ae62486445f58609a83cf0446851",
                  "fe7384de29d0498d99fc169315ee63c9",
                  "434920cfddec4c318beccf809d919a94",
                  "4009d041afec4bbda55cfcb32eddf94d",
                  "09fc9b3ad0c6494294ee7e6adabdcaa9",
                  "dcc4505ad4644b428264f44922b12ee5",
                  "fec7126def664064840f03dfd693b524",
                  "47ec2875c3e74c8e965b918a0dd0b37f",
                  "0cf750d174b4421c948323ff0f150eb2",
                  "82b2bcac1a5e429bbc14b12f558ef1d2",
                  "52020246f6e94edb861d4b7c86cf1659",
                  "f2c6fcc010824c05989a44e69e588742",
                  "bf2136f4b1234b48bd94ddf1f97d4e67",
                  "36b3419fa81d434ebfddbe1415356e0b",
                  "c65d281d6d3941e49982bd634fbbec25",
                  "6fe5bb8863c24a3fb4a1515c26153da0",
                  "270a9538f6f44736bb8834f8f14d61a6",
                  "03a5370a46014fe0a4da4241682e6079",
                  "968adfad396c41b1b8c2ed54dd2ee471",
                  "7dd17e4290984c9fb39d421a565b7abb",
                  "bbddf0b2ae65413d91fa2ec54c352e51",
                  "47618a302887457783034cddee3cac73",
                  "ef029932ce20412a9e4dac1ea7fe83b3",
                  "46c4a16e6b3748f58f918cd7e20c06f1",
                  "a9a505bb3b6c4648b071f9e774d4e3f7",
                  "996d2558219840f3869d0feee75a4ba4",
                  "13626bbd97224522a159545a50c28383",
                  "de6c4779b8584f9fb1a1b880da974fc6",
                  "6163570332e746479d2052a10f1f4315",
                  "6b43a7c9ff634eef9d0a1d430b994609",
                  "0c6cb9bf180043458fbcd9a74f4ee5a3",
                  "b679d652d6704c9e8c5a812157552329",
                  "83fb8058737345aba941639128699cd7",
                  "5b026578210849e0a3435a95b95d0ea2",
                  "19e3ed05bf584df69be668709fafa954",
                  "360897d6b74b4d7a8f80bdff388e0ca1",
                  "3ce90c17b5e64559b9f198efb5418913",
                  "d487033298da4c4e8532f8da8d4bc2e4",
                  "49ea6136b8b94019897647eb6cb40b6d",
                  "289d7fecc9814fd7953223d7ef4c0350",
                  "de1c2c1beb49463b9cc01c8785d06051",
                  "a26cf34353044b78aa9e20a3efcf0abb",
                  "5ba8c5935f29425789687688a0bd778b",
                  "39af461e1a9249d0af8896fa8443979c",
                  "1d18eaea1bdd496d9d78589359a72bd5",
                  "30d9063c1cc641d88ea46b6058ebc38f",
                  "29698303f906482a906dca00f94f8d01",
                  "91017dfa6e484fa3b8da08db8a553905",
                  "e0a7add820724303872d7f6ccf24392a",
                  "aa631b2b61f44f9c8a2f50fa909007e7",
                  "e85ef23487124be5a3844dff4e15d318",
                  "5fd2a624e71746c981f58d7ac79e9fc4",
                  "6345e570f5d04a80a26e0916a654c974",
                  "839ceead92404cbdb4419ac6ef7f6d05",
                  "d8d5550c60f44055830fdd5c5a3d05bc",
                  "4e2672ea3d2d4d69b8dda44a00806e34",
                  "3ff138ba511b4ea19e03825a8565599f",
                  "183f5c47c9784caea04bb4bcfd160806",
                  "Mf9WXzGfr2B8UgF63ucNGLpmCNmuHJGe",
                  "84LfuDZFMzh4OkqAEqf9FwzzAm9a5m7z",
                  "4GEFGGGU8KltQGPpqClVXLusU7I9xDvw",
                  "3YGONLdp1Ze88sLyBDbPFN8DUR5oQI4p",
                  "EwUZtJiOJIlnkLq2k46V5txKR3bjJWq8",
                  "lv1kDTOXvnNQvuFpkM5Af1NIFtK9TOAD",
                  "mw8GrV3n5RjkoBCyYXmuApRf9bs5Y8Id",
                  "BIPVgoickzA3F3f6vDolpNdyyVIJqNu9",
                  "b97fd7152d804d429d706e1b8f82cb2a",
                  "27fb8aa9e9e94f4da269144fc92dbac7",
                  "9485fa7b159e42edb08a83bde0d83dia",
                  "x4Uo2cwIaUr1GSVHEPY82EQ15MWOuHUa",
                  "HBAgVRFqtU232A82hGGINxxXHDbHFi5q",
                  "Gr7UzxdwWXOTHbyPD2DGsFTMV7cAGt0f",
                  "ffde04838d9e4778a9295ba5f825fd84",
                  "29f2aa5dfbe21265da9df360e9c40f34",
                  "192a09e3f41571b5421dec528c76c846",
                  "21f64753cf014b9783a73e9645ee640d",
                  "817f2a161e624076b35219965b88a25d",
                  "7c80329a76e14e6e8fe252d5d67562de",
                  "f5a8d5cdf1a84a548ca7b3dd87d3f097",
                  "7eb58ac6d2b0437294159cce8d968995",
                  "c5017f3034ff48ce8bac77defcc27fff",
                  "e4e5b7be6f0343b4aa7530c104329b42",
                  "2ed1ec032d0a43c6b694d90166597ca2",
                  "1b3476bae4e94fa08f156ea59fdf51fe",
                  "99e21358c19c4ced9d1932a29f0623f1",
                  "5538a2fed2f94d038ec48cc41beb6a38",
                  "1fb4b501e1504cb49befc0adc661747d",
                  "8e3fd8a6b52e48a38170c9be9b29ffe1",
                  "OfEXe4Rr9ON0F0buy7GfwlMJTQztRCUk",
                  "P6CpVQdHrJD4AixO6zRZO1sd1aD0WmOi",
                  "O2k6McH9iN7UGAJoVWUDzFU5AKgkhNkK",
                  "deb09d9fce9b4cf2a1b6e0570227a6e5",
                  "74d07d5ecbd0466cb3e6016ce91aa466",
                  "5af30905f7874fb0962f153ec990e9f5",
                  "LjJiINSM8m6aLAZ5GzOXvABPiAgCaRmY",
                  "4af9b12fbb284f069a1887d67cda5a01",
                  "0fffa5a070a3409c9fec8211f35ca945",
                  "5f5105c7a96d40c3b02de118d7aea4e5",
                  "5954b627ade9405c9955687939ffab6a",
                  "5de150dc29228095f9811cdf15ea5938",
                  "b0dc30922cd14014857de1fc83208529",
                  "ea243ea946744e9d9cc7290a9dabf438",
                  "02fa6c6228f9df9bf445d28216705a97",
                  "77d378c27c11402285201cdf2dc0bccc",
                  "780e6221a2ee627b0ae1cffcdf31f9aa",
                  "36tnbk7frf5suyj5gby3j6yb",
                  "SNvVwAFtjoq0UOuAJ3Rj7lZl4BPjoENy",
                  "66759a8a36a3463c8523b31ecc5b65ef",
                  "5a7b5d42d95d418b9cf7f7410f7972f7",
                  "8ac42ccff20845f2be98ea157a5477ca",
                  "ffdd879d12a34305bb4d0dd5ac1dffaa",
                  "ef5462596d6b41b9be9d8c724e1906a3",
                  "f5a213b29d334070b40bd3e1f6fb6b6c",
                  "3c9b552c6fc64cfda6bccb86efb4c297",
                  "4210306424e546b78990dd9ea42bb5a9",
                  "W8p50dcae1884cd9a945472ad60b9afe",
                  "398fd4cd5b484aa1a47a10dee2a8fca3",
                  "84fc57c62fbd4dff8b8f29ec6c896dd3",
                  "SKqtQ0XopVO70r4k0okPGHDmAZxOACSR",
                  "eAmN9NUzzDdvAD1Xwvtf3L8UVq6MTycC",
                  "AhGyi9pPBPmRsA14rCGcvTlHT9cVDECe",
                  "4e1d0267e2b8406ebee074ef7b81867d",
                  "b0b53721112a43238a21907e6ddfbfa5",
                  "c37f4c6cf2d6416fbde31c5197a6747a",
                  "9a7b3aa0dd924a5bb5d0d6ee382cb0f1",
                  "b691279436264b0aa1c60b51c536383b",
                  "ca16fb2bc8b8467aa35a15f885565915",
                  "c1c7ce2f588248cbb35cc47e7749e024",
                  "40943e90d623415391d1677e91c10e4d",
                  "5ef7f2e4ea66403685823e72dcb2f50b",
                  "3931467461dc4c22b03bd23545a8b9e9",
                  "d4f5388ea0b040baaaeeeaf31a39bbfc",
                  "2d6c9790b3c74fa8b5bd40be56c944a0",
                  "ef251a886f594732a5ebde1cbb63318d",
                  "7bb58f576e1a4f0d9b0b05345e4fc00b",
                  "32ad5ead59b048b2a4784a748571aa7e",
                  "0e3080b2c3b745c2a4c25009fd3470af",
                  "2a2c8fb134624033b0e2b0295046296e",
                  "bcd1f840d68e4f86b49524ed7312b454",
                  "c9035ba3f06a41eea2015c17d7bb4c91",
                  "1ea8a8c2acac4307bb5a9a6950906516",
                  "4e3614e0fc8b4d75a074d0a12e0a863b",
                  "8370f74a7b6441aa8b34b4a8770b8753",
                  "b78be955d5b54f6198e6d61e7f8112c9",
                  "b662deb3a4024e90b94f491689d15eca",
                  "360b4801a0eb4321aa3d187855026cbe",
                  "a7e2af2a8976518a2e9d50abb0879417",
                  "R27RpTAwWXl9CEj0oam3ABhm6KfNXhAY",
                  "ffff826ce66ee941c47ae664eb1ea75e",
                  "fPFPi36zIGKmIX33D6FujlGTSuZeHUEb",
                  "e8801e97251c4f6298b1a3e8282ae169",
                  "e3e03a04bd704fc783f93410e41005fc",
                  "2d022a0bc7a14e788f74df5fb6c38e12",
                  "451402db08cd4b90ad538fca563359ac",
                  "b88f4c94a4774dcea2e9ab54fa595ce9",
                  "3e3411ccd49648e1a568521612eaf73c"
                ]
              }
            },
            "serviceIds": {
              "type": "array",
              "title": "Service IDs",
              "items": {
                "type": "string",
                "title": "Service ID",
                "enum": [
                  "CFSRFNotificationPush",
                  "absorb-sso",
                  "addresses",
                  "admin",
                  "admin-jobs",
                  "admin-products",
                  "api-directory-service",
                  "api-key-service",
                  "aqueduct",
                  "arctic-pricing-processor-web",
                  "arctic-usage-web",
                  "audit-service",
                  "bvseo-proxy",
                  "catalog-pdm-shopper",
                  "compliance-affirm",
                  "device-information",
                  "devprod",
                  "digital-rights-service",
                  "dispatch-metrics-service",
                  "display-management",
                  "fmis",
                  "forge-settings-service",
                  "fps",
                  "integration-provisioning",
                  "managed-inventory",
                  "merchandising-offer",
                  "merchandising-shopper",
                  "metered",
                  "mosaic",
                  "msuni",
                  "notification",
                  "oauth20",
                  "om",
                  "orca-admin",
                  "pricing-shopper",
                  "reporting-auth",
                  "riskified",
                  "shopatron-inv-orca",
                  "shopper-api-reporting",
                  "shoppers",
                  "ssr-ms-shipment-storage",
                  "ssr-user-management",
                  "swagger",
                  "testService",
                  "trace",
                  "v1",
                  "v1ods",
                  "watch-service"
                ]
              }
            },
            "clusters": {
              "type": "array",
              "title": "Clusters",
              "items": {
                "title": "Cluter",
                "type": "string"
              }
            },
            "documentTypes": {
              "type": "array",
              "title": "Document Types",
              "items": {
                "type": "string",
                "title": "Document Type"
              }
            },
            "properties": {
              "type": "object",
              "properties": {
                "count": {
                  "type": "string"
                },
                "interval": {
                  "type": "string"
                },
                "siteId": {
                  "type": "string"
                },
                "responseSource": {
                  "type": "string"
                },
                "responseStatus": {
                  "type": "string"
                }
              }
            }
          }
        },
        "CreateWatchDefinition": {
          "$ref": "#"
        }
      }
    }
  },
  'v1-furlajp-availability': {
    "links": {
      "up": {
        "rel": "up",
        "href": "http://localhost:8082/watch-definitions.drive?offset=0&max=10",
        "title": "Back to list"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:8082/watch-definitions/v1-furlajp-availability",
        "title": "Delete",
        "method": "DELETE"
      },
      "edit": {
        "rel": "edit",
        "href": "http://localhost:8082/watch-definitions.drive",
        "title": "Save",
        "method": "PUT",
        "type": "application/json",
        "$ref": "#/definitions/CreateWatchDefinition"
      },
      "self": {
        "rel": "self",
        "href": "http://localhost:8082/watch-definitions/v1-furlajp-availability"
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
    "schema": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "WatchDefinition",
      "description": "An explanation about the purpose of this instance.",
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "path": {
          "type": "string",
          "title": "Path",
          "readOnly": true
        },
        "description": {
          "type": "string",
          "title": "Description"
        },
        "active": {
          "type": "boolean",
          "title": "Active"
        },
        "trigger": {
          "title": "Trigger",
          "type": "string"
        },
        "policyDefinition": {
          "title": "Policy Definition Type",
          "oneOf": [
            {
              "title": "Average Response Time Spike",
              "type": "object",
              "name": "AverageResponseTimeSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "AverageResponseTimeSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_avg_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "avg_response_time_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Decrease Traffic Spike",
              "type": "object",
              "name": "DecreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "DecreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Flatline",
              "type": "object",
              "name": "FlatlinePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "FlatlinePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "predefinedMatchingPattern": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "flatline"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Error Spike",
              "type": "object",
              "name": "IncreaseErrorSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseErrorSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "eventsCountThreshold": {
                      "type": "string"
                    },
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "errorCountThreshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "SERVER_ERROR_RESPONSE",
                        "ERROR_RESPONSE",
                        "CLIENT_ERROR_RESPONSE"
                      ]
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "date_range_terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "error_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Traffic Spike",
              "type": "object",
              "name": "IncreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Service Availability",
              "type": "object",
              "name": "ServiceAvailabilityPolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "ServiceAvailabilityPolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "NON_5XX_RESPONSE",
                        "OK_RESPONSE",
                        "ONLY_200_RESPONSE"
                      ]
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "service_availability"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Slow Average Response Time",
              "type": "object",
              "name": "SlowAverageResponseTimePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "SlowAverageResponseTimePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string",
                      "default": 100
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "metrics_avg"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "slow_avg_response_time"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            }
          ]
        }
      },
      "required": [
        "name",
        "path",
        "active",
        "trigger",
        "policyDefinition"
      ],
      "definitions": {
        "alertDefinitions": {
          "type": "object",
          "title": "Alert Definition",
          "properties": {
            "alertType": {
              "title": "Alert Type",
              "oneOf": [
                {
                  "title": "EMAIL",
                  "type": "object",
                  "name": "EMAIL",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "EMAIL"
                      ]
                    },
                    "subject": {
                      "type": "string"
                    },
                    "from": {
                      "type": "string"
                    },
                    "to": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type",
                    "subject",
                    "to"
                  ]
                },
                {
                  "title": "CONSOLE_TEXT",
                  "type": "object",
                  "name": "CONSOLE_TEXT",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "CONSOLE_TEXT"
                      ]
                    }
                  },
                  "required": [
                    "type"
                  ]
                },
                {
                  "title": "SLACK",
                  "type": "object",
                  "name": "SLACK",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "SLACK"
                      ]
                    },
                    "webhook": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "channel": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type"
                  ]
                }
              ]
            },
            "firingPolicy": {
              "type": "string",
              "title": "Firing Policy",
              "enum": [
                "CONTINUOUS",
                "ONCE_WITH_FOLLOW_UP"
              ]
            }
          }
        },
        "queryType_SEARCH_WITH_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH_WITH_COUNT"
        },
        "queryType_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "COUNT"
        },
        "queryType_SEARCH": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH"
        },
        "queryDefinition": {
          "title": "Query Definition Details",
          "properties": {
            "timeInterval": {
              "type": "object",
              "title": "Time Interval",
              "properties": {
                "from": {
                  "type": "string",
                  "title": "From"
                },
                "to": {
                  "type": "string",
                  "title": "To"
                }
              },
              "required": [
                "from",
                "to"
              ]
            },
            "apiKeys": {
              "type": "array",
              "title": "Api Keys",
              "items": {
                "type": "string",
                "title": "Api Key",
                "enum": [
                  "a52e39b2e85f44518c9557bef07cefb7",
                  "c379d9cfb0dd490a8399734afa7e28c4",
                  "63ef06b39d47413989f52fbd5be19761",
                  "3daaa577d3084251b2f22bb5bcfb092c",
                  "ce5679c23cd648e19896ce11c9183acf",
                  "71c9782424b64dbbb2e3b1b5ed7b9357",
                  "bd8bba27f49a45f69296a8f57715887a",
                  "722aacea2683463e965c0992d0a1fed6",
                  "d503c0c1e0774c33b6906f5379a114ab",
                  "a59de855c96448acb6f303edc6e26fe7",
                  "f621bcb5b7d44c238631e5e2cea96ac6",
                  "09a8a9e5c81b48f69fd43c0c3defddb0",
                  "d9b0f8ea7f7a4622999c8e1c15933a1e",
                  "dec38ad6b095403e8a1535585b2e9078",
                  "29f94443bbe74b49a9c67fa7a27fac84",
                  "7508fdb7357a4420b1d09271fe682905",
                  "bc81f22c34e84caa96e1d42e8c6df284",
                  "785336eafbea4c1d9c8c47f8cc07bf20",
                  "4a0d6a3658874b6c84e24424f73d5b34",
                  "c9933ce47b76448eaa8dd834a6edb588",
                  "d71730a87ca84a59a2ce94b9bbcc066f",
                  "1e4533bef3f74093b9ddcf727c32ecbd",
                  "6fc4f795c08846368f2ebcf942c38257",
                  "2584ca43d8c34818b409d70813725d06",
                  "75cd2758726d471abb499ba4a83cd43d",
                  "ffe9924c2c0a42fc97ffd80e85d37bc2",
                  "9791ea76c17a41b7b19e0c5de66cd595",
                  "aa51af2df7c3427faf9d8590fe464bc2",
                  "909009c5214249d18054565e6c57886f",
                  "c3609dd96eac4376b20890494e882a38",
                  "d7366e9c1f7a4c3f97cbc340c757d55b",
                  "42e71d5576964354b51688a983caa52c",
                  "1ac2152179c3469e8c9bd1b9b62de1f6",
                  "2f0c928b61654c36ade08c8c23bed62b",
                  "639e54158b254306ae68867995b70ee9",
                  "f5fbf33974794e859696defe6fc9818a",
                  "dfee9ead4fc245d59f7968c87e40709c",
                  "2d58cd1208f34a7886f8ab0760055ab3",
                  "45e8b0e39aba4eebb15ddf134e9b0bd9",
                  "0971189a1331474abbb8633f2c11bba1",
                  "b400399bbf444710af162ee1668aa47d",
                  "37429d6b9e304fafa37c64358921f565",
                  "26ceda9f2a694254979100a8455f0e73",
                  "2aa724b75a684e6c98bdfe9b00d94a08",
                  "ed7401c749404258a4c264f6b0f1786b",
                  "eff377216fae4ac0bbf41864d115cb22",
                  "014d336197b94414910b7317b5d019d1",
                  "0f61671976abf7f85d1c98b207830f6b",
                  "2c84e84bb902457aad6cb73206db923f",
                  "3563c230c22945f1826644bdb9534d95",
                  "fbe2a04cb5144f4cb8ec2a13f326398c",
                  "66a15471554f4326bbe5c2eb73c49ee3",
                  "JJ9QFssRnxzms2GPPRCBnMDXHjKQNAMW",
                  "58b6ec9ece784e88a575663cbb69074a",
                  "fa40c38d914340fb89f0c63027833a9d",
                  "3e99952c2cc7f1f566126deaff432996",
                  "uFBV0VlouC8OfU38v0l6lG0oVQ0kDqvr",
                  "d4cd446bb89a43c28a15d8909ad58f3b",
                  "1125ee6b84fc4dce83b890763fd567c3",
                  "529ec2c526214e388f13bd7347342483",
                  "604df5ac990fbc67dab8fc098af271e6",
                  "8430105cfa7149bf9273e8046b9751e0",
                  "f84c1db8380944308a93e085b5b1af86",
                  "6c228c145bc04142b13dd7b2c429d62b",
                  "3eb1d5c4b4df444a81e41afaf7053cd1",
                  "60bd7f41a86549698ec9d36b1243a3b5",
                  "65c9d01e68d945d9a3629c6a67a96127",
                  "634720b45ec046a1a193810f87755674",
                  "e71db157a8724cafabd2c579602b10d6",
                  "fe43a8180b58471084a27afc8b781b67",
                  "2f75c16649c04335b666ace790f3631e",
                  "13b9e5d0b4d342dd9ed599d196dcb5ad",
                  "a393b43b8a4047018db5ddd28bea8bbb",
                  "183e4c1b72294c60ac2fcc5de3bc2bfd",
                  "b46b718c759a412aa7ab20c1626062d3",
                  "f06ec13a06cb4faba310c583fa4419ba",
                  "17b573bf92c64b4dad88d1d6d5a3eeef",
                  "83e130a304f2489385b6d267105ee40b",
                  "0fb1db8761ac4a85b4eac8ec49a16867",
                  "6801c617d31745499828eed4c696f4bc",
                  "AjYFBMpbQdCoAFomuHhhFNNjvP5LHCfo",
                  "3bf2a0a885f94f279b9d86568182d75d",
                  "3db6d8afe2d24a78a2e7b976457a40f5",
                  "c2a8ae12b885451b90b86beee0c6e374",
                  "235104cf93754fa0b4b4c7983693842f",
                  "4c4d6d5691fd4e7db73b20b6edd27fe2",
                  "3c93dabcea2147c48f142e1fad482c36",
                  "b3f9b26bdd8f60ef0e2c2c0be0b74260",
                  "GvHfSjHAScUuTAasglA81CmfCEtciNmt",
                  "9692a066e340d51cb0b19f27ea06b364",
                  "e66654556ca510d3487c647399a2caf2",
                  "8ee5d5e1e43b4a92835709f4c4a973c9",
                  "689175898efa478d96d0dfda038e4dad",
                  "3fbe6187e6904dae93606048e2ff003a",
                  "f046805b8ac1461ca76dcf2e3d3f4040",
                  "96562a9d820d441cbc480c7a3758df7b",
                  "6392fc87a33447529e12a454da6c339b",
                  "6fa08f482b4c473880aa0215b3c5de39",
                  "V2ztxK2rFe86jD7zYkRhDSAdrOrcY5qo",
                  "9b67e2693d374162be5e2b1b0c66f036",
                  "0973656604e444bcba03231584b74870",
                  "5c31057bc55c4963837049a6d384b567",
                  "d11ae88278b74a6c931176ca4b7b164f",
                  "b4357251c0574a5e98661bbd06c2ca11",
                  "97f3c5a6f2d945528977e86535b927dd",
                  "HipATLcFtfhaa4NGPzk1dcPsIweaGmLh",
                  "3cf82ad2309640b48d43953c661fca7f",
                  "1a79efcfbfb34ff2b704e4dcde4e8fe9",
                  "2db786407faf4d2fa01bbd07f9a93e79",
                  "2918d633d2fe458f89fff1c241b96e9a",
                  "x7vQOMYuj1sZ6zeTNFeqL83qadqFT0Zm",
                  "480dd90425224c2f8cc9a77a402df105",
                  "c3526ba3fa99454896e0e6a9f4c3c4cc",
                  "8b96563e98c2433585767cb2fe1bee21",
                  "6d0b3139a676431992558dda67b6ba65",
                  "OMA5xOj8iBFRAcHJRmJeenKm4lr8UYTT",
                  "c6YGngARruDia5MOwAKgaMxyQdGnJ60H",
                  "fV8NesDn4r3e02A3XeAAhcGGqEb72W90",
                  "fe69ca7dfd6149ec9a47b3dd521e7644",
                  "fb7295e9e6f1427ebe937023e9114228",
                  "7a809a5636e84d1bac1d6f644ce8b56a",
                  "a692b345717e4adb85879bcee227bca9",
                  "fe1a806e420a45179b88e3689ca63446",
                  "e476082cf7af49b1b817e34c91d3486e",
                  "4eeb5d540ff54cf6b077ec469f2dd806",
                  "f4fc174d4733428e86fc38fc7f7bb748",
                  "e0c1977f09a14a7f8ffc35249e740bd3",
                  "003d23de388a443a813d8c2aeee76418",
                  "a90f1203bd8b4f16bd942870c6e14fbd",
                  "6eabe1249ed14043ac393cb5248f4fb6",
                  "819a5f22f3964bbc99931139ee2eb538",
                  "864d71cdaffb4e03a43a535c23d3292a",
                  "18ba5cb2b70d4093a20a362078f0958c",
                  "UnZqOVp4laTfF1l71GqnzXR5e34MUG3M",
                  "2c8792edf77a4bfa86f442bbf79da4e0",
                  "d79960cf15db4422a34d52785e088262",
                  "0e393a6f3c9c4e08aab38db741953af0",
                  "cede30a1de9c44f6b9183ff9be9ae309",
                  "e1a0f189b4f44b998fc8e47d515ab418",
                  "2b0d95e5167742bfaa87b50141d327b9",
                  "b38695ad77ef4d31b11192f8d80d9a8d",
                  "37504a549ca94c2fbcff1cc7ebfd89e2",
                  "6ac66961851f424f87aa7992a5cea5ca",
                  "5310815a01e14e95bfedf1b655fdef03",
                  "3e33684992de4c85a09d565eca3c0591",
                  "1edd47e8e8424d728f648f9c679f1fae",
                  "e12b65ecd73848db87c5ee7eb3f439e5",
                  "WZWxsKIlLOuwUxyn43usGMl2mBFJuczV",
                  "j2S1P01uImUQum2LFGuO9z2Jin0iqak7",
                  "f5e0a094f420d987ae37ef31813f3e46",
                  "IOGl4gRimt6h9gpPCfABcMjfPNKPzQer",
                  "m2ff39ba49a5498b8c7093c677016b87",
                  "2e57292fec6b4c7e9f9d0ccf49358a74",
                  "b9bdf962b01f4d39a524da440c3a9a24",
                  "3241a555f3bb49e0abebce79e2d9c683",
                  "c67b808be97b4ed7b1de747a7597c6ae",
                  "131457365d7a4b868263b1408386a4e9",
                  "73cb362d47024acebac4a5d7811f16e8",
                  "8a9ba4f6a62142e79e31d95d0b320df5",
                  "98a16c977805f1614cc9017fc0ca027c",
                  "e4eb2861e24ff944d3aa0e16bcb91122",
                  "drLb",
                  "drMonitoring",
                  "slowpitchstats",
                  "T38IByPBQUvbLHxrI1x9kIuY3BTTQSIb",
                  "95204aa36c9e464d95a9f94166ce1df7",
                  "GrEaNYFccnbzjiaNdGjyG627SiWCmv3g",
                  "LFiVpk5qjj570GwT6w8eSaVek9dcyUyo",
                  "dd05220dbc214907a081a449982f3d26",
                  "393169b895e84e13ba6389c0e412d193",
                  "jPvJi1XNitsGyJ8AFDNAizCAdVLKXm2y",
                  "6d9cc52eadd14cd7847b588468863592",
                  "5825c528f47a4f45881a6753c57b3a7f",
                  "11aa0d2e8f55487e99e67a15a9ff6168",
                  "989529bd2f0e4238a3012263d3d48241",
                  "6809b4l0G127438bb773d2d6ec18c394",
                  "4b9a7d96ccad47e0846628ac504b1e1b",
                  "74ba26c4a9d049be86c7cdb092417d97",
                  "fa1eaa5b2242410c82ff92323fcf6d47",
                  "a5a154df5b7840588172fc85ebe71e87",
                  "17d0e59684b34c3aab2861d0248cc25b",
                  "0c546c8ae3874452a66e37d505bec29a",
                  "01815239b9bb48869dea0f48b08ad5b7",
                  "cfb3cb708ce14e069555f231933454b6",
                  "83768800514044c883c1761ae50bffb4",
                  "61972e2ace5b43caad61136ee9ad9254",
                  "dbb3a637c32a4af1ad2410f8d32a7c84",
                  "01186811f3224264b1e564fcf5b7fdb9",
                  "e375ca2119cf4c14aa18ac3722dd07fb",
                  "ec48db0385914ebe9200d9547cb27c5f",
                  "21ea08fb07aa419aba9c4b4f077562d1",
                  "14e24fa4909743038e494db6b4b85697",
                  "65168b875d2b4a2da0321d75834f2620",
                  "8ba21719b32a41bb85a83f70ee999ec4",
                  "bf3c4e727412474c9d105c8d5b6f61ad",
                  "fee22d69e94a472192b30c23b3ac6ac7",
                  "4d0164638250450499a5483fc886f476",
                  "d87c355242804c4db2b474b070c100b7",
                  "47c970d8fa144db28a4908766d3e552b",
                  "75c5079cc5c34a4daca144acb33f191f",
                  "405ccf3d4bc541b6bf95b9ac8f732db7",
                  "11b3ec91ec684ad5b2c2bbcf0e117028",
                  "d0f92bb7bc42475994985532676e4d29",
                  "2b07a6cc14ba46b0ae52bafef48b7272",
                  "875fa335caaa46089d1e27455ba6b46a",
                  "e14e408740894337b29667ff124c3747",
                  "bd4ba131e94a49c48fc4621e4e208391",
                  "77c8cb21f0ee4d1e917e976d40a0192c",
                  "5d6509415b35421eb4c592f7f97fd5f2",
                  "b838ddb2e2814523a79accc70ae46417",
                  "b646a118ccf140508b0253c9a44d3e12",
                  "f9a80526573b495fb75b518b2b89354e",
                  "6d240ae497f14063be4c690890a60f86",
                  "31d1063fb493428794cc6b9a24f0af82",
                  "5c8c0596d0204a48bcf982e75f7b0057",
                  "badf3f7d1a924ef5b32c732a0dc85b66",
                  "7c43df67376442a69005f5cae5c3b25b",
                  "9d7500dc9bdc4b6381e66015387823eb",
                  "2159d7e4c5c047e6bd3745c85e403756",
                  "0ab3d1d0b1dd46e4839966bcd1b415c0",
                  "02561c33bd18412a9502326922b83a02",
                  "2815b31e5dd54c0aabcb32bf84a79bd9",
                  "25d0b5c0ecda494faa55f76384567c75",
                  "e75e39d4e89042c094d4c1b1c6a5d86e",
                  "7c73cd5e8e8f45689235f51f70732f8e",
                  "9130902f881a44aeacc8f319419cc929",
                  "10a0d29e20a14fbb87749cc73f8efff3",
                  "00dddd556c33472ab7afb4ebc7843282",
                  "0d5bf93475ea4372a96ef75938239fa2",
                  "2011706e978d4653b536ea3ea85b3005",
                  "36025fe36a014fc8a8c2ba4b585ab58c",
                  "4011d0dbbd4742f0a31fc3dbcf0c4299",
                  "592b25979f1d4ba3bdef695a144d64c0",
                  "9e1d95dec9d543f7a1a28345c64a2b73",
                  "c337ae62486445f58609a83cf0446851",
                  "fe7384de29d0498d99fc169315ee63c9",
                  "434920cfddec4c318beccf809d919a94",
                  "4009d041afec4bbda55cfcb32eddf94d",
                  "09fc9b3ad0c6494294ee7e6adabdcaa9",
                  "dcc4505ad4644b428264f44922b12ee5",
                  "fec7126def664064840f03dfd693b524",
                  "47ec2875c3e74c8e965b918a0dd0b37f",
                  "0cf750d174b4421c948323ff0f150eb2",
                  "82b2bcac1a5e429bbc14b12f558ef1d2",
                  "52020246f6e94edb861d4b7c86cf1659",
                  "f2c6fcc010824c05989a44e69e588742",
                  "bf2136f4b1234b48bd94ddf1f97d4e67",
                  "36b3419fa81d434ebfddbe1415356e0b",
                  "c65d281d6d3941e49982bd634fbbec25",
                  "6fe5bb8863c24a3fb4a1515c26153da0",
                  "270a9538f6f44736bb8834f8f14d61a6",
                  "03a5370a46014fe0a4da4241682e6079",
                  "968adfad396c41b1b8c2ed54dd2ee471",
                  "7dd17e4290984c9fb39d421a565b7abb",
                  "bbddf0b2ae65413d91fa2ec54c352e51",
                  "47618a302887457783034cddee3cac73",
                  "ef029932ce20412a9e4dac1ea7fe83b3",
                  "46c4a16e6b3748f58f918cd7e20c06f1",
                  "a9a505bb3b6c4648b071f9e774d4e3f7",
                  "996d2558219840f3869d0feee75a4ba4",
                  "13626bbd97224522a159545a50c28383",
                  "de6c4779b8584f9fb1a1b880da974fc6",
                  "6163570332e746479d2052a10f1f4315",
                  "6b43a7c9ff634eef9d0a1d430b994609",
                  "0c6cb9bf180043458fbcd9a74f4ee5a3",
                  "b679d652d6704c9e8c5a812157552329",
                  "83fb8058737345aba941639128699cd7",
                  "5b026578210849e0a3435a95b95d0ea2",
                  "19e3ed05bf584df69be668709fafa954",
                  "360897d6b74b4d7a8f80bdff388e0ca1",
                  "3ce90c17b5e64559b9f198efb5418913",
                  "d487033298da4c4e8532f8da8d4bc2e4",
                  "49ea6136b8b94019897647eb6cb40b6d",
                  "289d7fecc9814fd7953223d7ef4c0350",
                  "de1c2c1beb49463b9cc01c8785d06051",
                  "a26cf34353044b78aa9e20a3efcf0abb",
                  "5ba8c5935f29425789687688a0bd778b",
                  "39af461e1a9249d0af8896fa8443979c",
                  "1d18eaea1bdd496d9d78589359a72bd5",
                  "30d9063c1cc641d88ea46b6058ebc38f",
                  "29698303f906482a906dca00f94f8d01",
                  "91017dfa6e484fa3b8da08db8a553905",
                  "e0a7add820724303872d7f6ccf24392a",
                  "aa631b2b61f44f9c8a2f50fa909007e7",
                  "e85ef23487124be5a3844dff4e15d318",
                  "5fd2a624e71746c981f58d7ac79e9fc4",
                  "6345e570f5d04a80a26e0916a654c974",
                  "839ceead92404cbdb4419ac6ef7f6d05",
                  "d8d5550c60f44055830fdd5c5a3d05bc",
                  "4e2672ea3d2d4d69b8dda44a00806e34",
                  "3ff138ba511b4ea19e03825a8565599f",
                  "183f5c47c9784caea04bb4bcfd160806",
                  "Mf9WXzGfr2B8UgF63ucNGLpmCNmuHJGe",
                  "84LfuDZFMzh4OkqAEqf9FwzzAm9a5m7z",
                  "4GEFGGGU8KltQGPpqClVXLusU7I9xDvw",
                  "3YGONLdp1Ze88sLyBDbPFN8DUR5oQI4p",
                  "EwUZtJiOJIlnkLq2k46V5txKR3bjJWq8",
                  "lv1kDTOXvnNQvuFpkM5Af1NIFtK9TOAD",
                  "mw8GrV3n5RjkoBCyYXmuApRf9bs5Y8Id",
                  "BIPVgoickzA3F3f6vDolpNdyyVIJqNu9",
                  "b97fd7152d804d429d706e1b8f82cb2a",
                  "27fb8aa9e9e94f4da269144fc92dbac7",
                  "9485fa7b159e42edb08a83bde0d83dia",
                  "x4Uo2cwIaUr1GSVHEPY82EQ15MWOuHUa",
                  "HBAgVRFqtU232A82hGGINxxXHDbHFi5q",
                  "Gr7UzxdwWXOTHbyPD2DGsFTMV7cAGt0f",
                  "ffde04838d9e4778a9295ba5f825fd84",
                  "29f2aa5dfbe21265da9df360e9c40f34",
                  "192a09e3f41571b5421dec528c76c846",
                  "21f64753cf014b9783a73e9645ee640d",
                  "817f2a161e624076b35219965b88a25d",
                  "7c80329a76e14e6e8fe252d5d67562de",
                  "f5a8d5cdf1a84a548ca7b3dd87d3f097",
                  "7eb58ac6d2b0437294159cce8d968995",
                  "c5017f3034ff48ce8bac77defcc27fff",
                  "e4e5b7be6f0343b4aa7530c104329b42",
                  "2ed1ec032d0a43c6b694d90166597ca2",
                  "1b3476bae4e94fa08f156ea59fdf51fe",
                  "99e21358c19c4ced9d1932a29f0623f1",
                  "5538a2fed2f94d038ec48cc41beb6a38",
                  "1fb4b501e1504cb49befc0adc661747d",
                  "8e3fd8a6b52e48a38170c9be9b29ffe1",
                  "OfEXe4Rr9ON0F0buy7GfwlMJTQztRCUk",
                  "P6CpVQdHrJD4AixO6zRZO1sd1aD0WmOi",
                  "O2k6McH9iN7UGAJoVWUDzFU5AKgkhNkK",
                  "deb09d9fce9b4cf2a1b6e0570227a6e5",
                  "74d07d5ecbd0466cb3e6016ce91aa466",
                  "5af30905f7874fb0962f153ec990e9f5",
                  "LjJiINSM8m6aLAZ5GzOXvABPiAgCaRmY",
                  "4af9b12fbb284f069a1887d67cda5a01",
                  "0fffa5a070a3409c9fec8211f35ca945",
                  "5f5105c7a96d40c3b02de118d7aea4e5",
                  "5954b627ade9405c9955687939ffab6a",
                  "5de150dc29228095f9811cdf15ea5938",
                  "b0dc30922cd14014857de1fc83208529",
                  "ea243ea946744e9d9cc7290a9dabf438",
                  "02fa6c6228f9df9bf445d28216705a97",
                  "77d378c27c11402285201cdf2dc0bccc",
                  "780e6221a2ee627b0ae1cffcdf31f9aa",
                  "36tnbk7frf5suyj5gby3j6yb",
                  "SNvVwAFtjoq0UOuAJ3Rj7lZl4BPjoENy",
                  "66759a8a36a3463c8523b31ecc5b65ef",
                  "5a7b5d42d95d418b9cf7f7410f7972f7",
                  "8ac42ccff20845f2be98ea157a5477ca",
                  "ffdd879d12a34305bb4d0dd5ac1dffaa",
                  "ef5462596d6b41b9be9d8c724e1906a3",
                  "f5a213b29d334070b40bd3e1f6fb6b6c",
                  "3c9b552c6fc64cfda6bccb86efb4c297",
                  "4210306424e546b78990dd9ea42bb5a9",
                  "W8p50dcae1884cd9a945472ad60b9afe",
                  "398fd4cd5b484aa1a47a10dee2a8fca3",
                  "84fc57c62fbd4dff8b8f29ec6c896dd3",
                  "SKqtQ0XopVO70r4k0okPGHDmAZxOACSR",
                  "eAmN9NUzzDdvAD1Xwvtf3L8UVq6MTycC",
                  "AhGyi9pPBPmRsA14rCGcvTlHT9cVDECe",
                  "4e1d0267e2b8406ebee074ef7b81867d",
                  "b0b53721112a43238a21907e6ddfbfa5",
                  "c37f4c6cf2d6416fbde31c5197a6747a",
                  "9a7b3aa0dd924a5bb5d0d6ee382cb0f1",
                  "b691279436264b0aa1c60b51c536383b",
                  "ca16fb2bc8b8467aa35a15f885565915",
                  "c1c7ce2f588248cbb35cc47e7749e024",
                  "40943e90d623415391d1677e91c10e4d",
                  "5ef7f2e4ea66403685823e72dcb2f50b",
                  "3931467461dc4c22b03bd23545a8b9e9",
                  "d4f5388ea0b040baaaeeeaf31a39bbfc",
                  "2d6c9790b3c74fa8b5bd40be56c944a0",
                  "ef251a886f594732a5ebde1cbb63318d",
                  "7bb58f576e1a4f0d9b0b05345e4fc00b",
                  "32ad5ead59b048b2a4784a748571aa7e",
                  "0e3080b2c3b745c2a4c25009fd3470af",
                  "2a2c8fb134624033b0e2b0295046296e",
                  "bcd1f840d68e4f86b49524ed7312b454",
                  "c9035ba3f06a41eea2015c17d7bb4c91",
                  "1ea8a8c2acac4307bb5a9a6950906516",
                  "4e3614e0fc8b4d75a074d0a12e0a863b",
                  "8370f74a7b6441aa8b34b4a8770b8753",
                  "b78be955d5b54f6198e6d61e7f8112c9",
                  "b662deb3a4024e90b94f491689d15eca",
                  "360b4801a0eb4321aa3d187855026cbe",
                  "a7e2af2a8976518a2e9d50abb0879417",
                  "R27RpTAwWXl9CEj0oam3ABhm6KfNXhAY",
                  "ffff826ce66ee941c47ae664eb1ea75e",
                  "fPFPi36zIGKmIX33D6FujlGTSuZeHUEb",
                  "e8801e97251c4f6298b1a3e8282ae169",
                  "e3e03a04bd704fc783f93410e41005fc",
                  "2d022a0bc7a14e788f74df5fb6c38e12",
                  "451402db08cd4b90ad538fca563359ac",
                  "b88f4c94a4774dcea2e9ab54fa595ce9",
                  "3e3411ccd49648e1a568521612eaf73c"
                ]
              }
            },
            "serviceIds": {
              "type": "array",
              "title": "Service IDs",
              "items": {
                "type": "string",
                "title": "Service ID",
                "enum": [
                  "CFSRFNotificationPush",
                  "absorb-sso",
                  "addresses",
                  "admin",
                  "admin-jobs",
                  "admin-products",
                  "api-directory-service",
                  "api-key-service",
                  "aqueduct",
                  "arctic-pricing-processor-web",
                  "arctic-usage-web",
                  "audit-service",
                  "bvseo-proxy",
                  "catalog-pdm-shopper",
                  "compliance-affirm",
                  "device-information",
                  "devprod",
                  "digital-rights-service",
                  "dispatch-metrics-service",
                  "display-management",
                  "fmis",
                  "forge-settings-service",
                  "fps",
                  "integration-provisioning",
                  "managed-inventory",
                  "merchandising-offer",
                  "merchandising-shopper",
                  "metered",
                  "mosaic",
                  "msuni",
                  "notification",
                  "oauth20",
                  "om",
                  "orca-admin",
                  "pricing-shopper",
                  "reporting-auth",
                  "riskified",
                  "shopatron-inv-orca",
                  "shopper-api-reporting",
                  "shoppers",
                  "ssr-ms-shipment-storage",
                  "ssr-user-management",
                  "swagger",
                  "testService",
                  "trace",
                  "v1",
                  "v1ods",
                  "watch-service"
                ]
              }
            },
            "clusters": {
              "type": "array",
              "title": "Clusters",
              "items": {
                "title": "Cluter",
                "type": "string"
              }
            },
            "documentTypes": {
              "type": "array",
              "title": "Document Types",
              "items": {
                "type": "string",
                "title": "Document Type"
              }
            },
            "properties": {
              "type": "object",
              "properties": {
                "count": {
                  "type": "string"
                },
                "interval": {
                  "type": "string"
                },
                "siteId": {
                  "type": "string"
                },
                "responseSource": {
                  "type": "string"
                },
                "responseStatus": {
                  "type": "string"
                }
              }
            }
          }
        },
        "CreateWatchDefinition": {
          "$ref": "#"
        }
      }
    }
  },
  'v1-furlajp-decrease-traffic-sprike': {
    "links": {
      "up": {
        "rel": "up",
        "href": "http://localhost:8082/watch-definitions.drive?offset=0&max=10",
        "title": "Back to list"
      },
      "delete": {
        "rel": "delete",
        "href": "http://localhost:8082/watch-definitions/v1-furlajp-decrease-traffic-sprike",
        "title": "Delete",
        "method": "DELETE"
      },
      "edit": {
        "rel": "edit",
        "href": "http://localhost:8082/watch-definitions.drive",
        "title": "Save",
        "method": "PUT",
        "type": "application/json",
        "$ref": "#/definitions/CreateWatchDefinition"
      },
      "self": {
        "rel": "self",
        "href": "http://localhost:8082/watch-definitions/v1-furlajp-decrease-traffic-sprike"
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
    "schema": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "WatchDefinition",
      "description": "An explanation about the purpose of this instance.",
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "path": {
          "type": "string",
          "title": "Path",
          "readOnly": true
        },
        "description": {
          "type": "string",
          "title": "Description"
        },
        "active": {
          "type": "boolean",
          "title": "Active"
        },
        "trigger": {
          "title": "Trigger",
          "type": "string"
        },
        "policyDefinition": {
          "title": "Policy Definition Type",
          "oneOf": [
            {
              "title": "Average Response Time Spike",
              "type": "object",
              "name": "AverageResponseTimeSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "AverageResponseTimeSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_avg_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "avg_response_time_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Decrease Traffic Spike",
              "type": "object",
              "name": "DecreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "DecreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Flatline",
              "type": "object",
              "name": "FlatlinePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "FlatlinePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "predefinedMatchingPattern": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "flatline"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Error Spike",
              "type": "object",
              "name": "IncreaseErrorSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseErrorSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "eventsCountThreshold": {
                      "type": "string"
                    },
                    "percentageChangeThreshold": {
                      "type": "string"
                    },
                    "errorCountThreshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "SERVER_ERROR_RESPONSE",
                        "ERROR_RESPONSE",
                        "CLIENT_ERROR_RESPONSE"
                      ]
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "date_range_terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "error_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Increase Traffic Spike",
              "type": "object",
              "name": "IncreaseTrafficSpikePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "IncreaseTrafficSpikePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "previousMinimumEventsCount": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "requestId"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "term_count_spike"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "traffic_spike"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Service Availability",
              "type": "object",
              "name": "ServiceAvailabilityPolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "ServiceAvailabilityPolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "type": "string"
                    },
                    "matchingPattern": {
                      "type": "string",
                      "enum": [
                        "NON_5XX_RESPONSE",
                        "OK_RESPONSE",
                        "ONLY_200_RESPONSE"
                      ]
                    },
                    "eventsCountThreshold": {
                      "type": "string"
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "responseStatus"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "terms_count"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "service_availability"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            },
            {
              "title": "Slow Average Response Time",
              "type": "object",
              "name": "SlowAverageResponseTimePolicy",
              "properties": {
                "name": {
                  "title": "Description",
                  "type": "string"
                },
                "policyType": {
                  "type": "string",
                  "readOnly": true,
                  "enum": [
                    "SlowAverageResponseTimePolicy"
                  ]
                },
                "properties": {
                  "type": "object",
                  "properties": {
                    "avgResponseTimeThreshold": {
                      "type": "string"
                    },
                    "eventsCountThreshold": {
                      "type": "string",
                      "default": 100
                    }
                  }
                },
                "queryDefinition": {
                  "type": "object",
                  "title": "Query Definition",
                  "properties": {
                    "queryType": {
                      "$ref": "#/definitions/queryType_SEARCH_WITH_COUNT"
                    },
                    "queryKeyField": {
                      "type": "string",
                      "title": "QueryKey Field",
                      "readOnly": true,
                      "enum": [
                        "totalTimeInMilliseconds"
                      ]
                    },
                    "queryTemplateName": {
                      "type": "string",
                      "title": "Query Template Name",
                      "readOnly": true,
                      "enum": [
                        "metrics_avg"
                      ]
                    },
                    "definition": {
                      "$ref": "#/definitions/queryDefinition"
                    }
                  },
                  "required": [
                    "queryKeyField",
                    "queryTemplateName"
                  ]
                },
                "alertDefinitions": {
                  "type": "array",
                  "items": {
                    "title": "Alert Definition",
                    "properties": {
                      "alertTemplate": {
                        "type": "string",
                        "title": "Alert Template",
                        "readOnly": true,
                        "enum": [
                          "slow_avg_response_time"
                        ]
                      },
                      "alertDefinition": {
                        "$ref": "#/definitions/alertDefinitions"
                      }
                    },
                    "required": [
                      "alertTemplate"
                    ]
                  }
                }
              },
              "required": [
                "name",
                "policyType"
              ]
            }
          ]
        }
      },
      "required": [
        "name",
        "path",
        "active",
        "trigger",
        "policyDefinition"
      ],
      "definitions": {
        "alertDefinitions": {
          "type": "object",
          "title": "Alert Definition",
          "properties": {
            "alertType": {
              "title": "Alert Type",
              "oneOf": [
                {
                  "title": "EMAIL",
                  "type": "object",
                  "name": "EMAIL",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "EMAIL"
                      ]
                    },
                    "subject": {
                      "type": "string"
                    },
                    "from": {
                      "type": "string"
                    },
                    "to": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type",
                    "subject",
                    "to"
                  ]
                },
                {
                  "title": "CONSOLE_TEXT",
                  "type": "object",
                  "name": "CONSOLE_TEXT",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "CONSOLE_TEXT"
                      ]
                    }
                  },
                  "required": [
                    "type"
                  ]
                },
                {
                  "title": "SLACK",
                  "type": "object",
                  "name": "SLACK",
                  "properties": {
                    "type": {
                      "type": "string",
                      "readOnly": true,
                      "enum": [
                        "SLACK"
                      ]
                    },
                    "webhook": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "channel": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type"
                  ]
                }
              ]
            },
            "firingPolicy": {
              "type": "string",
              "title": "Firing Policy",
              "enum": [
                "CONTINUOUS",
                "ONCE_WITH_FOLLOW_UP"
              ]
            }
          }
        },
        "queryType_SEARCH_WITH_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH_WITH_COUNT"
        },
        "queryType_COUNT": {
          "type": "string",
          "readOnly": true,
          "default": "COUNT"
        },
        "queryType_SEARCH": {
          "type": "string",
          "readOnly": true,
          "default": "SEARCH"
        },
        "queryDefinition": {
          "title": "Query Definition Details",
          "properties": {
            "timeInterval": {
              "type": "object",
              "title": "Time Interval",
              "properties": {
                "from": {
                  "type": "string",
                  "title": "From"
                },
                "to": {
                  "type": "string",
                  "title": "To"
                }
              },
              "required": [
                "from",
                "to"
              ]
            },
            "apiKeys": {
              "type": "array",
              "title": "Api Keys",
              "items": {
                "type": "string",
                "title": "Api Key",
                "enum": [
                  "a52e39b2e85f44518c9557bef07cefb7",
                  "c379d9cfb0dd490a8399734afa7e28c4",
                  "63ef06b39d47413989f52fbd5be19761",
                  "3daaa577d3084251b2f22bb5bcfb092c",
                  "ce5679c23cd648e19896ce11c9183acf",
                  "71c9782424b64dbbb2e3b1b5ed7b9357",
                  "bd8bba27f49a45f69296a8f57715887a",
                  "722aacea2683463e965c0992d0a1fed6",
                  "d503c0c1e0774c33b6906f5379a114ab",
                  "a59de855c96448acb6f303edc6e26fe7",
                  "f621bcb5b7d44c238631e5e2cea96ac6",
                  "09a8a9e5c81b48f69fd43c0c3defddb0",
                  "d9b0f8ea7f7a4622999c8e1c15933a1e",
                  "dec38ad6b095403e8a1535585b2e9078",
                  "29f94443bbe74b49a9c67fa7a27fac84",
                  "7508fdb7357a4420b1d09271fe682905",
                  "bc81f22c34e84caa96e1d42e8c6df284",
                  "785336eafbea4c1d9c8c47f8cc07bf20",
                  "4a0d6a3658874b6c84e24424f73d5b34",
                  "c9933ce47b76448eaa8dd834a6edb588",
                  "d71730a87ca84a59a2ce94b9bbcc066f",
                  "1e4533bef3f74093b9ddcf727c32ecbd",
                  "6fc4f795c08846368f2ebcf942c38257",
                  "2584ca43d8c34818b409d70813725d06",
                  "75cd2758726d471abb499ba4a83cd43d",
                  "ffe9924c2c0a42fc97ffd80e85d37bc2",
                  "9791ea76c17a41b7b19e0c5de66cd595",
                  "aa51af2df7c3427faf9d8590fe464bc2",
                  "909009c5214249d18054565e6c57886f",
                  "c3609dd96eac4376b20890494e882a38",
                  "d7366e9c1f7a4c3f97cbc340c757d55b",
                  "42e71d5576964354b51688a983caa52c",
                  "1ac2152179c3469e8c9bd1b9b62de1f6",
                  "2f0c928b61654c36ade08c8c23bed62b",
                  "639e54158b254306ae68867995b70ee9",
                  "f5fbf33974794e859696defe6fc9818a",
                  "dfee9ead4fc245d59f7968c87e40709c",
                  "2d58cd1208f34a7886f8ab0760055ab3",
                  "45e8b0e39aba4eebb15ddf134e9b0bd9",
                  "0971189a1331474abbb8633f2c11bba1",
                  "b400399bbf444710af162ee1668aa47d",
                  "37429d6b9e304fafa37c64358921f565",
                  "26ceda9f2a694254979100a8455f0e73",
                  "2aa724b75a684e6c98bdfe9b00d94a08",
                  "ed7401c749404258a4c264f6b0f1786b",
                  "eff377216fae4ac0bbf41864d115cb22",
                  "014d336197b94414910b7317b5d019d1",
                  "0f61671976abf7f85d1c98b207830f6b",
                  "2c84e84bb902457aad6cb73206db923f",
                  "3563c230c22945f1826644bdb9534d95",
                  "fbe2a04cb5144f4cb8ec2a13f326398c",
                  "66a15471554f4326bbe5c2eb73c49ee3",
                  "JJ9QFssRnxzms2GPPRCBnMDXHjKQNAMW",
                  "58b6ec9ece784e88a575663cbb69074a",
                  "fa40c38d914340fb89f0c63027833a9d",
                  "3e99952c2cc7f1f566126deaff432996",
                  "uFBV0VlouC8OfU38v0l6lG0oVQ0kDqvr",
                  "d4cd446bb89a43c28a15d8909ad58f3b",
                  "1125ee6b84fc4dce83b890763fd567c3",
                  "529ec2c526214e388f13bd7347342483",
                  "604df5ac990fbc67dab8fc098af271e6",
                  "8430105cfa7149bf9273e8046b9751e0",
                  "f84c1db8380944308a93e085b5b1af86",
                  "6c228c145bc04142b13dd7b2c429d62b",
                  "3eb1d5c4b4df444a81e41afaf7053cd1",
                  "60bd7f41a86549698ec9d36b1243a3b5",
                  "65c9d01e68d945d9a3629c6a67a96127",
                  "634720b45ec046a1a193810f87755674",
                  "e71db157a8724cafabd2c579602b10d6",
                  "fe43a8180b58471084a27afc8b781b67",
                  "2f75c16649c04335b666ace790f3631e",
                  "13b9e5d0b4d342dd9ed599d196dcb5ad",
                  "a393b43b8a4047018db5ddd28bea8bbb",
                  "183e4c1b72294c60ac2fcc5de3bc2bfd",
                  "b46b718c759a412aa7ab20c1626062d3",
                  "f06ec13a06cb4faba310c583fa4419ba",
                  "17b573bf92c64b4dad88d1d6d5a3eeef",
                  "83e130a304f2489385b6d267105ee40b",
                  "0fb1db8761ac4a85b4eac8ec49a16867",
                  "6801c617d31745499828eed4c696f4bc",
                  "AjYFBMpbQdCoAFomuHhhFNNjvP5LHCfo",
                  "3bf2a0a885f94f279b9d86568182d75d",
                  "3db6d8afe2d24a78a2e7b976457a40f5",
                  "c2a8ae12b885451b90b86beee0c6e374",
                  "235104cf93754fa0b4b4c7983693842f",
                  "4c4d6d5691fd4e7db73b20b6edd27fe2",
                  "3c93dabcea2147c48f142e1fad482c36",
                  "b3f9b26bdd8f60ef0e2c2c0be0b74260",
                  "GvHfSjHAScUuTAasglA81CmfCEtciNmt",
                  "9692a066e340d51cb0b19f27ea06b364",
                  "e66654556ca510d3487c647399a2caf2",
                  "8ee5d5e1e43b4a92835709f4c4a973c9",
                  "689175898efa478d96d0dfda038e4dad",
                  "3fbe6187e6904dae93606048e2ff003a",
                  "f046805b8ac1461ca76dcf2e3d3f4040",
                  "96562a9d820d441cbc480c7a3758df7b",
                  "6392fc87a33447529e12a454da6c339b",
                  "6fa08f482b4c473880aa0215b3c5de39",
                  "V2ztxK2rFe86jD7zYkRhDSAdrOrcY5qo",
                  "9b67e2693d374162be5e2b1b0c66f036",
                  "0973656604e444bcba03231584b74870",
                  "5c31057bc55c4963837049a6d384b567",
                  "d11ae88278b74a6c931176ca4b7b164f",
                  "b4357251c0574a5e98661bbd06c2ca11",
                  "97f3c5a6f2d945528977e86535b927dd",
                  "HipATLcFtfhaa4NGPzk1dcPsIweaGmLh",
                  "3cf82ad2309640b48d43953c661fca7f",
                  "1a79efcfbfb34ff2b704e4dcde4e8fe9",
                  "2db786407faf4d2fa01bbd07f9a93e79",
                  "2918d633d2fe458f89fff1c241b96e9a",
                  "x7vQOMYuj1sZ6zeTNFeqL83qadqFT0Zm",
                  "480dd90425224c2f8cc9a77a402df105",
                  "c3526ba3fa99454896e0e6a9f4c3c4cc",
                  "8b96563e98c2433585767cb2fe1bee21",
                  "6d0b3139a676431992558dda67b6ba65",
                  "OMA5xOj8iBFRAcHJRmJeenKm4lr8UYTT",
                  "c6YGngARruDia5MOwAKgaMxyQdGnJ60H",
                  "fV8NesDn4r3e02A3XeAAhcGGqEb72W90",
                  "fe69ca7dfd6149ec9a47b3dd521e7644",
                  "fb7295e9e6f1427ebe937023e9114228",
                  "7a809a5636e84d1bac1d6f644ce8b56a",
                  "a692b345717e4adb85879bcee227bca9",
                  "fe1a806e420a45179b88e3689ca63446",
                  "e476082cf7af49b1b817e34c91d3486e",
                  "4eeb5d540ff54cf6b077ec469f2dd806",
                  "f4fc174d4733428e86fc38fc7f7bb748",
                  "e0c1977f09a14a7f8ffc35249e740bd3",
                  "003d23de388a443a813d8c2aeee76418",
                  "a90f1203bd8b4f16bd942870c6e14fbd",
                  "6eabe1249ed14043ac393cb5248f4fb6",
                  "819a5f22f3964bbc99931139ee2eb538",
                  "864d71cdaffb4e03a43a535c23d3292a",
                  "18ba5cb2b70d4093a20a362078f0958c",
                  "UnZqOVp4laTfF1l71GqnzXR5e34MUG3M",
                  "2c8792edf77a4bfa86f442bbf79da4e0",
                  "d79960cf15db4422a34d52785e088262",
                  "0e393a6f3c9c4e08aab38db741953af0",
                  "cede30a1de9c44f6b9183ff9be9ae309",
                  "e1a0f189b4f44b998fc8e47d515ab418",
                  "2b0d95e5167742bfaa87b50141d327b9",
                  "b38695ad77ef4d31b11192f8d80d9a8d",
                  "37504a549ca94c2fbcff1cc7ebfd89e2",
                  "6ac66961851f424f87aa7992a5cea5ca",
                  "5310815a01e14e95bfedf1b655fdef03",
                  "3e33684992de4c85a09d565eca3c0591",
                  "1edd47e8e8424d728f648f9c679f1fae",
                  "e12b65ecd73848db87c5ee7eb3f439e5",
                  "WZWxsKIlLOuwUxyn43usGMl2mBFJuczV",
                  "j2S1P01uImUQum2LFGuO9z2Jin0iqak7",
                  "f5e0a094f420d987ae37ef31813f3e46",
                  "IOGl4gRimt6h9gpPCfABcMjfPNKPzQer",
                  "m2ff39ba49a5498b8c7093c677016b87",
                  "2e57292fec6b4c7e9f9d0ccf49358a74",
                  "b9bdf962b01f4d39a524da440c3a9a24",
                  "3241a555f3bb49e0abebce79e2d9c683",
                  "c67b808be97b4ed7b1de747a7597c6ae",
                  "131457365d7a4b868263b1408386a4e9",
                  "73cb362d47024acebac4a5d7811f16e8",
                  "8a9ba4f6a62142e79e31d95d0b320df5",
                  "98a16c977805f1614cc9017fc0ca027c",
                  "e4eb2861e24ff944d3aa0e16bcb91122",
                  "drLb",
                  "drMonitoring",
                  "slowpitchstats",
                  "T38IByPBQUvbLHxrI1x9kIuY3BTTQSIb",
                  "95204aa36c9e464d95a9f94166ce1df7",
                  "GrEaNYFccnbzjiaNdGjyG627SiWCmv3g",
                  "LFiVpk5qjj570GwT6w8eSaVek9dcyUyo",
                  "dd05220dbc214907a081a449982f3d26",
                  "393169b895e84e13ba6389c0e412d193",
                  "jPvJi1XNitsGyJ8AFDNAizCAdVLKXm2y",
                  "6d9cc52eadd14cd7847b588468863592",
                  "5825c528f47a4f45881a6753c57b3a7f",
                  "11aa0d2e8f55487e99e67a15a9ff6168",
                  "989529bd2f0e4238a3012263d3d48241",
                  "6809b4l0G127438bb773d2d6ec18c394",
                  "4b9a7d96ccad47e0846628ac504b1e1b",
                  "74ba26c4a9d049be86c7cdb092417d97",
                  "fa1eaa5b2242410c82ff92323fcf6d47",
                  "a5a154df5b7840588172fc85ebe71e87",
                  "17d0e59684b34c3aab2861d0248cc25b",
                  "0c546c8ae3874452a66e37d505bec29a",
                  "01815239b9bb48869dea0f48b08ad5b7",
                  "cfb3cb708ce14e069555f231933454b6",
                  "83768800514044c883c1761ae50bffb4",
                  "61972e2ace5b43caad61136ee9ad9254",
                  "dbb3a637c32a4af1ad2410f8d32a7c84",
                  "01186811f3224264b1e564fcf5b7fdb9",
                  "e375ca2119cf4c14aa18ac3722dd07fb",
                  "ec48db0385914ebe9200d9547cb27c5f",
                  "21ea08fb07aa419aba9c4b4f077562d1",
                  "14e24fa4909743038e494db6b4b85697",
                  "65168b875d2b4a2da0321d75834f2620",
                  "8ba21719b32a41bb85a83f70ee999ec4",
                  "bf3c4e727412474c9d105c8d5b6f61ad",
                  "fee22d69e94a472192b30c23b3ac6ac7",
                  "4d0164638250450499a5483fc886f476",
                  "d87c355242804c4db2b474b070c100b7",
                  "47c970d8fa144db28a4908766d3e552b",
                  "75c5079cc5c34a4daca144acb33f191f",
                  "405ccf3d4bc541b6bf95b9ac8f732db7",
                  "11b3ec91ec684ad5b2c2bbcf0e117028",
                  "d0f92bb7bc42475994985532676e4d29",
                  "2b07a6cc14ba46b0ae52bafef48b7272",
                  "875fa335caaa46089d1e27455ba6b46a",
                  "e14e408740894337b29667ff124c3747",
                  "bd4ba131e94a49c48fc4621e4e208391",
                  "77c8cb21f0ee4d1e917e976d40a0192c",
                  "5d6509415b35421eb4c592f7f97fd5f2",
                  "b838ddb2e2814523a79accc70ae46417",
                  "b646a118ccf140508b0253c9a44d3e12",
                  "f9a80526573b495fb75b518b2b89354e",
                  "6d240ae497f14063be4c690890a60f86",
                  "31d1063fb493428794cc6b9a24f0af82",
                  "5c8c0596d0204a48bcf982e75f7b0057",
                  "badf3f7d1a924ef5b32c732a0dc85b66",
                  "7c43df67376442a69005f5cae5c3b25b",
                  "9d7500dc9bdc4b6381e66015387823eb",
                  "2159d7e4c5c047e6bd3745c85e403756",
                  "0ab3d1d0b1dd46e4839966bcd1b415c0",
                  "02561c33bd18412a9502326922b83a02",
                  "2815b31e5dd54c0aabcb32bf84a79bd9",
                  "25d0b5c0ecda494faa55f76384567c75",
                  "e75e39d4e89042c094d4c1b1c6a5d86e",
                  "7c73cd5e8e8f45689235f51f70732f8e",
                  "9130902f881a44aeacc8f319419cc929",
                  "10a0d29e20a14fbb87749cc73f8efff3",
                  "00dddd556c33472ab7afb4ebc7843282",
                  "0d5bf93475ea4372a96ef75938239fa2",
                  "2011706e978d4653b536ea3ea85b3005",
                  "36025fe36a014fc8a8c2ba4b585ab58c",
                  "4011d0dbbd4742f0a31fc3dbcf0c4299",
                  "592b25979f1d4ba3bdef695a144d64c0",
                  "9e1d95dec9d543f7a1a28345c64a2b73",
                  "c337ae62486445f58609a83cf0446851",
                  "fe7384de29d0498d99fc169315ee63c9",
                  "434920cfddec4c318beccf809d919a94",
                  "4009d041afec4bbda55cfcb32eddf94d",
                  "09fc9b3ad0c6494294ee7e6adabdcaa9",
                  "dcc4505ad4644b428264f44922b12ee5",
                  "fec7126def664064840f03dfd693b524",
                  "47ec2875c3e74c8e965b918a0dd0b37f",
                  "0cf750d174b4421c948323ff0f150eb2",
                  "82b2bcac1a5e429bbc14b12f558ef1d2",
                  "52020246f6e94edb861d4b7c86cf1659",
                  "f2c6fcc010824c05989a44e69e588742",
                  "bf2136f4b1234b48bd94ddf1f97d4e67",
                  "36b3419fa81d434ebfddbe1415356e0b",
                  "c65d281d6d3941e49982bd634fbbec25",
                  "6fe5bb8863c24a3fb4a1515c26153da0",
                  "270a9538f6f44736bb8834f8f14d61a6",
                  "03a5370a46014fe0a4da4241682e6079",
                  "968adfad396c41b1b8c2ed54dd2ee471",
                  "7dd17e4290984c9fb39d421a565b7abb",
                  "bbddf0b2ae65413d91fa2ec54c352e51",
                  "47618a302887457783034cddee3cac73",
                  "ef029932ce20412a9e4dac1ea7fe83b3",
                  "46c4a16e6b3748f58f918cd7e20c06f1",
                  "a9a505bb3b6c4648b071f9e774d4e3f7",
                  "996d2558219840f3869d0feee75a4ba4",
                  "13626bbd97224522a159545a50c28383",
                  "de6c4779b8584f9fb1a1b880da974fc6",
                  "6163570332e746479d2052a10f1f4315",
                  "6b43a7c9ff634eef9d0a1d430b994609",
                  "0c6cb9bf180043458fbcd9a74f4ee5a3",
                  "b679d652d6704c9e8c5a812157552329",
                  "83fb8058737345aba941639128699cd7",
                  "5b026578210849e0a3435a95b95d0ea2",
                  "19e3ed05bf584df69be668709fafa954",
                  "360897d6b74b4d7a8f80bdff388e0ca1",
                  "3ce90c17b5e64559b9f198efb5418913",
                  "d487033298da4c4e8532f8da8d4bc2e4",
                  "49ea6136b8b94019897647eb6cb40b6d",
                  "289d7fecc9814fd7953223d7ef4c0350",
                  "de1c2c1beb49463b9cc01c8785d06051",
                  "a26cf34353044b78aa9e20a3efcf0abb",
                  "5ba8c5935f29425789687688a0bd778b",
                  "39af461e1a9249d0af8896fa8443979c",
                  "1d18eaea1bdd496d9d78589359a72bd5",
                  "30d9063c1cc641d88ea46b6058ebc38f",
                  "29698303f906482a906dca00f94f8d01",
                  "91017dfa6e484fa3b8da08db8a553905",
                  "e0a7add820724303872d7f6ccf24392a",
                  "aa631b2b61f44f9c8a2f50fa909007e7",
                  "e85ef23487124be5a3844dff4e15d318",
                  "5fd2a624e71746c981f58d7ac79e9fc4",
                  "6345e570f5d04a80a26e0916a654c974",
                  "839ceead92404cbdb4419ac6ef7f6d05",
                  "d8d5550c60f44055830fdd5c5a3d05bc",
                  "4e2672ea3d2d4d69b8dda44a00806e34",
                  "3ff138ba511b4ea19e03825a8565599f",
                  "183f5c47c9784caea04bb4bcfd160806",
                  "Mf9WXzGfr2B8UgF63ucNGLpmCNmuHJGe",
                  "84LfuDZFMzh4OkqAEqf9FwzzAm9a5m7z",
                  "4GEFGGGU8KltQGPpqClVXLusU7I9xDvw",
                  "3YGONLdp1Ze88sLyBDbPFN8DUR5oQI4p",
                  "EwUZtJiOJIlnkLq2k46V5txKR3bjJWq8",
                  "lv1kDTOXvnNQvuFpkM5Af1NIFtK9TOAD",
                  "mw8GrV3n5RjkoBCyYXmuApRf9bs5Y8Id",
                  "BIPVgoickzA3F3f6vDolpNdyyVIJqNu9",
                  "b97fd7152d804d429d706e1b8f82cb2a",
                  "27fb8aa9e9e94f4da269144fc92dbac7",
                  "9485fa7b159e42edb08a83bde0d83dia",
                  "x4Uo2cwIaUr1GSVHEPY82EQ15MWOuHUa",
                  "HBAgVRFqtU232A82hGGINxxXHDbHFi5q",
                  "Gr7UzxdwWXOTHbyPD2DGsFTMV7cAGt0f",
                  "ffde04838d9e4778a9295ba5f825fd84",
                  "29f2aa5dfbe21265da9df360e9c40f34",
                  "192a09e3f41571b5421dec528c76c846",
                  "21f64753cf014b9783a73e9645ee640d",
                  "817f2a161e624076b35219965b88a25d",
                  "7c80329a76e14e6e8fe252d5d67562de",
                  "f5a8d5cdf1a84a548ca7b3dd87d3f097",
                  "7eb58ac6d2b0437294159cce8d968995",
                  "c5017f3034ff48ce8bac77defcc27fff",
                  "e4e5b7be6f0343b4aa7530c104329b42",
                  "2ed1ec032d0a43c6b694d90166597ca2",
                  "1b3476bae4e94fa08f156ea59fdf51fe",
                  "99e21358c19c4ced9d1932a29f0623f1",
                  "5538a2fed2f94d038ec48cc41beb6a38",
                  "1fb4b501e1504cb49befc0adc661747d",
                  "8e3fd8a6b52e48a38170c9be9b29ffe1",
                  "OfEXe4Rr9ON0F0buy7GfwlMJTQztRCUk",
                  "P6CpVQdHrJD4AixO6zRZO1sd1aD0WmOi",
                  "O2k6McH9iN7UGAJoVWUDzFU5AKgkhNkK",
                  "deb09d9fce9b4cf2a1b6e0570227a6e5",
                  "74d07d5ecbd0466cb3e6016ce91aa466",
                  "5af30905f7874fb0962f153ec990e9f5",
                  "LjJiINSM8m6aLAZ5GzOXvABPiAgCaRmY",
                  "4af9b12fbb284f069a1887d67cda5a01",
                  "0fffa5a070a3409c9fec8211f35ca945",
                  "5f5105c7a96d40c3b02de118d7aea4e5",
                  "5954b627ade9405c9955687939ffab6a",
                  "5de150dc29228095f9811cdf15ea5938",
                  "b0dc30922cd14014857de1fc83208529",
                  "ea243ea946744e9d9cc7290a9dabf438",
                  "02fa6c6228f9df9bf445d28216705a97",
                  "77d378c27c11402285201cdf2dc0bccc",
                  "780e6221a2ee627b0ae1cffcdf31f9aa",
                  "36tnbk7frf5suyj5gby3j6yb",
                  "SNvVwAFtjoq0UOuAJ3Rj7lZl4BPjoENy",
                  "66759a8a36a3463c8523b31ecc5b65ef",
                  "5a7b5d42d95d418b9cf7f7410f7972f7",
                  "8ac42ccff20845f2be98ea157a5477ca",
                  "ffdd879d12a34305bb4d0dd5ac1dffaa",
                  "ef5462596d6b41b9be9d8c724e1906a3",
                  "f5a213b29d334070b40bd3e1f6fb6b6c",
                  "3c9b552c6fc64cfda6bccb86efb4c297",
                  "4210306424e546b78990dd9ea42bb5a9",
                  "W8p50dcae1884cd9a945472ad60b9afe",
                  "398fd4cd5b484aa1a47a10dee2a8fca3",
                  "84fc57c62fbd4dff8b8f29ec6c896dd3",
                  "SKqtQ0XopVO70r4k0okPGHDmAZxOACSR",
                  "eAmN9NUzzDdvAD1Xwvtf3L8UVq6MTycC",
                  "AhGyi9pPBPmRsA14rCGcvTlHT9cVDECe",
                  "4e1d0267e2b8406ebee074ef7b81867d",
                  "b0b53721112a43238a21907e6ddfbfa5",
                  "c37f4c6cf2d6416fbde31c5197a6747a",
                  "9a7b3aa0dd924a5bb5d0d6ee382cb0f1",
                  "b691279436264b0aa1c60b51c536383b",
                  "ca16fb2bc8b8467aa35a15f885565915",
                  "c1c7ce2f588248cbb35cc47e7749e024",
                  "40943e90d623415391d1677e91c10e4d",
                  "5ef7f2e4ea66403685823e72dcb2f50b",
                  "3931467461dc4c22b03bd23545a8b9e9",
                  "d4f5388ea0b040baaaeeeaf31a39bbfc",
                  "2d6c9790b3c74fa8b5bd40be56c944a0",
                  "ef251a886f594732a5ebde1cbb63318d",
                  "7bb58f576e1a4f0d9b0b05345e4fc00b",
                  "32ad5ead59b048b2a4784a748571aa7e",
                  "0e3080b2c3b745c2a4c25009fd3470af",
                  "2a2c8fb134624033b0e2b0295046296e",
                  "bcd1f840d68e4f86b49524ed7312b454",
                  "c9035ba3f06a41eea2015c17d7bb4c91",
                  "1ea8a8c2acac4307bb5a9a6950906516",
                  "4e3614e0fc8b4d75a074d0a12e0a863b",
                  "8370f74a7b6441aa8b34b4a8770b8753",
                  "b78be955d5b54f6198e6d61e7f8112c9",
                  "b662deb3a4024e90b94f491689d15eca",
                  "360b4801a0eb4321aa3d187855026cbe",
                  "a7e2af2a8976518a2e9d50abb0879417",
                  "R27RpTAwWXl9CEj0oam3ABhm6KfNXhAY",
                  "ffff826ce66ee941c47ae664eb1ea75e",
                  "fPFPi36zIGKmIX33D6FujlGTSuZeHUEb",
                  "e8801e97251c4f6298b1a3e8282ae169",
                  "e3e03a04bd704fc783f93410e41005fc",
                  "2d022a0bc7a14e788f74df5fb6c38e12",
                  "451402db08cd4b90ad538fca563359ac",
                  "b88f4c94a4774dcea2e9ab54fa595ce9",
                  "3e3411ccd49648e1a568521612eaf73c"
                ]
              }
            },
            "serviceIds": {
              "type": "array",
              "title": "Service IDs",
              "items": {
                "type": "string",
                "title": "Service ID",
                "enum": [
                  "CFSRFNotificationPush",
                  "absorb-sso",
                  "addresses",
                  "admin",
                  "admin-jobs",
                  "admin-products",
                  "api-directory-service",
                  "api-key-service",
                  "aqueduct",
                  "arctic-pricing-processor-web",
                  "arctic-usage-web",
                  "audit-service",
                  "bvseo-proxy",
                  "catalog-pdm-shopper",
                  "compliance-affirm",
                  "device-information",
                  "devprod",
                  "digital-rights-service",
                  "dispatch-metrics-service",
                  "display-management",
                  "fmis",
                  "forge-settings-service",
                  "fps",
                  "integration-provisioning",
                  "managed-inventory",
                  "merchandising-offer",
                  "merchandising-shopper",
                  "metered",
                  "mosaic",
                  "msuni",
                  "notification",
                  "oauth20",
                  "om",
                  "orca-admin",
                  "pricing-shopper",
                  "reporting-auth",
                  "riskified",
                  "shopatron-inv-orca",
                  "shopper-api-reporting",
                  "shoppers",
                  "ssr-ms-shipment-storage",
                  "ssr-user-management",
                  "swagger",
                  "testService",
                  "trace",
                  "v1",
                  "v1ods",
                  "watch-service"
                ]
              }
            },
            "clusters": {
              "type": "array",
              "title": "Clusters",
              "items": {
                "title": "Cluter",
                "type": "string"
              }
            },
            "documentTypes": {
              "type": "array",
              "title": "Document Types",
              "items": {
                "type": "string",
                "title": "Document Type"
              }
            },
            "properties": {
              "type": "object",
              "properties": {
                "count": {
                  "type": "string"
                },
                "interval": {
                  "type": "string"
                },
                "siteId": {
                  "type": "string"
                },
                "responseSource": {
                  "type": "string"
                },
                "responseStatus": {
                  "type": "string"
                }
              }
            }
          }
        },
        "CreateWatchDefinition": {
          "$ref": "#"
        }
      }
    }
  }
}

module.exports = definitions