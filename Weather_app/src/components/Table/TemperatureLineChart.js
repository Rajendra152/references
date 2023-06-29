import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
ChartJS.register(
    Title, Tooltip, LineElement, Legend,
    CategoryScale, LinearScale, PointElement, Filler
)

const TemperatureLineChart = ({ storeData, isCelsius, hourDay, dayname }) => {
    const xAxisData = [];
    const yAxisDataFaren = [];
    const yAxisDataCelcius = [];
    const hour = storeData.forecast.forecastday[hourDay].hour;
    hour.map(curEle => {
                xAxisData.push(curEle.time.split(' ')[1]);
                return null;
    })
    hour.map((curEle) => {
        yAxisDataFaren.push(`${curEle.temp_f}`);
        return null;
    })
    hour.map((curEle) => {
        yAxisDataCelcius.push(curEle.temp_c);
        return null;
    })
    const data = {
        labels: xAxisData,
        datasets: [
            {
                label: !isCelsius ? `${dayname} Weather (Farenheits)` : `${dayname} Weather (Celcius)`,
                data: !isCelsius ? yAxisDataFaren : yAxisDataCelcius,
                borderColor: '#b9adff',
                backgroundColor: '#b9adff',
                pointStyle: 'circle',
                pointRadius: 10,
                pointHoverRadius: 15
            }
        ]
    }
    return (
        <div>
            <Line data={data}></Line>
        </div>
    )
}

export default TemperatureLineChart
