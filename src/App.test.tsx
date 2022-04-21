import React from 'react';
import lifeGameConfig from './config/lifeGameConfig.json'
import LifeMatrix from './service/LifeMatrix';
test('life game nextStep matrix', () => {
 const ar = new LifeMatrix(lifeGameConfig.matrixTest);
 const expected = lifeGameConfig.matrixTest;
 expect(ar.nextStep()).toEqual(expected);
});
test('life game nextStep matrix 1', () => {
  const ar = new LifeMatrix(lifeGameConfig.matrixTest1);
 const expected = lifeGameConfig.expectedMatrixTest1;
 expect(ar.nextStep()).toEqual(expected);
 });