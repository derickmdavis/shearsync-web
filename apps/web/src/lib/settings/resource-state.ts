"use client";

import { useCallback, useState } from "react";

export type SettingsResourceState<T> = {
  baseline: T | null;
  draft: T | null;
  error: string | null;
  saving: boolean;
  replaceBaseline: (value: T) => void;
  updateDraft: (update: (current: T) => T) => void;
  save: (mutation: (draft: T, baseline: T) => Promise<T>) => Promise<T | null>;
};

/** Shared baseline/draft behavior for Settings forms. */
export function useSettingsResource<T>(initial: T | null = null): SettingsResourceState<T> {
  const [baseline, setBaseline] = useState<T | null>(initial);
  const [draft, setDraft] = useState<T | null>(initial);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const replaceBaseline = useCallback((value: T) => {
    setBaseline(value);
    setDraft(value);
    setError(null);
  }, []);

  const updateDraft = useCallback((update: (current: T) => T) => {
    setDraft((current) => current === null ? current : update(current));
    setError(null);
  }, []);

  const save = useCallback(async (mutation: (nextDraft: T, savedBaseline: T) => Promise<T>) => {
    if (draft === null || baseline === null) return null;
    setSaving(true);
    setError(null);
    try {
      const saved = await mutation(draft, baseline);
      setBaseline(saved);
      setDraft(saved);
      return saved;
    } catch (cause) {
      setError(cause instanceof Error && cause.message ? cause.message : "Unable to save changes. Try again.");
      return null;
    } finally {
      setSaving(false);
    }
  }, [baseline, draft]);

  return { baseline, draft, error, saving, replaceBaseline, updateDraft, save };
}
