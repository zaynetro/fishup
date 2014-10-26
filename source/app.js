/**
 * App
 */

var Backbone = require('backbone');
var $ = require('jquery');

window.jQuery = $;
require('slick-carousel');

Backbone.$ = $;

var Router = require('./router');

$(document).ready(function () {

  window.router = new Router();

  Backbone.history.start({
    pushState : true
  });

  /**
   * Bind events to all local links
   */
  $(document).on('click', 'a[data-local]', function (e) {
    var href = $(this).attr('href');
    var protocol = this.protocol + '//';

    if(href.slice(protocol.length) !== protocol) {
      e.preventDefault();
      window.router.navigate(href, true);
    }
  });

});
