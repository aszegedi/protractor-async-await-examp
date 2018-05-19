/**
 * https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
 *
 * REDUCE SPEED OF ANGULAR E2E PROTRACTOR TESTS by MUHAMMAD HASSAN
 *
 */

'use strict';

import {browser, protractor} from "protractor";

let origFn = browser.controlFlow().execute;

browser.controlFlow().execute = function() {
    let args = arguments;

    // queue 100ms wait
    origFn.call(browser.controlFlow(), () => {
        return protractor.promise.delayed(300);
    });

    return origFn.apply(browser.controlFlow(), args);
};
