'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useRouter } from 'next/navigation';

// Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

// Enable test mode if specified
const isTestMode = process.env.NEXT_PUBLIC_FIREBASE_TEST_MODE === 'true';
if (isTestMode && auth.settings) {
  try {
    auth.settings.appVerificationDisabledForTesting = true;
  } catch (err) {
    console.error('Error setting appVerificationDisabledForTesting:', err);
  }
}

export default function SignInForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(isTestMode);
  const [countdown, setCountdown] = useState(0);

  const router = useRouter();

  // Update formatted phone whenever phone number changes
  useEffect(() => {
    if (phoneNumber) {
      setFormattedPhone(`+91${phoneNumber}`);
    } else {
      setFormattedPhone('');
    }
  }, [phoneNumber]);

  // Setup reCAPTCHA verifier
  useEffect(() => {
    if (isTestMode) {
      setRecaptchaReady(true);
      return;
    }

    function initializeRecaptcha() {
      try {
        // Always clear existing verifier first
        if (window.recaptchaVerifier) {
          try {
            window.recaptchaVerifier.clear();
          } catch (e) {
            // Ignore errors from clearing
          }
          window.recaptchaVerifier = null;
        }
    
        // Create a unique container ID each time to avoid conflicts
        const recaptchaContainerId = 'recaptcha-container-' + Date.now();
        
        // Find the existing container
        const existingContainer = document.getElementById('recaptcha-container');
        if (existingContainer) {
          // Create a new container with the unique ID
          const newContainer = document.createElement('div');
          newContainer.id = recaptchaContainerId;
          newContainer.className = 'hidden';
          
          // Replace the old container with the new one
          if (existingContainer.parentNode) {
            existingContainer.parentNode.replaceChild(newContainer, existingContainer);
          } else {
            // If for some reason the parent doesn't exist, just append to body
            document.body.appendChild(newContainer);
          }
        }
    
        // Now create a new reCAPTCHA verifier with the unique container ID
        window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainerId, {
          size: 'invisible',
          callback: () => setRecaptchaReady(true),
          'expired-callback': () => {
            setRecaptchaReady(false);
            setError('Recaptcha expired. Please refresh and try again.');
          }
        });
    
        // Render the new reCAPTCHA
        window.recaptchaVerifier.render().then(() => setRecaptchaReady(true));
      } catch (err) {
        console.error('Error initializing reCAPTCHA:', err);
        setError('Failed to initialize verification. Please refresh and try again.');
      }
    }
    

    initializeRecaptcha();

    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {
          console.error('Failed to clear reCAPTCHA on unmount:', e);
        }
        window.recaptchaVerifier = null;
      }
    };
  }, [isTestMode]);

  // Countdown timer for resend option
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Handle phone number input - only allow digits
  const handlePhoneInput = (value) => {
    const digitsOnly = value.replace(/\D/g, '');
    setPhoneNumber(digitsOnly.slice(0, 10));
  };

  // Handle phone number submission
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate 10-digit Indian phone number
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      setLoading(false);
      return;
    }

    try {
      // Check if phone number exists in MongoDB
      const response = await fetch('/api/check-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formattedPhone, role:"Volunteer" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to check phone number');
      }

      if (!data.exists) {
        throw new Error('Phone number not registered as a volunteer');
      }

      // Request OTP from Firebase
      const appVerifier = isTestMode ? undefined : window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
      setCountdown(60);
    } catch (err) {
      setError(err.message || 'Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    if (!confirmationResult) {
      setError('Session expired. Please enter your phone number again.');
      setLoading(false);
      return;
    }
  
    try {
      const credential = await confirmationResult.confirm(otp);
      const idToken = await credential.user.getIdToken();
      
      const result = await signIn('credentials', {
        redirect: false,
        idToken,
        phone: formattedPhone,
        role: "Volunteer",
      });
  
      if (!result || result.error) {
        throw new Error(result?.error || 'Authentication failed. Please try again.');
      }
  
      router.push('/volunteer');
    } catch (err) {
      setError(err.message || 'Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setError('');
    setLoading(true);
    
    try {
      const appVerifier = isTestMode ? undefined : window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      setCountdown(60);
    } catch (err) {
      setError(err.message || 'Failed to resend verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      {/* Logo/Branding Area */}
      <div className="mb-8 text-center">
        <svg className="w-20 h-20 mx-auto text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
        </svg>
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">Volunteer Portal</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Sign in to access your volunteer dashboard</p>
      </div>
      
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 dark:bg-indigo-700 py-5 px-6">
          <h2 className="text-xl font-bold text-white flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Volunteer Authentication
          </h2>
        </div>
        
        <div className="p-8">
          <div id="recaptcha-container" className="hidden"></div>

          {!otpSent ? (
            // Phone number form
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="flex rounded-lg overflow-hidden">
                    <div className="bg-gray-100 dark:bg-gray-600 flex items-center justify-center px-3 border-y border-l border-gray-300 dark:border-gray-600">
                      <span className="text-gray-500 dark:text-gray-300 font-medium">+91</span>
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => handlePhoneInput(e.target.value)}
                      placeholder="9876543210"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-base"
                      maxLength={10}
                    />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Enter your 10-digit registered phone number
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || (!isTestMode && !recaptchaReady) || phoneNumber.length !== 10}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white transition duration-150 ease-in-out
                  ${loading || (!isTestMode && !recaptchaReady) || phoneNumber.length !== 10
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (!isTestMode && !recaptchaReady) ? 'Initializing...' : 'Send Verification Code'}
              </button>
              
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded mt-4">
                  <div className="flex">
                    <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                  </div>
                </div>
              )}
            </form>
          ) : (
            // OTP verification form
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Verification Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="Enter 6-digit code"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  A verification code has been sent to +91 {phoneNumber}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white transition duration-150 ease-in-out
                  ${loading || otp.length !== 6
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : 'Verify and Sign In'}
              </button>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setError('');
                  }}
                  className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 font-medium"
                >
                  Change phone number
                </button>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading || countdown > 0}
                  className={`text-sm font-medium ${countdown > 0 ? 'text-gray-400 dark:text-gray-500' : 'text-indigo-600 hover:text-indigo-500 dark:text-indigo-400'}`}
                >
                  {countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
                </button>
              </div>
              
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded mt-4">
                  <div className="flex">
                    <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
      
      {/* Footer with additional information */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Need help? Contact support at support@example.com</p>
        <p className="mt-1">© 2025 Your Organization. All rights reserved.</p>
      </div>
    </div>
  );
}