Feature: User authentication

  @smoke @auth @login
  Scenario: Log in successfully
    When the user logs in with valid credentials
    Then the user is logged in successfully

  @auth @login @negative
  Scenario: Fail to log in with an invalid password
    When the user logs in with an invalid password
    Then the login error message is displayed
    And the user remains on the login page

  @auth @login @negative
  Scenario: Fail to log in with an empty username
    When the user logs in with an empty username
    Then the login error message is displayed
    And the user remains on the login page

  @auth @login @negative
  Scenario: Fail to log in with an empty password
    When the user logs in with an empty password
    Then the login error message is displayed
    And the user remains on the login page

  @auth @logout
  Scenario: Log out successfully
    When the user logs out
    Then the user is redirected to the login page

  @smoke @auth @register
  Scenario: Register successfully
    When the user registers with valid information
    Then registration is successful

  @auth @register @negative
  Scenario: Fail to register with an invalid email
    When the user registers with an invalid email
    Then the registration error message is displayed
