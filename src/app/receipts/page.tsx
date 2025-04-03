"use client";

import React, { useState, useEffect } from 'react';
import PhoneVerification from '@/components/users-section/receipts/PhoneVerification';
import OTPVerification from '@/components/users-section/receipts/OTPVerification';
import ReceiptList from '@/components/users-section/receipts/ReceiptList';
import { PageHeader } from '@/components/users-section/PageHeader';
import { RecaptchaVerifier, ConfirmationResult } from "firebase/auth"; // Updated import
import { auth, sendOTP, isTestMode } from '@/lib/firebase';

export default function ReceiptsPage() {
    const [step, setStep] = useState<'phone' | 'otp' | 'verified'>('phone');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || isTestMode) {
            return;
        }

        try {
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                    size: "invisible",
                    callback: () => {
                        console.log("Recaptcha verified");
                    },
                    "expired-callback": () => {
                        console.log("Recaptcha expired. Please refresh.");
                        setError("Recaptcha expired. Please try again.");
                    },
                });
            }
            window.recaptchaVerifier.render();
        } catch (err: unknown) {
            console.error("Error initializing reCAPTCHA:", err);
            setError("Failed to initialize reCAPTCHA. Please refresh and try again.");
        }

        return () => {
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
            }
        };
    }, [isClient]);

    const handlePhoneSubmit = async (phoneNumber: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await sendOTP(phoneNumber);
            if (!result) {
                throw new Error('Failed to send OTP. Please try again.');
            }
            setConfirmationResult(result);
            setPhoneNumber(phoneNumber);
            setStep('otp');
        } catch (error: unknown) {
            console.error('Error sending OTP:', error);
            setError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async (otp: string) => {
        setIsLoading(true);
        setError(null);

        try {
            if (!confirmationResult) {
                throw new Error('Verification session expired. Please try again.');
            }
            await confirmationResult.confirm(otp);
            setStep('verified');
        } catch (error: unknown) {
            console.error('Error verifying OTP:', error);
            setError(error instanceof Error ? error.message : 'Invalid OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await sendOTP(phoneNumber);
            if (!result) {
                throw new Error('Failed to resend OTP. Please try again.');
            }
            setConfirmationResult(result);
            setError('OTP resent successfully!');
        } catch (error: unknown) {
            console.error('Error resending OTP:', error);
            setError(error instanceof Error ? error.message : 'Failed to resend OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePhone = () => {
        setStep('phone');
        setPhoneNumber('');
        setConfirmationResult(null);
        setError(null);
    };

    const handleLogout = () => {
        setStep('phone');
        setPhoneNumber('');
        setConfirmationResult(null);
        setError(null);
    };

    return (
        <>
            <div id="recaptcha-container" className="hidden"></div>
            <PageHeader
                title="Check Your Receipt"
                subtitle="Make a lasting impact through scheduled contributions that provide consistent support to our causes."
            />
            <section className="py-16 px-6 bg-gray-50 min-h-screen">
                <div className="container mx-auto max-w-4xl">
                    {step === 'phone' && (
                        <PhoneVerification
                            onSubmit={handlePhoneSubmit}
                            isLoading={isLoading}
                            error={error}
                        />
                    )}
                    {step === 'otp' && (
                        <OTPVerification
                            phoneNumber={phoneNumber}
                            onVerify={handleVerifyOTP}
                            onResendOTP={handleResendOTP}
                            onChangePhone={handleChangePhone}
                            isLoading={isLoading}
                            error={error}
                        />
                    )}
                    {step === 'verified' && (
                        <ReceiptList
                            phoneNumber={phoneNumber}
                            onLogout={handleLogout}
                        />
                    )}
                </div>
            </section>
        </>
    );
}