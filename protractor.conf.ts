import { $, browser, by, Config, element, protractor } from 'protractor';
import { BASE_URL, PASSWORD_GUI, USERNAME_GUI } from './environment/environment';
import { async } from 'q';

export let config: Config = {
    plugins: [
        {
            path: '../node_modules/protractor-console',
            package: 'protractor-console',
            logLevels: ['severe']
        }
    ],

    baseUrl: BASE_URL,

    troubleshoot: true,

    /**
     * https://github.com/angular/protractor/blob/master/lib/config.ts
     *
     * Your test script communicates directly Chrome Driver or Firefox Driver, bypassing any Selenium Server.
     * If this is true, settings for seleniumAddress and seleniumServerJar will be ignored. If you attempt to use a browser other than Chrome or Firefox an error will be thrown.
     *
     * The advantage of directly connecting to browser drivers is that your test scripts may start up and run faster.
     */
    directConnect: true,

    /**
     * https://github.com/angular/protractor/blob/2bde92b3e745e09ad3876932b2d187365e9aaa31/spec/angular2Conf.js
     *
     * Special option for Angular2, to test against all Angular2 applications on the page.
     * This means that Protractor will wait for every app to be stable before each action, and search within all apps when finding elements.
     */
    useAllAngular2AppRoots: true,

    capabilities: {
        /**
         * https://github.com/angular/protractor/blob/master/docs/browser-support.md
         * recommend testing against FireFox 47
         * in case of Firefox testing the: ["protractor": "5.0.0",] should be in package.json.
         *
         * Additional capabilities for Firefox testing:
         * marionette: true,
         */
        browserName: 'chrome',

        /**
         * Using headless Chrome
         * https://github.com/angular/protractor/blob/master/docs/browser-setup.md#using-headless-chrome
         * This is supported only with Protractor 5.1.2+ should be in package.json. So need to do an `yarn install` again.
         *
         * Additional arguments to below list:
         * '--headless',
         * '--disable-gpu'
         */
        chromeOptions: {
            args: ['--test-type', '--no-sandbox', '--disable-web-security', '--start-maximized']
        },
        idleTimeout: 120,
        locationContextEnabled: true,
        javascriptEnabled: true,
        acceptSslCerts: true,
        trustAllSSLCertificates: true,
        acceptInsecureCerts: true,
        ignoreUncaughtExceptions: true,
        handlesAlerts: true,
        loggingPrefs: { browser: 'SEVERE', driver: 'ALL' }
    },

    framework: 'jasmine',
    allScriptsTimeout: 60000,
    getPageTimeout: 60000,
    ScriptTimeoutError: 60000,
    jasmineNodeOpts: {
        onComplete: null,
        showColors: true,
        includeStackTrace: true,
        isVerbose: true,
        defaultTimeoutInterval: 60000
    },

    specs: [
        '../utils/slowdownProtractor.ts',
        '../tests/specLogin.ts',
        // '../tests/specBase.ts',
        // '../tests/specCredential.ts',
        '../tests/specCluster.ts'
    ],

    /**
     * TypeScript compiler options
     */
    beforeLaunch: () => {
        require('ts-node').register({
            project: 'tsconfig.json'
        });
    },

    onPrepare: () => {
        const EC = protractor.ExpectedConditions;

        console.log('The Base URL is: ' + BASE_URL);
        console.log('The Username is: ' + USERNAME_GUI);
        console.log('The Password is: ' + PASSWORD_GUI);

        browser.getCapabilities().then((browserCapabilities: any) => {
            console.log('Browser name is: ' + browserCapabilities.get('browserName'));
            console.log('Browser version is: ' + browserCapabilities.get('version'));
            console.log('Browser version is: ' + browserCapabilities.get('platform'));
        });

        /**
         * WebDriver general settings for browsers.
         */
        browser.manage().deleteAllCookies();
        // https://github.com/angular/protractor/issues/1467
        browser.manage().window().maximize();
        //browser.manage().window().setSize(1280, 1024);
        browser
            .manage()
            .timeouts()
            .implicitlyWait(10000);
        browser
            .manage()
            .timeouts()
            .pageLoadTimeout(20000);

        /**
         * https://github.com/angular/protractor/issues/3009
         * browser.executeScript('window.name = "NG_ENABLE_DEBUG_INFO!"');
         *
         * https://github.com/angular/protractor/issues/3611
         * browser.ignoreSynchronization = true; - This property is deprecated - please use waitForAngularEnabled instead.
         *
         * browser.waitForAngularEnabled(false);
         *
         * How do I deal with my log-in page?
         * If your app needs log-in, there are a couple ways to deal with it. If your login page is not written with Angular, you'll need to interact with it
         * via unwrapped webdriver, which can be accessed like browser.driver.get(). You can also use browser.waitForAngularEnabled(false) as explained here.
         *
         * Another option is to put your log-in code into an onPrepare function, which will be run once before any of your tests. See this example
         * (withLoginConf.js)
         * https://github.com/angular/protractor/blob/master/docs/faq.md#how-do-i-deal-with-my-log-in-page
         *
         * Open the base URL that defined above.
         * OR
         * You can use parameter 'browser.params.baseUrl' with 'protractor protractor.conf.js --params.baseUrl=https://123.12.123.12:3000/'.
         */
        browser.waitForAngularEnabled(false);
        browser.get(browser.baseUrl);

        // It genereates JUnit XML report for test run.
        const jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(
            new jasmineReporters.JUnitXmlReporter({
                savePath: './jasmine-reports',
                filePrefix: 'junitReport',
                consolidateAll: true
            })
        );
        // Format the Console test result report.
        const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(
            new SpecReporter({
                // Configuration: https://github.com/bcaudan/jasmine-spec-reporter/blob/master/src/configuration.ts
                suite: {
                    displayNumber: true // display each suite number (hierarchical)
                },
                spec: {
                    displayDuration: true, // display each spec duration
                    displayStacktrace: true // display stacktrace for each failed assertion
                },
                summary: {
                    displaySuccessful: false, // display summary of all successes after execution
                    displayFailed: true, // display summary of all failures after execution
                    displayPending: false, // display summary of all pending specs after execution
                    displayDuration: true // display execution duration
                },
                colors: {
                    enabled: true // enable colors
                }
            })
        );
        /**
         * It generates HTML reports for the test run. In case of failure these save screenshot about the related page.
         *
         * https://github.com/Kenzitron/protractor-jasmine2-html-reporter/issues/48
         * "noGlobals: false" must be to can generates screenshots and can avoid "ReferenceError: browser is not defined
         * at Jasmine2HTMLReporter.self.specDone"
         */
        const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: './jasmine-reports/',
                screenshotsFolder: 'screenshots',
                filePrefix: 'htmlReport',
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                fixedScreenshotName: true
            })
        );
    },

    /**
     * Disabling the Promise Flow Control Feature in Jasmine; when you're using async and await, disable the now-deprecated Selenium promise manager
     * in your protractor configuration file. With this setting still enabled you'll run into stability problems.
     * https://github.com/SeleniumHQ/selenium/issues/2969
     */
    SELENIUM_PROMISE_MANAGER: false
};
