# PoC project for Cloudbreak GUI

We use Protractor and Jasmine for our GUI E2E and Integration tests. However in the near future we are having to basically change our existing projects, because of the WebDriverJS promise manager is being to deprecate and remove. So this is an experimental project in preparation of [Async/Await](https://www.protractortest.org/#/async-await) rewriting.

The Depreciation Plan says:

* **Phase 1: allow users to opt-out of the promise manager** (October 2016)
* **Phase 2: opt-in to the promise manager** (October 2017)
* **Phase 3: removing the promise manager** (October 2018)

check the [SeleniumHQ's github issue](https://github.com/SeleniumHQ/selenium/issues/2969) for details.

> "Instead of the control flow, you can synchronize your commands with promise chaining or the upcoming ES7 feature async/await...The latest Node.js provides native async/await, which means we can get stable e2e test without using control flow in javascript test.
>
> **Note:** 
> To write and run native async/await test, the node.js version should be greater than or equal to 8.0, and Jasmine version should be greater than or equal to 2.7" by [Protractor](https://www.protractortest.org/#/async-await)

I created a [new TestCafe project](https://github.com/aszegedi/testcafe-examp) as well to comparison. [TestCafe](http://devexpress.github.io/testcafe/) natively applies [Async/Await](http://devexpress.github.io/testcafe/documentation/test-api/waiting-for-page-elements-to-appear.html) syntax (learn more at [JavaScript Info](https://javascript.info/async-await)). So you can easily compare the TestCafe and the Protractor way for the same application and goal.

## Summary
After several days of experimenting and creating this project. I decided to abandon this experimenting project and continue with TestCafe. TestCafe more stable and reliable and convenient for mock testing. 

So after 3 years of test automation with Protractor, I had to say Good Bye! I hope Protractor - Jasmine are going to be as stable as TestCafe with Async/Await; unfortunatelly right now I cannot use for Async/Await testing for Cloudbreak GUI.

## Main Goal
Create a demo project with Protractor to cover a cluster creation workflow with Cloudbreak GUI.

## To Get Started

### Pre-requisites
1. Please install followings if these have not installed for you:
      * NodeJS
      * Google Chrome
    
    > You can check Protractor browser compatibility at [Protractor Browser Support](https://github.com/angular/protractor/blob/master/docs/browser-support.md)

2. IDE or Text Editor should be installed (WebStorm/Sublime/Visual Studio Code/Brackets)

3. Every variable from [environment file](utils/testenvironment) should be present as environment variables with valid values:
    
    > For OS X Yosemite users with IntelliJ IDEA: You should add the environment variables to your
    `bash_profile` to can run tests directly form IDEA with no issues.
    The file should contain the variables for examples:
    
    ```
    export BASE_URL=your.url
    launchctl setenv BASE_URL $BASE_URL
    export CLOUDBREAK_USERNAME=your@mail.address
    launchctl setenv CLOUDBREAK_USERNAME $CLOUDBREAK_USERNAME
    export CLOUDBREAK_PASSWORD=your.password
    launchctl setenv CLOUDBREAK_PASSWORD $CLOUDBREAK_PASSWORD
    ...etc.
    ```
    
    > Please do not forget you should reopen your project and restart your IDE.
    
    If you do not want to create permanent environment variables on your machine, you can create a source file (for example `testenvironment`) instead:
    
    ```
    export BASE_URL=your.url
    export CLOUDBREAK_USERNAME=your@mail.address
    export CLOUDBREAK_PASSWORD=your.password
    ...etc.
    export PATH=/<local path of the project>/cloud-e2e-protractor/node_modules/protractor/bin:$PATH
    ```
    
    After these you can set all of these in one round with `source` in current shell using:
        
    ```
    chmod +x testenvironment
    . testenvironment
    ```
    
    or
    
    ```
    chmod +x testenvironment
    source testenvironment
    ```

4. [Set your local Node environment up](https://docs.npmjs.com/cli/install) (install every needed packages and tools) for the project. Run:
 
    ```yarn install```
   
   from the root of the project where the `package.json` is located.

### Run Protractor tests
> If your Protractor test environment has just cloned, you should set up its Node environment first (install every needed packages and tools). The easiest way to get all the needed Node packages in one round to use `yarn install`. Please check the [npm-install](https://docs.npmjs.com/cli/install) documentation. Beyond these please check the [Protractor Tutorial](https://angular.github.io/protractor/#/tutorial).
> You do not need to launch the `webdriver-manager` for these tests, because of the `directConnect` is `true` by default in the [Protractor configuration](protractor.conf.ts). In this case the Protractor works directly with Chrome or Firefox Driver, bypassing any Selenium Server.

Test command in [package.json](package.json):
```    
"test": "yarn run build && yarn run protractor-test"
```
1. Set the needed environment variables for [environment](environment/environment.ts) file
2. ```yarn test```

> Above command compiles the project then launches all the tests in the Browser based on the project configuration.

### Headless non browser-dependent testing 
Aside for Chrome, [Protractor supports a number of browsers](https://www.protractortest.org/#/browser-support). Further, if you don’t need to test browser-dependent functionality, then you can use a [headless browser](https://www.protractortest.org/#/browser-setup#using-headless-chrome).
    
Testing in Headless Mode, you can just introduce new test commands in [package.json](package.json), for example:
```    
"protractor-test-headless": "protractor --browser=chrome --capabilities.chromeOptions.args='--headless' tmp/protractor.conf.js",
"test-headless": "yarn run build && yarn run protractor-test-headless",
```
1. Set the needed environment variables for [environment](environment/environment.ts) file
2. ```yarn test-headless```


### Protractor direct connect
Protractor can test directly using Chrome Driver, [bypassing any Selenium Server](https://github.com/angular/protractor/blob/master/docs/server-setup.md#connecting-directly-to-browser-drivers). **The advantage of direct connect is that your test project start up and run faster.**

To use this, you should change your config file:
```
directConnect: true
```
>**If this is true, settings for seleniumAddress and seleniumServerJar will be ignored.** If you attempt to use a browser other than Chrome or Firefox an error will be thrown.

## Custom Docker image for CI builds
I created a new Docker image for this purpose, based on an "alpine:edge" one. 

Till this Docker image becomes an official Hortonworks image at DockerHub, you should build this:
```make build```
This command creates the `aszegedi/protractor` (~760 MB) Docker image in your local Docker environment based on the project's [Docker file](Dockerfile).

### Run tests in this container on desktop
1. Set the needed environment variables for [environment](environment/environment.ts) file
2. ```make run```

### Run tests in this container on CI
[This script](scripts/run-e2e-tests.sh) is optimized for CI execution. So the Docker container starts only with `-i ` operator.

>  * -t  : Allocate a pseudo-tty
>  * -i  : Keep STDIN open even if not attached
>
[Docker run reference](https://docs.docker.com/engine/reference/run/)
