import { Formik, Form } from "formik"


import * as Yup from "yup";

import AgeRangeSlider from "./AgeRangeSlider";
import { Casts } from "../../data/cast";
import { Input } from "./Inputs";
import { FaRupeeSign } from "react-icons/fa";
import { indianStates } from "../../data/indianStates";


interface AgeFilter {
    onSubmit: (values: { ageRange: { min: number; max: number; }; }) => void;
}
interface CastFilterProps {
    onSubmit: (values: { cast: never[]; }) => void;

}

interface SubCastFilterProps {
    onSubmit: (values: { subCast: string; }) => void;

}
interface IncomeFilterProps {
    onSubmit: (value: { income: string; }) => void;
}

interface CityFilterProps {
    onSubmit: (value: { city: string; }) => void;
}
interface StateFilterProps {
    onSubmit: (value: { state: never[]; }) => void;
}


export const AgeFilter = ({ onSubmit }: AgeFilter) => {
    return (
        <Formik
            initialValues={{ ageRange: { min: 18, max: 60 } }}
            onSubmit={(values) => {
                onSubmit(values)
            }}
        >
            {({ setFieldValue, values }) => (
                <Form className="space-y-4">
                    <AgeRangeSlider
                        value={values.ageRange}
                        onChange={(range) => setFieldValue("ageRange", range)}
                    />
                    {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                    <button type="submit" className="primary-button w-full">
                        SUBMIT
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export const CastFilter = ({ onSubmit }: CastFilterProps) => {
    const options = Casts.map((item) => ({ value: item, label: item }));


    return (
        <Formik
            initialValues={{ cast: [] }}
            onSubmit={(values) => {
                console.log("Submitted values:", values);
                onSubmit?.(values);
            }}
        >
            {({ values, setFieldValue }) => (
                <Form className="space-y-4">
                    <ul className="max-h-60 w-full overflow-y-auto max-w-md space-y-1">
                        {options.length ? (
                            options.map((opt, index) => {

                                // @ts-ignore
                                // @ts-nocheck
                                const isChecked = values?.cast?.includes(opt?.value);

                                const toggleCheckbox = () => {
                                    const updatedCast = isChecked
                                        ? values.cast.filter((val: string) => val !== opt.value)
                                        : [...values.cast, opt.value];
                                    setFieldValue("cast", updatedCast);
                                };

                                return (
                                    <li
                                        key={index}
                                        onClick={toggleCheckbox}
                                        className="flex items-center p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => { }} // Required for controlled input
                                            onClick={(e) => e.stopPropagation()} // Prevent <li> click
                                            className="mr-2"
                                        />
                                        <span>{opt.label}</span>
                                    </li>
                                );
                            })
                        ) : (
                            <div className="p-2 text-gray-400 text-sm">No options</div>
                        )}
                    </ul>

                    <button type="submit" className="primary-button w-full">
                        SUBMIT
                    </button>
                </Form>
            )}
        </Formik>
    );
};




export const SubCastFilter = ({ onSubmit }: SubCastFilterProps) => {
    return (
        <Formik
            initialValues={{ subCast: "" }}
            onSubmit={(values) => {
                console.log(values)
                onSubmit?.(values)
            }}
        >

            <Form className="space-y-4">
                <Input name="subCast" label="Sub Cast" placeholder="More, Wadile, satote" />
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                <button type="submit" className="primary-button w-full">
                    SUBMIT
                </button>
            </Form>

        </Formik>
    );
};


const IncomeSchema = Yup.object().shape({
    income: Yup.string()
        .matches(/^\d+$/, "Only numbers are allowed")
        .required("Income is required"),
});



export const IncomeFilter = ({ onSubmit }: IncomeFilterProps) => {
    return (
        <Formik
            initialValues={{ income: "" }}
            validationSchema={IncomeSchema}
            onSubmit={(values) => {
                console.log(values);
                onSubmit?.(values);
            }}
        >

            <Form className="space-y-4">
                <Input iconLeft={<FaRupeeSign className='w-4 h-4 text-gray-500' />} name="income" label="Income" placeholder="10000" />
                <button type="submit" className="primary-button w-full">
                    SUBMIT
                </button>
            </Form>

        </Formik>
    );
}



export const StateFilter = ({ onSubmit }: StateFilterProps) => {
    const options = indianStates.map((item) => ({ value: item, label: item }));

    return (
        <Formik
            initialValues={{ state: [] }}
            onSubmit={(values) => {
                console.log("Submitted values:", values);
                onSubmit?.(values);
            }}
        >
            {({ values, setFieldValue }) => (
                <Form className="space-y-4">
                    <ul className="max-h-60 w-full overflow-y-auto max-w-md space-y-1">
                        {options.length ? (
                            options.map((opt, index) => {
                                // @ts-ignore
                                // @ts-nocheck
                                const isChecked = values.state.includes(opt.value);

                                const toggleCheckbox = () => {
                                    const updatedState = isChecked
                                        ? values.state.filter((val) => val !== opt.value)
                                        : [...values.state, opt.value];
                                    setFieldValue("state", updatedState);
                                };

                                return (
                                    <li
                                        key={index}
                                        onClick={toggleCheckbox}
                                        className="flex items-center p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => { }} // Required for controlled input
                                            onClick={(e) => e.stopPropagation()} // Prevent <li> click
                                            className="mr-2"
                                        />
                                        <span>{opt.label}</span>
                                    </li>
                                );
                            })
                        ) : (
                            <div className="p-2 text-gray-400 text-sm">No options</div>
                        )}
                    </ul>

                    <button type="submit" className="primary-button w-full">
                        SUBMIT
                    </button>
                </Form>
            )}
        </Formik>
    );
};


export const CityFilter = ({ onSubmit }: CityFilterProps) => {
    return (
        <Formik
            initialValues={{ city: "" }}
            onSubmit={(values) => {
                console.log(values)
                onSubmit?.(values)
            }}
        >

            <Form className="space-y-4">
                <Input name="city" label="City" placeholder="More, Wadile, satote" />
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                <button type="submit" className="primary-button w-full">
                    SUBMIT
                </button>
            </Form>

        </Formik>
    );
};



