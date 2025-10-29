/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

type FormData = {
  fullName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  website: string;
  department: string;
  date: Date | undefined;
  time: string;
  description: string;
  acceptTerms: boolean;
  gender: string;
  notifications: boolean;
  skills: string[];
  profileImage: File | null;
  documentFile: File | null;
};

export default function FormTemplate() {
  const { t } = useTranslation("formTranslation");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      website: "",
      department: "",
      date: undefined,
      time: "",
      description: "",
      acceptTerms: false,
      gender: "",
      notifications: false,
      skills: [],
      profileImage: null,
      documentFile: null,
    },
  });

  const [open, setOpen] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Form Payload:", data);
    alert(
      `${t("form.messages.submitted")}\n\n${JSON.stringify(data, null, 2)}`
    );
  };

  // Helper to return translated arrays (departments, skills, etc.)
  const tArray = (key: string): string[] =>
    t(key, { returnObjects: true }) as string[];

  return (
    <div className="p-6 transition-colors duration-300">
      {/* Small screen warning */}
      <div className="block md:hidden text-center text-red-600 font-medium border rounded-lg p-4 bg-red-50 dark:bg-red-900/20 dark:text-red-400">
        {t("form.messages.useLargeScreen")}
      </div>

      {/* Form visible only on medium and large screens */}
      <div className="hidden md:flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10 w-full max-w-6xl bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden"
        >
          {/* ---------- BASIC INFO ---------- */}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {t("form.titles.basicInfo")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
            {[
              {
                id: "fullName",
                label: t("form.labels.fullName"),
                placeholder: t("form.placeholders.fullName"),
                validation: { required: t("form.errors.fullName") },
              },
              {
                id: "username",
                label: t("form.labels.username"),
                placeholder: t("form.placeholders.username"),
                validation: { required: t("form.errors.username") },
              },
              {
                id: "password",
                label: t("form.labels.password"),
                placeholder: t("form.placeholders.password"),
                type: "password",
                validation: { required: t("form.errors.password") },
              },
              {
                id: "email",
                label: t("form.labels.email"),
                placeholder: t("form.placeholders.email"),
                validation: { required: t("form.errors.email") },
              },
              {
                id: "phone",
                label: t("form.labels.phone"),
                placeholder: t("form.placeholders.phone"),
                validation: { required: t("form.errors.phone") },
              },
              {
                id: "website",
                label: t("form.labels.website"),
                placeholder: t("form.placeholders.website"),
                validation: { required: t("form.errors.website") },
              },
            ].map(({ id, label, placeholder, type, validation }) => (
              <div
                key={id}
                className="flex flex-col gap-2 w-full min-w-0 overflow-hidden"
              >
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  type={type || "text"}
                  placeholder={placeholder}
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  {...register(id as keyof FormData, validation)}
                />
                {errors[id as keyof FormData] && (
                  <p className="text-sm text-red-500">
                    {(errors[id as keyof FormData] as any)?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* ---------- DEPARTMENT & SCHEDULE ---------- */}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {t("form.titles.departmentSchedule")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
            {/* Department Dropdown */}
            <Controller
              name="department"
              control={control}
              rules={{ required: t("form.errors.department") }}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <Label>{t("form.labels.department")}</Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                      <SelectValue
                        placeholder={t("form.placeholders.department")}
                      />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
                      {tArray("form.options.departments").map((dep) => (
                        <SelectItem key={dep} value={dep}>
                          {dep}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.department && (
                    <p className="text-sm text-red-500">
                      {errors.department.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Date Picker */}
            <Controller
              name="date"
              control={control}
              rules={{ required: t("form.errors.date") }}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <Label>{t("form.labels.date")}</Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="justify-between font-normal dark:border-gray-700 dark:text-gray-100"
                      >
                        {field.value
                          ? field.value.toLocaleDateString()
                          : t("form.placeholders.date")}
                        <ExpandMoreIcon className="h-4 w-4 opacity-70" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:border-gray-700">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(selectedDate) => {
                          field.onChange(selectedDate);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && (
                    <p className="text-sm text-red-500">
                      {errors.date.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Time Picker */}
            <div className="flex flex-col gap-2">
              <Label>{t("form.labels.time")}</Label>
              <Input
                type="time"
                {...register("time", { required: t("form.errors.time") })}
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              />
              {errors.time && (
                <p className="text-sm text-red-500">{errors.time.message}</p>
              )}
            </div>
          </div>

          {/* ---------- ADDITIONAL DETAILS ---------- */}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {t("form.titles.additionalDetails")}
          </h2>

          <div className="flex flex-col gap-2 max-w-2xl">
            <Label>{t("form.labels.description")}</Label>
            <Textarea
              placeholder={t("form.placeholders.description")}
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              {...register("description", {
                required: t("form.errors.description"),
              })}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* ---------- PREFERENCES & SETTINGS ---------- */}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {t("form.titles.preferences")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
            {/* Terms Checkbox */}
            <Controller
              name="acceptTerms"
              control={control}
              rules={{ required: t("form.errors.acceptTerms") }}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={field.value || false}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-5 w-5 accent-blue-600"
                    />
                    <Label>{t("form.labels.acceptTerms")}</Label>
                  </div>
                  {errors.acceptTerms && (
                    <p className="text-sm text-red-500">
                      {errors.acceptTerms.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Gender Radio */}
            <Controller
              name="gender"
              control={control}
              rules={{ required: t("form.errors.gender") }}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <Label>{t("form.labels.gender")}</Label>
                  <div className="flex flex-wrap gap-4">
                    {tArray("form.options.genders").map((g) => (
                      <label key={g} className="flex items-center gap-2">
                        <input
                          type="radio"
                          value={g}
                          checked={field.value === g}
                          onChange={() => field.onChange(g)}
                          className="accent-blue-600 h-4 w-4"
                        />
                        <span className="dark:text-gray-100">{g}</span>
                      </label>
                    ))}
                  </div>
                  {errors.gender && (
                    <p className="text-sm text-red-500">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Skills Multi-Select */}
            <Controller
              name="skills"
              control={control}
              rules={{ required: t("form.errors.skills") }}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <Label>{t("form.labels.skills")}</Label>
                  <Select
                    onValueChange={(value: string) => {
                      const newValues = field.value ? [...field.value] : [];
                      const index = newValues.indexOf(value);
                      if (index === -1) newValues.push(value);
                      else newValues.splice(index, 1);
                      field.onChange(newValues);
                    }}
                  >
                    <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                      <SelectValue
                        placeholder={t("form.placeholders.skills")}
                      />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
                      {tArray("form.options.skills").map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.value && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((v: string) => (
                        <span
                          key={v}
                          className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  )}
                  {errors.skills && (
                    <p className="text-sm text-red-500">
                      {errors.skills.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* ---------- FILE UPLOAD ---------- */}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {t("form.titles.uploadDocs")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Image */}
            <Controller
              name="profileImage"
              control={control}
              rules={{ required: t("form.errors.profileImage") }}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <Label>{t("form.labels.profileImage")}</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) field.onChange(file);
                    }}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  />
                  {field.value && (
                    <img
                      src={URL.createObjectURL(field.value)}
                      alt="Preview"
                      className="w-20 h-20 rounded-md border dark:border-gray-700"
                    />
                  )}
                  {errors.profileImage && (
                    <p className="text-sm text-red-500">
                      {errors.profileImage.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Document File */}
            <Controller
              name="documentFile"
              control={control}
              rules={{ required: t("form.errors.documentFile") }} // ✅ Validation added
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <Label>{t("form.labels.documentFile")}</Label>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  />
                  {field.value && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {t("form.messages.selectedFile")}: {field.value.name}
                    </p>
                  )}
                  {errors.documentFile && (
                    <p className="text-sm text-red-500">
                      {errors.documentFile.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* ---------- ACTION BUTTONS ---------- */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              className="w-28 dark:border-gray-700 dark:text-gray-100"
            >
              {t("form.buttons.reset")}
            </Button>
            <Button
              type="submit"
              className="w-28 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500"
            >
              {t("form.buttons.submit")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
