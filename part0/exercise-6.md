```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP Status Code 201 Created
    deactivate server
    
    Note right of browser: The browser stays on the same page and rerenders content based on JS script
```
