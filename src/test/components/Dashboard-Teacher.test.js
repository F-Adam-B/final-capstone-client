import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../setupTests';

import DashboardTeacher from '../../components/Dashboard-Teacher';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<DashboardTeacher />)
  })

});
