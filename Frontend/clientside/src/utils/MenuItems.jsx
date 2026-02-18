import { dashboard, expenses, transactions, trend } from "./Icons";

export const MenuItems=[
    {
        id:1,
        title:'Dashboard',
        icon:dashboard,
        link:'/finance/tracking'
    },
    {
        id:2,
        title:'Incomes',
        icon:trend,
        link:'/finance/tracking/incomes'
    },
    {
        id:3,
        title:'Expenses',
        icon:expenses,
        link:'/finance/tracking/expenses'
    },
];