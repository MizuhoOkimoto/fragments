# Confirm that posting an unsupported Content-Type produces a 415 error

# Authenticated POST to /v1/fragments
POST http://localhost:8080/v1/fragments

# Send unsupported Content-Type
Content-Type: audio/mpeg
# Include HTTP Basic Auth credentials
[BasicAuth]
user1@email.com:password1

HTTP/* 415

[Asserts]
jsonpath "$.status" == "error"
jsonpath "$.error.code" == 415
jsonpath "$.error.message" == "Unsupported Content Type"
