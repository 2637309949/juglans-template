define({ "api": [
  {
    "type": "get",
    "url": "/test/hello",
    "title": "验证接口",
    "group": "Test",
    "description": "<p>有Token验证机制</p>",
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n {\n     \"message\": 'hello'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/test/event.js",
    "groupTitle": "Test",
    "name": "GetTestHello",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3001/api/v1/test/hello"
      }
    ]
  },
  {
    "type": "get",
    "url": "/test/mq/hello",
    "title": "队列接口",
    "group": "Test",
    "description": "<p>队列接口</p>",
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n {\n     \"message\": 'ok'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/test/mq.js",
    "groupTitle": "Test",
    "name": "GetTestMqHello",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3001/api/v1/test/mq/hello"
      }
    ]
  },
  {
    "type": "get",
    "url": "/test/seq/role_permission",
    "title": "角色权限列表",
    "group": "Test",
    "description": "<p>角色权限列表</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "rp",
            "description": "<p>实体类数组</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rp.Name",
            "description": "<p>名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rp.Password",
            "description": "<p>密码</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "正常返回",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"id\": 1,\n        \"createdAt\": \"2019-07-12T14:09:29.000Z\",\n        \"deletedAt\": null,\n        \"updatedAt\": \"2019-07-12T14:09:29.000Z\",\n        \"_creator\": 1,\n        \"_modifier\": 1,\n        \"name\": \"财务部\",\n        \"type\": \"2\",\n        \"permissions\": [\n            {\n                \"id\": 1,\n                \"createdAt\": \"2019-07-12T14:09:29.000Z\",\n                \"deletedAt\": null,\n                \"updatedAt\": \"2019-07-12T14:09:29.000Z\",\n                \"_creator\": 1,\n                \"_modifier\": 1,\n                \"code\": \"XDF09E3\",\n                \"name\": \"财务财年统计\",\n                \"pid\": null,\n                \"type\": \"5\",\n                \"holder\": \"2\",\n                \"role_permission\": {\n                    \"createdAt\": \"2019-07-12T14:09:29.000Z\",\n                    \"deletedAt\": null,\n                    \"updatedAt\": \"2019-07-12T14:09:29.000Z\",\n                    \"_creator\": null,\n                    \"_modifier\": null,\n                    \"name\": null,\n                    \"_permission\": 1,\n                    \"_role\": 1\n                }\n            }\n        ]\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/test/seq.js",
    "groupTitle": "Test",
    "name": "GetTestSeqRole_permission",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3001/api/v1/test/seq/role_permission"
      }
    ]
  }
] });
