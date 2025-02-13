import { z } from 'zod';

export const enum SupportedLanguages {
  EN_EN = 'en-EN',
  FR_FR = 'fr-FR',
  VI_VI = 'vi-VI',
}

export const languageSchema = z.enum([
  SupportedLanguages.EN_EN,
  SupportedLanguages.FR_FR,
  SupportedLanguages.VI_VI,
]);

export type Language = z.infer<typeof languageSchema>;
