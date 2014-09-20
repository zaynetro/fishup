/**
 * Share fish page view
 */

var
  _ = require('underscore'),
  Backbone = require('backbone');

var templates = require('../templates/');

module.exports = Backbone.View.extend({

  template : templates.sharefishpage,

  events : {
    'change #take-picture' : 'shootPic'
  },

  render : function () {
    this.$el.html(_.template(this.template, { variable : 'data' }));

    return this;
  },

  shootPic : function (event) {
    var $showPic = this.$el.find('#show-picture');

    // Get a reference to the taken picture or chosen file
    var files = event.target.files,
        file;

    if (files && files.length > 0) {
      file = files[0];
      try {
        // Get window.URL object
        var URL = window.URL || window.webkitURL;

        // Create ObjectURL
        var imgURL = URL.createObjectURL(file);

        // Set img src to ObjectURL
        $showPic.attr('src', imgURL);

        // Revoke ObjectURL
        URL.revokeObjectURL(imgURL);
      }
      catch (e) {
        try {
          // Fallback if createObjectURL is not supported
          var fileReader = new FileReader();
          fileReader.onload = function (event) {
              $showPic.attr(src, event.target.result);
          };
          fileReader.readAsDataURL(file);
        }
        catch (err) {
          console.log(err);
        }
      }
    }
  }
});
