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
