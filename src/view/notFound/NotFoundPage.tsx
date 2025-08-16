import React from "react";
import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-50">
            <TbError404 className="text-pink-600 text-6xl mb-4 animate-bounce" />

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {t("notFound.title")}
            </h1>
            <p className="text-gray-600 max-w-md mb-6">
                {t("notFound.description")}
            </p>

            <Link
                to="/"
                className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
            >
                {t("notFound.button")}
            </Link>
        </div>
    );
};

export default NotFoundPage;
