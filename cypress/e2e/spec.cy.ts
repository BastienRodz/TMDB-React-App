describe('Fresh Tomatoes', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('http://localhost:3000');
  });

  it('displays the default page when no movie is selected', () => {
    cy.viewport('macbook-15');
    cy.wait(300);
    cy.get('.search-input').clear();
    cy.get('.default-page').should('be.visible');
  });

  it('searches for a movie and selects the first result', () => {
    cy.viewport('macbook-15');
    cy.get('.search-menu').within(() => {
      cy.wait(300);
      cy.get('.search-input').clear();
      cy.get('.search-input').type('Inception', { timeout: 301 });
      cy.get('.movie-item').first().click({ timeout: 301 });
    });
  });

  it('displays movie details when a movie is selected', () => {
    cy.viewport('macbook-15');
    cy.get('.search-menu').within(() => {
      cy.wait(300);
      cy.get('.search-input').clear();
      cy.get('.search-input').type('Inception');
      cy.wait(300);
      cy.get('.movie-item').first().click();
      cy.wait(300);
    });
    cy.get('.right-container').within(() => {
      cy.get('.top-container').within(() => {
        cy.get('.movie-others').should('be.visible');
        cy.get('.movie-poster').should('be.visible');
      });
      cy.get('.down-container').within(() => {
        cy.get('.up-box').within(() => {
          cy.get('.trailer').should('be.visible');
        });
        cy.get('.down-box').within(() => {
          cy.wait(300);
          cy.get('.movie-overview').should('be.visible');
        });
      });
    });
  });

  it('switches the interface language', () => {
    cy.viewport('macbook-15');
    cy.get('.search-menu').within(() => {
      cy.wait(300);
      cy.get('.search-input').clear();
    });
    cy.get('.language-selection').within(() => {
      cy.get('[data-testid="fr_CA"]').click();
    });
    cy.get('.search-menu').within(() => {
      cy.get('.search-input').type('Inception');
      cy.wait(300);
      cy.get('.movie-item').first().click();
    });
    cy.get('.right-container').within(() => {
      cy.get('.top-box').should('contain', 'Origine');
    });
  });
});
