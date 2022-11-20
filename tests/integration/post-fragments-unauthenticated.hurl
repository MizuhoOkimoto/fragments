# Confirm that posting a fragment when not authenticated produces a 401 error

# NOT authenticated POST to /v1/fragments
POST http://localhost:8080/v1/fragments

# Send unsupported Content-Type
Content-Type: text/plain;
# Include HTTP Basic Auth credentials
[BasicAuth]
userInvalid@email.com:password1

HTTP/* 401

[Asserts]
jsonpath "$.status" == "error"
jsonpath "$.error.code" == 401
jsonpath "$.error.message" == "Unauthorized"
