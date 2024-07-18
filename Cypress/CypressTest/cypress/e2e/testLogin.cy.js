describe('Login Functionality', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('https://demo.guru99.com/V1/index.php')
  });

  it('Successful login with valid credentials', () => {
    // Enter valid username
    cy.get('input[name="uid"]').type('mngr581643'); // Adjust the username
    // Enter valid password
    cy.get('input[name="password"]').type('YnUvAga'); // Adjust the password
    // Click on login button
    cy.get('input[name="btnLogin"]').click();
    // Assert that the user is redirected to the manager home page
    cy.url().should('include', 'Managerhomepage.php'); // Replace with actual URL part
  });

  it('Failed login with invalid credentials', () => {
    // Enter invalid username
    cy.get('input[name="uid"]').type('invalidUsername');
    // Enter invalid password
    cy.get('input[name="password"]').type('invalidPassword');
    // Click on login button
    cy.get('input[name="btnLogin"]').click();
    // Assert that the user stays on the login page
    cy.url().should('include', 'https://demo.guru99.com/V1/index.php'); // Replace with actual URL part
  });

  it('Error message display when login fails', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('User or Password is not valid');
    });
    // Enter invalid username
    cy.get('input[name="uid"]').type('invalidUsername');
    // Enter invalid password
    cy.get('input[name="password"]').type('invalidPassword');
    // Click on login button
    cy.get('input[name="btnLogin"]').click();
  });
});

