import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registrar componentes necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
        {
            label: "Votes",
            data: [300, 50, 100],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
    ],
};

export default function PieChart() {
    return (
        <div className="flex justify-center items-center p-5 sm:w-full md:w-full lg:w-full border-2 border-[#374151] rounded-2xl">
            <Pie data={data} width={200}/>
        </div>
    );
}
