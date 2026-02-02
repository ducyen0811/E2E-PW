Feature: Authentication

  @smoke @auth @login
  Scenario: Login successfully
    When user logs in with valid credentials
    Then user should be logged in successfully

  @auth @login @negative
  Scenario: Login fails with invalid password
    When user logs in with invalid password
    Then login error message is displayed
    And user stays on login page

  @auth @logout
  Scenario: Logout successfully
    When user logs out
    Then user is redirected to login page

  @smoke @auth @register
  Scenario: Register successfully
    When user registers with valid information
    Then registration is successful
    And user is redirected to login page

  @auth @register @negative
  Scenario: Register fails with invalid email
    When user registers with invalid email
    Then registration error message is displayed
