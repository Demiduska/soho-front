import * as yup from "yup";

export const LoginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Неверная формат почты")
    .required("Почта обязательная"),
  password: yup
    .string()
    .min(6, "Пароль должен быть не менее 6 символов")
    .required("Пароль обязательный"),
});

export const PaymentFormSchema = yup.object().shape({
  login: yup.string().min(6).required("Account is required"),
  amount: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Amount is required")
    .min(1, "Min 1")
    .positive("Amount must be a positive number")
    .nullable(),
  bonus: yup.number().optional(),
  payment: yup.string().required("Need to fill payment method"),
});
export const PaymentFormSchemaRU = yup.object().shape({
  login: yup.string().min(6).required("Аккаунт обязателен"),
  amount: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Неправильная сумма")
    .min(1, "Min 1")
    .positive("Amount must be a positive number")
    .nullable(),
  bonus: yup.number().optional(),
  payment: yup.string().required("Need to fill payment method"),
});

export const ForgotPasswordFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Неверная формат почты")
    .required("Почта обязательная"),
});

export const SetNewPasswordFormSchema = yup.object().shape({
  token: yup.string().required(),
  password: yup
    .string()
    .min(6)
    .required()
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: "Простой пароль",
    }),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must and should match"),
});

export const UpdatePasswordFormSchema = yup.object().shape({
  password: yup
    .string()
    .min(6)
    .required()
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: "Простой пароль",
    }),
  newPassword: yup
    .string()
    .min(6)
    .required()
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: "Простой пароль",
    }),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must and should match"),
});

export const RegisterFormSchema = yup.object().shape({
  email: yup.string().email("Incorrect email").required("Email is required"),
  login: yup.string().min(6).required("Login is required"),
  password: yup
    .string()
    .min(6)
    .max(16)
    .required()
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: "Simple password",
    }),
  // confirmPassword: yup
  //   .string()
  //   .required("Confirm Password is required")
  //   .oneOf([yup.ref("password")], "Passwords must and should match"),
});
export const RegisterFormSchemaRU = yup.object().shape({
  email: yup
    .string()
    .email("Неверный адрес электронный почты")
    .required("Електронный адрес обязателен"),
  login: yup
    .string()
    .min(6, "Логин должен содержать не менее 6 символов")
    .max(16, "Логин должен содержать не более 16 символов")
    .required("Логин обязателен"),
  password: yup
    .string()
    .min(
      6,
      "Пароль должен состоять не менее, чем из 6 символов и содержать заглавные, строчные буквы, а также цифры."
    )
    .required()
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: "Простой пароль",
    }),
});

export const RegisterFormSchemaPg = yup.object().shape({
  email: yup.string().email("Incorrect email").required("Email is required"),
  password: yup
    .string()
    .min(6)
    .required()
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: "Simple password",
    }),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must and should match"),
});

export const updateUserFormSchema = yup.object().shape({
  email: yup.string().email("Неверная почта").required("Почта обязательная"),
  nickName: yup.string().optional(),
  telegram: yup.string().optional(),
});

export const createPostFormSchema = yup.object().shape({
  name: yup.string().min(3).required("Title is required"),
  content: yup.string().optional(),
  nameRu: yup.string().min(3).optional(),
  contentRu: yup.string().optional(),
});
