"use client";

import { useState } from "react";

type TrainingType = "tr1" | "tr2" | "tr3";

type TrainingFormData = {
  name: string;
  urn: string;
  company: string;
  duration: string;
  mode: string;
  skills: string;
  trainingType: TrainingType;
  pdfFile?: File | null;
  pdfPreview?: string | null;
};

export default function TrainingPage() {
  const [selectedTraining, setSelectedTraining] = useState<TrainingType | "">("");
  const [formData, setFormData] = useState<Partial<TrainingFormData>>({});
  const [submittedTrainings, setSubmittedTrainings] = useState<TrainingFormData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [error, setError] = useState("");

  const MAX_FILE_SIZE_MB = 5;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "urn" && !/^\d*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTrainingSelect = (type: TrainingType) => {
    setSelectedTraining(type);
    setFormData((prev) => ({ ...prev, trainingType: type }));
    setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setFormData((prev) => ({
      ...prev,
      pdfFile: file,
      pdfPreview: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTraining) {
      setError("Please select a training type.");
      return;
    }

    if (
      !formData?.name ||
      !formData?.urn ||
      !formData?.company ||
      !formData?.duration ||
      !formData?.mode ||
      !formData?.skills
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!formData?.pdfFile) {
      setError("Please upload a PDF for the training.");
      return;
    }

    if (editingIndex !== null) {
      const updated = [...submittedTrainings];
      updated[editingIndex] = formData as TrainingFormData;
      setSubmittedTrainings(updated);
      setEditingIndex(null);
    } else {
      setSubmittedTrainings((prev) => [...prev, formData as TrainingFormData]);
    }

    // Reset
    setFormData({});
    setSelectedTraining("");
    setError("");
  };

  const handleEdit = (index: number) => {
    setFormData(submittedTrainings[index]);
    setSelectedTraining(submittedTrainings[index].trainingType);
    setEditingIndex(index);
  };

  const buttonClass = (type: TrainingType) =>
    `py-2 px-5 rounded-2xl font-semibold transition w-full sm:w-auto text-center sm:text-sm ${
      selectedTraining === type
        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
        : "border border-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-purple-400 hover:to-indigo-400 hover:text-white"
    }`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-tr from-[#EDF9FD] to-[#FFFFFF]">
      <div className="w-full max-w-3xl p-8 sm:p-10 bg-white shadow-2xl rounded-3xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">
          🎓 Training Information
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Training Selection */}
          <div className="flex flex-col sm:flex-row justify-between gap-3">
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

          {/* Training Form */}
          {selectedTraining && (
            <div className="flex flex-col gap-3 mt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData?.name || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-300 shadow-sm"
                  required
                />
                <input
                  type="text"
                  name="urn"
                  placeholder="URN"
                  value={formData?.urn || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-300 shadow-sm"
                  required
                />
              </div>

              <input
                type="text"
                name="company"
                placeholder="Training Company"
                value={formData?.company || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-300 shadow-sm"
                required
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration (e.g., 6 weeks)"
                value={formData?.duration || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-300 shadow-sm"
                required
              />
              <input
                type="text"
                name="mode"
                placeholder="Mode (Online / Offline / Hybrid)"
                value={formData?.mode || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-300 shadow-sm"
                required
              />
              <textarea
                name="skills"
                placeholder="Skills Covered"
                value={formData?.skills || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-300 shadow-sm resize-none"
                rows={3}
                required
              />

              <label className="font-medium text-gray-700 mt-2">Upload PDF:</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="border border-gray-300 p-3 rounded-2xl w-full focus:ring-2 focus:ring-indigo-300 shadow-sm"
                required={!formData?.pdfFile}
              />
              {formData?.pdfFile && (
                <p className="text-gray-700 text-sm mt-1 truncate">
                  Uploaded File: <span className="font-medium">{formData.pdfFile.name}</span>
                </p>
              )}
              {formData?.pdfPreview && (
                <div className="mt-3 border border-gray-200 rounded-2xl overflow-hidden shadow-md">
                  <p className="bg-indigo-600 text-white p-2 text-sm font-medium">PDF Preview</p>
                  <iframe src={formData.pdfPreview} className="w-full h-56 sm:h-72" title="PDF Preview"></iframe>
                </div>
              )}
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="mt-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-2xl font-semibold hover:from-purple-500 hover:to-indigo-500 shadow-lg transition-all"
          >
            {editingIndex !== null ? "Update" : "Submit"}
          </button>
        </form>
      </div>

      {/* Submitted Trainings List */}
      {submittedTrainings.length > 0 && (
        <div className="w-full max-w-3xl mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-700">📑 Submitted Trainings</h3>
          <div className="flex flex-col gap-4">
            {submittedTrainings.map((training, index) => (
              <div key={index} className="p-5 bg-white border rounded-2xl shadow-md flex justify-between items-start">
                <div>
                  <p className="font-bold">{training.company}</p>
                  <p className="text-sm text-gray-600">
                    {training.name} | {training.urn}
                  </p>
                  <p className="text-sm text-gray-600">
                    ⏳ {training.duration} | 🏷 {training.mode}
                  </p>
                  <p className="text-sm text-gray-600">🛠 Skills: {training.skills}</p>
                  {training.pdfPreview && (
                    <a
                      href={training.pdfPreview}
                      target="_blank"
                      className="text-indigo-600 underline text-sm"
                    >
                      View PDF
                    </a>
                  )}
                </div>
                <button
                  onClick={() => handleEdit(index)}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
