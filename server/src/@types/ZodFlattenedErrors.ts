export type ZodFlattenedErrors = {
  formErrors: string[];
  fieldErrors: Record<string, string[] | undefined>;
};
