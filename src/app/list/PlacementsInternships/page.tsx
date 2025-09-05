// "use client";

// import { useState } from "react";

// interface InternshipEntry {
//   title: string;
//   organization: string;
//   duration: string;
//   description: string;
//   pdfFile: File | null;
//   pdfPreview: string | null;
// }

// export default function PlacementsPage() {
//   const [formData, setFormData] = useState({ name: "", urn: "" });
//   const [entries, setEntries] = useState<InternshipEntry[]>([
//     { title: "", organization: "", duration: "", description: "", pdfFile: null, pdfPreview: null },
//   ]);
//   const [error, setError] = useState("");

//   const MAX_FILE_SIZE_MB = 5;

//   // Handle basic info
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === "urn" && !/^\d*$/.test(value)) return;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle internship fields
//   const handleEntryChange = (index: number, field: keyof InternshipEntry, value: string) => {
//     const updated = [...entries];
//     (updated[index][field] as string) = value; // Type assertion fixes TS error
//     setEntries(updated);
//   };

//   // Handle PDF upload
//   const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.type !== "application/pdf") {
//       setError("Only PDF files are allowed.");
//       return;
//     }
//     if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
//       setError(`File size must be less than ${MAX_FILE_SIZE_MB} MB.`);
//       return;
//     }

//     const updated = [...entries];
//     updated[index].pdfFile = file;
//     updated[index].pdfPreview = URL.createObjectURL(file);
//     setEntries(updated);
//     setError("");
//   };

//   // Add new internship entry
//   const addEntry = () => {
//     setEntries([
//       ...entries,
//       { title: "", organization: "", duration: "", description: "", pdfFile: null, pdfPreview: null },
//     ]);
//   };

//   // Remove internship entry
//   const removeEntry = (index: number) => {
//     const updated = [...entries];
//     updated.splice(index, 1);
//     setEntries(updated);
//   };

