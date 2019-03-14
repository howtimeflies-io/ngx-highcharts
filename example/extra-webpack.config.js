module.exports = (config, options) => {
  config.externals = {
    'highcharts': JSON.stringify('highcharts')
  };
  return config;
};
