"use client";

import { useState } from "react";

type TrainingType = "tr1" | "tr2" | "tr3";

export default function TrainingPage() {
  const [selectedTraining, setSelectedTraining] = useState<TrainingType | "">("");
  const [pdfFiles, setPdfFiles] = useState<Partial<Record<TrainingType, File | null>>>({
    tr1: null,
    tr2: null,
    tr3: null,
  });
  const [pdfPreviews, setPdfPreviews] = useState<Partial<Record<TrainingType, string | null>>>({
    tr1: null,
    tr2: null,
    tr3: null,
  });
  const [formData, setFormData] = useState({ name: "", urn: "" });
  const [error, setError] = useState("");

  const MAX_FILE_SIZE_MB = 5;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "urn" && !/^\d*$/.test(value)) return; // Only digits for URN
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTrainingSelect = (type: TrainingType) => {
    setSelectedTraining(type);
    setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: TrainingType) => {
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

    setError("");
    setPdfFiles((prev) => ({ ...prev, [type]: file }));
    setPdfPreviews((prev) => ({ ...prev, [type]: URL.createObjectURL(file) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.urn) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!selectedTraining) {
      setError("Please select a training type.");
      return;
    }
    if (!pdfFiles[selectedTraining]) {
      setError("Please upload a PDF for the selected training.");
      return;
    }

    console.log("Form submitted:", {
      ...formData,
      trainingType: selectedTraining,
      pdfFile: pdfFiles[selectedTraining],
    });

    alert("Form submitted!");
    setFormData({ name: "", urn: "" });
    setSelectedTraining("");
    setError("");
  };

  const buttonClass = (type: TrainingType) =>
    `py-2 px-4 rounded-xl font-semibold transition w-full sm:w-auto ${
      selectedTraining === type
        ? "bg-MyPurple text-white"
        : "border border-gray-300 text-gray-700 hover:bg-MyPurpleLight hover:text-white"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gray-50">
      <div className="w-full max-w-2xl p-6 sm:p-8 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-black">
          Training Information
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition"
            required
          />

          {/* URN */}
          <input
            type="text"
            name="urn"
            placeholder="URN"
            value={formData.urn}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition"
            required
          />

          {/* Training Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button type="button" className={buttonClass("tr1")} onClick={() => handleTrainingSelect("tr1")}>
              TR1
            </button>
            <button type="button" className={buttonClass("tr2")} onClick={() => handleTrainingSelect("tr2")}>
              TR2
            </button>
            <button type="button" className={buttonClass("tr3")} onClick={() => handleTrainingSelect("tr3")}>
              TR3
            </button>
          </div>

          {/* PDF Upload */}
          {selectedTraining && (
            <div className="flex flex-col gap-2 mt-2">
              <label className="font-medium text-gray-700">
                Upload PDF for {selectedTraining.toUpperCase()}:
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(e, selectedTraining)}
                className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-MySky focus:border-MySky transition cursor-pointer"
              />

              {/* File Name */}
              {pdfFiles[selectedTraining] && (
                <p className="text-gray-700 text-sm mt-1 truncate">
                  Uploaded File: <span className="font-medium">{pdfFiles[selectedTraining]?.name}</span>
                </p>
              )}

              {/* PDF Preview */}
              {pdfPreviews[selectedTraining] && (
                <div className="mt-2 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <p className="bg-MyPurple text-white p-2 text-sm font-medium">
                    PDF Preview
                  </p>
                  <iframe
                    src={pdfPreviews[selectedTraining]!}
                    className="w-full h-52 sm:h-64"
                    title="PDF Preview"
                  ></iframe>
                </div>
              )}
            </div>
          )}

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
