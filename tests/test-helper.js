import QUnit from 'qunit';
import Application from 'dummy/app';
import config from 'dummy/config/environment';
import { setApplication } from '@ember/test-helpers';
import start from 'ember-exam/test-support/start';
import { setup } from 'qunit-dom';

import './helpers/assertions';
import './assertions/testdouble';

setup(QUnit.assert);

setApplication(Application.create(config.APP));

start();
