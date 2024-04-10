const BASE_URL = 'http://localhost:3000/api';

describe('content(books) API. Endpoints', () => {
    it('Geting all books from db', () => {
        cy.request(`${BASE_URL}/content/all`).as('allContentBooksReq');        
        cy.get('@allContentBooksReq')
          .then(res => {
              expect(res.status).to.eq(200);
              cy.wrap(res.body.content).should('a', 'array');
          });
    });

    // it('Adding new book to db', () => {
    //     cy.request('POST', `${BASE_URL}/content/`, {  }).as('@addingNewBook');
    //     cy.get('@addingNewBook')
    //       .then(res => {
    //          expect(res.status).to.eq(200);
    //          cy.wrap(res.body.content).should('to.have.all.keys', 'id');
    //       })
    // })
});