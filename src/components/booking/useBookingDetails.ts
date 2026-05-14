import { useEffect, useMemo, useRef, useState } from "react";
import {
  isValidEmail,
  splitFullName,
  type ContactValues,
} from "@/src/components/booking/booking-flow-utils";

export type DetailsErrors = Partial<{
  fullName: string;
  email: string;
  phone: string;
}>;

type ContactField = keyof ContactValues;

type UseBookingDetailsOptions = {
  onDetailsChanged: () => void;
};

export function useBookingDetails({
  onDetailsChanged,
}: UseBookingDetailsOptions) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [detailsErrors, setDetailsErrors] = useState<DetailsErrors>({});
  const parsedName = useMemo(() => splitFullName(fullName), [fullName]);
  const contactValuesRef = useRef<ContactValues>({ fullName, email, phone });

  useEffect(() => {
    contactValuesRef.current = { fullName, email, phone };
  }, [email, fullName, phone]);

  function validateDetails() {
    const nextErrors: DetailsErrors = {};

    if (!fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    } else if (!parsedName.lastName) {
      nextErrors.fullName = "Please include a last name.";
    }

    if (!phone.trim()) {
      nextErrors.phone = "Phone is required.";
    }

    if (email.trim() && !isValidEmail(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    setDetailsErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleDetailsChange(field: ContactField, value: string) {
    setDetailsErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));

    if (field === "fullName") {
      setFullName(value);
    }

    if (field === "email") {
      setEmail(value);
    }

    if (field === "phone") {
      setPhone(value);
    }

    onDetailsChanged();
  }

  return {
    contactValues: { fullName, email, phone },
    contactValuesRef,
    detailsErrors,
    email,
    fullName,
    handleDetailsChange,
    parsedName,
    phone,
    validateDetails,
  };
}
