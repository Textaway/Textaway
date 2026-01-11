{
  "name": "ActivityLog",
  "type": "object",
  "properties": {
    "userId": {
      "type": "string",
      "description": "The ID of the user performing the action"
    },
    "actionType": {
      "type": "string",
      "description": "The type of action performed (e.g., 'sendMessage', 'createRoom')"
    },
    "description": {
      "type": "string",
      "description": "A detailed description of the action"
    },
    "ipAddress": {
      "type": "string",
      "description": "The IP address from which the action was performed"
    },
    "userAgent": {
      "type": "string",
      "description": "The user agent (browser/device) of the user"
    },
    "location": {
      "type": "string",
      "description": "Approximate location of the user"
    }
  },
  "required": [
    "userId",
    "actionType",
    "description"
  ],
  "x-accessControl": {
    "permissions": {
      "read": "creator",
      "write": "creator"
    }
  }
}
