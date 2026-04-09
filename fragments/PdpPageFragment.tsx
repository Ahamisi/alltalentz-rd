"use client";
import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import MainFooter from "@/components/MainFooter";
import Offerings from "@/components/Offerings";
import PageHeader from "@/components/PageHeader";
import Btn from "@/components/Btn";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Image from "next/image";
import TrainingApproach from "@/components/homeRD/TrainingApproach";
import ConferenceVideo from "@/components/homeRD/ConferenceVideo";
import ClientVideos from "@/components/homeRD/ClientVideos";
import ClientWords from "@/components/homeRD/ClientWords";
import Faq from "@/components/homeRD/Faq";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import SecureTestForm from "@/components/SecureTestForm";
import PreTestNoticeModal from "@/components/PreTestNoticeModal";

export default function BootCamp() {
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [bootCampOver, setBootCampOver] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(5); // Initial countdown time
  const [showTestForm, setShowTestForm] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const route = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    yoe: "",
    career: "",
    phone: "",
    cv: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nyscFile, setNyscFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] ?? null);
  };

  const handleFileChangeNysc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNyscFile(event.target.files?.[0] ?? null);
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.yoe) {
      newErrors.yoe = "Experience field is required";
    }
    if (!formData.career) {
      newErrors.career = "Career field is required";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    }
    if (!selectedFile) {
      newErrors.cv = "CV upload is required";
    }
    if (!nyscFile) {
      newErrors.nysc = "NYSC upload is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        setIsLoading(true);

        // Create FormData and append form fields
        const newFData = new FormData();
        newFData.append("fullName", formData.fullName);
        newFData.append("email", formData.email);
        newFData.append("yoe", formData.yoe);
        newFData.append("phone", formData.phone);
        newFData.append("career", formData.career);

        // Append the selected file (cv) to the FormData and nysc
        if (selectedFile) newFData.set("cv", selectedFile);
        if (nyscFile) newFData.set("nysc", nyscFile);

        // Validate for duplicate
        const isDuplicate = await checkDuplicate(formData.email);
        setIsDuplicate(isDuplicate as boolean | null); // Update state based on duplicate result

        if (isDuplicate) {
          console.error("Failed to send email:", { error: "This form has already been filled." });
          setIsLoading(false);
          return;
        } else {
          console.log("no tee", isDuplicate);
        }

        // Send the FormData with both regular form fields and the file to the server
        await fetch("/api/bootcamp", {
          method: "POST",
          body: newFData, // Use the FormData object
        });

        // setIsLoading(false); return;
        // setIsSubmitted(true);
        // console.log("Email sent successfully!");

        setIsSubmitted(true);
        console.log("Email sent successfully!");
        setIsLoading(false);

        // Close the form modal and go directly to test
        setTimeout(() => {
          setIsOpen(false);
          setShowTestForm(true);
        }, 2000);
      } catch (error) {
        // Handle error
        console.error("Failed to send email:", error);
        // Add any further logic here for error actions
      } finally {
        // setIsSubmitted(true);
      }
    } else {
      console.log("Form has errors");
    }
  };

  const sheetDataHandler = (sheetData: unknown) => {
    console.log("sheet data: ", sheetData);
    if (sheetData) {
      setIsDuplicate(true);
      return;
    }
  };

  const checkDuplicate = async (email: string) => {
    return new Promise((resolve, reject) => {
      getSheetData({
        sheetID: "1Axrmq73QMgThtUd_BT20B0GokXoA9v8QjXEVxUClhqQ",
        sheetName: "Page1",
        query: `SELECT * where B contains "${email}"`,
        callback: (sheetData: unknown) => {
          // const isDuplicate = sheetData && sheetData?.table?.rows.length > 0;
          resolve(sheetData);
        },
      });
    });
  };

  // const checkDuplicate = async(email) => {
  //    getSheetData({
  //     sheetID: "1Axrmq73QMgThtUd_BT20B0GokXoA9v8QjXEVxUClhqQ",
  //     sheetName: "Page1",
  //     query: `SELECT * where B contains "${email}"`,
  //     callback: sheetDataHandler
  //   })
  // }

  const getSheetData = ({
    sheetID,
    sheetName,
    query,
    callback,
  }: {
    sheetID: string;
    sheetName: string;
    query: string;
    callback: (data: unknown) => void;
  }) => {
    const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
    const url = `${base}&sheet=${encodeURIComponent(sheetName)}&tq=${encodeURIComponent(query)}`;

    fetch(url)
      .then((res) => res.text())
      .then((response) => {
        callback(responseToObjects(response));
      });

    function responseToObjects(res: string) {
      const jsData = JSON.parse(res.substring(47).slice(0, -2));
      if (jsData?.table?.rows.length > 0) {
        setIsDuplicate(true);
      }
      let data: Record<string, any>[] = [];
      const columns = jsData.table.cols;
      const rows = jsData.table.rows;
      let rowObject: Record<string, any>;
      let cellData;
      let propName;
      for (let r = 0, rowMax = rows.length; r < rowMax; r++) {
        rowObject = {};
        for (let c = 0, colMax = columns.length; c < colMax; c++) {
          cellData = rows[r]["c"][c];
          propName = columns[c].label;
          if (cellData === null) {
            rowObject[propName] = "";
          } else if (typeof cellData["v"] == "string" && cellData["v"].startsWith("Date")) {
            rowObject[propName] = new Date(cellData["f"]);
          } else {
            rowObject[propName] = cellData["v"];
          }
        }
        data.push(rowObject);
      }
      return jsData?.table?.rows.length > 0;
      // return data;
    }
  };

  const bootcampVideos = [
    {
      id: 1,
      videoUrl: "https://youtu.be/lg97MSTAepc",
    },
    {
      id: 2,
      videoUrl: "https://youtu.be/rLBx8RZl9YU",
    },
    {
      id: 3,
      videoUrl: "https://youtu.be/nY32P9n6XSs",
    },
    {
      id: 4,
      videoUrl: "https://youtu.be/EHcDdGuOhSg",
    },
    {
      id: 5,
      videoUrl: "https://youtu.be/RXTCpHs8lC8",
    },
  ];

  // If test form should be shown, render it instead of the main content
  // SecureTestForm component handles Savewyze instructions internally
  if (showTestForm) {
    return <SecureTestForm />;
  }

  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      <PageHeader showBg={false}>
        <div className="max-w-7xl mx-auto px-4 lg:flex relative h-[100%] items-center py-20">
          {/* Left Column */}
          <div className="lg:w-[45%] flex flex-col">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
              Welcome to <span className="text-[#F99621]">All Talentz</span>{" "}
              <span className="text-white">professional development programme.</span>
            </h1>

            <p className="text-white text-lg md:text-xl font-light leading-relaxed max-w-xl">
              Are you ready to level up your career? All Talentz Professional Development Program
              offers intensive 90-days training programs led by industry experts. Whether you're a
              recent graduate or a seasoned professional, our flexible online and in-person format
              provides a smooth and convenient learning experience for our participants.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => (isMobile ? setShowMobileWarning(true) : setShowNoticeModal(true))}
                className="bg-[#F99621] text-black px-8 py-4 rounded font-bold hover:bg-opacity-90 transition-all"
              >
                Apply to our PDP
              </button>

              <a
                href="#bootcampVideos"
                className="bg-white bg-opacity-10 text-white px-8 py-4 rounded font-bold hover:bg-opacity-20 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Watch video
              </a>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="hidden lg:block lg:w-[55%] pl-12 relative">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white opacity-10"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#F99621] opacity-10"></div>
            <div className="relative z-8">
              <Image
                src="/redesign-25/estimator-bootcamp.png"
                alt="Student learning"
                width={450}
                height={600}
                className="w-auto h-[600px]"
              />
            </div>
          </div>
        </div>
      </PageHeader>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="Service Request Form"
        className="modal !p-0 !rounded-none shadow-2xl w-[95%] md:w-[580px] overflow-y-auto max-h-[92vh]"
        overlayClassName="overlay"
      >
        {bootCampOver ? (
          /* ── Application closed ── */
          <div className="p-10 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-3xl">😔</div>
            <h1 className="text-xl font-bold text-gray-900">Applications Closed</h1>
            <p className="text-gray-500 text-sm max-w-xs">
              The professional development programme application period is over. Please be on the lookout for the next cycle.
            </p>
            <button onClick={toggleModal} className="mt-2 text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2">
              Close
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* ── Modal header ── */}
            <div
              className="relative px-6 pt-7 pb-7 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)" }}
            >
              <button
                onClick={toggleModal}
                aria-label="Close"
                className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Image src="/logo.svg" alt="All Talentz" width={100} height={36} className="h-8 w-auto mb-4 brightness-0 invert" />
              <h2 className="text-white text-xl font-bold leading-snug">PDP Application</h2>
              <p className="text-white/55 text-sm mt-1">Fill in your details to apply for the Professional Development Programme.</p>
            </div>

            {/* ── Body ── */}
            <div className="bg-white flex-1 overflow-y-auto">
              {isSubmitted ? (
                /* ── Success state ── */
                <div className="px-6 py-12 flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Application Received!</h3>
                  <p className="text-gray-500 text-sm">Preparing your test portal, please wait a moment...</p>
                  <div className="mt-2">
                    <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-[#F99621] mx-auto"></div>
                  </div>
                </div>
              ) : isDuplicate ? (
                /* ── Duplicate state ── */
                <div className="px-6 py-10 flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-2xl">⚠️</div>
                  <h3 className="text-base font-bold text-gray-900">Application Already Submitted</h3>
                  <p className="text-gray-500 text-sm max-w-xs">
                    We have already received your application. Please contact support for further assistance.
                  </p>
                  <button onClick={toggleModal} className="mt-2 text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2">
                    Close
                  </button>
                </div>
              ) : (
                /* ── Application form ── */
                <form onSubmit={handleSubmit} encType="multipart/form-data" method="post" className="px-6 py-6 space-y-6">

                  {/* Personal information */}
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Personal Information</p>
                    <div className="space-y-4">

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Adaeze Okonkwo"
                          className={`w-full border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:bg-white focus:border-[#F99621] focus:ring-1 focus:ring-[#F99621] transition-colors ${errors.fullName ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400" : "border-gray-200 hover:border-gray-300"}`}
                        />
                        {errors.fullName && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Email <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="you@example.com"
                            className={`w-full border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:bg-white focus:border-[#F99621] focus:ring-1 focus:ring-[#F99621] transition-colors ${errors.email ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400" : "border-gray-200 hover:border-gray-300"}`}
                          />
                          {errors.email && (
                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Phone <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+234 800 000 0000"
                            className={`w-full border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:bg-white focus:border-[#F99621] focus:ring-1 focus:ring-[#F99621] transition-colors ${errors.phone ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400" : "border-gray-200 hover:border-gray-300"}`}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Years of Experience <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="number"
                            name="yoe"
                            value={formData.yoe}
                            onChange={handleInputChange}
                            placeholder="e.g. 2"
                            min="0"
                            className={`w-full border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:bg-white focus:border-[#F99621] focus:ring-1 focus:ring-[#F99621] transition-colors ${errors.yoe ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400" : "border-gray-200 hover:border-gray-300"}`}
                          />
                          {errors.yoe && (
                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                              {errors.yoe}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Career Field <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="career"
                            value={formData.career}
                            onChange={handleInputChange}
                            placeholder="e.g. Software Engineering"
                            className={`w-full border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:bg-white focus:border-[#F99621] focus:ring-1 focus:ring-[#F99621] transition-colors ${errors.career ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400" : "border-gray-200 hover:border-gray-300"}`}
                          />
                          {errors.career && (
                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                              {errors.career}
                            </p>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100" />

                  {/* Documents */}
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Documents</p>
                    <div className="space-y-4">

                      {/* CV upload */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          CV / Résumé <span className="text-red-400">*</span>
                          <span className="ml-1.5 text-xs font-normal text-gray-400">PDF, DOC, DOCX</span>
                        </label>
                        <label
                          className={`flex items-center gap-4 border-2 border-dashed px-4 py-4 cursor-pointer transition-colors ${
                            selectedFile
                              ? "border-green-400 bg-green-50"
                              : errors.cv
                              ? "border-red-300 bg-red-50"
                              : "border-gray-200 bg-gray-50 hover:border-[#F99621] hover:bg-amber-50/40"
                          }`}
                        >
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${selectedFile ? "bg-green-100" : "bg-white border border-gray-200"}`}>
                            {selectedFile ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            {selectedFile ? (
                              <>
                                <p className="text-sm font-semibold text-green-700 truncate">{selectedFile.name}</p>
                                <p className="text-xs text-green-600 mt-0.5">File selected — click to change</p>
                              </>
                            ) : (
                              <>
                                <p className="text-sm font-medium text-gray-700">Click to upload your CV</p>
                                <p className="text-xs text-gray-400 mt-0.5">PDF, DOC, or DOCX</p>
                              </>
                            )}
                          </div>
                          <input type="file" name="cv" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                        </label>
                        {errors.cv && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            {errors.cv}
                          </p>
                        )}
                      </div>

                      {/* NYSC upload */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          NYSC Certificate <span className="text-red-400">*</span>
                          <span className="ml-1.5 text-xs font-normal text-gray-400">PDF, DOC, DOCX</span>
                        </label>
                        <label
                          className={`flex items-center gap-4 border-2 border-dashed px-4 py-4 cursor-pointer transition-colors ${
                            nyscFile
                              ? "border-green-400 bg-green-50"
                              : errors.nysc
                              ? "border-red-300 bg-red-50"
                              : "border-gray-200 bg-gray-50 hover:border-[#F99621] hover:bg-amber-50/40"
                          }`}
                        >
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${nyscFile ? "bg-green-100" : "bg-white border border-gray-200"}`}>
                            {nyscFile ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            {nyscFile ? (
                              <>
                                <p className="text-sm font-semibold text-green-700 truncate">{nyscFile.name}</p>
                                <p className="text-xs text-green-600 mt-0.5">File selected — click to change</p>
                              </>
                            ) : (
                              <>
                                <p className="text-sm font-medium text-gray-700">Click to upload your NYSC certificate</p>
                                <p className="text-xs text-gray-400 mt-0.5">PDF, DOC, or DOCX</p>
                              </>
                            )}
                          </div>
                          <input type="file" name="nysc" accept=".pdf,.doc,.docx" onChange={handleFileChangeNysc} className="hidden" />
                        </label>
                        {errors.nysc && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            {errors.nysc}
                          </p>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* Notice */}
                  <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 px-4 py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Once you submit, you&apos;ll be redirected to take a compulsory assessment test as the final stage of your application.
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#F99621] hover:bg-[#e8870e] active:bg-[#d47a0a] text-white font-bold py-4 text-sm tracking-wide transition-colors disabled:opacity-60 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F99621] focus-visible:ring-offset-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.86 3.018 7.97l2.018-2.68z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>
          </div>
        )}
      </Modal>

      <div className="bg-[#F99621] py-8 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="flex items-center mx-4 text-white font-bold text-2xl">
            <span className="mr-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
            ESTIMATOR
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
          </div>
          <div className="flex items-center mx-4 text-white font-bold text-2xl">
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
            ACCOUNT RECEIVABLES SPECIALIST
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
          </div>
          <div className="flex items-center mx-4 text-white font-bold text-2xl">
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
            REVIEWER
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
          </div>
          <div className="flex items-center mx-4 text-white font-bold text-2xl">
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
            ADMINS
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
          </div>
          <div className="flex items-center mx-4 text-white font-bold text-2xl">
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
            CSR
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
          </div>
          <div className="flex items-center mx-4 text-white font-bold text-2xl">
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
            ESTIMATOR
            <span className="ml-2">
              <Image src="/redesign-25/icons/stars.svg" alt="Logo" width={25} height={25} />
            </span>
          </div>
        </div>
      </div>

      <TrainingApproach />

      <section id="bootcampVideos">
        <ConferenceVideo
          title="PDP Testimonials"
          description="Watch our students transform into industry professionals."
          videos={bootcampVideos}
        />
      </section>

      {/* <ClientWords 
        title="Bootcamp Testimonials"
        description="Hear what our graduates say about their bootcamp experience"
        theme="dark"
        testimonials={[
          {
            name: "Michael Brown",
            role: "Recent Graduate",
            company: "All Talentz Bootcamp",
            quote: "The hands-on experience and expert guidance were invaluable...",
            rating: 5
          },
        ]}
      /> */}

      <Faq
        title="PDP FAQs"
        description="Common questions about our professional development program"
        faqs={[
          {
            question: "How long is the professional development program?",
            answer:
              "Our professional development program is an intensive 90-day program designed to transform you into an industry-ready professional.",
          },
          {
            question: "What are the prerequisites for joining?",
            answer:
              "While no specific experience is required, candidates should have a strong work ethic and basic computer skills.",
          },
          // ... more bootcamp-specific FAQs
        ]}
      />

      <section className="px-[10px] md:px-0 bg-[#131313]">
        <MainFooter hideSub={true} />
      </section>

      {/* Mobile warning modal */}
      {showMobileWarning && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/65 backdrop-blur-sm"
          onClick={() => setShowMobileWarning(false)}
        >
          <div
            className="w-full md:max-w-sm overflow-hidden rounded-t-2xl md:rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="px-6 pt-7 pb-6"
              style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)" }}
            >
              <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center mb-4 text-2xl">
                💻
              </div>
              <h2 className="text-white text-xl font-bold leading-snug">
                Switch to a Laptop
              </h2>
              <p className="text-white/60 text-sm mt-1.5 leading-relaxed">
                For the best experience, the PDP application process and assessment test are designed for laptops and desktop computers.
              </p>
            </div>

            {/* Body */}
            <div className="bg-white px-6 py-5 space-y-3">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
                <strong>Mobile devices are not recommended.</strong> The test may not function optimally on a phone screen.
              </div>
              <div className="flex flex-col gap-2.5 pt-1">
                <button
                  onClick={() => {
                    setShowMobileWarning(false);
                    setShowNoticeModal(true);
                  }}
                  className="w-full text-sm text-gray-500 hover:text-gray-700 font-medium py-3 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                  style={{ touchAction: "manipulation" }}
                >
                  Continue Anyway
                </button>
                <button
                  onClick={() => setShowMobileWarning(false)}
                  className="w-full bg-[#F99621] hover:bg-[#e8870e] text-white font-bold py-3 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F99621] focus-visible:ring-offset-2"
                  style={{ touchAction: "manipulation" }}
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pre-test notice modal */}
      <PreTestNoticeModal
        isOpen={showNoticeModal}
        onClose={() => setShowNoticeModal(false)}
        onBeginTest={() => {
          setShowNoticeModal(false);
          setIsOpen(true);
        }}
      />
    </main>
  );
}
