module.exports = {"app":"<div id='global'></div>\n<div id='topBar'></div>\n<div id='map'></div>\n","fishingspot":"<div class=\"paikka\">\n  <h1><%= data.properties.Paikka %></h1>\n</div>\n\n<div class=\"kuvaus\"><%= data.properties.Kuvaus %></div>\n\n<div class=\"kalastus\">\n  <h3>Kuvaus</h3>\n  <p><%= data.properties.Kalastus %></p>\n</div>\n\n<div class=\"kalasto\">\n  <h3>Kalasto</h3>\n  <p><%= data.properties.Kalasto %></p>\n</div>\n\n<div class=\"veneenlasku\">\n  <h3>Veneenlasku</h3>\n  <p><%= data.properties.Veneenlask %></p>\n</div>\n\n<button id=\"close\"><i class=\"fa fa-times\"></i></button>\n"};