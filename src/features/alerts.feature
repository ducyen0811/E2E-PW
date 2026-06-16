Feature: Alerts

  @smoke @alerts-frame-windows @alerts
  Scenario: Handle all JavaScript alert types
    Given the user is on the Alerts page
    When the user handles the basic alert
    And the user handles the delayed alert
    And the user accepts the confirm alert
    And the user submits text in the prompt alert
    Then the alert results are displayed correctly

  @alerts-frame-windows @alerts @negative
  Scenario: Dismiss the confirm alert
    Given the user is on the Alerts page
    When the user dismisses the confirm alert
    Then the confirm alert cancel result is displayed

  @alerts-frame-windows @alerts @edge-case
  Scenario: Submit edge-case text in the prompt alert
    Given the user is on the Alerts page
    When the user submits edge-case text in the prompt alert
    Then the prompt alert displays the edge-case text
