require('../../api/cypress')(cy);

describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.visitMonetized('https://testwebmonetization.com').then(
      ({ document }) => {
        const headline = document.querySelector('.headline.my-1');
        const successMsg = 'Monetization events have occurred on this page!';

        expect(headline.textContent.includes(successMsg)).equal(true);
      }
    );
  });
});
