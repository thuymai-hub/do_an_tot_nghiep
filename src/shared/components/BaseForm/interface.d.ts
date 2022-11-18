export type TField = {
  name: string;
  className?: string;
  label?: string;
  component: string;
  placeholder?: string;
  value: string;
  rule?: any;
};

export type TFormField = {
  formField: Record<string, TField>;
};
