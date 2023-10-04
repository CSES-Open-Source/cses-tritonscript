import { useState } from "react";
import settings from "../utils/config";
import { v4 as uuidv4 } from "uuid";

export default function Upload() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState<File | null>(null);
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
    console.log(id);
    console.log("form", formData);
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
  }
  return (
    <div>
      Upload
      {/* <button onClick={upload}>ss</button> */}
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
        <input
          type="text"
          placeholder="username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button>dd</button>
      </form>
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input accept="application/pdf" id="file" type="file" onChange={handleFileChange} />
      </div>
    </div>
  );
}
