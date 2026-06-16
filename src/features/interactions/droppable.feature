Feature: Droppable interaction

  @smoke @interactions @droppable
  Scenario: Drag an item into the drop area
    Given the user is on the Droppable page
    When the user drops the draggable item into the drop area
    Then the drop area accepts the draggable item
