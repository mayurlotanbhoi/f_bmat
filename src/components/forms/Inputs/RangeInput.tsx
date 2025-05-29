// RangeInput.tsx

import { useFormikContext } from "formik";
import AgeRangeSlider from "../AgeRangeSlider";

interface RangeInputProps {
    name: string,
    label?: string
}

const RangeInput = ({ name, label }: RangeInputProps) => {
    const { setFieldValue, values } = useFormikContext<any>();


    const handleRangeChange = (range: { min: number; max: number }) => {
        setFieldValue(name, range);
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <AgeRangeSlider
                value={values[name]} // ✅ Pass the current value
                onChange={handleRangeChange}
            />
        </div>
    );
};

export default RangeInput;
