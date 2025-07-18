"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Qrwc } from '@q-sys/qrwc';
import { setupQrwc } from '@/utils/qsysConnection';

// Type alias for Q-SYS components map
type QsysComponentMap = NonNullable<Qrwc['components']>;

type QsysContextType = {
  components: QsysComponentMap | null;
  isConnected: boolean;
};

const QsysContext = createContext<QsysContextType | undefined>(undefined);

function QsysProvider({ children }: { children: React.ReactNode }) {
  const [components, setComponents] = useState<QsysComponentMap | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setupQrwc(
      (qrwc: Qrwc, updatedComponent: QsysComponentMap[keyof QsysComponentMap]) => {
        setComponents(prev => ({
          ...prev,
          [updatedComponent.name]: updatedComponent,
        }));
      },
      (qrwc: Qrwc) => {
        setComponents(qrwc.components);
        setIsConnected(true);
      },
      () => {
        setIsConnected(false);
      }
    );
  }, []);

  return (
    <QsysContext.Provider value={{ components, isConnected }}>
      {children}
    </QsysContext.Provider>
  );
}

function useQsys() {
  const context = useContext(QsysContext);
  if (context === undefined) {
    throw new Error('useQsys must be used within a QsysProvider');
  }
  return context;
}

export { QsysProvider as default, useQsys };
