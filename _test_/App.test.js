import React from 'react';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

import { Platform } from 'react-native';

it(`Platform.OS works as expected`, () => {
  expect(Platform.OS).toMatchSnapshot();
});
