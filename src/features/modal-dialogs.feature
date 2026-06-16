Feature: Modal dialogs

  @smoke @alerts-frame-windows @modal-dialogs
  Scenario: Open and close the small modal dialog
    Given the user is on the Modal Dialogs page
    When the user opens the small modal dialog
    Then the small modal dialog is displayed
    When the user closes the modal dialog
    Then the Modal Dialogs page remains visible

  @smoke @alerts-frame-windows @modal-dialogs
  Scenario: Open and close the large modal dialog
    Given the user is on the Modal Dialogs page
    When the user opens the large modal dialog
    Then the large modal dialog is displayed
    When the user closes the modal dialog
    Then the Modal Dialogs page remains visible

  @alerts-frame-windows @modal-dialogs @edge-case
  Scenario: Close the small modal dialog with the X button
    Given the user is on the Modal Dialogs page
    When the user opens the small modal dialog
    And the user closes the modal dialog with the X button
    Then the Modal Dialogs page remains visible

  @alerts-frame-windows @modal-dialogs @edge-case
  Scenario: Close the large modal dialog with Escape
    Given the user is on the Modal Dialogs page
    When the user opens the large modal dialog
    And the user closes the modal dialog with Escape
    Then the Modal Dialogs page remains visible
