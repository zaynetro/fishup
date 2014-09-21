/**
 * Fishing spot view helpers
 */

String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.slice(1);
};

module.exports = {

  /**
   * Get temperature in Celsius
   */
  getTemp : function (data) {
    try {
      return Math.round(data.weather.main.temp - 273.15);
    } catch (e) {
      return '';
    }
  },

  /**
   * Get wind speed
   */
  getWind : function (data) {
    try {
      return data.weather.wind.speed + 'm/s';
    } catch (e) {
      return '';
    }
  },

  /**
   * Get description
   */
  getDesc : function (data) {
    try {
      return data.weather.weather[0].description.capitalize();
    } catch (e) {
      return '';
    }
  }

};
