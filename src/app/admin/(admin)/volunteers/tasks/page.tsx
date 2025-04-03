// src/app/(admin)/volunteers/tasks/page.tsx
"use client";
import React from "react";

export default function AssignTasksPage() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Assign Tasks</h2>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
        {/* Form to assign tasks to volunteers */}
        <p className="text-gray-600 dark:text-gray-300">Form to assign tasks to volunteers will be displayed here.</p>
      </div>
    </div>
  );
}