import * as OutlineIcons from "@heroicons/react/24/outline";
import React from "react";
type HeroIconName = keyof typeof OutlineIcons; // كل الـ Icon components المتاحة


export function DynamicHeroIcon({ name, className }: { name: string, className?: string }) {
  // المكتبة بتسمي كل أيقونة بـ SomethingIcon
  const iconKey = name as HeroIconName;
  const Icon = OutlineIcons[iconKey];

  if (!Icon) {
    // fallback icon لو الاسم غلط أو مش موجود
    const Fallback = OutlineIcons.QuestionMarkCircleIcon;
    return <Fallback className={className} />;
  }

  return <Icon className={className} />;
}

