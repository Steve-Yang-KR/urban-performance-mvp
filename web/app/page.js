"use client"

import { useState } from "react"
import { storage } from "../lib/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

export default function Home() {
  const [file, setFile] = useState(null)

  const upload = async () => {
    const storageRef = ref(storage, `videos/${file.name}`)
    await uploadBytes(storageRef, file)

    const url = await getDownloadURL(storageRef)

    await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ url })
    })

    alert("Uploaded & Analyzing 🚀")
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Urban Performance MVP</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  )
}
