// src/context/LoadingContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import FullscreenLoader, { LoadingState } from '@/components/ui/fullScreenLoader/FullScreenLoader';

interface LoadingContextType {
  startLoading: (options?: {
    initialState?: LoadingState;
    customTitle?: string;
    customMessage?: string;
    autoProgress?: boolean;
  }) => void;
  updateLoading: (options: {
    state?: LoadingState;
    progress?: number;
    customTitle?: string;
    customMessage?: string;
  }) => void;
  stopLoading: () => void;
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loadingState, setLoadingState] = useState<LoadingState>('processing');
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [customTitle, setCustomTitle] = useState<string | undefined>(undefined);
  const [customMessage, setCustomMessage] = useState<string | undefined>(undefined);
  const [autoProgress, setAutoProgress] = useState(true);

  const startLoading = (options?: {
    initialState?: LoadingState;
    customTitle?: string;
    customMessage?: string;
    autoProgress?: boolean;
  }) => {
    setLoadingState(options?.initialState || 'processing');
    setProgress(undefined); // Reset to allow auto-progress
    setCustomTitle(options?.customTitle);
    setCustomMessage(options?.customMessage);
    setAutoProgress(options?.autoProgress !== false);
    setIsVisible(true);
  };

  const updateLoading = (options: {
    state?: LoadingState;
    progress?: number;
    customTitle?: string;
    customMessage?: string;
  }) => {
    if (options.state) setLoadingState(options.state);
    if (options.progress !== undefined) setProgress(options.progress);
    if (options.customTitle !== undefined) setCustomTitle(options.customTitle);
    if (options.customMessage !== undefined) setCustomMessage(options.customMessage);
  };

  const stopLoading = () => {
    setIsVisible(false);
    // Reset state after animation completes
    setTimeout(() => {
      setLoadingState('processing');
      setProgress(undefined);
      setCustomTitle(undefined);
      setCustomMessage(undefined);
      setAutoProgress(true);
    }, 300);
  };

  return (
    <LoadingContext.Provider
      value={{
        startLoading,
        updateLoading,
        stopLoading,
        isLoading: isVisible,
      }}
    >
      {children}
      <FullscreenLoader
        isVisible={isVisible}
        loadingState={loadingState}
        progress={progress}
        customTitle={customTitle}
        customMessage={customMessage}
        autoProgress={autoProgress}
      />
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;