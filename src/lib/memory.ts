// src/lib/memory.ts
export const agentMemory: Record<string, {
    recipients?: string[];
    subject?: string;
    message?: string;
  }> = {};
  