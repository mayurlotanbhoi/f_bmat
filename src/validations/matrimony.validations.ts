import * as Yup from "yup";

export const filterValidationSchema = Yup.object().shape({
    ageRange: Yup.string()
        .matches(/^(\d{1,2})-(\d{1,2})$/, "Format should be like 24-29")
        .test("min-max", "Min age must be less than max age", value => {
            if (!value) return true;
            const [min, max] = value.split("-").map(Number);
            return min < max;
        })
        .notRequired(),
    heightRange: Yup.string()
        .matches(/^\d{1}(\.\d{1,2})?-(\d{1}(\.\d{1,2})?)$/, "Format should be like 5-6 or 5.5-5.6")
        .notRequired(),
    income: Yup.string()
        .matches(/^\d+$/, "Income must be a number")
        .notRequired(),
    subCaste: Yup.string().notRequired(),
    education: Yup.array().of(Yup.string()).notRequired(),
    occupation: Yup.array().of(Yup.string()).notRequired(),
    jobType: Yup.array().of(Yup.string()).notRequired(),
    city: Yup.string().notRequired(),
});