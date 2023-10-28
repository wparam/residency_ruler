import React from "react";
import VernierRuler from "../components/VernierRuler";

const IndexPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <h1 className="text-2xl font-bold mb-6">Vernier Scale Ruler</h1>
            <div className="border border-gray-300 p-6 rounded-md shadow-lg bg-white px-4">
                <VernierRuler />
            </div>
        </div>
    );
};

export default IndexPage;
