# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Each ticket has 3 sections : 1) Title , 2) Description, 3)Acceptance Criteria

# Ticket #1

### Title

Map Agent's Custom Id to Internal Id

### Description

We need the ability for facilities to save their own custom Ids for each agent

**Scope:**

- Create permission to set an agent's custom id ("write_agent_custom_id")
- Modify agents table to store the custom id
- Modify "Agent Details" page to show "Assign Custom Id" button
- Create a modal to accept Custom ID when the "Assign Custom Id" button is pressed
- Create a save button in the modal on valid input
- Valid input is defined as an alphanumeric input, no special characters or unicode characters allowed, only characters from the following list are allowed : [a-z][a-z][0-9].
- On valid input show a save button
- on clicking "save button", Save custom id in database (agents table)
-

### ACs

- Given I am a Facility user with the **"write_agent_custom_id"** permission, when I visit the "Agent Details" page, then I am able to see a button at the top that says "Assign Custom ID"
- Given I am a Facility user with the **"write_agent_custom_id"** permission, when I click on the "Assign Custom ID" button, then I should be able to see a modal with an input where I can input a custom id for my agent
- Given I am a Facility user and I click on the "Assign Custom ID" button, when I enter a valid input in the modal, then I should be able to see a Save button
- Given I am a Facility user and I click on the "Assign Custom ID" button, when I enter an **INVALID** input in the modal, then I should see an error below the input, highlightng why the input is not valid.
- Given I am a Facility user, when I enter a valid input and click "Save custom id" button, then I should be able to see a success message and the modal should close automatically

# Ticket #2

### Title

Show Agent's custom ID

### Description

We need the ability for facilitirs to show their agent's custom Id if it was already set

**Scope:**

- Read agents table to fetch the custom id
- Modify "Agent Details" page to show "Assign Custom Id" button if custom id is not set user has "write_agent_custom_id" permission
- Display Agent's Custom Id on all applicable pages

### ACs

- Given I am a Facility user when I visit the "Agent Details" page whose custom id is set, then I am able to see/view the Agent's custom ID
- Given I am a Facility user when I visit the "Agent Details" page whose custom id is NOT set yet and I have the **"write_agent_custom_id"** permission , then I am able to see a button "Assign Custom ID"
- Given I am a Facility user when I visit the "Agent Details" page whose custom id is NOT set yet and I **DO NOT** have the **"write_agent_custom_id"** permission , then I am able to see a "NO custom ID assigned" message
- Given I am an Agent, when I view "My profile" page, then I should be able to see my "custom ID" set by my facility manager

# Ticket #3

### Title

Include Agent's Custom Id on reports

### Description

We need the ability for facilities to be able to view Agent's custom ID when generating reports

**Scope:**

- Modify 'getShiftsByFacility' function to include agent's custom ID (stored in agents table)
- Ensure that the PDF genearted from 'generateReport' shows the agent's custom ID

### ACs

- Given I am a Facility user when I generate reports, then I am able to see the agent's custom Id in the resultant PDF
  **NFR (non functional requirements)** :
- 'getShiftsByFacility' and 'generateReport' function's performance should not breach existing p50 and p99 performance metrics
- 'generateReport' function should not break if it encounters a agent whose custom id is not set yet
- 'generateReport' should produce the PDF which has a backward compatible format
