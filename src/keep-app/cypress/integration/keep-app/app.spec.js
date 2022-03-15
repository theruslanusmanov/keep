const APP_URL = 'https://localhost:3000';

describe('App', () => {

  beforeEach(() => {
    cy.visit(APP_URL);
  });

  it('should create note and update list', function() {
    cy.get('[data-cy="notes"]').should('have.length', 2);
    cy.get('[data-cy="create-button"]').click();

    const bodyText = 'New note text.';
    cy.intercept({
      method: 'POST', url: '**/note',
    }, {
      statusCode: 200, body: bodyText,
    }).as('createNote');
    cy.get('[data-cy="note-body"]').type(`${bodyText}{enter}`);
    cy.wait('@createNote').should(({request, response}) => {
      expect(request && request.body).to.have.value(bodyText);
    });

    cy.get('[data-cy="notes"]').should('have.length', 3);
  });

  it('should show notes list', function() {});

  it('should remove note, add it to bin', function() {});

  it('should restore note from bin', function() {});

  it('should add/remove tag to note', function() {});

  it('should filter notes by tag', function() {});

  it('should pin/unpin a note', function() {});

  it('should switch dark/light theme', function() {});
});
