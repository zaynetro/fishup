/**
 * API util
 */

var appId = 'Gb36qAAvxHxEYMe6F1W1mkc3cs6X83Tlf8NvxbJ4';
var apiKey = 'awmJoBIzyfdbrlJdaqf6AwVyyOwm8MljueAurQN3';

module.exports = {

  parseBaseUrl : 'https://api.parse.com/1/classes/',

  parseHeader : {
    'X-Parse-Application-Id' : appId,
    'X-Parse-REST-API-Key' : apiKey
  }

};
