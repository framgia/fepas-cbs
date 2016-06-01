exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['specs/**/*.js'],
  baseUrl: 'http://localhost:5000/#',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
}
