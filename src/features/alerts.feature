Feature: Alerts

  @smoke @alerts-frame-windows @alerts
  Scenario: Handle all JavaScript alert types
    Given the user is on the Alerts page
    When the user handles the basic alert
    And the user handles the delayed alert
    And the user accepts the confirm alert
    And the user submits text in the prompt alert
    Then the alert results are displayed correctly
