
import { useField } from "formik";

const FormikToggle = ({ name, label }: { name: string; label?: string }) => {
    const [field] = useField({ name, type: "checkbox" });

    return (
        <div className="flex items-center space-x-2 mt-2">
            <input
                type="checkbox"
                {...field}
                className="h-5 w-5 text-blue-600 focus:ring-0 border-gray-300 rounded"
            />
            {label && <label className="text-sm">{label}</label>}
        </div>
    );
};

export default FormikToggle;