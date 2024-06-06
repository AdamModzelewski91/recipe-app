// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-firefox-launcher"),
      require("karma-mocha-reporter"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    mochaReporter: {
      ignoreSkipped: true,
      colors: {
        success: "green",
        info: "grey",
        warning: "yellow",
        error: "red",
      },
      symbols: {
        success: "+",
        info: "#",
        warning: "!",
        error: "x",
      },
    },
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/recipe-app"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
      includeAllSources: true,
    },
    reporters: ["mocha", "progress", "kjhtml"],
    browsers: ["Firefox"],
    restartOnFileChange: true,
  });
};
