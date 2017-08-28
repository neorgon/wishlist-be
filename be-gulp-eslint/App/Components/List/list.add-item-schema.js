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

module.exports = addItemSchema;
