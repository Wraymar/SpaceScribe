import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

function MoodDonutChart({ data }) {
  return (
    //auto resize to fit it's parent
    <ResponsiveContainer width="100%" height={220}>
      {/* actual pie chart  */}
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          //moving chart on the x/y axis
          cx="50%"
          cy="50%"
          //inner / outer circle
          innerRadius={50}
          outerRadius={90}
          // gap between slices
          paddingAngle={2}

          //add the label for the value (number)
          // label
        >
          {/* For each obj (cell) in mood breakdown, set key to be the index and fill it with the color */}
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default MoodDonutChart;
