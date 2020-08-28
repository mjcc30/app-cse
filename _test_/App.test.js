import React from 'react';
import { Platform } from 'react-native';
import renderer from 'react-test-renderer';

import App from '../App';

jest.useFakeTimers();

it('renders correctly', () => {
  renderer.create(<App />);
});

it(`Platform.OS works as expected`, () => {
  expect(Platform.OS).toMatchSnapshot();
});
