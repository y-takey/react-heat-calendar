import React from 'react/addons';
import ReactHeatCalendar from '../lib/react-heat-calendar.jsx';

describe('ReactHeatCalendar', function() {
  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
      <ReactHeatCalendar/>
    );
  });

  it('should render', function() {
    expect(component.getDOMNode().className).toEqual('react-heat-calendar');
  });
});
