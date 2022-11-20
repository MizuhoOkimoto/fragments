# HTTP 404 response if you request a route that doesn't exist
 # {
 #   "status": "error",
 #   "error": {
 #     "code": 404,
 #     "message": "not found",
 #   }
 # }

PUT http://localhost:8080/*

HTTP/* 404

[Asserts]
jsonpath "$.status" == "error"
jsonpath "$.error.code" == 404
jsonpath "$.error.message" == "not found"
