'use strict';

const addItemSchema = {
  'type': 'object',
  'properties': {
    'item': {
      'type': 'object',
      'properties': {
        'name': {
          'type': 'string',
          'minLength': 1,
          'maxLength': 80
        },
        'price': {
          'type': 'number',
          'minimum': 0
        },
        'quantity': {
          'type': 'number',
          'minimum': 1
        }
      },
      'required': ['name', 'price', 'quantity']
    }
  }
};

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
    'pathImage': {
      'type': 'string',
      'minLength': 1,
      'maxLength': 200
    }

  },
  'required': ['name', 'owner']
};

module.exports = {
  addItemSchema,
  addListSchema
};
