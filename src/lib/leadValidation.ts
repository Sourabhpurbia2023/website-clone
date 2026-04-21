export type LeadFieldName = 'name' | 'email' | 'phone';

export type LeadFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type LeadFieldErrors = Partial<Record<LeadFieldName, string>>;

export type ValidatedLeadForm = {
  values: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  errors: LeadFieldErrors;
};

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_PATTERN = /^\+?\d{7,15}$/;

export function normalizePhoneNumber(value: string) {
  return value.trim().replace(/[\s().-]/g, '');
}

export function sanitizePhoneNumberInput(value: string) {
  const digitsOnly = value.replace(/\D/g, '');
  return value.trimStart().startsWith('+') ? `+${digitsOnly}` : digitsOnly;
}

export function validateLeadForm(values: LeadFormValues): ValidatedLeadForm {
  const name = values.name.trim();
  const email = values.email.trim().toLowerCase();
  const phone = normalizePhoneNumber(values.phone);
  const message = values.message.trim();
  const errors: LeadFieldErrors = {};

  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length < 2) {
    errors.name = 'Please enter your full name.';
  }

  if (!email) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!phone) {
    errors.phone = 'Mobile number is required.';
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = 'Use 7 to 15 digits and an optional leading +.';
  }

  return {
    values: {
      name,
      email,
      phone,
      message,
    },
    errors,
  };
}