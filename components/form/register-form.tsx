"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/theme-button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FormData = {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
};

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('https://codemal.newwaymm.com/api/event/1/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      setSubmitError('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email address',
            }
          })}
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          type="tel"
          id="phone"
          {...register('phone', { required: 'Phone number is required' })}
        />
        {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          type="date"
          id="dateOfBirth"
          {...register('dateOfBirth', { required: 'Date of birth is required' })}
        />
        {errors.dateOfBirth && <p className="text-sm text-red-600">{errors.dateOfBirth.message}</p>}
      </div>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <Button type="submit" disabled={isSubmitting} size="lg" intent="primary">
        {isSubmitting ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
};

export default RegisterForm;
