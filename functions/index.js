const functions = require("firebase-functions")
const axios = require("axios")

exports.analyze = functions.https.onRequest(async (req, res) => {
  const { url } = req.body

  // Python AI 서버 호출
  const result = await axios.post("http://YOUR_AI_SERVER:8000/analyze", {
    url
  })

  res.json(result.data)
})
