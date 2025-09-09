// "use client";

// import { useState } from "react";

// export default function StudentInfoPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     urn: "",
//     email: "",
//     course: "",
//     year: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted (UI only):", formData);
//     alert("Student info saved (frontend only, no backend yet)");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//       <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Student Information
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter full name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>

//           {/* URN */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">URN</label>
//             <input
//               type="text"
//               name="urn"
//               placeholder="Unique Registration Number"
//               value={formData.urn}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="student@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>

//           {/* Course */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
//             <input
//               type="text"
//               name="course"
//               placeholder="e.g., B.Tech CSE"
//               value={formData.course}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>

//           {/* Year */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
//             <select
//               name="year"
//               value={formData.year}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               <option value="">Select Year</option>
//               <option value="1">1st Year</option>
//               <option value="2">2nd Year</option>
//               <option value="3">3rd Year</option>
//               <option value="4">4th Year</option>
//             </select>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
//           >
//             Save Info
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
