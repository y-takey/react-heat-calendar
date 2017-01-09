import React from 'react/addons';
import HeatCalendar from '../lib/HeatCalendar';

describe('HeatCalendar', function() {
  var component;

  beforeEach(function() {
    const data = [
      { date: new Date(), foo: 1 },
      { date: new Date(), bar: "anything" }
    ]
    component = React.addons.TestUtils.renderIntoDocument(
      <HeatCalendar data={data}/>
    );
  });

  it('should render', function() {
    expect(React.findDOMNode(component)).toBeDefined();
  });
});
