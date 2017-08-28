'use strict';

const addListSchema = {
  'type': 'object',
  'properties': {
    'name': {
      'type': 'string',
      'minLength': 1,
      'maxLength': 80
    },
    'owner': {
      'type': 'string',
      'minLength': 1,
      'maxLength': 80
    },
    'description': {
      'type': 'string',
      'minLength': 1,
      'maxLength': 200
    },
    'image': {
      'type': 'string',
      'minLength': 1
    }

  },
  'required': ['name', 'owner']
};

module.exports = addListSchema;
