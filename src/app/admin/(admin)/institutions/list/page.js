// components/InstitutionList.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Edit, Trash2, Plus, Search, Filter, RefreshCw, Building2, MapPin, Calendar } from 'lucide-react';

export default function InstitutionList() {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch('/api/institutions/fetch');
      if (!response.ok) throw new Error('Failed to fetch institutions');
      const data = await response.json();
      console.log('Fetched institutions:', data);
      setInstitutions(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this institution?')) return;
    try {
      const response = await fetch(`/api/institutions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete institution');
      setInstitutions(institutions.filter((inst) => inst._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter institutions based on search term and category filter
  const filteredInstitutions = institutions.filter(institution => {
    const matchesSearch = institution.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          institution.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                          (filter === institution.category?.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  // Get unique categories for filter dropdown
  const categories = [...new Set(institutions.map(inst => inst.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Loading institutions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Institutions</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage educational institutions and their details</p>
        </div>
        
        <div className="flex gap-2">
          <Link href="/admin/institutions/add" className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Link>
          <button 
            onClick={fetchInstitutions} 
            className="flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search institutions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        <div className="flex-shrink-0 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10 pr-8 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category.toLowerCase()}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-lg mb-6">
          <p className="flex items-center">
            <span className="flex-shrink-0 h-5 w-5 text-red-500 mr-2">!</span>
            {error}
          </p>
        </div>
      )}

      {/* Institutions Grid */}
      {filteredInstitutions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstitutions.map((institution) => {
            const institutionId = institution._doc?._id || institution._id;
            return (
              <div
                key={institutionId}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48">
                  {institution.featuredImage ? (
                    <Image
                      src={institution.featuredImage}
                      alt={institution.name || 'Unnamed Institution'}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      onError={(e) => {
                        console.error(`Failed to load image for ${institution.name}`);
                        e.target.src = 'https://via.placeholder.com/300x150?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center">
                      <Building2 className="h-16 w-16 text-white opacity-50" />
                    </div>
                  )}
                  {institution.category && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {institution.category}
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {institution.name || 'Unnamed Institution'}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 h-12">
                    {institution.description || 'No description'}
                  </p>
                  
                  <div className="flex flex-wrap mb-4 space-x-3">
                    {institution.location && (
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {institution.location}
                      </div>
                    )}
                    {institution.established && (
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        Est. {institution.established}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex space-x-1">
                      <Link
                        href={`/admin/institutions/${institutionId}/donations`}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="View Donations"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <Link 
                        href={`/admin/institutions/edit/${institutionId}`} 
                        className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        title="Edit Institution"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(institutionId)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete Institution"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {institution.facts?.length || 0} facts
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No institutions found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            {searchTerm || filter !== 'all' 
              ? "No institutions match your search criteria. Try adjusting your filters." 
              : "You haven't added any institutions yet. Get started by creating a new one."}
          </p>
          <Link href="/admin/institutions/add" className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Institution
          </Link>
        </div>
      )}
    </div>
  );
}