import {Chart as ChartJs,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,ArcElement} from 'chart.js'
import { useContext } from 'react';
import {Line} from 'react-chartjs-2'
import { GlobalContext } from '../context/GlobalContext';

ChartJs.register({
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
});

const Chart = () => {
    const { incomes, expenses } = useContext(GlobalContext);

    // Create chart data conditionally based on the availability of data
        const data = {
            labels: [...Array(Math.max(incomes.length, expenses.length)).keys()].map(index => {
                // Generate label for each index
                if (incomes[index]) {
                    return new Date(incomes[index].date).toLocaleDateString('en-GB');
                } else if (expenses[index]) {
                    return new Date(expenses[index].date).toLocaleDateString('en-GB');
                }
                return ''; // Return empty string for missing data
            }),
    
        datasets: [
            {
                label: 'Income',
                data:  incomes.map(income => income.amount) ,
                backgroundColor: 'green',
                borderColor: '#373635',
                pointBackgroundColor: '#58DB15',
                borderWidth: 2,
                tension: 0.2
            },
            {
                label: 'Expense',
                data: expenses.map(expense => expense.amount) ,
                backgroundColor: 'red',
                borderColor: '#373635',
                pointBackgroundColor: '#F60909',
                borderWidth: 2,
                tension: 0.2
            }
        ]
    };
    return (
        <Line data={data} />
    );
}

export default Chart;