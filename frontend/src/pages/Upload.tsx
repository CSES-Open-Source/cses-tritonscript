import { useState } from "react";
import settings from "../utils/config";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

export default function Upload() {
  const { currentUser } = useSelector((state: any) => state.user);
  const [formData, setFormData] = useState({ title: "", classInfo: "", description: "", uploader: "" });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  function handleChange(e: any) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  async function handleSubmit(e: any) {
    e.preventDefault();
    const id = uuidv4();

    if (formData.title === "" || formData.classInfo === "" || formData.description === "")
      return alert("Please fill out all fields");
    if (file === null) return alert("Please upload a file");
    setIsUploading(true);
    formData["uploader"] = currentUser.username;
    const res = await fetch(`${settings.domain}/api/note/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const _url = await res.json();

    while (true) {
      try {
        await fetch(_url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": "applcation/pdf",
          },
        });
        break;
      } catch (e) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
    setIsUploading(false);
    alert("Upload Success!");
    setFormData({ title: "", classInfo: "", description: "", uploader: "" });
    setFile(null);
  }
  return (
    <div>
      Upload
      {/* <button onClick={upload}>ss</button> */}
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input accept="application/pdf" id="file" type="file" onChange={handleFileChange} />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="title"
          id="title"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="classInfo"
          id="classInfo"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="description"
          id="description"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button>upload</button>
      </form>
      <div>{isUploading ? "uploading..." : ""}</div>
    </div>
  );
}
