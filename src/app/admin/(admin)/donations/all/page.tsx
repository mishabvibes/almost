// src/app/(admin)/donations/all/page.tsx
"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Calendar,
  ArrowUpDown,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Sliders
} from "lucide-react";
import Link from "next/link";
import { handleExport } from './exportFunctions';
import ExportDropdown from '@/components/ExportDropdown/ExportDropdown';

export default function AllDonationsPage() {
  // States for filters and search
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(10);
  const itemsPerPage = 10; 
  const [totalItems, setTotalItems] = useState(0);

  // State for mobile filter visibility
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // State for loading
  const [isLoading, setIsLoading] = useState(false);

  // Expanded mock data for donations (30 items)
  const allDonations = useMemo(() => [
    {
      id: "DON-7845",
      donor: "Ahmed Jaleel",
      amount: "₹5,000",
      type: "Yatheem",
      status: "Completed",
      date: "2023-11-22",
      email: "ahmed@example.com",
      phone: "+91 9876543210"
    },
    {
      id: "DON-7844",
      donor: "Fatima Salim",
      amount: "₹3,000",
      type: "General",
      status: "Completed",
      date: "2023-11-20",
      email: "fatima@example.com",
      phone: "+91 9876543211"
    },
    {
      id: "DON-7843",
      donor: "Mohammed Rafi",
      amount: "₹10,000",
      type: "Building",
      status: "Pending",
      date: "2023-11-18",
      email: "rafi@example.com",
      phone: "+91 9876543212"
    },
    {
      id: "DON-7842",
      donor: "Zainab Basheer",
      amount: "₹2,500",
      type: "Hafiz",
      status: "Completed",
      date: "2023-11-15",
      email: "zainab@example.com",
      phone: "+91 9876543213"
    },
    {
      id: "DON-7841",
      donor: "Hamza Kareem",
      amount: "₹7,500",
      type: "Yatheem",
      status: "Failed",
      date: "2023-11-10",
      email: "hamza@example.com",
      phone: "+91 9876543214"
    },
    {
      id: "DON-7840",
      donor: "Aisha Noushad",
      amount: "₹1,000",
      type: "General",
      status: "Completed",
      date: "2023-11-09",
      email: "aisha@example.com",
      phone: "+91 9876543215"
    },
    {
      id: "DON-7839",
      donor: "Abdul Rahman",
      amount: "₹15,000",
      type: "Building",
      status: "Completed",
      date: "2023-11-08",
      email: "abdul@example.com",
      phone: "+91 9876543216"
    },
    {
      id: "DON-7838",
      donor: "Khadija Faisal",
      amount: "₹20,000",
      type: "Hafiz",
      status: "Pending",
      date: "2023-11-07",
      email: "khadija@example.com",
      phone: "+91 9876543217"
    },
    {
      id: "DON-7837",
      donor: "Yusuf Kabeer",
      amount: "₹8,000",
      type: "Yatheem",
      status: "Completed",
      date: "2023-11-06",
      email: "yusuf@example.com",
      phone: "+91 9876543218"
    },
    {
      id: "DON-7836",
      donor: "Rukhiya Salim",
      amount: "₹3,500",
      type: "General",
      status: "Failed",
      date: "2023-11-05",
      email: "rukhiya@example.com",
      phone: "+91 9876543219"
    },
    {
      id: "DON-7835",
      donor: "Omar Farouk",
      amount: "₹6,000",
      type: "Building",
      status: "Completed",
      date: "2023-11-04",
      email: "omar@example.com",
      phone: "+91 9876543220"
    },
    {
      id: "DON-7834",
      donor: "Mariam Hassan",
      amount: "₹4,000",
      type: "Hafiz",
      status: "Completed",
      date: "2023-11-03",
      email: "mariam@example.com",
      phone: "+91 9876543221"
    },
    {
      id: "DON-7833",
      donor: "Ibrahim Khan",
      amount: "₹12,000",
      type: "Yatheem",
      status: "Pending",
      date: "2023-11-02",
      email: "ibrahim@example.com",
      phone: "+91 9876543222"
    },
    {
      id: "DON-7832",
      donor: "Sumaiya Jabbar",
      amount: "₹7,800",
      type: "General",
      status: "Completed",
      date: "2023-11-01",
      email: "sumaiya@example.com",
      phone: "+91 9876543223"
    },
    {
      id: "DON-7831",
      donor: "Ismail Ahmed",
      amount: "₹2,750",
      type: "Building",
      status: "Failed",
      date: "2023-10-31",
      email: "ismail@example.com",
      phone: "+91 9876543224"
    },
    {
      id: "DON-7830",
      donor: "Fathima Zahra",
      amount: "₹9,200",
      type: "Hafiz",
      status: "Completed",
      date: "2023-10-30",
      email: "fathima@example.com",
      phone: "+91 9876543225"
    },
    {
      id: "DON-7829",
      donor: "Rashid Ali",
      amount: "₹4,500",
      type: "Yatheem",
      status: "Completed",
      date: "2023-10-29",
      email: "rashid@example.com",
      phone: "+91 9876543226"
    },
    {
      id: "DON-7828",
      donor: "Nusrath Jahan",
      amount: "₹6,300",
      type: "General",
      status: "Pending",
      date: "2023-10-28",
      email: "nusrath@example.com",
      phone: "+91 9876543227"
    },
    {
      id: "DON-7827",
      donor: "Arif Mohammed",
      amount: "₹8,700",
      type: "Building",
      status: "Completed",
      date: "2023-10-27",
      email: "arif@example.com",
      phone: "+91 9876543228"
    },
    {
      id: "DON-7826",
      donor: "Safia Begum",
      amount: "₹1,900",
      type: "Hafiz",
      status: "Failed",
      date: "2023-10-26",
      email: "safia@example.com",
      phone: "+91 9876543229"
    },
    {
      id: "DON-7825",
      donor: "Haroon Rasheed",
      amount: "₹11,500",
      type: "Yatheem",
      status: "Completed",
      date: "2023-10-25",
      email: "haroon@example.com",
      phone: "+91 9876543230"
    },
    {
      id: "DON-7824",
      donor: "Nafisa Banu",
      amount: "₹5,400",
      type: "General",
      status: "Completed",
      date: "2023-10-24",
      email: "nafisa@example.com",
      phone: "+91 9876543231"
    },
    {
      id: "DON-7823",
      donor: "Yaseen Malik",
      amount: "₹3,200",
      type: "Building",
      status: "Pending",
      date: "2023-10-23",
      email: "yaseen@example.com",
      phone: "+91 9876543232"
    },
    {
      id: "DON-7822",
      donor: "Rayhana Siddiq",
      amount: "₹6,800",
      type: "Hafiz",
      status: "Completed",
      date: "2023-10-22",
      email: "rayhana@example.com",
      phone: "+91 9876543233"
    },
    {
      id: "DON-7821",
      donor: "Bilal Hussein",
      amount: "₹4,200",
      type: "Yatheem",
      status: "Failed",
      date: "2023-10-21",
      email: "bilal@example.com",
      phone: "+91 9876543234"
    },
    {
      id: "DON-7820",
      donor: "Zubaidah Fathima",
      amount: "₹7,100",
      type: "General",
      status: "Completed",
      date: "2023-10-20",
      email: "zubaidah@example.com",
      phone: "+91 9876543235"
    },
    {
      id: "DON-7819",
      donor: "Jameel Hasan",
      amount: "₹9,500",
      type: "Building",
      status: "Completed",
      date: "2023-10-19",
      email: "jameel@example.com",
      phone: "+91 9876543236"
    },
    {
      id: "DON-7818",
      donor: "Sajida Khatoon",
      amount: "₹2,300",
      type: "Hafiz",
      status: "Pending",
      date: "2023-10-18",
      email: "sajida@example.com",
      phone: "+91 9876543237"
    },
    {
      id: "DON-7817",
      donor: "Kamran Ahmed",
      amount: "₹8,400",
      type: "Yatheem",
      status: "Completed",
      date: "2023-10-17",
      email: "kamran@example.com",
      phone: "+91 9876543238"
    }
  ], []);

  // Filtered donations
  const [filteredDonations, setFilteredDonations] = useState<typeof allDonations>([]);
  const [displayedDonations, setDisplayedDonations] = useState<typeof allDonations>([]);

  // Apply filters and sorting to donations
  useEffect(() => {
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      // Filter donations
      let filtered = [...allDonations];

      // Apply search filter
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        filtered = filtered.filter(donation =>
          donation.donor.toLowerCase().includes(searchLower) ||
          donation.id.toLowerCase().includes(searchLower) ||
          donation.email.toLowerCase().includes(searchLower)
        );
      }

      // Apply type filter
      if (selectedType) {
        filtered = filtered.filter(donation => donation.type === selectedType);
      }

      // Apply status filter
      if (selectedStatus) {
        filtered = filtered.filter(donation => donation.status === selectedStatus);
      }

      // Apply date range filter
      if (dateFrom) {
        filtered = filtered.filter(donation => new Date(donation.date) >= new Date(dateFrom));
      }

      if (dateTo) {
        filtered = filtered.filter(donation => new Date(donation.date) <= new Date(dateTo));
      }

      // Apply sorting
      filtered.sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
          case 'id':
            comparison = a.id.localeCompare(b.id);
            break;
          case 'donor':
            comparison = a.donor.localeCompare(b.donor);
            break;
          case 'amount':
            // Parse amount string to number (remove currency symbol and commas)
            const amountA = parseFloat(a.amount.replace(/[₹,]/g, ''));
            const amountB = parseFloat(b.amount.replace(/[₹,]/g, ''));
            comparison = amountA - amountB;
            break;
          case 'date':
          default:
            comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
            break;
        }

        return sortOrder === 'asc' ? comparison : -comparison;
      });

      setFilteredDonations(filtered);
      setTotalItems(filtered.length);

      // Update displayed donations based on pagination
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setDisplayedDonations(filtered.slice(startIndex, endIndex));

      setIsLoading(false);
    }, 300); // Simulated loading time
  }, [searchText, selectedType, selectedStatus, dateFrom, dateTo, sortBy, sortOrder, currentPage, itemsPerPage, allDonations]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, selectedType, selectedStatus, dateFrom, dateTo]);

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor = "bg-gray-500/20 text-gray-500";
    let icon = <AlertCircle className="h-3 w-3 mr-1" />;

    if (status === "Completed") {
      bgColor = "bg-green-500/20 text-green-500";
      icon = <CheckCircle className="h-3 w-3 mr-1" />;
    } else if (status === "Pending") {
      bgColor = "bg-amber-500/20 text-amber-500";
      icon = <Clock className="h-3 w-3 mr-1" />;
    } else if (status === "Failed") {
      bgColor = "bg-red-500/20 text-red-500";
      icon = <XCircle className="h-3 w-3 mr-1" />;
    }

    return (
      <span className={`px-2 py-1 rounded-full ${bgColor} flex items-center justify-center w-fit text-xs font-medium`}>
        {icon} {status}
      </span>
    );
  };

  // Type badge component
  const TypeBadge = ({ type }: { type: string }) => {
    let bgColor = "bg-blue-500/20 text-blue-500";

    if (type === "Yatheem") {
      bgColor = "bg-purple-500/20 text-purple-500";
    } else if (type === "Hafiz") {
      bgColor = "bg-indigo-500/20 text-indigo-500";
    } else if (type === "Building") {
      bgColor = "bg-amber-500/20 text-amber-500";
    }

    return (
      <span className={`px-2 py-1 rounded-full ${bgColor} text-xs font-medium`}>
        {type}
      </span>
    );
  };

  // Toggle sort order
  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of visible page range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust start and end to always show 3 pages
      if (start === 2) end = Math.min(4, totalPages - 1);
      if (end === totalPages - 1) start = Math.max(2, totalPages - 3);

      // Add ellipsis after first page if needed
      if (start > 2) pages.push('ellipsis1');

      // Add visible pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) pages.push('ellipsis2');

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  // Apply filters handler
  const handleApplyFilters = () => {
    setCurrentPage(1);
    setShowMobileFilters(false);
  };

  // Reset filters handler
  const handleResetFilters = () => {
    setSearchText("");
    setSelectedType("");
    setSelectedStatus("");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">All Donations</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View and manage all donations across your organization
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <ExportDropdown
            onExport={(type) => handleExport(filteredDonations, type)}
            disabled={isLoading || filteredDonations.length === 0}
          />
          <button className="px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-sm font-medium hover:bg-white/20 transition-all duration-300 flex items-center">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            className="px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-sm font-medium hover:bg-white/20 transition-all duration-300 flex items-center sm:hidden"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Sliders className="h-4 w-4 mr-2" /> Filters
          </button>
        </div>
      </div>

      {/* Main content section */}
      <div className="bg-transparent md:bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-none md:border-white/20  shadow-xl">
        {/* Desktop filters */}
        <div className="hidden md:flex flex-col md:flex-row items-start md:items-end gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by donor name or ID..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 dark:text-gray-200"
            >
              <option value="">All Types</option>
              <option value="General">General</option>
              <option value="Yatheem">Yatheem</option>
              <option value="Hafiz">Hafiz</option>
              <option value="Building">Building</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 dark:text-gray-200"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 h-10 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-sm font-medium hover:bg-white/20 transition-all duration-300 flex items-center"
              onClick={handleApplyFilters}
            >
              <Filter className="h-4 w-4 mr-2" /> Apply
            </button>

            <button
              className="px-4 py-2 h-10 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-sm font-medium hover:bg-white/20 transition-all duration-300 flex items-center"
              onClick={handleResetFilters}
            >
              <X className="h-4 w-4 mr-2" /> Reset
            </button>
          </div>
        </div>

        {/* Mobile search and filter toggle */}
        <div className="md:hidden mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by donor or ID..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 dark:text-gray-200"
            />
          </div>
        </div>

        {/* Mobile filters panel (conditionally shown) */}
        {showMobileFilters && (
          <div className="md:hidden bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-xl p-4 mb-4 border border-white/30 animate-fadeIn">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-800 dark:text-white">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 dark:text-gray-200"
                >
                  <option value="">All Types</option>
                  <option value="General">General</option>
                  <option value="Yatheem">Yatheem</option>
                  <option value="Hafiz">Hafiz</option>
                  <option value="Building">Building</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 dark:text-gray-200"
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Date</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="px-3 py-2 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Date</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="px-3 py-2 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleApplyFilters}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-green-600 transition-all duration-300"
                >
                  Apply Filters
                </button>

                <button
                  onClick={handleResetFilters}
                  className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-sm font-medium hover:bg-white/20 transition-all duration-300"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Applied filters tags (mobile and desktop) */}
        {(selectedType || selectedStatus || dateFrom || dateTo) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedType && (
              <div className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs">
                Type: {selectedType}
                <button
                  onClick={() => setSelectedType("")}
                  className="ml-1 hover:text-blue-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {selectedStatus && (
              <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs">
                Status: {selectedStatus}
                <button
                  onClick={() => setSelectedStatus("")}
                  className="ml-1 hover:text-green-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {dateFrom && (
              <div className="inline-flex items-center px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs">
                From: {new Date(dateFrom).toLocaleDateString()}
                <button
                  onClick={() => setDateFrom("")}
                  className="ml-1 hover:text-amber-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {dateTo && (
              <div className="inline-flex items-center px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs">
                To: {new Date(dateTo).toLocaleDateString()}
                <button
                  onClick={() => setDateTo("")}
                  className="ml-1 hover:text-amber-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            <button
              onClick={handleResetFilters}
              className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="relative w-12 h-12">
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-t-emerald-500 animate-spin"></div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredDonations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No donations found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-green-600 transition-all duration-300"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Donations Table - Desktop View */}
        {!isLoading && filteredDonations.length > 0 && (
          <div className="overflow-x-auto -mx-4 md:mx-0">
            {/* Desktop Table */}
            <table className="hidden md:table w-full text-left border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="sticky top-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider rounded-tl-lg">
                    <div
                      className="flex items-center cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                      onClick={() => toggleSort('id')}
                    >
                      ID
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortBy === 'id' ? 'text-emerald-500' : ''}`} />
                    </div>
                  </th>
                  <th className="sticky top-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div
                      className="flex items-center cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                      onClick={() => toggleSort('donor')}
                    >
                      Donor Name
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortBy === 'donor' ? 'text-emerald-500' : ''}`} />
                    </div>
                  </th>
                  <th className="sticky top-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div
                      className="flex items-center cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                      onClick={() => toggleSort('amount')}
                    >
                      Amount
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortBy === 'amount' ? 'text-emerald-500' : ''}`} />
                    </div>
                  </th>
                  <th className="sticky top-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="sticky top-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="sticky top-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div
                      className="flex items-center cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                      onClick={() => toggleSort('date')}
                    >
                      Date
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortBy === 'date' ? 'text-emerald-500' : ''}`} />
                    </div>
                  </th>
                  <th className="sticky top-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider rounded-tr-lg">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedDonations.map((donation, index) => (
                  <tr
                    key={donation.id}
                    className={`hover:bg-white/5 dark:hover:bg-gray-800/50 backdrop-blur-md transition-all group ${index % 2 === 0 ? 'bg-white/2' : 'bg-white/5 dark:bg-gray-800/20'
                      }`}
                  >
                    <td className="p-3 text-sm font-medium text-gray-900 dark:text-white border-b border-white/10">
                      {donation.id}
                    </td>
                    <td className="p-3 border-b border-white/10">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {donation.donor}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {donation.email}
                      </div>
                    </td>
                    <td className="p-3 text-sm font-bold text-emerald-600 dark:text-emerald-400 border-b border-white/10">
                      {donation.amount}
                    </td>
                    <td className="p-3 border-b border-white/10">
                      <TypeBadge type={donation.type} />
                    </td>
                    <td className="p-3 border-b border-white/10">
                      <StatusBadge status={donation.status} />
                    </td>
                    <td className="p-3 text-sm text-gray-500 dark:text-gray-400 border-b border-white/10">
                      {new Date(donation.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="p-3 border-b border-white/10">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                        <Link
                          href={`/donations/detail?id=${donation.id}`}
                          className="p-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/donations/status?id=${donation.id}`}
                          className="p-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button className="p-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Cards View */}
            <div className="md:hidden space-y-3">
              {displayedDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="p-4 bg-white/5 dark:bg-gray-800/20 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-sm font-bold text-gray-800 dark:text-white mb-1">
                        {donation.donor}
                      </div>
                      <div className="text-xs text-gray-500">{donation.id}</div>
                    </div>
                    <StatusBadge status={donation.status} />
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Amount</div>
                      <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                        {donation.amount}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Type</div>
                      <TypeBadge type={donation.type} />
                    </div>

                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Date</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {new Date(donation.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <Link
                      href={`/donations/detail?id=${donation.id}`}
                      className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/donations/status?id=${donation.id}`}
                      className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalItems > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1">
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="font-medium">{totalItems}</span> entries
            </div>
            <div className="flex items-center space-x-1 order-1 sm:order-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${currentPage === 1
                  ? "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
                  : "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20"
                  }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {getPageNumbers().map((page, index) => (
                page === 'ellipsis1' || page === 'ellipsis2' ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-1 text-gray-500 dark:text-gray-400"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={`page-${page}`}
                    onClick={() => handlePageChange(page as number)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${currentPage === page
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20"
                      }`}
                  >
                    {page}
                  </button>
                )
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
                  : "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20"
                  }`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
