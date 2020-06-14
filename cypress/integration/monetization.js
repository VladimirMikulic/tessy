require('../../api/cypress')(cy);

describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.visitMonetized('https://testwebmonetization.com/demo.html').then(window => {
      console.log('Web Monetization Running');
    });
  });
});
