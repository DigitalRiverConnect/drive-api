var schema = {
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
              "testkey-AbcDEfTGI1730430132874",
              "testkey-1343KBIEJW2355abedaDef",
              "testkey-XGwewef40298IELSLIGe32",
              "testkey-fe1ABDewe3234Jioqqej33",
              "testkey-EI4716nfjdiDe93Lo9d3es"
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
              "doughnut-metrics-service",
              "service1"
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

module.exports = schema