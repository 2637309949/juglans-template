// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const OpenApi = require('../../../juglans-openapi')
module.exports = OpenApi({
  urlPrefix: '/gateway',
  Auth: function (AppId) {
    return {
      appID: 'xx',
      publicKey:
`MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJh0/FRLveiTAOxcGxuo3gvIgFmPCekU
ImSP6OGgbIbLFKBjN9i5WXijNLyJKhV2Q9Q6l2zbK4BjoTsIKzC5nP8CAwEAAQ==`,
      // just for test
      privateKey:
`MIIBOwIBAAJBAJh0/FRLveiTAOxcGxuo3gvIgFmPCekUImSP6OGgbIbLFKBjN9i5
WXijNLyJKhV2Q9Q6l2zbK4BjoTsIKzC5nP8CAwEAAQJBAJdtw1/bJ5NFyGn8hnRv
w7WCfnH2UIqxFAQ8qLzLAmDS6tS6P4GiBqWd1+Pn3tLJ24T9MngeAw3Pq1F4y4YH
nVkCIQD+jqcuXyBjbbipa/K4B62YPP6DuNaLuP3Q2DETuqsZNQIhAJlSMP64MEBi
VqcKmh+pMLN9/+OPxbQ3yLGXpvSLFJfjAiEAyyprwBToMrMVmRKw67QlFsZHlDXn
9ig1W4PQ16A6gqkCIEJ6+hWoxftU6J/boAK0eRKLQuZoU+CWA6bFzDXjDJXjAiBW
kH6YqzSHtqs9Sri9QZ+AnNNkeyIrso0+dHDtwjDdpA==`
    }
  }
})
