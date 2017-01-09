# react heat calendar

Get the AMD module located at `react-heat-calendar.js` and include it in your project.

Here is a sample integration:

```js
require.config({
  paths: {
    'react': 'vendor/bower_components/react/react',
    'ReactHeatCalendar': 'react-heat-calendar'
  }
});

require(['react', 'ReactHeatCalendar'], function(React, ReactHeatCalendar) {

  React.render(React.createElement(ReactHeatCalendar), document.getElementById('widget-container'));

});
```

## Development

* Development server `npm start`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
