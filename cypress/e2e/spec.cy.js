describe('Visits my page', () => {
  it('Visits the Homepage', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('picks')
  })
})