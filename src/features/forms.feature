Feature: Forms

  @smoke @forms
  Scenario: Submit the practice form successfully
    When the user submits the practice form with valid data
    Then the submitted form modal displays the correct data

  @forms @edge-case
  Scenario: Submit the practice form with female gender and long names
    When the user submits the practice form with edge-case data
    Then the submitted form modal displays the edge-case data

  @forms @negative
  Scenario: Reject the practice form when required fields are missing
    When the user submits the empty practice form
    Then the practice form required field validation is displayed

  @forms @negative
  Scenario: Reject the practice form when mobile number is too short
    When the user submits the practice form with a short mobile number
    Then the practice form required field validation is displayed
