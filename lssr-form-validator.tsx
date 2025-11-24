import React, { useState, useEffect } from 'react';
import { Download, AlertCircle, CheckCircle } from 'lucide-react';

export default function LSSRFormValidator() {
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    middle: '',
    email: '',
    hiringUnit: '',
    mailcode: '',
    managerSupervisor: '',
    managerEmail: '',
    jobTitle: '',
    fbiBackground: '',
    staff: '',
    ucscStudent: '',
    volunteer: '',
    academicFaculty: '',
    reclassDuties: '',
    repTimekeeperName: '',
    repPhone: '',
    repEmail: '',
    jobNumber: '',
    nonUcscStudent: '',
    current: ''
  });

  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  // Auto-fill logic for category fields
  useEffect(() => {
    const categoryFields = ['staff', 'ucscStudent', 'volunteer', 'academicFaculty', 'nonUcscStudent'];
    const yesField = categoryFields.find(field => formData[field].toLowerCase() === 'yes');
    
    if (yesField) {
      const updates = {};
      categoryFields.forEach(field => {
        if (field !== yesField && formData[field] === '') {
          updates[field] = 'No';
        }
      });
      if (Object.keys(updates).length > 0) {
        setFormData(prev => ({ ...prev, ...updates }));
      }
    }
  }, [formData.staff, formData.ucscStudent, formData.volunteer, formData.academicFaculty, formData.nonUcscStudent]);

  // Auto-fill Rep fields when N/A is entered
  useEffect(() => {
    const repName = formData.repTimekeeperName.trim().toUpperCase();
    if (repName === 'N/A' || repName === 'NA') {
      setFormData(prev => ({
        ...prev,
        repPhone: 'NA',
        repEmail: 'no_email_given@ucsc.edu'
      }));
    }
  }, [formData.repTimekeeperName]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = [];

    // Check required character fields
    if (!formData.first.trim()) newErrors.push('First name is required');
    if (!formData.last.trim()) newErrors.push('Last name is required');
    if (!formData.hiringUnit.trim()) newErrors.push('Hiring Unit is required');
    if (!formData.jobTitle.trim()) newErrors.push('Job Title for Position is required');

    // Validate emails
    if (!formData.email.trim()) {
      newErrors.push('Email is required');
    } else if (!validateEmail(formData.email)) {
      newErrors.push('Email format is invalid');
    }

    if (!formData.managerEmail.trim()) {
      newErrors.push('Manager or Supervisor Email is required');
    } else if (!validateEmail(formData.managerEmail)) {
      newErrors.push('Manager or Supervisor Email format is invalid');
    }

    // Validate Yes/No fields
    if (!['yes', 'no'].includes(formData.fbiBackground.toLowerCase())) {
      newErrors.push('FBI Background Check must be "Yes" or "No"');
    }
    if (!['yes', 'no'].includes(formData.reclassDuties.toLowerCase())) {
      newErrors.push('Reclass Duties Reassigned must be "Yes" or "No"');
    }

    // Validate numbers
    if (!formData.jobNumber.trim()) {
      newErrors.push('Job Number is required');
    } else if (isNaN(formData.jobNumber) || formData.jobNumber.trim() === '') {
      newErrors.push('Job Number must be a valid number');
    }

    if (!formData.mailcode.trim()) {
      newErrors.push('Mailcode is required');
    } else if (isNaN(formData.mailcode) || formData.mailcode.trim() === '') {
      newErrors.push('Mailcode must be a valid number');
    }

    // Validate category fields (at least one should be Yes)
    const categoryFields = ['staff', 'ucscStudent', 'volunteer', 'academicFaculty', 'nonUcscStudent'];
    const hasYes = categoryFields.some(field => formData[field].toLowerCase() === 'yes');
    if (!hasYes) {
      newErrors.push('At least one category (Staff, UCSC Student, Volunteer, Academic/Faculty, or Non UCSC Student) must be "Yes"');
    }

    setErrors(newErrors);
    if (newErrors.length > 0) {
      setShowErrors(true);
      return false;
    }
    return true;
  };

  const downloadForm = () => {
    if (!validateForm()) return;

    // Create CSV content
    const headers = [
      'First', 'Last', 'Middle', 'Email', 'Hiring Unit', 'Mailcode',
      'Manager or Supervisor', 'Manager or Supervisor Email', 'Job Title for Position',
      'FBI Background Check (Yes or No)', 'Staff (Yes or No)', 'UCSC Student (Yes or No)',
      'Volunteer (Yes or No)', 'Academic/Faculty (Yes or No)', 'Reclass Duties Reassigned (Yes or No)',
      'Rep/Student Timekeeper Name', 'Rep Phone', 'Rep Email', 'Job Number',
      'Non UCSC Student (Yes or No)', 'Current'
    ];

    const values = [
      formData.first, formData.last, formData.middle, formData.email,
      formData.hiringUnit, formData.mailcode, formData.managerSupervisor,
      formData.managerEmail, formData.jobTitle, formData.fbiBackground,
      formData.staff, formData.ucscStudent, formData.volunteer,
      formData.academicFaculty, formData.reclassDuties, formData.repTimekeeperName,
      formData.repPhone, formData.repEmail, formData.jobNumber,
      formData.nonUcscStudent, formData.current
    ];

    const csvContent = headers.join(',') + '\n' + values.map(v => `"${v}"`).join(',');

    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LSSR_Hiring_Unit_Form.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">LSSR Hiring Unit Form</h1>
          <p className="text-gray-600">Please fill out all required fields carefully</p>
        </div>

        {/* Personal Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                value={formData.first}
                onChange={(e) => handleChange('first', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                type="text"
                value={formData.last}
                onChange={(e) => handleChange('last', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                type="text"
                value={formData.middle}
                onChange={(e) => handleChange('middle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mailcode *</label>
              <input
                type="text"
                value={formData.mailcode}
                onChange={(e) => handleChange('mailcode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Position Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Position Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Unit *</label>
              <input
                type="text"
                value={formData.hiringUnit}
                onChange={(e) => handleChange('hiringUnit', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title for Position *</label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => handleChange('jobTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Number *</label>
              <input
                type="text"
                value={formData.jobNumber}
                onChange={(e) => handleChange('jobNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Manager Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Manager Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Manager or Supervisor</label>
              <input
                type="text"
                value={formData.managerSupervisor}
                onChange={(e) => handleChange('managerSupervisor', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Manager or Supervisor Email *</label>
              <input
                type="email"
                value={formData.managerEmail}
                onChange={(e) => handleChange('managerEmail', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Category (Select One) *</h2>
          <p className="text-sm text-blue-600 mb-3">Selecting "Yes" for one will automatically set others to "No"</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { field: 'staff', label: 'Staff' },
              { field: 'ucscStudent', label: 'UCSC Student' },
              { field: 'volunteer', label: 'Volunteer' },
              { field: 'academicFaculty', label: 'Academic/Faculty' },
              { field: 'nonUcscStudent', label: 'Non UCSC Student' }
            ].map(({ field, label }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <select
                  value={formData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Requirements */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Additional Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">FBI Background Check *</label>
              <select
                value={formData.fbiBackground}
                onChange={(e) => handleChange('fbiBackground', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reclass Duties Reassigned *</label>
              <select
                value={formData.reclassDuties}
                onChange={(e) => handleChange('reclassDuties', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Representative Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Representative/Timekeeper Information</h2>
          <p className="text-sm text-blue-600 mb-3">Enter "N/A" or "NA" to auto-fill phone and email</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rep/Student Timekeeper Name</label>
              <input
                type="text"
                value={formData.repTimekeeperName}
                onChange={(e) => handleChange('repTimekeeperName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rep Phone</label>
              <input
                type="text"
                value={formData.repPhone}
                onChange={(e) => handleChange('repPhone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rep Email</label>
              <input
                type="email"
                value={formData.repEmail}
                onChange={(e) => handleChange('repEmail', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Other Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Other Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current</label>
              <input
                type="text"
                value={formData.current}
                onChange={(e) => handleChange('current', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={downloadForm}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            <Download size={20} />
            Download Form
          </button>
          <button
            onClick={validateForm}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
          >
            <CheckCircle size={20} />
            Validate Form
          </button>
        </div>

        {/* Error Modal */}
        {showErrors && errors.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="text-red-600" size={28} />
                <h3 className="text-xl font-bold text-gray-800">Form Validation Errors</h3>
              </div>
              <div className="mb-6">
                <p className="text-gray-600 mb-3">Please fix the following issues:</p>
                <ul className="space-y-2">
                  {errors.map((error, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-red-700">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setShowErrors(false)}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showErrors && errors.length === 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-green-600" size={28} />
                <h3 className="text-xl font-bold text-gray-800">Form Validated Successfully!</h3>
              </div>
              <p className="text-gray-600 mb-6">All fields have been validated. You can now download the form.</p>
              <button
                onClick={() => setShowErrors(false)}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}