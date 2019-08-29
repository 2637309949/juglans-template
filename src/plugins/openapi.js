// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const OpenApi = require('../../../juglans-openapi')
const { authOption } = OpenApi.options

module.exports = OpenApi({
  urlPrefix: '/gateway'
}).addOptions(authOption(function (AppId) {
  return {
    appID: 'xx',
    publicKey:
      `MIGJAoGBAL7sHmNyG14oN9H54bM/4D+V5IIeI30mXIrvIAoeB8j/U4d8I7Kdk4CO
iYW/lqtOph/h/yG55qpe0UEtX2PHA0466yjT/Th69VNCCZpiIq2zTrf6EJHnJdxM
EUFW8aaLeUsPUnSIJIgoG/ljq9dEyD4GcUQSiFfCgvV9+EbkiRMdAgMBAAE=
`,
    // just for test
    privateKey:
      `MIICXwIBAAKBgQC+7B5jchteKDfR+eGzP+A/leSCHiN9JlyK7yAKHgfI/1OHfCOy
nZOAjomFv5arTqYf4f8hueaqXtFBLV9jxwNOOuso0/04evVTQgmaYiKts063+hCR
5yXcTBFBVvGmi3lLD1J0iCSIKBv5Y6vXRMg+BnFEEohXwoL1ffhG5IkTHQIDAQAB
AoGBAKOwk5lVkstWlg1MPctOX7iEjidVKb46Lqvbu0+RUcFtz7Lgp0aTvYxCKPxo
OAjl5J5/SBwlY/P8WVKVUSydy2FDG8yrsZMJbEeBRBIV3Sgp8Z+f1hAn2El2AmNI
V8uYWU923Ab6OdWSi5ppdFidDz06U1PQ9tV4Bg5NwHCp54RtAkEA3yR2446p4yD0
u8uj1j5kZImLLU2oOvZ3Wqub6ZP/9AB0nMFRWXqHoOr2CGBNlu7/Y0waIYAjMvbe
iObEuuMNGwJBANsJF2efIoYHEujflmCq2RwinfYCPMVWSuBeAkkLbGRbrN0ZTzhN
DOe4QCb+IVNPuTcdNVSQrgxqx2VV0etbfCcCQQCmLtn8Dzum09xwH/EclcretTDZ
xIQNpZCuDjBHfNmaNtyiAbc8FGz+Av7IrjAawFOi+AJeALg2NHT3MCZDqOURAkEA
hfeljQdUAk3JTw2R2EYmzIKPwqvTp48D9P8Kvspx3WAE9qZIQdM+lWuoMTE2CNK2
IfOHbtWe3pFgq6Y14pHt+QJBAMwI44yblF2oLqh1hw5Wd2Xz3SKRUOohEzQ92Psf
RXsJdjNIfaOLSimxqNGTDDJ7YFV42Ir4G2hLFeLmlbz/oHU=`
  }
}))
