/**
 * Share fish model
 */

var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');

var api = require('../util/api');

module.exports = Backbone.Model.extend({

  urlRoot : api.parseBaseUrl + 'ShareFish',

  upload : function (file, cb) {
    var self = this;
    var url = api.parseFileUrl + file.name;

    $.ajax({
      type: "POST",
      headers : _.extend({ 'Content-type' : file.type }, api.parseHeader),
      url: url,
      data: file,
      processData: false,
      contentType: false,
      success: function(data) {
        self.set(data);

        self.save(null, {
          headers : api.parseHeader
        });

        if(typeof cb === 'function') {
          cb(self);
        }
      },
      error: function(data) {
        console.log(data);
      }
    });
  }
});