//   // Submit handler
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.name || !formData.urn) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     for (const entry of entries) {
//       if (!entry.title || !entry.organization || !entry.duration) {
//         setError("Please fill in all internship fields.");
//         return;
//       }
//     }

//     console.log("Placements Form Submitted:", { ...formData, internships: entries });
//     alert("Form submitted! Check console for details.");

//     // Reset form
//     setFormData({ name: "", urn: "" });
//     setEntries([{ title: "", organization: "", duration: "", description: "", pdfFile: null, pdfPreview: null }]);
//     setError("");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-MyskyLight p-6">
//       <div className="max-w-3xl w-full p-8 bg-white shadow-2xl rounded-2xl">
//         <h2 className="text-3xl font-bold mb-6 text-center text-MyPurple">
//           Placements & Internships
//         </h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//           {/* Basic Info */}
//           <input
//             type="text"
//             name="name"
//             placeholder="Your Name"
//             value={formData.name}
//             onChange={handleInputChange}
//             className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition"
//             required
//           />

//           <input
//             type="text"
//             name="urn"
//             placeholder="URN (Numbers Only)"
//             value={formData.urn}
//             onChange={handleInputChange}
//             className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition"
//             required
//           />

//           {/* Internship Entries */}
//           {entries.map((entry, idx) => (
//             <div key={idx} className="border border-gray-200 p-4 rounded-2xl shadow-sm relative">
//               {entries.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeEntry(idx)}
//                   className="absolute top-3 right-3 text-red-500 font-bold"
//                 >
//                   ✕
//                 </button>
//               )}
//               <h3 className="text-lg font-semibold mb-3 text-MyPurple">Internship {idx + 1}</h3>
//               <div className="flex flex-col gap-3">
//                 <input
//                   type="text"
//                   placeholder="Internship / Job Title"
//                   value={entry.title}
//                   onChange={(e) => handleEntryChange(idx, "title", e.target.value)}
//                   className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition"
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Organization Name"
//                   value={entry.organization}
//                   onChange={(e) => handleEntryChange(idx, "organization", e.target.value)}
//                   className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition"
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Duration (e.g., 3 months)"
//                   value={entry.duration}
//                   onChange={(e) => handleEntryChange(idx, "duration", e.target.value)}
//                   className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition"
//                   required
//                 />
//                 <textarea
//                   placeholder="Role Description"
//                   value={entry.description}
//                   onChange={(e) => handleEntryChange(idx, "description", e.target.value)}
//                   className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition"
//                   rows={3}
//                 />

//                 {/* PDF Upload */}
//                 <div className="flex flex-col gap-1">
//                   <label className="font-medium text-gray-700">Upload Certificate (PDF)</label>
//                   <input
//                     type="file"
//                     accept="application/pdf"
//                     onChange={(e) => handleFileChange(idx, e)}
//                     className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition cursor-pointer"
//                   />
//                   {entry.pdfFile && (
//                     <p className="text-gray-700 text-sm mt-1">
//                       Uploaded File: <span className="font-medium">{entry.pdfFile.name}</span>
//                     </p>
//                   )}
//                   {entry.pdfPreview && (
//                     <iframe
//                       src={entry.pdfPreview}
//                       className="w-full h-48 mt-2 border rounded-xl"
//                       title={`PDF Preview ${idx + 1}`}
//                     ></iframe>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addEntry}
//             className="bg-MySky text-white py-2 rounded-xl font-semibold hover:bg-MySkyLight transition-colors duration-200"
//           >
//             + Add Another Internship
//           </button>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             className="bg-MyPurple text-white py-3 rounded-xl font-semibold hover:bg-MyPurpleLight transition-colors duration-200"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";

interface InternshipEntry {
  title: string;
  organization: string;
  duration: string;
  description: string;
  pdfFile: File | null;
  pdfPreview: string | null;
}

export default function PlacementsPage() {
  const [formData, setFormData] = useState({ name: "", urn: "" });
  const [entries, setEntries] = useState<InternshipEntry[]>([
    { title: "", organization: "", duration: "", description: "", pdfFile: null, pdfPreview: null },
  ]);
  const [error, setError] = useState("");

  const MAX_FILE_SIZE_MB = 5;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "urn" && !/^\d*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEntryChange = (index: number, field: keyof InternshipEntry, value: string) => {
    const updated = [...entries];
    (updated[index][field] as string) = value;
    setEntries(updated);
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File size must be less than ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }

    const updated = [...entries];
    updated[index].pdfFile = file;
    updated[index].pdfPreview = URL.createObjectURL(file);
    setEntries(updated);
    setError("");
  };

  const addEntry = () => {
    setEntries([
      ...entries,
      { title: "", organization: "", duration: "", description: "", pdfFile: null, pdfPreview: null },
    ]);
  };

  const removeEntry = (index: number) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.urn) {
      setError("Please fill in all required fields.");
      return;
    }

    for (const entry of entries) {
      if (!entry.title || !entry.organization || !entry.duration) {
        setError("Please fill in all internship fields.");
        return;
      }
    }

    console.log("Placements Form Submitted:", { ...formData, internships: entries });
    alert("Form submitted! Check console for details.");

    setFormData({ name: "", urn: "" });
    setEntries([{ title: "", organization: "", duration: "", description: "", pdfFile: null, pdfPreview: null }]);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-MyskyLight p-6">
      <div className="max-w-3xl w-full p-8 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-MyPurple">
          Placements & Internships
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Basic Info */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition"
            required
          />

          <input
            type="text"
            name="urn"
            placeholder="URN (Numbers Only)"
            value={formData.urn}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition"
            required
          />

          {/* Internship Entries */}
          <div className="flex flex-col gap-4">
            {entries.map((entry, idx) => (
              <div
                key={idx}
                className="border border-gray-200 p-5 rounded-2xl shadow-lg bg-white transition-all duration-300 hover:shadow-2xl relative"
              >
                {entries.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEntry(idx)}
                    className="absolute top-3 right-3 text-red-500 font-bold text-lg"
                  >
                    ✕
                  </button>
                )}
                <h3 className="text-lg font-semibold mb-3 text-MyPurple">
                  Internship {idx + 1}
                </h3>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Internship / Job Title"
                    value={entry.title}
                    onChange={(e) => handleEntryChange(idx, "title", e.target.value)}
                    className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Organization Name"
                    value={entry.organization}
                    onChange={(e) => handleEntryChange(idx, "organization", e.target.value)}
                    className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g., 3 months)"
                    value={entry.duration}
                    onChange={(e) => handleEntryChange(idx, "duration", e.target.value)}
                    className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition"
                    required
                  />
                  <textarea
                    placeholder="Role Description"
                    value={entry.description}
                    onChange={(e) => handleEntryChange(idx, "description", e.target.value)}
                    className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition"
                    rows={3}
                  />

                  {/* PDF Upload */}
                  <div className="flex flex-col gap-1">
                    <label className="font-medium text-gray-700">Upload Certificate (PDF)</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange(idx, e)}
                      className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition cursor-pointer"
                    />
                    {entry.pdfFile && (
                      <p className="text-gray-700 text-sm mt-1">
                        Uploaded File: <span className="font-medium">{entry.pdfFile.name}</span>
                      </p>
                    )}
                    {entry.pdfPreview && (
                      <iframe
                        src={entry.pdfPreview}
                        className="w-full h-48 mt-2 border rounded-xl"
                        title={`PDF Preview ${idx + 1}`}
                      ></iframe>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Another Internship Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={addEntry}
              className="bg-MySky text-white py-3 px-6 rounded-xl font-semibold hover:bg-MySkyLight transition-colors duration-200"
            >
              + Add Another Internship
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-MyPurple text-white py-3 rounded-xl font-semibold hover:bg-MyPurpleLight transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
