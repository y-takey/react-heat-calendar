# React Heat Calendar

Like a Github's contribution calendar.

## Installation

Install the npm module:

```bash
yarn add react-heat-calendar
# Or
npm install react-heat-calendar
```

## Usage

Import the component:

```javascript
import HeatCalendar from 'react-heat-calendar';

<HeatCalendar
  beginDate={new Date('2016-12-01')}
  endDate={new Date('2017-01-31')}
  data={[
    { date: '2016-12-02', someAttr: "foo" },
    { date: '2016-12-03', someAttr: "bar" },
    { date: '2016-12-03', someAttr: "baz" },
    // ...and so on
  ]}
/>
```

## Development

* Development server `npm start`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
