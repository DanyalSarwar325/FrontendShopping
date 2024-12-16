import React from "react";


export const Dashboard = () => {
  const cards = [
    { title: "Total Users", value: "40,689", change: "8.5%", positive: true },
    { title: "Total Orders", value: "10,293", change: "1.3%", positive: true },
    { title: "Total Sales", value: "$89,000", change: "4.3%", positive: false },
    { title: "Total Pending", value: "2,040", change: "1.8%", positive: true },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-4 gap-6 mb-6">
        {cards.map((card, index) => (
          <div key={index} className={`p-4 rounded-md shadow-md ${card.positive ? "bg-green-100" : "bg-red-100"}`}>
            <h2 className="text-lg font-bold">{card.title}</h2>
            <p className="text-2xl font-semibold">{card.value}</p>
            <p className={`text-sm ${card.positive ? "text-green-600" : "text-red-600"}`}>
              {card.change} {card.positive ? "Up" : "Down"} from yesterday
            </p>
          </div>
        ))}
      </div>
     
    </div>
  );
};


