Feature: Upload and Download

  @smoke @elements @upload-download
  Scenario: Download and upload a file
    Given the user is on the Upload and Download page
    When the user downloads the sample file
    And the user uploads a file
    Then the uploaded file path is displayed
