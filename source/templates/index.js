module.exports = {"app":"<div id='topBar'></div>\n<div id='content'></div>\n","fishingspot":"<div class=\"paikka\">\n  <h1><%= data.properties.Paikka %></h1>\n</div>\n\n<div class=\"kuvaus\"><%= data.properties.Kuvaus %></div>\n\n<div class=\"kalastus\">\n  <h3>Kuvaus</h3>\n  <p><%= data.properties.Kalastus %></p>\n</div>\n\n<div class=\"kalasto\">\n  <h3>Kalasto</h3>\n  <p><%= data.properties.Kalasto %></p>\n</div>\n\n<div class=\"veneenlasku\">\n  <h3>Veneenlasku</h3>\n  <p><%= data.properties.Veneenlask %></p>\n</div>\n\n<button id=\"close\"><i class=\"fa fa-times\"></i></button>\n","homepage":"<div id='global'></div>\n<div id='map'></div>\n","sharefishpage":"<div>\n  <input type=\"file\" id=\"take-picture\" accept=\"image/*\">\n</div>\n\n<div class='result-picture'>\n  <img id=\"show-picture\">\n</div>\n","tipspage":"<div id=\"tip1\" class=\"tip\">\n  <h2>Weather is everything</h2>\n  <p><em>General tips</em></p>\n\n  <p>An overcast sky can lead to some of the most successful fishing trips.  While you can still catch fish in other weather conditions, an overcast sky has proven to be the best.</p>\n</div>\n\n<div id=\"tip2\" class=\"tip\">\n  <h2>Get a fishing license</h2>\n  <p><em>General tips</em></p>\n\n  <p>Remember, before you go fishing, you need to purchase your fishing license and to check your state fishing regulations.</p>\n</div>\n\n<div id=\"tip3\" class=\"tip\">\n  <h2>Boat or Shoreline Fishing: Basics</h2>\n  <p><em>General tips</em></p>\n\n  <p>Are you going to be fishing from the shore or from a boat? The fishing techniques you will need to employ may differ. Here are a few things to consider:\n\n  Shoreline- Is the shoreline clear enough for you to have lake access? Is the shoreline shared with a swimming area? Does the lake have ample ideal fishing spots along the accessible shore (i.e. shade, lily pads, down stumps)?\n\n  Boat fishing- Does the lake you select have a boat launch? Will you need to rent a boat? If you already have one, is it a size suiting to the lake you select?</p>\n</div>\n","topbar":"<div class=\"logo\">\n  <img src=\"img/logo.png\">\n</div>\n<div class=\"menu\">\n  <button id=\"pull\"><i class=\"fa fa-bars\"></i></button>\n  <ul>\n    <li>\n      <a href='/' data-local>\n        <img src=\"/img/map.png\">\n        <h4>Find fishing spots</h4>\n        <p>Find the best fishing spots for you</p>\n      </a>\n    </li>\n    <li>\n      <a href='/share/add' data-local>\n        <img src=\"/img/pic.png\">\n        <h4>Share your fish</h4>\n        <p>Share pictures of your prey</p>\n      </a>\n    </li>\n    <li>\n      <img src=\"/img/profile.png\">\n      <h4>Fishing profile</h4>\n      <p>See your fish score and pictures</p>\n    </li>\n    <li>\n      <a href='/tips' data-local>\n        <img src=\"/img/tips.png\">\n        <h4>Fishing tips</h4>\n        <p>Learn to fish better</p>\n      </a>\n    </li>\n    <li>\n      <img src=\"/img/info-baltic.png\">\n      <h4>Baltic Sea fishing</h4>\n      <p>Info about fishing in the Baltic Sea</p>\n    </li>\n    <li>\n      <h4><i class=\"fa fa-info-circle\"></i>More info about the app</h4>\n    </li>\n  </ul>\n</div>\n"};