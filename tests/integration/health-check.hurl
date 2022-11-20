# Week 10
# Health Check Test
# If we were using curl, we'd write this as curl http://localhost:8080
GET http://localhost:8080

# We should get back an HTTP 1.1 200 response
HTTP/1.1 200
# We should get back a non-cacheable response (cache-control header)
Cache-Control: no-cache

#{
#  "status": "ok",
#  "author": "David Humphrey",
#  "githubUrl": "https://github.com/humphd/fragments",
#  "version": "0.5.3"
#}

# Extra checks to perform against the response
[Asserts]
# We expect to get back a JSON response with { "status": "ok", ... }
jsonpath "$.status" == "ok"
# We expect to get back a JSON response with { ..., "author": "..." }
jsonpath "$.author" isString
# We expect to get back a JSON response with { ..., "githubUrl": "..." }
jsonpath "$.githubUrl" matches /^https:\/\/github.com\/.+/
# We expect to get back a JSON response with { ..., "version": "x.y.z" }
jsonpath "$.version" matches /^\d+\.\d+\.\d+$/
