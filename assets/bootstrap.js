import { startStimulusApp } from '@symfony/stimulus-bundle';

const app = startStimulusApp();
import './styles/app.css';

import { Application } from 'stimulus';
import { definitionsFromContext } from 'stimulus/webpack-helpers';

const application = Application.start();
const context = require.context('./controllers', true, /\.js$/);
application.load(definitionsFromContext(context));
